import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    domains: [
      "cdsassets.apple.com",
      "encrypted-tbn3.gstatic.com",
      "blogs.nvidia.co.kr",
    ],
  },
};

export default nextConfig;
