import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder photography until real assets land in /public/images
    // (see IMAGES.md). Swap these calls for local paths at client handoff.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
