import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // trailingSlash matches the template static exports served from public/<id>/
  // (one Vercel project hosts the hub + all template demos), so directory
  // index.html files resolve consistently.
  trailingSlash: true,
};

export default nextConfig;
