import type { NextConfig } from "next";
import '@/src/utils/check-env'
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "fishlo.in",
      },
    ],
  },
};

export default nextConfig;