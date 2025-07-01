import type { NextConfig } from "next";

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'cdn.sanity.io'],
  },
  webpack: (config: { resolve: { fallback: { fs: boolean; net: boolean; tls: boolean; }; }; }) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
}

export default nextConfig;
