import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.Connectteamchrm.com"),
  title: "The Compounding Hub | Retirement Mastermind — Build Wealth. Retire Strong. Gain Freedom.",
  description:
    "A private community of serious wealth-builders focused on compound growth, disciplined investing, and a retirement built on strength and clarity. Join the mastermind.",
  keywords: [
    "The Compounding Hub",
    "Retirement Mastermind",
    "wealth building",
    "compound growth",
    "retirement planning",
    "investment strategies",
    "financial freedom",
    "trading community",
  ],
  authors: [{ name: "The Compounding Hub" }],
  openGraph: {
    title: "The Compounding Hub | Retirement Mastermind",
    description:
      "A private community of serious wealth-builders focused on compound growth, disciplined investing, and a retirement built on strength and clarity.",
    url: "https://www.Connectteamchrm.com",
    siteName: "The Compounding Hub",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Compounding Hub — Retirement Mastermind",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Compounding Hub | Retirement Mastermind",
    description:
      "A private community of serious wealth-builders focused on compound growth, disciplined investing, and a retirement built on strength and clarity.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#080c14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#080c14] overflow-x-hidden">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-[#080c14] text-gray-100 min-h-screen m-0 p-0 overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
