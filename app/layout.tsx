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
  metadataBase: new URL("https://www.Connectwrfnteam.com"),
  title: "Wealth Rise & Freedom Network (WRFN) — Build Wealth. Retire Wisely. Live Free.",
  description:
    "Join Wealth Rise & Freedom Network to explore strategies, ideas, and tips for your financial journey — retiring wisely, building a prosperous future, and achieving early retirement.",
  keywords: [
    "Wealth Rise & Freedom Network",
    "WRFN",
    "financial freedom",
    "early retirement",
    "wealth building",
    "compound growth",
    "retirement planning",
    "investment strategies",
    "financial journey",
    "prosperous future",
  ],
  authors: [{ name: "Wealth Rise & Freedom Network" }],
  openGraph: {
    title: "Wealth Rise & Freedom Network (WRFN)",
    description:
      "Join us to explore strategies, ideas, and tips for your financial journey — retiring wisely, building a prosperous future, and achieving early retirement.",
    url: "https://www.Connectwrfnteam.com",
    siteName: "Wealth Rise & Freedom Network",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Wealth Rise & Freedom Network — Strategies, Ideas & Tips for Your Financial Journey",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wealth Rise & Freedom Network (WRFN)",
    description:
      "Join us to explore strategies, ideas, and tips for your financial journey — retiring wisely, building a prosperous future, and achieving early retirement.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-white overflow-x-hidden">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-white text-slate-900 min-h-screen m-0 p-0 overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
