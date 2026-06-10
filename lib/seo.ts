import type { Metadata } from "next";
import { siteConfig } from "./site.config";

/** Absolute URL for a path, resolved against the canonical origin. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.url).toString();
}

/**
 * Per-page metadata: unique title (the layout template appends the practice
 * name), description, a self-referencing canonical, and OpenGraph/Twitter cards
 * sharing the sitewide OG image. `title` is the page-specific half only.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} | ${siteConfig.practice.name}`;
  // Reference the root OG route explicitly: setting openGraph at the page level
  // otherwise drops the file-convention image inherited from the layout.
  const ogImage = {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: `${siteConfig.practice.name} — ${siteConfig.practice.tagline}`,
  };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: siteConfig.practice.name,
      locale: "en_US",
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
  };
}
