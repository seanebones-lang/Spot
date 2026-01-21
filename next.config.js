<<<<<<< HEAD
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api\.spotify\.com\/.*/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "spotify-api-cache",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 5 * 60, // 5 minutes
        },
        networkTimeoutSeconds: 10,
      },
    },
    {
      urlPattern: /^https:\/\/i\.scdn\.co\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "spotify-images",
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
  ],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  outputFileTracingRoot: require("path").join(__dirname),
  // ESLint: Ignore during builds (warnings non-blocking)
  eslint: {
    ignoreDuringBuilds: true,
  },
  // TypeScript: Keep strict (errors block build)
  typescript: {
    ignoreBuildErrors: false,
  },
  // Request body size limit (50MB for file uploads)
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
    // React 19 compatibility (disabled - requires babel-plugin-react-compiler)
    // reactCompiler: true,
  },
  images: {
    domains: [
      "i.scdn.co",
      "mosaic.scdn.co",
      "wrapped-images.spotifycdn.com",
      "images.unsplash.com",
    ],
    unoptimized: false,
    formats: ["image/avif", "image/webp"],
  },
  // Compress responses
  compress: true,
  // Production optimizations
  poweredByHeader: false, // Remove X-Powered-By header
  webpack: (config, { dev, isServer }) => {
    // Only stub Pinecone in development when not configured
    // In production, require PINECONE_API_KEY (validated in lib/env.ts)
    if (dev && !process.env.PINECONE_API_KEY) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@pinecone-database/pinecone":
          require.resolve("./lib/pinecone-stub.js"),
      };
    }
    // In production, if PINECONE_API_KEY is missing, env validation will fail startup

    // Performance optimizations
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: "deterministic",
        runtimeChunk: "single",
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              priority: 10,
            },
=======
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
    // React 19 compiler (if available)
    // reactCompiler: true, // Uncomment when React 19 compiler is stable
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
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          },
        },
      };
    }

<<<<<<< HEAD
    return config;
  },
  // Headers are handled in middleware.ts for dynamic control
  // Performance headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
=======
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
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        ],
      },
    ];
  },
};

<<<<<<< HEAD
module.exports = withPWA(nextConfig);
=======
module.exports = withBundleAnalyzer(nextConfig);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
