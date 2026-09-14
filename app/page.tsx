import Image from "next/image";
import Link from "next/link";
import { neon } from "@neondatabase/serverless";
import { Montserrat, Quicksand } from "next/font/google";
import Logo from "../components/Logo";
import FloatingChat from "../components/FloatingChat";

const display = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
});

const body = Quicksand({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
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
export const runtime = "edge";

export const metadata = {
  title: "WRFN — Wealth Rise & Freedom Network",
  description:
    "Strategies, ideas, and tips for your financial journey. Grow with intention, retire wisely, build a prosperous future, and achieve early retirement.",
};

const theme = {
  bg: "#FFFFFF",
  bgSoft: "#FFF7F1",
  ink: "#101426",
  inkSoft: "#5A6472",
  line: "rgba(16,20,38,0.08)",
  orange: "#FF7A00",
  pink: "#FF1F6B",
  magenta: "#C81EE0",
  white: "#FFFFFF",
  whatsapp: "#25D366",
  telegram: "#229ED9",
};

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
            :root {
              --grad: linear-gradient(95deg, ${theme.orange} 0%, ${theme.pink} 48%, ${theme.magenta} 100%);
            }

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
              font-family: var(--font-body), sans-serif;
              color: ${theme.ink};
            }

            ::selection {
              background: ${theme.pink};
              color: #fff;
            }

            a {
              color: inherit;
            }

            a:focus-visible {
              outline: 3px solid ${theme.pink};
              outline-offset: 3px;
            }

            .grad-text {
              background: var(--grad);
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent;
              color: transparent;
            }

            .page {
              width: 100%;
              min-height: 100vh;
              overflow-x: hidden;
              background: ${theme.bg};
            }

            .brand-bar {
              position: sticky;
              top: 0;
              z-index: 20;
              background: rgba(255,255,255,.88);
              backdrop-filter: blur(10px);
              border-bottom: 1px solid ${theme.line};
              padding: 14px 20px;
            }

            .brand-bar-inner {
              width: min(100%, 760px);
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

            .brand-name-sub {
              font-size: 10px;
              font-weight: 700;
              letter-spacing: 2.4px;
              text-transform: uppercase;
              color: ${theme.inkSoft};
              line-height: 1.2;
            }

            .brand-link {
              text-decoration: none;
              font-size: 10px;
              font-weight: 800;
              letter-spacing: 1.5px;
              text-transform: uppercase;
            }

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
              height: 70px;
              background: linear-gradient(to bottom, ${theme.bg} 0%, transparent 100%);
              pointer-events: none;
            }

            .hero-fade-bottom {
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              height: 80px;
              background: linear-gradient(to bottom, transparent 0%, ${theme.bg} 100%);
              pointer-events: none;
            }

            .blob {
              position: absolute;
              pointer-events: none;
              background: var(--grad);
              border-radius: 54% 46% 62% 38% / 46% 56% 44% 54%;
            }

            .blob-a {
              width: 420px;
              height: 420px;
              top: -160px;
              right: -140px;
            }

            .blob-b {
              width: 460px;
              height: 460px;
              bottom: -200px;
              left: -160px;
            }

            .intro {
              position: relative;
              overflow: hidden;
              padding: 64px 22px 76px;
              background: ${theme.bg};
              text-align: center;
            }

            .intro .blob {
              opacity: .09;
            }

            .content-width {
              position: relative;
              z-index: 1;
              width: min(760px, 100%);
              margin: 0 auto;
            }

            .eyebrow {
              margin-bottom: 16px;
              font-size: 10px;
              font-weight: 800;
              letter-spacing: 3px;
              text-transform: uppercase;
            }

            .intro h1 {
              margin: 0 auto;
              max-width: 720px;
              color: ${theme.ink};
              font-family: var(--font-display), sans-serif;
              font-size: clamp(28px, 5.5vw, 52px);
              line-height: 1.02;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: -0.5px;
            }

            .intro h1 em {
              font-style: normal;
            }

            .intro p {
              max-width: 640px;
              margin: 24px auto 0;
              color: ${theme.inkSoft};
              font-size: 15px;
              line-height: 1.9;
              font-weight: 500;
            }
           
            .contact-pills {
              display: flex;
              justify-content: center;
              gap: 12px;
              margin-top: 34px;
            }

            .contact-pill {
              display: inline-flex;
              align-items: center;
              gap: 10px;
              padding: 16px 32px;
              border-radius: 100px;
              text-decoration: none;
              font-size: 15px;
              font-weight: 700;
              letter-spacing: 0.2px;
              transition:
                transform .2s ease,
                box-shadow .2s ease;
            }

            .contact-pill:hover {
              transform: translateY(-2px);
            }

            .contact-pill.whatsapp {
              background: ${theme.whatsapp};
              color: white;
              box-shadow: 0 8px 22px rgba(37,211,102,.30);
            }

            .contact-pill.telegram {
              background: ${theme.telegram};
              color: white;
              box-shadow: 0 8px 22px rgba(34,158,217,.30);
            }

            .contact-pill .pill-icon {
              flex-shrink: 0;
            }

            .contact-pill .pill-label {
              white-space: nowrap;
            }

            .pillars {
              background: ${theme.bgSoft};
              padding: 80px 22px;
            }

            .section-width {
              position: relative;
              z-index: 1;
              width: min(900px, 100%);
              margin: 0 auto;
            }

            .pillars-title {
              margin: 14px 0 42px;
              max-width: 660px;
              color: ${theme.ink};
              font-family: var(--font-display), sans-serif;
              font-size: clamp(25px, 4vw, 30px);
              line-height: 1.05;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: -0.5px;
            }

            .pillar-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 18px;
            }

            .pillar {
              position: relative;
              overflow: hidden;
              background: #fff;
              border: 1px solid ${theme.line};
              border-radius: 22px;
              padding: 30px 26px;
              box-shadow: 0 14px 34px rgba(16,20,38,.06);
            }

            .pillar::before {
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 4px;
              background: var(--grad);
            }

            .pillar-heading {
              display: flex;
              align-items: center;
              gap: 10px;
              margin: 0 0 12px;
            }

            .pillar-dot {
              width: 10px;
              height: 10px;
              flex-shrink: 0;
              border-radius: 50%;
              background: var(--grad);
            }

            .pillar h2 {
              margin: 0;
              color: ${theme.ink};
              font-family: var(--font-display), sans-serif;
              font-size: 23px;
              line-height: 1;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: .5px;
            }

            .pillar p {
              margin: 0;
              color: ${theme.inkSoft};
              font-size: 13.5px;
              line-height: 1.8;
              font-weight: 500;
            }

            .philosophy {
              position: relative;
              overflow: hidden;
              background: ${theme.bg};
              padding: 84px 22px;
            }

            .philosophy .blob {
              opacity: .07;
            }

            .philosophy-art {
              position: absolute;
              right: -30px;
              bottom: -20px;
              width: min(520px, 58%);
              pointer-events: none;
              mix-blend-mode: multiply;
              opacity: .10;
              z-index: 0;
            }

            .philosophy-art img {
              display: block;
              width: 100%;
              height: auto;
            }

            .philosophy-grid {
              position: relative;
              z-index: 1;
              width: min(900px, 100%);
              margin: 0 auto;
              display: grid;
              grid-template-columns: .9fr 1.1fr;
              gap: 60px;
              align-items: start;
            }

            .philosophy h2 {
              margin: 14px 0 0;
              color: ${theme.ink};
              font-family: var(--font-display), sans-serif;
              font-size: clamp(23px, 4.5vw, 36px);
              line-height: 1.02;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: -0.5px;
            }

            .philosophy h2 em {
              font-style: normal;
            }

            .philosophy-copy {
              margin: 0 0 27px;
              color: ${theme.inkSoft};
              font-size: 14.5px;
              line-height: 1.9;
              font-weight: 500;
            }

            .principle {
              display: flex;
              gap: 14px;
              align-items: flex-start;
              padding: 14px 0;
            }

            .check {
              width: 20px;
              height: 20px;
              flex: 0 0 20px;
              border: 0;
              border-radius: 50%;
              background: var(--grad);
              display: grid;
              place-items: center;
              color: #fff;
              font-size: 10px;
              margin-top: 1px;
              box-shadow: 0 6px 14px rgba(255,31,107,.25);
            }

            .principle span {
              color: ${theme.ink};
              font-size: 13px;
              line-height: 1.6;
              font-weight: 700;
            }

            .cta {
              position: relative;
              overflow: hidden;
              padding: 96px 22px;
              text-align: center;
              color: #fff;
            }

            .cta-bg {
              position: absolute;
              inset: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
              object-position: center;
            }

            .cta-overlay {
              position: absolute;
              inset: 0;
              background: linear-gradient(
                120deg,
                rgba(255,122,0,.93) 0%,
                rgba(255,31,107,.91) 48%,
                rgba(200,30,224,.93) 80%
              );
            }

            .cta-inner {
              position: relative;
              z-index: 1;
              width: min(720px, 100%);
              margin: 0 auto;
            }

            .cta-eyebrow {
              margin-bottom: 14px;
              color: #fff;
              font-size: 10px;
              font-weight: 800;
              letter-spacing: 3px;
              text-transform: uppercase;
            }

            .cta-title {
              margin: 0 auto;
              max-width: 640px;
              color: #fff;
              font-family: var(--font-display), sans-serif;
              font-size: clamp(20px, 4.5vw, 36px);
              line-height: 1.05;
              font-weight: 900;
              text-transform: uppercase;
              letter-spacing: -0.5px;
            }

            .cta-copy {
              max-width: 560px;
              margin: 18px auto 0;
              color: rgba(255,255,255,.92);
              font-size: 15px;
              line-height: 1.85;
              font-weight: 600;
            }

            .cta .contact-pills {
              margin-top: 30px;
            }

            .cta .contact-pill.whatsapp {
              background: #fff;
              color: ${theme.whatsapp};
              box-shadow: 0 12px 30px rgba(0,0,0,.20);
            }

            .cta .contact-pill.telegram {
              background: #fff;
              color: ${theme.telegram};
              box-shadow: 0 12px 30px rgba(0,0,0,.20);
            }

            footer {
              padding: 42px 22px;
              background: var(--grad);
              text-align: center;
              color: #fff;
            }

            .footer-name {
              margin-bottom: 10px;
              color: #fff;
              font-family: var(--font-display), sans-serif;
              font-size: 20px;
              font-weight: 900;
              text-transform: uppercase;
              letter-spacing: 2px;
            }

            .footer-copy {
              max-width: 620px;
              margin: 0 auto;
              color: rgba(255,255,255,.88);
              font-size: 10px;
              line-height: 1.7;
              font-weight: 600;
            }

            @media (max-width: 650px) {
              .brand-bar {
                padding: 12px 15px;
              }

              .brand-link {
                display: none;
              }

              .hero-fade-top,
              .hero-fade-bottom {
                height: 50px;
              }

              .intro {
                padding: 48px 20px 56px;
              }

              .contact-pills {
                flex-direction: row;
                justify-content: center;
                gap: 10px;
              }

              .contact-pill {
                padding: 14px 24px;
                font-size: 14px;
              }

              .pillars {
                padding: 64px 20px;
              }

              .pillar-grid {
                grid-template-columns: 1fr;
                gap: 16px;
              }

              .philosophy {
                padding: 64px 20px;
              }

              .philosophy-art {
                display: none;
              }

              .philosophy-grid {
                display: block;
              }

              .philosophy-copy-wrap {
                margin-top: 42px;
              }

              .cta {
                padding: 72px 20px;
              }
            }

            @media (prefers-reduced-motion: no-preference) {
              .fade-up {
                animation: fadeUp .7s cubic-bezier(.22,1,.36,1) both;
              }

              @keyframes fadeUp {
                from {
                  opacity: 0;
                  transform: translateY(14px);
                }

                to {
                  opacity: 1;
                  transform: none;
                }
              }
            }
          `,
        }}
      />

      <div className="page">
        <header className="brand-bar">
          <div className="brand-bar-inner">
            <Link href="/" className="brand">
              <Logo size={40} />
              <span className="brand-name-sub">
                Wealth Rise &amp; Freedom Network
              </span>
            </Link>

            <a href="#contact" className="brand-link grad-text">
              Connect With Us
            </a>
          </div>
        </header>

        <section className="hero">
          <div className="hero-fade-top" aria-hidden="true" />
          <Image
            src="/banner.jpg"
            alt="Growth investing in motion — Wealth Rise & Freedom Network"
            width={1536}
            height={802}
            priority
            sizes="100vw"
            className="hero-image"
          />
          <div className="hero-fade-bottom" aria-hidden="true" />
        </section>

        <section className="intro" id="contact">
          <div className="blob blob-a" aria-hidden="true" />
          <div className="blob blob-b" aria-hidden="true" />

          <div className="content-width fade-up">
            <div className="eyebrow grad-text">
              Strategies · Ideas · Tips
            </div>

            <h1>
              Grow in wealth.
              <br />
              <em className="grad-text">Retire in freedom.</em>
            </h1>

            <p>Explore strategies for wealth accumulation, retirement planning, and financial independence.</p>

<p className="divider" style={{ margin: '5px 0', fontSize: '0.85rem', color: '#888' }}>
  ──── Connect With Us ────
</p>

<p>Reach the WRFN team on Telegram or WhatsApp for personalized guidance and trade support.</p>

            <div className="contact-pills">
              <Link
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-pill whatsapp"
              >
                <span className="pill-icon">
                  <WhatsAppIcon size={20} />
                </span>
                <span className="pill-label">WhatsApp</span>
              </Link>

              <Link
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-pill telegram"
              >
                <span className="pill-icon">
                  <TelegramIcon size={20} />
                </span>
                <span className="pill-label">Telegram</span>
              </Link>
            </div>
          </div>
        </section>

        <FloatingChat whatsappUrl={WHATSAPP_URL} telegramUrl={TELEGRAM_URL} />

        <section className="pillars">
          <div className="section-width">
            <div className="eyebrow grad-text">The WRFN Goal</div>

            <h2 className="pillars-title">
               
              <br />
             Success Every step of the way
            </h2>

            <div className="pillar-grid">
              <article className="pillar">
                <div className="pillar-heading">
                  <div className="pillar-dot" />
                  <h2>Explore</h2>
                </div>
                <p>
                  Explore strategies, ideas, and tips that make money simple
                  and gain
                  the confidence in your financial journey.
                </p>
              </article>

              <article className="pillar">
                <div className="pillar-heading">
                  <div className="pillar-dot" />
                  <h2>Grow</h2>
                </div>
                <p>
                  Grow wealth 
                  step by step and explore opportunities.
                  
      
                </p>
              </article>

              <article className="pillar">
                <div className="pillar-heading">
                  <div className="pillar-dot" />
                  <h2>Retire</h2>
                </div>
                <p>
                  Today&apos;s discipline is tomorrow&apos;s freedom.
                  Retire wisely  and early with a plan that
                  compound wealth and gives you freedom.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="philosophy">
          <div className="blob blob-a" aria-hidden="true" />
          <div className="blob blob-b" aria-hidden="true" />

          <div className="philosophy-art" aria-hidden="true">
            <Image
              src="/growth.jpg"
              alt=""
              width={1152}
              height={672}
            />
          </div>

          <div className="philosophy-grid">
            <div>
              <div className="eyebrow grad-text"> The Goal</div>

              <h2>
                Explore
                <br />
                Build <em className="grad-text">Grow </em>
              </h2>
            </div>

            <div className="philosophy-copy-wrap">
              <p className="philosophy-copy">
                 WRFN brings the
                conversation to what matters, your goals,
                your habits, your time horizon and the community you rise
                with.
              </p>

              <div className="principle">
                <div className="check">✓</div>
                <span>
                  Start with a plan tailored to your goals 
                  
                </span>
              </div>

              <div className="principle">
                <div className="check">✓</div>
                <span>
                  Invest for growth with risks professionally mitigated.
                </span>
              </div>

              <div className="principle">
                <div className="check">✓</div>
                <span>
                  Build the prosperous future you actually
                  want.
                </span>
              </div>

              <div className="principle">
                <div className="check">✓</div>
                <span>
                  Attain freedom. Early retirement starts with a plan
                  
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="cta">
          <Image
            src="/signing.jpg"
            alt=""
            width={1200}
            height={1707}
            className="cta-bg"
            aria-hidden="true"
          />
          <div className="cta-overlay" aria-hidden="true" />

          <div className="cta-inner fade-up">
            <div className="cta-eyebrow">Take the first step</div>

            <h2 className="cta-title">
              Your freedom journey starts with one conversation.
            </h2>

            <p className="cta-copy">
              Connect with the WRFN team for step-by-step guidance and trade
              support. 
            </p>

            <div className="contact-pills">
              <Link
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-pill whatsapp"
              >
                <span className="pill-icon">
                  <WhatsAppIcon size={20} />
                </span>
                <span className="pill-label">WhatsApp</span>
              </Link>

              <Link
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-pill telegram"
              >
                <span className="pill-icon">
                  <TelegramIcon size={20} />
                </span>
                <span className="pill-label">Telegram</span>
              </Link>
            </div>
          </div>
        </section>

        <footer>
          <div className="footer-name">
            Wealth Rise &amp; Freedom Network
          </div>

          <p className="footer-copy">
            © {new Date().getFullYear()} WRFN — Wealth Rise &amp; Freedom
            Network. All rights reserved.
            <br />
            Financial decisions should be considered in light of your
            individual position.
          </p>
        </footer>
      </div>
    </main>
  );
}
