/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Some clients request /manifest.webmanifest; we only ship site.webmanifest
      { source: '/manifest.webmanifest', destination: '/site.webmanifest' },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ['gsap', 'three', '@react-three/fiber', '@react-three/drei'],
  },
};

export default nextConfig;
