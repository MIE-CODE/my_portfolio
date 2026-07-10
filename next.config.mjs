/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: "/manifest.webmanifest", destination: "/site.webmanifest" },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  // Default is 60 — heavy pages were SIGTERM'd and then failed looking for three chunks
  staticPageGenerationTimeout: 180,
  experimental: {
    // Serialize SSG workers to avoid chunk races under memory pressure
    cpus: 1,
    // Never optimize three/R3F — it corrupts the webpack graph
    optimizePackageImports: ["gsap"],
  },
};

export default nextConfig;
