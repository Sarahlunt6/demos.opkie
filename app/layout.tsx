import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { hubConfig } from "@/lib/hub.config";
import { palette } from "@/lib/tokens";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GtmScript } from "@/components/analytics/GtmScript";

// One neutral family, multiple weights (PRD 3.3). Subset + swap; the hub must be
// the fastest of the six sites (PRD 8), so the font is small and preloaded.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const title = "Five Websites, Ready for Your Practice | Opkie";
const description =
  "Five fully built dental website templates — each mobile-optimized and engineered for search. Pick the style that fits your practice.";

export const metadata: Metadata = {
  metadataBase: new URL(hubConfig.siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  // Full OG/Twitter cards regardless of indexing — the link gets shared in
  // emails and texts (PRD 7). The five-template OG image (app/opengraph-image)
  // is attached automatically by Next to both cards.
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Opkie",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  // Direct-link sales tool, not a search asset (PRD 7) — noindex unless the
  // config flag is flipped.
  robots: hubConfig.indexable
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export const viewport = {
  themeColor: palette.studioWhite,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-studio-white text-carbon">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-carbon focus:px-4 focus:py-2 focus:text-studio-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
        <GtmScript />
      </body>
    </html>
  );
}
