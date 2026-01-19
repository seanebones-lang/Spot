/** @type {import('next').NextConfig} */

// Enable bundle analyzer in production builds if ANALYZE env var is set
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  outputFileTracingRoot: require('path').join(__dirname),

  // =============== TypeScript & ESLint ===============
  eslint: {
    ignoreDuringBuilds: true, // Warnings non-blocking
  },
  typescript: {
    ignoreBuildErrors: false, // Errors block build
  },

  // =============== Experimental Features ===============
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb', // For file uploads
    },
    optimizePackageImports: [
      'lucide-react', // Only import icons actually used
      'zustand', // Optimize state management
    ],
  },

  // =============== Image Optimization ===============
  images: {
    domains: [
      'i.scdn.co',
      'mosaic.scdn.co',
      'wrapped-images.spotifycdn.com',
      'images.unsplash.com',
      'empulse.music', // Self-hosted images
    ],
    unoptimized: false, // Enable Image optimization (WebP, responsive)
    formats: ['image/avif', 'image/webp'], // Modern formats
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year for versioned images
  },

  // =============== Performance Optimizations ===============
  compress: true, // Gzip compression
  poweredByHeader: false, // Remove X-Powered-By header
  productionBrowserSourceMaps: false, // Disable source maps in production (reduce bundle)
  swcMinify: true, // Use SWC for faster minification (enabled by default in Next.js 13+)

  // =============== Webpack Configuration ===============
  webpack: (config, { dev, isServer }) => {
    // Optimize for production
    if (!dev && !isServer) {
      // ✅ Split chunks for better caching
      config.optimization = {
        ...config.optimization,
        runtimeChunk: 'single', // Move runtime to separate chunk
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            // Separate vendor code
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: 10,
            },
            // React & Next.js internals
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
              name: 'react',
              priority: 20,
            },
            // Audio libraries (larger, but less frequently changed)
            audio: {
              test: /[\\/]node_modules[\\/](howler|tone)[\\/]/,
              name: 'audio',
              priority: 15,
            },
            // Common code used across multiple pages
            common: {
              minChunks: 2,
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }

    // Only stub Pinecone in development when not configured
    if (dev && !process.env.PINECONE_API_KEY) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@pinecone-database/pinecone': require.resolve('./lib/pinecone-stub.js'),
      };
    }

    return config;
  },

  // =============== Headers & Security ===============
  // Headers are handled in middleware.ts for dynamic control

  // =============== Redirects & Rewrites ===============
  async redirects() {
    return [
      // Redirect old API paths if needed
    ];
  },

  async rewrites() {
    return {
      beforeFiles: [
        // Rewrite API requests for better caching
        {
          source: '/api/:path*',
          destination: '/api/:path*',
        },
      ],
    };
  },

  // =============== Headers for Performance ===============
  async headers() {
    return [
      {
        source: '/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
    ];
  },
};

module.exports = withBundleAnalyzer(nextConfig);
