import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100], // Configure allowed quality values (100 is used in your Image components)
  },
};

export default nextConfig;
