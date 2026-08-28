// components/Logo.tsx
//
// The HERO logo — two flowing curved bands inside a clean circle
//
// The mark consists of two separate filled shapes:
//   1. Upper band — curves upward from left to right
//   2. Lower band — curves downward from left to right
//
// Usage examples:
//   <Logo />                          — default white on dark
//   <Logo theme="light" />            — dark icon on light background
//   <Logo iconOnly size={48} />       — icon alone
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
  const textMain  = theme === "light" ? "#0f172a" : "#ffffff";
  const textSub   = theme === "light" ? "#475569" : "#94a3b8";
  const iconColor = theme === "light" ? "#0f172a" : "#ffffff";

  const icon = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={!iconOnly}
      focusable="false"
    >
      {/* Outer circle — clean white outline */}
      <circle
        cx="60"
        cy="60"
        r="54"
        stroke={iconColor}
        strokeWidth="3.5"
        fill="none"
      />

      {/*
        ╔══════════════════════════════════════════════════════╗
        ║  UPPER BAND — filled shape curving upward           ║
        ║                                                     ║
        ║  Top edge:    rises from left to peak, then down    ║
        ║  Bottom edge: stays lower, creating band thickness  ║
        ╚══════════════════════════════════════════════════════╝
      */}
      <path
        d="M 28 50
           C 28 50, 32 32, 50 26
           C 64 22, 76 30, 82 36
           C 82 36, 70 32, 56 36
           C 44 39, 34 48, 34 48
           L 28 50 Z"
        fill={iconColor}
      />

      {/*
        ╔══════════════════════════════════════════════════════╗
        ║  LOWER BAND — filled shape curving downward         ║
        ║                                                     ║
        ║  Top edge:    stays higher, creating band thickness ║
        ║  Bottom edge: dips from left to valley, then up     ║
        ╚══════════════════════════════════════════════════════╝
      */}
      <path
        d="M 32 60
           C 32 60, 38 48, 54 42
           C 68 38, 80 44, 84 48
           C 84 48, 72 48, 58 50
           C 44 52, 32 60, 32 60
           Z"
        fill={iconColor}
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
