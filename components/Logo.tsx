const GRAD = "linear-gradient(95deg,#FF7A00 0%,#FF1F6B 48%,#C81EE0 100%)";

export default function Logo({ size = 44 }: { size?: number }) {
  return (
    <span
      style={{
        position: "relative",
        display: "inline-block",
        fontFamily: "var(--font-display), Montserrat, sans-serif",
        fontWeight: 900,
        fontStyle: "italic",
        fontSize: size * 0.62,
        lineHeight: 1,
        letterSpacing: "0.04em",
        background: GRAD,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      WRFN
      <svg
        width={size * 0.3}
        height={size * 0.3}
        viewBox="0 0 24 24"
        style={{ position: "absolute", top: -size * 0.24, right: -size * 0.32 }}
        aria-hidden="true"
      >
        <path d="M3 21 L21 3 L13 21 Z" fill="#FF1F6B" />
      </svg>
    </span>
  );
}
