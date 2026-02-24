import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export", // Commented out to allow dynamic API routes on Vercel
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
