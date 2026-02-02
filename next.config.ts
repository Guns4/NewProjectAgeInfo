import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // ============================================
  // REACT STRICT MODE - Detect potential issues
  // ============================================
  reactStrictMode: true,

  // ============================================
  // IMAGE OPTIMIZATION - External domains
  // ============================================
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // ============================================
  // PERFORMANCE OPTIMIZATIONS
  // ============================================
  compress: true,
  poweredByHeader: false,

  // ============================================
  // EXPERIMENTAL FEATURES (Next.js 16+)
  // ============================================
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['framer-motion', 'lucide-react', 'date-fns'],
  },
};

export default withNextIntl(nextConfig);

