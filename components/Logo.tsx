// components/Logo.tsx
//
// Usage examples:
//   <Logo />                          — icon + wordmark, dark theme
//   <Logo theme="light" />            — light background variant
//   <Logo iconOnly size={32} />       — just the swoosh icon
//   <Logo size={52} className="..." />

interface LogoProps {
  size?: number;          // icon size in px (default 44)
  theme?: "dark" | "light";
  iconOnly?: boolean;     // render icon alone, no text
  className?: string;
}

export default function Logo({
  size = 44,
  theme = "dark",
  iconOnly = false,
  className,
}: LogoProps) {
  const accent    = theme === "light" ? "#14b8a6" : "#2dd4bf";
  const textMain  = theme === "light" ? "#0f172a" : "#ffffff";
  const textSub   = theme === "light" ? "#475569" : "#94a3b8";
  const bg1       = theme === "light" ? "#f0f9ff" : "#080c14";
  const bg2       = theme === "light" ? "#e0f2fe" : "#050810";
  const id        = `tch-${theme}`;   // SSR-safe, stable

  const icon = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={!iconOnly}
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={bg1} />
          <stop offset="100%" stopColor={bg2} />
        </linearGradient>
      </defs>

      {/* Background circle */}
      <circle cx="50" cy="50" r="48" fill={`url(#${id}-bg)`} stroke={theme === "dark" ? "rgba(45,212,191,0.15)" : "rgba(20,184,166,0.2)"} strokeWidth="1" />

      {/* Outer ring */}
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke={theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.15)"}
        strokeWidth="1"
        strokeDasharray="3 4"
        opacity="0.6"
      />

      {/* Swoosh / wave shape — the Compounding Hub mark */}
      <path
        d="M28 52 C28 36, 40 24, 56 24 C68 24, 78 32, 82 44"
        stroke={theme === "dark" ? "#ffffff" : "#0f172a"}
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
        opacity="0.95"
      />
      <path
        d="M82 44 C82 60, 70 72, 54 72 C42 72, 32 64, 28 52"
        stroke={theme === "dark" ? "#ffffff" : "#0f172a"}
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      />

      {/* Center accent dot */}
      <circle
        cx="54"
        cy="50"
        r="7"
        fill={accent}
        opacity="0.9"
      />
      <circle
        cx="54"
        cy="50"
        r="7"
        fill={accent}
        opacity="0.3"
        style={{ filter: "blur(6px)" }}
      />
    </svg>
  );

  if (iconOnly) return icon;

  return (
    <div
      className={className}
      style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}
      aria-label="The Compounding Hub — Retirement Mastermind"
    >
      {icon}

      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Primary wordmark */}
        <span
          style={{
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: textMain,
            lineHeight: 1,
            textShadow: theme === "dark" ? "0 0 16px rgba(255,255,255,0.1)" : "none",
          }}
        >
          TCH
        </span>

        {/* Tagline */}
        <span
          style={{
            fontSize: 8,
            fontWeight: 600,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: textSub,
            lineHeight: 1,
            opacity: 0.85,
          }}
        >
          The Compounding Hub
        </span>
      </div>
    </div>
  );
}
