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
          },
        },
      };
    }

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
        ],
      },
    ];
  },
};

module.exports = withPWA(nextConfig);
