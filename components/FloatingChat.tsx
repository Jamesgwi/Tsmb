"use client";

import { useEffect, useState } from "react";

const theme = {
  bg: "#000000",
  bgDark: "#050505",
  bgLight: "#0f0f0f",
  bgLighter: "#141414",
  bgCard: "#0a0a0a",
  accent: "#2dd4bf",
  accentLight: "#5eead4",
  accentDark: "#14b8a6",
  accentGlow: "rgba(45, 212, 191, 0.12)",
  text: "#f0f0f0",
  textMuted: "#8a8a8a",
  line: "#1a1a1a",
  white: "#FFFFFF",
  error: "#EF4444",
  success: "#25D366",
  whatsapp: "#25D366",
  telegram: "#229ED9",
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [whatsapp, setWhatsapp] = useState("");
  const [telegram, setTelegram] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [telegramUsername, setTelegramUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    if (!authed) return;
    fetch("/api/admin")
      .then((res) => res.json())
      .then((data) => {
        setWhatsapp(data.whatsapp || "");
        setTelegram(data.telegram || "");
        setWhatsappNumber(data.whatsappNumber || "");
        setTelegramUsername(data.telegramUsername || "");
        setLoading(false);
      });
  }, [authed]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "login", password }),
    });
    const data = await res.json();
    if (data.success) {
      setAuthed(true);
    } else {
      setLoginError(data.error || "Login failed");
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaveMessage("");
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "update",
        whatsapp,
        telegram,
        whatsappNumber,
        telegramUsername,
      }),
    });
    const data = await res.json();
    setSaving(false);
    setSaveMessage(data.success ? "Saved!" : data.error || "Failed to save");
  }

  // --- Login Screen ---
  if (!authed) {
    return (
      <div
        style={{
          minHeight: "100dvh",
          background: theme.bg,
          padding: "32px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: 400,
            width: "100%",
            margin: "0 auto",
            background: theme.bgCard,
            padding: "40px 32px",
            borderRadius: 16,
            border: `1.5px solid ${theme.line}`,
          }}
        >
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <svg width="56" height="56" viewBox="0 0 100 100" fill="none" style={{ marginBottom: 16 }}>
              <circle cx="50" cy="50" r="44" stroke="white" strokeWidth="3" opacity="0.9" />
              <path d="M30 52 C30 38, 40 28, 52 28 C64 28, 74 38, 74 52" stroke="white" strokeWidth="7" strokeLinecap="round" fill="none" />
              <path d="M74 52 C74 66, 64 76, 52 76" stroke="white" strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.5" />
              <circle cx="52" cy="52" r="6" fill="white" opacity="0.9" />
            </svg>
            <h1
              style={{
                fontFamily: "var(--font-display), sans-serif",
                color: theme.accent,
                fontSize: 20,
                margin: "0 0 6px",
                fontWeight: 800,
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Admin Portal
            </h1>
            <p style={{ color: theme.textMuted, fontSize: 11, margin: 0, fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", opacity: 0.7 }}>
              The Compounding Hub
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <label
              style={{
                display: "block",
                color: theme.accent,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: 12,
                border: `1.5px solid ${theme.line}`,
                background: theme.bgDark,
                color: theme.text,
                fontSize: 15,
                outline: "none",
                boxSizing: "border-box",
                marginBottom: 16,
                transition: "border-color 0.25s ease",
                fontFamily: "var(--font-body), system-ui, sans-serif",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = theme.accent;
                e.currentTarget.style.boxShadow = `0 0 0 3px ${theme.accentGlow}`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = theme.line;
                e.currentTarget.style.boxShadow = "none";
              }}
            />

            {loginError && (
              <div
                style={{
                  padding: "12px 14px",
                  borderRadius: 12,
                  background: "rgba(239, 68, 68, 0.08)",
                  border: `1px solid rgba(239, 68, 68, 0.15)`,
                  color: theme.error,
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 16,
                }}
              >
                {loginError}
              </div>
            )}

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: 100,
                border: `1.5px solid ${theme.line}`,
                background: "transparent",
                color: theme.accent,
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.25s ease",
                fontFamily: "var(--font-display), sans-serif",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = theme.accent;
                e.currentTarget.style.background = "rgba(45, 212, 191, 0.08)";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(45, 212, 191, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme.line;
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Authenticate
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- Dashboard ---
  return (
    <div
      style={{
        minHeight: "100dvh",
        background: theme.bg,
        padding: "32px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: 520,
          width: "100%",
          margin: "0 auto",
          background: theme.bgCard,
          padding: "32px 28px",
          borderRadius: 16,
          border: `1.5px solid ${theme.line}`,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `1px solid ${theme.line}`,
            paddingBottom: 20,
            marginBottom: 28,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: theme.accent,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: theme.accent,
                  boxShadow: "0 0 8px rgba(45, 212, 191, 0.5)",
                }}
              />
              Authenticated
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display), sans-serif",
                color: theme.white,
                fontSize: 24,
                margin: 0,
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Edit Community Links
            </h1>
          </div>

          <button
            onClick={() => setAuthed(false)}
            style={{
              background: "transparent",
              border: `1px solid ${theme.line}`,
              color: theme.textMuted,
              padding: "8px 16px",
              borderRadius: 100,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = theme.accent;
              e.currentTarget.style.color = theme.accent;
              e.currentTarget.style.background = "rgba(45, 212, 191, 0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = theme.line;
              e.currentTarget.style.color = theme.textMuted;
              e.currentTarget.style.background = "transparent";
            }}
          >
            Lock
          </button>
        </div>

        {loading ? (
          <div
            style={{
              padding: "40px 0",
              textAlign: "center",
              color: theme.textMuted,
              fontSize: 14,
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                border: `2px solid ${theme.line}`,
                borderTopColor: theme.accent,
                borderRadius: "50%",
                margin: "0 auto 12px",
                animation: "spin 0.8s linear infinite",
              }}
            />
            <style
              dangerouslySetInnerHTML={{
                __html: `@keyframes spin { to { transform: rotate(360deg); } }`,
              }}
            />
            Retrieving database values...
          </div>
        ) : (
          <form onSubmit={handleSave}>
            {/* WhatsApp URL */}
            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: theme.accent,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: theme.whatsapp,
                    boxShadow: "0 0 8px rgba(37, 211, 102, 0.4)",
                  }}
                />
                WhatsApp Group URL
              </label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="https://wa.link/..."
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: `1.5px solid ${theme.line}`,
                  background: theme.bgDark,
                  color: theme.text,
                  fontSize: 14,
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.25s ease",
                  fontFamily: "var(--font-body), system-ui, sans-serif",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = theme.accent;
                  e.currentTarget.style.boxShadow = `0 0 0 3px ${theme.accentGlow}`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = theme.line;
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            {/* WhatsApp Number */}
            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: theme.accent,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: theme.whatsapp,
                    boxShadow: "0 0 8px rgba(37, 211, 102, 0.4)",
                  }}
                />
                WhatsApp Number
              </label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="+123456789"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: `1.5px solid ${theme.line}`,
                  background: theme.bgDark,
                  color: theme.text,
                  fontSize: 14,
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.25s ease",
                  fontFamily: "var(--font-body), system-ui, sans-serif",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = theme.accent;
                  e.currentTarget.style.boxShadow = `0 0 0 3px ${theme.accentGlow}`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = theme.line;
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Telegram URL */}
            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: theme.accent,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: theme.telegram,
                    boxShadow: "0 0 8px rgba(34, 158, 217, 0.4)",
                  }}
                />
                Telegram Channel URL
              </label>
              <input
                type="text"
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
                placeholder="https://t.me/..."
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: `1.5px solid ${theme.line}`,
                  background: theme.bgDark,
                  color: theme.text,
                  fontSize: 14,
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.25s ease",
                  fontFamily: "var(--font-body), system-ui, sans-serif",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = theme.accent;
                  e.currentTarget.style.boxShadow = `0 0 0 3px ${theme.accentGlow}`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = theme.line;
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Telegram Username */}
            <div style={{ marginBottom: 28 }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: theme.accent,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: theme.telegram,
                    boxShadow: "0 0 8px rgba(34, 158, 217, 0.4)",
                  }}
                />
                Telegram Username
              </label>
              <input
                type="text"
                value={telegramUsername}
                onChange={(e) => setTelegramUsername(e.target.value)}
                placeholder="@username"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  borderRadius: 12,
                  border: `1.5px solid ${theme.line}`,
                  background: theme.bgDark,
                  color: theme.text,
                  fontSize: 14,
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.25s ease",
                  fontFamily: "var(--font-body), system-ui, sans-serif",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = theme.accent;
                  e.currentTarget.style.boxShadow = `0 0 0 3px ${theme.accentGlow}`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = theme.line;
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            {/* Save Button */}
            <button
              type="submit"
              disabled={saving}
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: 100,
                border: "none",
                background: theme.accent,
                color: theme.bgDark,
                fontWeight: 700,
                fontSize: 12,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                cursor: saving ? "default" : "pointer",
                opacity: saving ? 0.6 : 1,
                transition: "all 0.25s ease",
                fontFamily: "var(--font-display), sans-serif",
                boxShadow: "0 4px 20px rgba(45, 212, 191, 0.2)",
              }}
              onMouseEnter={(e) => {
                if (!saving) {
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(45, 212, 191, 0.35)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(45, 212, 191, 0.2)";
                e.currentTarget.style.transform = "none";
              }}
            >
              {saving ? "Updating..." : "Save Changes"}
            </button>

            {/* Status */}
            {saveMessage && (
              <div
                style={{
                  marginTop: 16,
                  padding: "14px",
                  borderRadius: 12,
                  background:
                    saveMessage === "Saved!"
                      ? "rgba(45, 212, 191, 0.08)"
                      : "rgba(239, 68, 68, 0.08)",
                  border: `1.5px solid ${
                    saveMessage === "Saved!"
                      ? "rgba(45, 212, 191, 0.15)"
                      : "rgba(239, 68, 68, 0.15)"
                  }`,
                  color: saveMessage === "Saved!" ? theme.accent : theme.error,
                  fontSize: 13,
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                {saveMessage === "Saved!"
                  ? "✓ Changes saved successfully"
                  : saveMessage}
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
