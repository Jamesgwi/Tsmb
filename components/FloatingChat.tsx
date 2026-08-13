"use client";

import { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";

const theme = {
  gold: "#2dd4bf",
  textMuted: "#A2C2BF",
  whatsapp: "#25D366",
  telegram: "#229ED9",
};

function ChatBubbleIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function CloseIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.5 3.5A11.9 11.9 0 0 0 12.04 0C5.47 0 .13 5.34.13 11.91c0 2.1.55 4.15 1.6 5.96L.04 24l6.28-1.65a11.88 11.88 0 0 0 5.71 1.46h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.18-3.44-8.41ZM12.04 21.8h-.01a9.88 9.88 0 0 1-5.04-1.38l-.36-.21-3.73.98 1-3.64-.24-.37a9.88 9.88 0 0 1-1.52-5.28C2.14 6.43 6.57 2 12.04 2c2.65 0 5.14 1.03 7.01 2.9a9.86 9.86 0 0 1 2.9 7c0 5.47-4.44 9.9-9.91 9.9Z" />
      <path d="M17.55 14.52c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.74-1.64-2.04-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}

function TelegramIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.9 3.2 18.5 20c-.26 1.19-.97 1.48-1.97.92l-5.43-4-2.62 2.52c-.29.29-.53.53-1.09.53l.39-5.52 10.05-9.08c.44-.39-.1-.61-.68-.22L4.73 12.2l-5.38-1.68c-1.17-.37-1.19-1.17.24-1.73L20.62.81c.98-.36 1.84.24 1.28 2.39Z" />
    </svg>
  );
}

export default function FloatingChat({
  whatsappUrl,
  telegramUrl,
}: {
  whatsappUrl: string;
  telegramUrl: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Mount guard to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll-based trigger: show bubble when user scrolls past 65% of page
  useEffect(() => {
    let ticking = false;

    const checkScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const viewportHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      
      // Calculate how much of the page has been scrolled through
      // 0 = top, 1 = bottom
      const scrollProgress = (scrollTop + viewportHeight) / docHeight;
      
      // Show bubble when user has scrolled past 65% of the page
      // This means it appears when they're in the bottom 35% of content
      setIsVisible(scrollProgress > 0.65);
      
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(checkScroll);
        ticking = true;
      }
    };

    // Check immediately on mount (in case page loads already scrolled)
    checkScroll();
    
    window.addEventListener("scroll", onScroll, { passive: true });
    // Also check on resize since viewport/doc heights change
    window.addEventListener("resize", checkScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const openSheet = useCallback(() => setIsSheetOpen(true), []);
  const closeSheet = useCallback(() => setIsSheetOpen(false), []);

  // Escape key to close
  useEffect(() => {
    if (!isSheetOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSheet();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isSheetOpen, closeSheet]);

  // Lock body scroll when sheet is open
  useEffect(() => {
    if (isSheetOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSheetOpen]);

  if (!mounted) return null;

  const overlay = (
    <>
      {/* Floating Chat Button */}
      <button
        type="button"
        onClick={openSheet}
        className={`floating-chat-btn ${isVisible ? "floating-chat-visible" : ""}`}
        aria-label="Open chat options"
        aria-haspopup="dialog"
        aria-expanded={isSheetOpen}
      >
        <ChatBubbleIcon size={22} />
      </button>

      {/* Sheet Backdrop */}
      <div
        className={`sheet-backdrop ${isSheetOpen ? "sheet-backdrop-open" : ""}`}
        onClick={closeSheet}
        aria-hidden="true"
      />

      {/* Bottom Sheet */}
      <div
        className={`chat-sheet ${isSheetOpen ? "chat-sheet-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Chat options"
      >
        <div className="sheet-handle-bar" />
        <div className="sheet-header">
          <span className="sheet-title">Connect With Us</span>
          <button
            type="button"
            onClick={closeSheet}
            className="sheet-close-btn"
            aria-label="Close chat options"
          >
            <CloseIcon size={18} />
          </button>
        </div>
        <div className="sheet-content">
          <p className="sheet-description">
            Reach out to the TMB Team for guidance and trade support.
          </p>
          <div className="sheet-actions">
            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sheet-action-btn sheet-action-whatsapp"
              onClick={closeSheet}
            >
              <span className="sheet-action-icon">
                <WhatsAppIcon size={22} />
              </span>
              <span className="sheet-action-text">
                <span className="sheet-action-label">WhatsApp</span>
                <span className="sheet-action-sublabel">Chat on WhatsApp</span>
              </span>
            </Link>

            <Link
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sheet-action-btn sheet-action-telegram"
              onClick={closeSheet}
            >
              <span className="sheet-action-icon">
                <TelegramIcon size={22} />
              </span>
              <span className="sheet-action-text">
                <span className="sheet-action-label">Telegram</span>
                <span className="sheet-action-sublabel">Message on Telegram</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(overlay, document.body);
}
