import Image from "next/image";
import Link from "next/link";
import { neon } from "@neondatabase/serverless";
import { Montserrat, Quicksand } from "next/font/google";
import Logo from "../components/Logo";
import ContactUs from "../components/ContactUs";

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
  magenta: "#E0509E",
  white: "#FFFFFF",
  whatsapp: "#25D366",
  telegram: "#229ED9",
};

export default async function Home() {
  const { whatsapp: WHATSAPP_URL, telegram: TELEGRAM_URL } = await getLinks();

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

            a:focus-visible,
            button:focus-visible {
              outline: 3px solid ${theme.pink};
              outline-offset: 3px;
            }

            section[id] {
              scroll-margin-top: 76px;
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
              text-decoration: underline;
              text-decoration-color: transparent;
              text-underline-offset: 4px;
              transition: text-decoration-color .2s ease;
            }

            .brand-link:hover {
              text-decoration-color: ${theme.pink};
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
              opacity: .07;
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

            .contact-reveal {
              display: flex;
              justify-content: center;
              margin-top: 34px;
            }

            .contact-us-btn {
              display: inline-flex;
              align-items: center;
              gap: 10px;
              padding: 16px 40px;
              border: 0;
              border-radius: 100px;
              background: var(--grad);
              color: #fff;
              font-family: var(--font-body), sans-serif;
              font-size: 15px;
              font-weight: 700;
              letter-spacing: .3px;
              cursor: pointer;
              box-shadow: 0 10px 26px rgba(255,31,107,.26);
              transition:
                transform .2s ease,
                box-shadow .2s ease;
            }

            .contact-us-btn:hover {
              transform: translateY(-2px);
              box-shadow: 0 14px 32px rgba(255,31,107,.34);
            }

            .contact-pills {
              display: flex;
              justify-content: center;
              align-items: center;
              flex-wrap: wrap;
              gap: 12px;
              margin: 0;
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

            .contact-close {
              flex-shrink: 0;
              width: 42px;
              height: 42px;
              border-radius: 50%;
              border: 1px solid ${theme.line};
              background: #fff;
              color: ${theme.inkSoft};
              font-size: 20px;
              line-height: 1;
              cursor: pointer;
              transition:
                transform .25s ease,
                color .2s ease;
            }

            .contact-close:hover {
              transform: rotate(90deg);
              color: ${theme.ink};
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
              transition:
                transform .25s ease,
                box-shadow .25s ease;
            }

            .pillar:hover {
              transform: translateY(-4px);
              box-shadow: 0 20px 44px rgba(16,20,38,.10);
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
              opacity: .06;
            }

            .philosophy-art {
              position: absolute;
              right: -30px;
              bottom: -20px;
              width: min(520px, 58%);
              pointer-events: none;
              mix-blend-mode: multiply;
              opacity: .22;
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
                rgba(255,122,0,.86) 0%,
                rgba(255,31,107,.84) 48%,
                rgba(224,80,158,.87) 80%
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

            .cta .contact-reveal {
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

            .cta .contact-close {
              background: rgba(255,255,255,.14);
              border-color: rgba(255,255,255,.45);
              color: #fff;
            }

            .cta .contact-close:hover {
              color: #fff;
              background: rgba(255,255,255,.24);
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

              .contact-reveal {
                margin-top: 28px;
              }

              .contact-pills {
                gap: 10px;
              }

              .contact-pill {
                padding: 14px 24px;
                font-size: 14px;
              }

              .contact-close {
                width: 38px;
                height: 38px;
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

              .contact-pills.revealed {
                animation: pillIn .35s cubic-bezier(.22,1,.36,1) both;
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

              @keyframes pillIn {
                from {
                  opacity: 0;
                  transform: translateY(10px) scale(.96);
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

            <p>
              Practical strategies for wealth accumulation, retirement
              planning, and financial independence — without the jargon.
            </p>

            <p>
              Tap below to reach the WRFN team on Telegram or WhatsApp for
              personalized guidance and trade support.
            </p>

            <ContactUs whatsappUrl={WHATSAPP_URL} telegramUrl={TELEGRAM_URL} />
          </div>
        </section>

        <section className="pillars">
          <div className="section-width">
            <div className="eyebrow grad-text">The WRFN Goal</div>

            <h2 className="pillars-title">
              Success every step of the way
            </h2>

            <div className="pillar-grid">
              <article className="pillar">
                <div className="pillar-heading">
                  <div className="pillar-dot" />
                  <h2>Explore</h2>
                </div>
                <p>
                  Explore strategies, ideas, and tips that make money simple —
                  and gain real confidence in your financial journey.
                </p>
              </article>

              <article className="pillar">
                <div className="pillar-heading">
                  <div className="pillar-dot" />
                  <h2>Grow</h2>
                </div>
                <p>
                  Grow wealth step by step with clear habits, steady
                  contributions, and opportunities that fit your goals.
                </p>
              </article>

              <article className="pillar">
                <div className="pillar-heading">
                  <div className="pillar-dot" />
                  <h2>Retire</h2>
                </div>
                <p>
                  Today&apos;s discipline is tomorrow&apos;s freedom. Retire
                  wisely — and early — with a plan that compounds wealth and
                  buys back your time.
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
              loading="lazy"
              sizes="(max-width: 650px) 0px, 520px"
            />
          </div>

          <div className="philosophy-grid">
            <div>
              <div className="eyebrow grad-text">Our Philosophy</div>

              <h2>
                Explore.
                <br />
                Build. <em className="grad-text">Grow.</em>
              </h2>
            </div>

            <div className="philosophy-copy-wrap">
              <p className="philosophy-copy">
                WRFN brings the conversation to what matters: your goals, your
                habits, your time horizon — and the community you rise with.
              </p>

              <div className="principle">
                <div className="check">✓</div>
                <span>Start with a plan tailored to your goals.</span>
              </div>

              <div className="principle">
                <div className="check">✓</div>
                <span>
                  Invest for growth with risks professionally mitigated.
                </span>
              </div>

              <div className="principle">
                <div className="check">✓</div>
                <span>Build the prosperous future you actually want.</span>
              </div>

              <div className="principle">
                <div className="check">✓</div>
                <span>
                  Attain freedom — early retirement starts with a plan.
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
            loading="lazy"
            sizes="100vw"
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
              support. One message is all it takes to start.
            </p>

            <ContactUs whatsappUrl={WHATSAPP_URL} telegramUrl={TELEGRAM_URL} />
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
