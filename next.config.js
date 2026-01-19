/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  outputFileTracingRoot: require('path').join(__dirname),
  // ESLint: Ignore during builds (warnings non-blocking)
  eslint: {
    ignoreDuringBuilds: true,
  },
  // TypeScript: Keep strict (errors block build)
  typescript: {
    ignoreBuildErrors: false,
  },
  // Prisma: Use binary engine for edge runtime compatibility
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
    // Prisma binary engine (no adapter needed)
    prismaClientGenerator: {
      engineType: 'binary',
    },
  },
  images: {
    domains: ['i.scdn.co', 'mosaic.scdn.co', 'wrapped-images.spotifycdn.com', 'images.unsplash.com'],
    unoptimized: false,
  },
  // Request body size limit (50MB for file uploads)
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  // Compress responses
  compress: true,
  // Production optimizations
  poweredByHeader: false, // Remove X-Powered-By header
  webpack: (config, { dev }) => {
    // Only stub Pinecone in development when not configured
    // In production, require PINECONE_API_KEY (validated in lib/env.ts)
    if (dev && !process.env.PINECONE_API_KEY) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@pinecone-database/pinecone': require.resolve('./lib/pinecone-stub.js'),
      };
    }
    // In production, if PINECONE_API_KEY is missing, env validation will fail startup
    
    return config;
  },
  // Headers are handled in middleware.ts for dynamic control
}

module.exports = nextConfig
