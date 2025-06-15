import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.attavanti.com",
        port: "",
        pathname: "/product_images/uploaded_images/**",
      },
    ],
  }
};

export default nextConfig;