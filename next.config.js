/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Optimize for Vercel free tier
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig
