import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "culturalfestivalugmr.id",
      },
    ],
  },
};

export default nextConfig;
