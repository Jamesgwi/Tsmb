import Image from "next/image";
import Link from "next/link";
import { neon } from "@neondatabase/serverless";
import { Outfit, Inter } from "next/font/google";
import FloatingChat from "../components/FloatingChat";

const display = Outfit({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const sql = neon(process.env.DATABASE_URL!);

async function getLinks() {
  try {
    const rows =
      await sql`SELECT whatsapp_url, telegram_url, whatsapp_number, telegram_username FROM site_links WHERE id = 1`;

    const row = rows[0];

    return {
      whatsapp: row?.whatsapp_url || "https://wa.link/",
      telegram: row?.telegram_url || "https://t.me/",
      whatsappNumber: row?.whatsapp_number || "+1 2345",
      telegramUsername: row?.telegram_username || "@user",
    };
  } catch {
    return {
      whatsapp: "https://",
      telegram: "https://",
      whatsappNumber: "",
      telegramUsername: "",
    };
  }
}

export const dynamic = "force-dynamic";

const theme = {
  bg: "#0a0a0a",
  bgDark: "#050505",
  bgLight: "#0f0f0f",
  bgLighter: "#141414",
  bgCard: "rgba(15, 15, 15, 0.7)",
  accent: "#2dd4bf",
  accentLight: "#5eead4",
  accentDark: "#14b8a6",
  accentGlow: "rgba(45, 212, 191, 0.12)",
  gold: "#f59e0b",
  goldLight: "#fbbf24",
  goldGlow: "rgba(245, 158, 11, 0.1)",
  text: "#f0f0f0",
  textMuted: "#8a8a8a",
  line: "#1a1a1a",
  white: "#FFFFFF",
  whatsapp: "#25D366",
  telegram: "#229ED9",
};

function LogoMark({ size = 44 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className="logo-mark"
    >
      <circle
        cx="50"
        cy="50"
        r="44"
        stroke="white"
        strokeWidth="3"
        opacity="0.9"
      />
      <path
        d="M30 52 C30 38, 40 28, 52 28 C64 28, 74 38, 74 52"
        stroke="white"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M74 52 C74 66, 64 76, 52 76"
        stroke="white"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      <circle cx="52" cy="52" r="6" fill="white" opacity="0.9" />
    </svg>
  );
}

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.5 3.5A11.9 11.9 0 0 0 12.04 0C5.47 0 .13 5.34.13 11.91c0 2.1.55 4.15 1.6 5.96L.04 24l6.28-1.65a11.88 11.88 0 0 0 5.71 1.46h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.18-3.44-8.41ZM12.04 21.8h-.01a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.73.98 1-3.64-.24-.37a9.88 9.88 0 0 1-1.52-5.28C2.14 6.43 6.57 2 12.04 2c2.65 0 5.14 1.03 7.01 2.9a9.86 9.86 0 0 1 2.9 7c0 5.47-4.44 9.9-9.91 9.9Z" />
      <path d="M17.55 14.52c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.74-1.64-2.04-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}

function TelegramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M21.9 3.2 18.5 20c-.26 1.19-.97 1.48-1.97.92l-5.43-4-2.62 2.52c-.29.29-.53.53-1.09.53l.39-5.52 10.05-9.08c.44-.39-.1-.61-.68-.22L4.73 12.2l-5.38-1.68c-1.17-.37-1.19-1.17.24-1.73L20.62.81c.98-.36 1.84.24 1.28 2.39Z" />
    </svg>
  );
}

export default async function Home() {
  const {
    whatsapp: WHATSAPP_URL,
    telegram: TELEGRAM_URL,
  } = await getLinks();

  return (
    <main className={`${display.variable} ${body.variable}`}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            * {
              box-sizing: border-box;
            }

            html {
              scroll-behavior: smooth;
            }

            html,
            body {
              margin: 0;
              padding: 0;
              background: ${theme.bg};
            }

            body {
              font-family: var(--font-body), system-ui, -apple-system, sans-serif;
              color: ${theme.text};
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }

            a {
              color: inherit;
              text-decoration: none;
            }

            a:focus-visible {
              outline: 2px solid ${theme.accent};
              outline-offset: 3px;
              border-radius: 4px;
            }

            .page {
              width: 100%;
              min-height: 100vh;
              overflow-x: hidden;
              background: ${theme.bg};
            }

            /* ═══ BRAND BAR ═══ */
            .brand-bar {
              background: rgba(10, 10, 10, 0.9);
              backdrop-filter: blur(20px) saturate(1.4);
              -webkit-backdrop-filter: blur(20px) saturate(1.4);
              border-bottom: 1px solid ${theme.line};
              color: white;
              padding: 16px 24px;
              position: sticky;
              top: 0;
              z-index: 50;
            }

            .brand-bar-inner {
              width: min(100%, 900px);
              margin: 0 auto;
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 20px;
            }

            .brand {
              display: flex;
              align-items: center;
              gap: 12px;
              text-decoration: none;
            }

            .brand-name {
              display: flex;
              flex-direction: column;
              gap: 2px;
            }

            .brand-name-primary {
              font-family: var(--font-display), sans-serif;
              font-size: 15px;
              font-weight: 800;
              letter-spacing: 2px;
              text-transform: uppercase;
              color: ${theme.accent};
              line-height: 1;
            }

            .brand-name-sub {
              font-size: 9px;
              font-weight: 600;
              letter-spacing: 2.5px;
              text-transform: uppercase;
              color: ${theme.textMuted};
              line-height: 1;
              opacity: 0.7;
            }

            .brand-link {
              color: ${theme.accent};
              text-decoration: none;
              font-size: 11px;
              font-weight: 700;
              letter-spacing: 1.5px;
              text-transform: uppercase;
              padding: 8px 16px;
              border: 1px solid ${theme.line};
              border-radius: 100px;
              transition: all 0.25s ease;
            }

            .brand-link:hover {
              border-color: ${theme.accent};
              background: rgba(45, 212, 191, 0.08);
              box-shadow: 0 0 20px rgba(45, 212, 191, 0.15);
            }

            /* ═══ HERO WITH BANNER ═══ */
            .hero {
              position: relative;
              width: 100%;
              background: ${theme.bg};
              line-height: 0;
            }

            .hero-image {
              display: block;
              width: 100%;
              height: auto;
              object-fit: contain;
            }

            .hero-fade-top {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 120px;
              background: linear-gradient(
                to bottom,
                ${theme.bg} 0%,
                transparent 100%
              );
              pointer-events: none;
              z-index: 2;
            }

            .hero-fade-bottom {
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              height: 160px;
              background: linear-gradient(
                to bottom,
                transparent 0%,
                ${theme.bg} 100%
              );
              pointer-events: none;
              z-index: 2;
            }

            .hero-overlay {
              position: absolute;
              inset: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              padding: 40px 24px;
              z-index: 3;
              pointer-events: none;
            }

            .hero-overlay-content {
              pointer-events: auto;
              max-width: 700px;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 16px;
            }

            .hero-logo {
              filter: drop-shadow(0 4px 20px rgba(0,0,0,0.5));
            }

            .hero-eyebrow {
              color: ${theme.accent};
              font-size: 12px;
              font-weight: 700;
              letter-spacing: 4px;
              text-transform: uppercase;
              text-shadow: 0 2px 10px rgba(0,0,0,0.5);
            }

            .hero h1 {
              margin: 0;
              font-family: var(--font-display), sans-serif;
              font-size: clamp(28px, 6vw, 56px);
              line-height: 1.05;
              font-weight: 800;
              letter-spacing: -0.02em;
              color: white;
              text-shadow: 0 2px 30px rgba(0,0,0,0.6);
            }

            .hero-title-accent {
              display: block;
              color: ${theme.accent};
              font-size: clamp(12px, 2.5vw, 18px);
              font-weight: 700;
              letter-spacing: 3px;
              text-transform: uppercase;
              margin-bottom: 8px;
            }

            .hero-tagline {
              color: ${theme.accent};
              font-size: 11px;
              font-weight: 600;
              letter-spacing: 3px;
              text-transform: uppercase;
              opacity: 0.9;
              text-shadow: 0 2px 10px rgba(0,0,0,0.5);
            }

            .hero-divider {
              width: 60px;
              height: 1px;
              background: linear-gradient(90deg, transparent, ${theme.accent}, transparent);
              opacity: 0.6;
            }

            /* ═══ INTRO / CONTACT ═══ */
            .intro {
              padding: 80px 24px 100px;
              background: ${theme.bg};
              text-align: center;
              position: relative;
            }

            .intro::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 1px;
              background: linear-gradient(90deg, transparent 0%, ${theme.line} 50%, transparent 100%);
            }

            .content-width {
              width: min(720px, 100%);
              margin: 0 auto;
            }

            .intro p {
              max-width: 600px;
              margin: 0 auto 36px;
              color: ${theme.textMuted};
              font-size: 15px;
              line-height: 1.85;
            }

            .contact-pills {
              display: flex;
              justify-content: center;
              gap: 14px;
              flex-wrap: wrap;
            }

            .contact-pill {
              display: inline-flex;
              align-items: center;
              gap: 10px;
              padding: 16px 32px;
              border-radius: 100px;
              text-decoration: none;
              font-size: 14px;
              font-weight: 700;
              letter-spacing: 0.5px;
              transition: all 0.25s ease;
              border: 1px solid transparent;
            }

            .contact-pill:hover {
              transform: translateY(-2px);
            }

            .contact-pill.whatsapp {
              background: ${theme.whatsapp};
              color: white;
              box-shadow: 0 4px 20px rgba(37, 211, 102, 0.2);
            }

            .contact-pill.whatsapp:hover {
              box-shadow: 0 8px 30px rgba(37, 211, 102, 0.35);
            }

            .contact-pill.telegram {
              background: ${theme.telegram};
              color: white;
              box-shadow: 0 4px 20px rgba(34, 158, 217, 0.2);
            }

            .contact-pill.telegram:hover {
              box-shadow: 0 8px 30px rgba(34, 158, 217, 0.35);
            }

            .contact-pill .pill-icon {
              flex-shrink: 0;
            }

            .contact-pill .pill-label {
              white-space: nowrap;
            }

            /* ═══ EXPERIENCE SELECTOR ═══ */
            .experience {
              padding: 90px 24px;
              background: ${theme.bgDark};
              border-top: 1px solid ${theme.line};
              border-bottom: 1px solid ${theme.line};
            }

            .experience-width {
              width: min(640px, 100%);
              margin: 0 auto;
            }

            .experience-title {
              font-family: var(--font-display), sans-serif;
              font-size: clamp(36px, 6vw, 52px);
              font-weight: 700;
              color: white;
              margin: 0 0 8px;
              letter-spacing: -0.02em;
            }

            .experience-subtitle {
              color: ${theme.textMuted};
              font-size: 15px;
              margin: 0 0 40px;
            }

            .experience-options {
              display: flex;
              flex-direction: column;
              gap: 14px;
            }

            .experience-card {
              display: flex;
              align-items: center;
              gap: 18px;
              padding: 22px 24px;
              background: ${theme.bgCard};
              backdrop-filter: blur(10px);
              border: 1.5px solid ${theme.line};
              border-radius: 16px;
              cursor: pointer;
              transition: all 0.25s ease;
              position: relative;
            }

            .experience-card:hover {
              border-color: rgba(45, 212, 191, 0.3);
              background: rgba(20, 20, 20, 0.8);
            }

            .experience-radio {
              position: absolute;
              opacity: 0;
              width: 0;
              height: 0;
            }

            .experience-radio:focus-visible + .experience-card {
              outline: 2px solid ${theme.accent};
              outline-offset: 3px;
            }

            .experience-radio:checked + .experience-card {
              border-color: ${theme.accent};
              background: rgba(45, 212, 191, 0.05);
              box-shadow: 0 0 30px rgba(45, 212, 191, 0.08), inset 0 1px 0 rgba(45, 212, 191, 0.05);
            }

            .radio-circle {
              width: 22px;
              height: 22px;
              border-radius: 50%;
              border: 2px solid ${theme.line};
              flex-shrink: 0;
              display: grid;
              place-items: center;
              transition: all 0.25s ease;
            }

            .radio-circle::after {
              content: '';
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background: ${theme.accent};
              transform: scale(0);
              transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
              box-shadow: 0 0 10px rgba(45, 212, 191, 0.5);
            }

            .experience-radio:checked + .experience-card .radio-circle {
              border-color: ${theme.accent};
            }

            .experience-radio:checked + .experience-card .radio-circle::after {
              transform: scale(1);
            }

            .experience-label {
              color: white;
              font-size: 16px;
              font-weight: 600;
              letter-spacing: -0.2px;
            }

            /* ═══ PILLARS ═══ */
            .pillars {
              background: ${theme.bg};
              padding: 90px 24px;
              position: relative;
            }

            .section-width {
              width: min(1000px, 100%);
              margin: 0 auto;
            }

            .dark-eyebrow {
              color: ${theme.accent};
              font-size: 11px;
              font-weight: 700;
              letter-spacing: 3.5px;
              text-transform: uppercase;
              text-shadow: 0 0 16px rgba(45, 212, 191, 0.2);
            }

            .pillars-title {
              margin: 16px 0 48px;
              max-width: 600px;
              font-family: var(--font-display), sans-serif;
              font-size: clamp(36px, 6vw, 52px);
              line-height: 1.05;
              font-weight: 700;
              color: white;
              letter-spacing: -0.02em;
            }

            .pillar-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 1px;
              background: ${theme.line};
              border-radius: 16px;
              overflow: hidden;
              border: 1px solid ${theme.line};
            }

            .pillar {
              min-height: 300px;
              padding: 36px 28px;
              background: ${theme.bgCard};
              backdrop-filter: blur(10px);
              transition: background 0.3s ease;
            }

            .pillar:hover {
              background: rgba(20, 20, 20, 0.8);
            }

            .pillar-heading {
              display: flex;
              align-items: center;
              gap: 12px;
              margin: 0 0 16px;
            }

            .pillar-dot {
              width: 8px;
              height: 8px;
              flex-shrink: 0;
              border-radius: 50%;
              background: ${theme.accent};
              box-shadow: 0 0 12px rgba(45, 212, 191, 0.4);
            }

            .pillar h2 {
              margin: 0;
              color: white;
              font-family: var(--font-display), sans-serif;
              font-size: 28px;
              line-height: 1;
              font-weight: 700;
              letter-spacing: -0.02em;
            }

            .pillar p {
              margin: 0;
              color: ${theme.textMuted};
              font-size: 13.5px;
              line-height: 1.8;
            }

            /* ═══ PHILOSOPHY / MANIFESTO ═══ */
            .philosophy {
              background: ${theme.bgDark};
              padding: 100px 24px;
              border-top: 1px solid ${theme.line};
              border-bottom: 1px solid ${theme.line};
            }

            .philosophy-grid {
              width: min(900px, 100%);
              margin: 0 auto;
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 80px;
              align-items: center;
            }

            .philosophy-left {
              display: flex;
              flex-direction: column;
              gap: 20px;
            }

            .philosophy h2 {
              margin: 0;
              color: white;
              font-family: var(--font-display), sans-serif;
              font-size: clamp(32px, 5vw, 48px);
              line-height: 1.1;
              font-weight: 700;
              letter-spacing: -0.02em;
            }

            .philosophy-sub {
              color: ${theme.textMuted};
              font-size: 15px;
              line-height: 1.8;
              margin: 0;
            }

            .philosophy-right {
              display: flex;
              flex-direction: column;
              gap: 28px;
            }

            .manifesto-item {
              padding: 24px 28px;
              background: ${theme.bgCard};
              backdrop-filter: blur(10px);
              border: 1px solid ${theme.line};
              border-radius: 14px;
              transition: all 0.3s ease;
            }

            .manifesto-item:hover {
              border-color: rgba(45, 212, 191, 0.2);
              transform: translateY(-2px);
            }

            .manifesto-item h3 {
              margin: 0 0 6px;
              color: ${theme.accent};
              font-family: var(--font-display), sans-serif;
              font-size: 18px;
              font-weight: 700;
            }

            .manifesto-item p {
              margin: 0;
              color: ${theme.textMuted};
              font-size: 13.5px;
              line-height: 1.7;
            }

            /* ═══ FINAL CTA ═══ */
            .final-cta {
              padding: 100px 24px;
              background: ${theme.bg};
              text-align: center;
              position: relative;
              overflow: hidden;
            }

            .final-cta::before {
              content: '';
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 500px;
              height: 300px;
              background: radial-gradient(ellipse, rgba(45, 212, 191, 0.05) 0%, transparent 70%);
              pointer-events: none;
            }

            .final-cta-content {
              position: relative;
              z-index: 2;
              max-width: 600px;
              margin: 0 auto;
            }

            .final-cta h2 {
              margin: 0 0 12px;
              font-family: var(--font-display), sans-serif;
              font-size: clamp(32px, 5vw, 48px);
              font-weight: 700;
              color: white;
              letter-spacing: -0.02em;
              line-height: 1.1;
            }

            .final-cta p {
              margin: 0 0 36px;
              color: ${theme.textMuted};
              font-size: 15px;
              line-height: 1.8;
            }

            .final-cta-divider {
              width: 50px;
              height: 1px;
              background: linear-gradient(90deg, transparent, ${theme.accent}, transparent);
              margin: 0 auto 36px;
              opacity: 0.5;
            }

            /* ═══ FLOATING CHAT BUTTON ═══ */
            .floating-chat-btn {
              position: fixed;
              bottom: 24px;
              right: 24px;
              z-index: 100;
              width: 56px;
              height: 56px;
              border-radius: 50%;
              border: none;
              background: ${theme.accent};
              color: ${theme.bgDark};
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow:
                0 4px 24px rgba(45, 212, 191, 0.3),
                0 0 0 1px rgba(45, 212, 191, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.3);
              transform: translateY(100px) scale(0.8);
              opacity: 0;
              transition:
                transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
                opacity 0.3s ease,
                box-shadow 0.2s ease;
              pointer-events: none;
            }

            .floating-chat-btn.floating-chat-visible {
              transform: translateY(0) scale(1);
              opacity: 1;
              pointer-events: auto;
            }

            .floating-chat-btn:hover {
              transform: translateY(-3px) scale(1.05);
              box-shadow:
                0 8px 32px rgba(45, 212, 191, 0.4),
                0 0 0 1px rgba(45, 212, 191, 0.25),
                inset 0 1px 0 rgba(255, 255, 255, 0.4);
            }

            .floating-chat-btn:active {
              transform: translateY(-1px) scale(0.97);
            }

            /* ═══ SHEET BACKDROP ═══ */
            .sheet-backdrop {
              position: fixed;
              inset: 0;
              z-index: 200;
              background: rgba(5, 5, 5, 0.7);
              backdrop-filter: blur(16px) saturate(1.2);
              -webkit-backdrop-filter: blur(16px) saturate(1.2);
              opacity: 0;
              visibility: hidden;
              transition: opacity 0.4s ease, visibility 0.4s ease;
            }

            .sheet-backdrop.sheet-backdrop-open {
              opacity: 1;
              visibility: visible;
            }

            /* ═══ BOTTOM SHEET ═══ */
            .chat-sheet {
              position: fixed;
              bottom: 0;
              left: 0;
              right: 0;
              z-index: 210;
              background: linear-gradient(
                180deg,
                rgba(20, 20, 20, 0.95) 0%,
                rgba(10, 10, 10, 0.98) 100%
              );
              border-top: 1px solid ${theme.line};
              border-top-left-radius: 28px;
              border-top-right-radius: 28px;
              box-shadow:
                0 -20px 60px rgba(0, 0, 0, 0.6),
                inset 0 1px 0 rgba(255, 255, 255, 0.04);
              transform: translateY(100%);
              transition: transform 0.45s cubic-bezier(0.32, 0.72, 0, 1);
              max-height: 85vh;
              overflow-y: auto;
              padding: 0 20px 32px;
            }

            .chat-sheet.chat-sheet-open {
              transform: translateY(0);
            }

            .sheet-handle-bar {
              width: 40px;
              height: 5px;
              border-radius: 3px;
              background: rgba(255, 255, 255, 0.1);
              margin: 14px auto 20px;
              flex-shrink: 0;
            }

            .sheet-header {
              display: flex;
              align-items: flex-start;
              justify-content: space-between;
              margin-bottom: 20px;
              gap: 12px;
            }

            .sheet-header-text {
              display: flex;
              flex-direction: column;
              gap: 4px;
            }

            .sheet-title {
              font-family: var(--font-display), sans-serif;
              font-size: 24px;
              font-weight: 700;
              color: white;
              letter-spacing: -0.3px;
              line-height: 1.2;
            }

            .sheet-subtitle {
              color: ${theme.textMuted};
              font-size: 12.5px;
              line-height: 1.5;
              opacity: 0.8;
            }

            .sheet-close-btn {
              width: 36px;
              height: 36px;
              border-radius: 50%;
              border: 1px solid ${theme.line};
              background: rgba(255, 255, 255, 0.03);
              color: ${theme.textMuted};
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              transition: all 0.2s ease;
              flex-shrink: 0;
            }

            .sheet-close-btn:hover {
              background: rgba(255, 255, 255, 0.08);
              color: white;
              border-color: ${theme.accent};
            }

            /* ═══ SHEET ACTIONS ═══ */
            .sheet-actions {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 12px;
              padding: 8px 0;
            }

            .sheet-action-btn {
              display: inline-flex;
              align-items: center;
              gap: 14px;
              padding: 16px 28px;
              border-radius: 16px;
              text-decoration: none;
              font-weight: 700;
              transition: all 0.25s ease;
              width: 100%;
              max-width: 320px;
              justify-content: center;
            }

            .sheet-action-btn:hover {
              transform: translateY(-2px);
            }

            .sheet-action-whatsapp {
              background: ${theme.whatsapp};
              color: white;
              box-shadow: 0 4px 20px rgba(37, 211, 102, 0.25);
            }

            .sheet-action-whatsapp:hover {
              box-shadow: 0 8px 30px rgba(37, 211, 102, 0.4);
            }

            .sheet-action-telegram {
              background: ${theme.telegram};
              color: white;
              box-shadow: 0 4px 20px rgba(34, 158, 217, 0.25);
            }

            .sheet-action-telegram:hover {
              box-shadow: 0 8px 30px rgba(34, 158, 217, 0.4);
            }

            .sheet-action-icon {
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
              color: white;
            }

            .sheet-action-text {
              display: flex;
              flex-direction: column;
              gap: 2px;
            }

            .sheet-action-label {
              color: white;
              font-size: 15px;
              font-weight: 700;
              letter-spacing: -0.2px;
            }

            .sheet-action-sublabel {
              color: rgba(255, 255, 255, 0.85);
              font-size: 12px;
              font-weight: 500;
            }

            /* ═══ FOOTER ═══ */
            footer {
              padding: 48px 24px;
              background: ${theme.bgDark};
              text-align: center;
              border-top: 1px solid ${theme.line};
            }

            .footer-logo {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 12px;
              margin-bottom: 16px;
            }

            .footer-name {
              color: white;
              font-family: var(--font-display), sans-serif;
              font-size: 20px;
              font-weight: 700;
              letter-spacing: -0.02em;
            }

            .footer-tagline {
              color: ${theme.accent};
              font-size: 10px;
              font-weight: 700;
              letter-spacing: 2.5px;
              text-transform: uppercase;
              margin-bottom: 20px;
              opacity: 0.8;
            }

            .footer-copy {
              max-width: 500px;
              margin: 0 auto;
              color: rgba(138, 138, 138, 0.5);
              font-size: 11px;
              line-height: 1.7;
            }

            /* ═══ RESPONSIVE ═══ */
            @media (max-width: 768px) {
              .brand-bar {
                padding: 14px 16px;
              }

              .brand-link {
                display: none;
              }

              .hero-fade-top {
                height: 80px;
              }

              .hero-fade-bottom {
                height: 100px;
              }

              .hero-overlay {
                padding: 30px 16px;
              }

              .intro {
                padding: 64px 20px 80px;
              }

              .contact-pills {
                flex-direction: column;
                align-items: center;
                gap: 12px;
              }

              .contact-pill {
                width: 100%;
                max-width: 280px;
                justify-content: center;
                padding: 14px 28px;
              }

              .experience {
                padding: 64px 20px;
              }

              .experience-card {
                padding: 18px 20px;
              }

              .floating-chat-btn {
                bottom: 20px;
                right: 20px;
                width: 52px;
                height: 52px;
              }

              .chat-sheet {
                border-top-left-radius: 24px;
                border-top-right-radius: 24px;
                padding: 0 16px 28px;
              }

              .sheet-title {
                font-size: 22px;
              }

              .pillars {
                padding: 64px 20px;
              }

              .pillar-grid {
                grid-template-columns: 1fr;
              }

              .pillar {
                min-height: auto;
                padding: 28px 24px;
                border-bottom: 1px solid ${theme.line};
              }

              .pillar:last-child {
                border-bottom: none;
              }

              .philosophy {
                padding: 64px 20px;
              }

              .philosophy-grid {
                grid-template-columns: 1fr;
                gap: 40px;
              }

              .manifesto-item {
                padding: 20px 22px;
              }

              .final-cta {
                padding: 64px 20px;
              }
            }

            @media (prefers-reduced-motion: no-preference) {
              .fade-up {
                animation: fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
              }

              @keyframes fadeUp {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: none;
                }
              }

              .fade-in {
                animation: fadeIn 1s ease both;
              }

              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
            }
          `,
        }}
      />

      <div className="page">
        {/* ═══ BRAND BAR ═══ */}
        <header className="brand-bar">
          <div className="brand-bar-inner">
            <Link href="/" className="brand">
              <LogoMark size={36} />
              <div className="brand-name">
                <span className="brand-name-primary">The Compounding Hub</span>
                <span className="brand-name-sub">Retirement Mastermind</span>
              </div>
            </Link>
            <a href="#contact" className="brand-link">
              Connect With Us
            </a>
          </div>
        </header>

        {/* ═══ HERO WITH BANNER IMAGE ═══ */}
        <section className="hero">
          <div className="hero-fade-top" aria-hidden="true" />
          <Image
            src="/banner.jpg"
            alt="The Compounding Hub — Retirement Mastermind"
            width={1536}
            height={802}
            priority
            sizes="100vw"
            className="hero-image"
          />
          <div className="hero-fade-bottom" aria-hidden="true" />

          <div className="hero-overlay">
            <div className="hero-overlay-content fade-in">
              <div className="hero-logo">
                <LogoMark size={72} />
              </div>
              <div className="hero-eyebrow">The Compounding Hub</div>
              <h1>
                <span className="hero-title-accent">Retirement Mastermind</span>
                <span className="hero-title-main">
                  Build Wealth.<br />
                  Retire Strong.<br />
                  Gain Freedom.
                </span>
              </h1>
              <div className="hero-divider" />
              <div className="hero-tagline">
                — Build Wealth — Retire Strong — Gain Freedom —
              </div>
            </div>
          </div>
        </section>

        {/* ═══ INTRO / CONTACT ═══ */}
        <section className="intro" id="contact">
          <div className="content-width fade-up">
            <p>
              The Compounding Hub is a private community of serious wealth-builders 
              focused on one outcome: a retirement built on strength, clarity, and 
              compound growth. We cut through the noise and deliver disciplined 
              strategies, real-time trade support, and a roadmap to financial freedom. 
              Connect with our team directly on Telegram or WhatsApp.
            </p>

            <div className="contact-pills">
              <Link
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-pill whatsapp"
              >
                <span className="pill-icon">
                  <WhatsAppIcon size={18} />
                </span>
                <span className="pill-label">Join on WhatsApp</span>
              </Link>

              <Link
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-pill telegram"
              >
                <span className="pill-icon">
                  <TelegramIcon size={18} />
                </span>
                <span className="pill-label">Join on Telegram</span>
              </Link>
            </div>
          </div>
        </section>

        <FloatingChat whatsappUrl={WHATSAPP_URL} telegramUrl={TELEGRAM_URL} />

        {/* ═══ EXPERIENCE SELECTOR ═══ */}
        <section className="experience">
          <div className="experience-width">
            <h2 className="experience-title">Experience</h2>
            <p className="experience-subtitle">Select the option that applies.</p>

            <div className="experience-options">
              <label className="experience-card-wrapper">
                <input
                  type="radio"
                  name="experience"
                  value="new"
                  className="experience-radio"
                  defaultChecked
                />
                <div className="experience-card">
                  <span className="radio-circle" />
                  <span className="experience-label">New to trading</span>
                </div>
              </label>

              <label className="experience-card-wrapper">
                <input
                  type="radio"
                  name="experience"
                  value="some"
                  className="experience-radio"
                />
                <div className="experience-card">
                  <span className="radio-circle" />
                  <span className="experience-label">Some experience</span>
                </div>
              </label>

              <label className="experience-card-wrapper">
                <input
                  type="radio"
                  name="experience"
                  value="experienced"
                  className="experience-radio"
                />
                <div className="experience-card">
                  <span className="radio-circle" />
                  <span className="experience-label">Experienced trader</span>
                </div>
              </label>
            </div>
          </div>
        </section>

        {/* ═══ PILLARS ═══ */}
        <section className="pillars">
          <div className="section-width">
            <div className="dark-eyebrow">The Framework</div>

            <h2 className="pillars-title">
              Three pillars.<br />
              One unstoppable future.
            </h2>

            <div className="pillar-grid">
              <article className="pillar">
                <div className="pillar-heading">
                  <div className="pillar-dot" />
                  <h2>Build Wealth</h2>
                </div>
                <p>
                  Deploy capital with precision. Learn how to identify high-conviction 
                  opportunities, manage downside risk, and construct a portfolio that 
                  compounds reliably over decades—not days.
                </p>
              </article>

              <article className="pillar">
                <div className="pillar-heading">
                  <div className="pillar-dot" />
                  <h2>Retire Strong</h2>
                </div>
                <p>
                  Design a retirement that is funded, flexible, and fearless. We help 
                  you map out income streams, tax-efficient drawdowns, and a plan that 
                  outlasts market cycles.
                </p>
              </article>

              <article className="pillar">
                <div className="pillar-heading">
                  <div className="pillar-dot" />
                  <h2>Gain Freedom</h2>
                </div>
                <p>
                  True wealth is autonomy. Build the financial foundation that lets you 
                  choose how you spend your time, where you live, and what legacy you 
                  leave—on your own terms.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ═══ PHILOSOPHY / MANIFESTO ═══ */}
        <section className="philosophy">
          <div className="philosophy-grid">
            <div className="philosophy-left">
              <div className="dark-eyebrow">Our Philosophy</div>
              <h2>
                Your Future Is Built By What You Do Today.
              </h2>
              <p className="philosophy-sub">
                Every decision you make right now compounds into the life you will live 
                tomorrow. We help you stack those decisions in your favor.
              </p>
            </div>

            <div className="philosophy-right">
              <div className="manifesto-item">
                <h3>Build Real Wealth Over Time.</h3>
                <p>
                  Wealth is not a lottery ticket. It is the result of disciplined 
                  capital deployment, consistent contributions, and the patience to 
                  let compounding do the heavy lifting.
                </p>
              </div>

              <div className="manifesto-item">
                <h3>Make Smarter Decisions.</h3>
                <p>
                  Cut through the noise of market hype and short-term volatility. 
                  We equip you with frameworks, data, and a community that keeps 
                  you focused on what actually matters.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ FINAL CTA ═══ */}
        <section className="final-cta">
          <div className="final-cta-content fade-up">
            <h2>Let&apos;s discuss what&apos;s next.</h2>
            <div className="final-cta-divider" />
            <p>
              Whether you are just starting out or refining a seven-figure strategy, 
              our team is ready to meet you where you are. Reach out and let&apos;s 
              build your roadmap together.
            </p>

            <div className="contact-pills">
              <Link
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-pill whatsapp"
              >
                <span className="pill-icon">
                  <WhatsAppIcon size={18} />
                </span>
                <span className="pill-label">Contact on WhatsApp</span>
              </Link>

              <Link
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-pill telegram"
              >
                <span className="pill-icon">
                  <TelegramIcon size={18} />
                </span>
                <span className="pill-label">Contact on Telegram</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer>
          <div className="footer-logo">
            <LogoMark size={28} />
            <div className="footer-name">The Compounding Hub</div>
          </div>
          <div className="footer-tagline">Retirement Mastermind</div>
          <p className="footer-copy">
            © ${new Date().getFullYear()} The Compounding Hub. All rights reserved.
            <br />
            Financial decisions should be evaluated against your individual risk profile and objectives.
          </p>
        </footer>
      </div>
    </main>
  );
}
