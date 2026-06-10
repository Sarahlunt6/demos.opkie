import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Clean URLs, no trailing slash — canonicals and sitemap match exactly.
  trailingSlash: false,
};

export default nextConfig;
