import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site.config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// Display — high-contrast editorial serif with optical sizing (PRD 2.3)
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

// Body — quiet grotesque (PRD 2.3)
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.practice.name} | ${siteConfig.practice.tagline}`,
    template: `%s | ${siteConfig.practice.name}`,
  },
  description: siteConfig.practice.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-porcelain text-graphite">
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
