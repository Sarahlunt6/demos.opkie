import type { MetadataRoute } from "next";
import { hubConfig } from "@/lib/hub.config";
import { absoluteUrl } from "@/lib/seo";

/**
 * Sitemap (PRD 7). Excluded entirely while the hub is a direct-link sales tool;
 * only published when `indexable` is flipped on in config. The /go redirects are
 * never listed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!hubConfig.indexable) return [];
  return [{ url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 }];
}
