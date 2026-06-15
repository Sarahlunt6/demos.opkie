import { hubConfig } from "./hub.config";

/** Absolute URL for a path, resolved against the canonical origin (config). */
export function absoluteUrl(path = "/"): string {
  return new URL(path, hubConfig.siteUrl).toString();
}
