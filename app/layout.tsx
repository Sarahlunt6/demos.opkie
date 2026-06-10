import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site.config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { Gtm } from "@/components/analytics/Gtm";
import { dentistSchema } from "@/lib/schema";
import { palette } from "@/lib/tokens";

// Display — high-contrast editorial serif with optical sizing (PRD 2.3).
// Variable font: load the weight axis + optical sizing and control weight
// (300–400) via CSS, per next/font's variable-font rules.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  style: ["normal"],
  axes: ["opsz"],
});

// Italic is used for only a word or two per page (never the LCP element), so
// it loads as a separate, non-preloaded file — keeping the preloaded display
// font to the LCP-critical normal weight alone.
const frauncesItalic = Fraunces({
  variable: "--font-fraunces-italic",
  subsets: ["latin"],
  display: "swap",
  style: ["italic"],
  axes: ["opsz"],
  preload: false,
});

// Body — quiet grotesque (PRD 2.3). Not preloaded: body text is never the LCP
// element, so we leave first-paint bandwidth to the display font (the headline).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.practice.name} | ${siteConfig.practice.tagline}`,
    template: `%s | ${siteConfig.practice.name}`,
  },
  description: siteConfig.practice.description,
  applicationName: siteConfig.practice.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.practice.name,
    title: `${siteConfig.practice.name} | ${siteConfig.practice.tagline}`,
    description: siteConfig.practice.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.practice.name} | ${siteConfig.practice.tagline}`,
    description: siteConfig.practice.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport = {
  themeColor: palette.porcelain,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${frauncesItalic.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-porcelain text-graphite">
        <JsonLd data={dentistSchema()} />
        <Gtm />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-graphite focus:px-4 focus:py-2 focus:text-porcelain"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
