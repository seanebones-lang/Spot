/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['i.scdn.co', 'mosaic.scdn.co', 'wrapped-images.spotifycdn.com', 'images.unsplash.com'],
    unoptimized: false,
  },
  webpack: (config) => {
    // Make Pinecone optional - use a mock if not installed
    config.resolve.alias = {
      ...config.resolve.alias,
      '@pinecone-database/pinecone': require.resolve('./lib/pinecone-stub.js'),
    };
    
    return config;
  },
}

module.exports = nextConfig
