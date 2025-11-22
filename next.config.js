/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Optimize for Vercel free tier
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig
