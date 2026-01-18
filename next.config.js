/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
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
  webpack: (config) => {
    // Make Pinecone optional - use a mock if not installed
    config.resolve.alias = {
      ...config.resolve.alias,
      '@pinecone-database/pinecone': require.resolve('./lib/pinecone-stub.js'),
    };
    
    return config;
  },
  // Headers are handled in middleware.ts for dynamic control
}

module.exports = nextConfig
