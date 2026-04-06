import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Standalone output for Docker (no node_modules copy needed) ──
  output: "standalone",

  // ── Image Optimization ──
  images: {
    // Allow remote images from Cloudinary (gallery) and other sources
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
    // Prefer modern formats for 40-80% size reduction
    formats: ["image/avif", "image/webp"],
    // Allow larger images to be optimized (camera sequence canvases)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Aggressive caching for static assets
    minimumCacheTTL: 31536000, // 1 year
  },

  // ── Compiler optimizations ──
  compiler: {
    // Remove console.* in production
    removeConsole: process.env.NODE_ENV === "production",
  },
  
  // ── EC2 Build Speed Optimizations ──
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors. Vastly speeds up Docker builds on VMs.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors. Skips the slowest part of next build.
    ignoreBuildErrors: true,
  },

  // ── Experimental performance features ──
  experimental: {
    // Enable optimized package imports — avoids full barrel imports
    optimizePackageImports: [
      "framer-motion",
      "react-icons",
      "gsap",
      "@react-three/drei",
      "@react-three/fiber",
    ],
  },
  
  // Explicitly tell Next.js 16 we are using Turbopack and are fine with defaults
  turbopack: {},

  // ── HTTP headers for better caching ──
  async headers() {
    return [
      {
        // Cache static sequence frames aggressively
        source: "/sequence/:file*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/icons/:file*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/assets/:file*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
