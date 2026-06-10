import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site.config";
import { absoluteUrl } from "@/lib/seo";

/**
 * Sitemap generated from the route map + service slugs in config, so adding a
 * service in site.config.ts adds it here automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    { path: "/", priority: 1.0 },
    { path: "/about", priority: 0.7 },
    { path: "/services", priority: 0.8 },
    { path: "/smile-gallery", priority: 0.8 },
    { path: "/new-patients", priority: 0.6 },
    { path: "/contact", priority: 0.7 },
  ];

  const servicePaths = siteConfig.services.map((s) => ({
    path: `/services/${s.slug}`,
    priority: 0.7,
  }));

  return [...staticPaths, ...servicePaths].map(({ path, priority }) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly",
    priority,
  }));
}
