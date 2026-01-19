/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // Use PORT from environment variable (Railway/Vercel set this automatically)
  // For local dev, defaults to 3000, but dev server uses 3001
  images: {
    domains: ['i.scdn.co', 'mosaic.scdn.co', 'wrapped-images.spotifycdn.com', 'images.unsplash.com'],
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.scdn.co',
      },
      {
        protocol: 'https',
        hostname: '*.spotifycdn.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@react-three/fiber', '@react-three/drei'],
  },
  webpack: (config) => {
    // Make Pinecone optional - use a mock if not installed
    config.resolve.alias = {
      ...config.resolve.alias,
      '@pinecone-database/pinecone': require.resolve('./lib/pinecone-stub.js'),
    };
    
    return config;
  },
  // Ensure proper port handling for Railway/Vercel
  // Railway sets PORT automatically, Vercel handles it internally
  serverRuntimeConfig: {
    port: process.env.PORT || 3000,
  },
}

module.exports = nextConfig
