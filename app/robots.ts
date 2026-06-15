import type { MetadataRoute } from "next";
import { hubConfig } from "@/lib/hub.config";
import { absoluteUrl } from "@/lib/seo";

/**
 * robots.txt (PRD 7). The hub is a direct-link sales tool, not a search asset —
 * disallow everything unless `indexable` is flipped on in config.
 */
export default function robots(): MetadataRoute.Robots {
  if (!hubConfig.indexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: hubConfig.siteUrl,
  };
}
