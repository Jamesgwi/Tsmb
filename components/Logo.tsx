// components/Logo.tsx
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
      {/* Outer circle — clean outline, matching the original */}
      <circle
        cx="60"
        cy="60"
        r="54"
        stroke={iconColor}
        strokeWidth="3.5"
        fill="none"
      />

      {/*
        Upper swoosh band — curves upward from left to right.
        Starts thick on the left, tapers as it sweeps up and right.
        This is the top half of the stylized flowing mark.
      */}
      <path
        d="M 28 54
           C 28 54, 34 36, 54 33
           C 68 30, 80 36, 86 42
           C 86 42, 72 38, 56 42
           C 42 45, 36 54, 36 54
           L 28 54 Z"
        fill={iconColor}
      />

      {/*
        Lower swoosh band — curves downward from left to right.
        Starts thick on the left, sweeps down and right, then tapers back.
        This is the bottom half of the stylized flowing mark.
      */}
      <path
        d="M 36 60
           C 36 60, 42 50, 56 46
           C 72 42, 86 46, 86 46
           C 80 52, 68 58, 54 55
           C 34 52, 28 60, 28 60
           L 36 60 Z"
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
