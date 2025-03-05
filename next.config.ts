import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: ["cdsassets.apple.com", "encrypted-tbn3.gstatic.com"],
  },
};

export default nextConfig;
