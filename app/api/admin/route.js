import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import crypto from "crypto";

const sql = neon(process.env.DATABASE_URL);

// Ensures the table exists and has all required columns.
// No seed row — the first successful "update" creates row 1
// with whatever the admin actually enters.
async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS site_links (
      id INT PRIMARY KEY DEFAULT 1,
      whatsapp_url TEXT NOT NULL DEFAULT '',
      telegram_url TEXT NOT NULL DEFAULT '',
      whatsapp_number TEXT NOT NULL DEFAULT '',
      telegram_username TEXT NOT NULL DEFAULT ''
    )
  `;

  // Backfill: add columns if the table was created before this update
  await sql`ALTER TABLE site_links ADD COLUMN IF NOT EXISTS whatsapp_number TEXT NOT NULL DEFAULT ''`;
  await sql`ALTER TABLE site_links ADD COLUMN IF NOT EXISTS telegram_username TEXT NOT NULL DEFAULT ''`;
}

function isAuthed(req) {
  const cookie = req.cookies.get("admin_session");
  if (!cookie?.value) return false;
  return safeCompare(cookie.value, process.env.ADMIN_PASSWORD || "");
}

// Constant-time string comparison.
function safeCompare(a, b) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

// Very small in-memory rate limiter — resets on cold start and isn't
// shared across instances, so treat it as a deterrent, not a guarantee.
// Swap in Upstash Ratelimit (or similar) if this needs to be airtight.
const attempts = new Map(); // ip -> { count, resetAt }
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 60_000;

function isRateLimited(req) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const now = Date.now();
  const entry = attempts.get(ip);

  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > MAX_ATTEMPTS;
}

// Basic sanity check: must be http(s) and reasonably short.
// Empty string is allowed (so links can be cleared).
function isValidUrl(value) {
  if (value === "") return true;
  if (typeof value !== "string" || value.length > 2048) return false;
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

// Basic sanity check for the number/username fields: just plain text,
// no URLs/scripts, reasonably short. Adjust the regex if you want to
// enforce a stricter phone/username format.
function isValidHandle(value) {
  if (typeof value !== "string") return false;
  if (value.length > 100) return false;
  return !/[<>]/.test(value);
}

// GET: fetch current links (public — used by homepage)
export async function GET() {
  try {
    await ensureTable();
    const rows = await sql`
      SELECT whatsapp_url, telegram_url, whatsapp_number, telegram_username
      FROM site_links WHERE id = 1
    `;
    const row = rows[0];
    return NextResponse.json({
      whatsapp: row?.whatsapp_url ?? "",
      telegram: row?.telegram_url ?? "",
      whatsappNumber: row?.whatsapp_number ?? "",
      telegramUsername: row?.telegram_username ?? "",
    });
  } catch (err) {
    console.error("GET /site-links failed:", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch links" },
      { status: 500 }
    );
  }
}

// POST: log in with password -> sets a session cookie, or update links if already authed
export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (body.action === "login") {
    if (isRateLimited(req)) {
      return NextResponse.json(
        { success: false, error: "Too many attempts. Try again shortly." },
        { status: 429 }
      );
    }

    const ok =
      typeof body.password === "string" &&
      safeCompare(body.password, process.env.ADMIN_PASSWORD || "");

    if (ok) {
      const res = NextResponse.json({ success: true });
      res.cookies.set("admin_session", body.password, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      return res;
    }
    return NextResponse.json({ success: false, error: "Incorrect password" }, { status: 401 });
  }

  if (body.action === "update") {
    if (!isAuthed(req)) {
      return NextResponse.json({ success: false, error: "Not authorized" }, { status: 401 });
    }

    const whatsapp = body.whatsapp;
    const telegram = body.telegram;
    const whatsappNumber = body.whatsappNumber ?? body.whatsapp_number ?? "";
    const telegramUsername = body.telegramUsername ?? body.telegram_username ?? "";

    if (
      typeof whatsapp !== "string" ||
      typeof telegram !== "string" ||
      typeof whatsappNumber !== "string" ||
      typeof telegramUsername !== "string"
    ) {
      return NextResponse.json({ success: false, error: "Invalid payload" }, { status: 400 });
    }
    if (!isValidUrl(whatsapp) || !isValidUrl(telegram)) {
      return NextResponse.json({ success: false, error: "Invalid URL" }, { status: 400 });
    }
    if (!isValidHandle(whatsappNumber) || !isValidHandle(telegramUsername)) {
      return NextResponse.json({ success: false, error: "Invalid contact field" }, { status: 400 });
    }

    try {
      await ensureTable();
      await sql`
        INSERT INTO site_links (id, whatsapp_url, telegram_url, whatsapp_number, telegram_username)
        VALUES (1, ${whatsapp}, ${telegram}, ${whatsappNumber}, ${telegramUsername})
        ON CONFLICT (id) DO UPDATE
        SET whatsapp_url = EXCLUDED.whatsapp_url,
            telegram_url = EXCLUDED.telegram_url,
            whatsapp_number = EXCLUDED.whatsapp_number,
            telegram_username = EXCLUDED.telegram_username
      `;
      return NextResponse.json({ success: true });
    } catch (err) {
      console.error("POST /site-links (update) failed:", err);
      return NextResponse.json(
        { success: false, error: "Failed to update links" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ success: false, error: "Unknown action" }, { status: 400 });
}
