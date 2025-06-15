import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // ✅ Properly disables TypeScript build errors
  },
  /* Other config options can go here */
};

export default nextConfig; // ✅ Export correctly
