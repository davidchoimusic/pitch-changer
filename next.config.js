/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/mp3-pitch-changer',
        destination: '/audio-pitch-changer',
        permanent: true,
      },
      {
        source: '/slow-down-audio',
        destination: '/audio-speed-changer',
        permanent: true,
      },
      {
        source: '/speed-up-audio',
        destination: '/audio-speed-changer',
        permanent: true,
      },
      {
        source: '/how-to-slow-down-audio',
        destination: '/audio-speed-changer',
        permanent: true,
      },
      {
        source: '/how-to-speed-up-audio',
        destination: '/audio-speed-changer',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        // Prevent Safari from serving stale HTML; keep static assets cached
        source: '/((?!_next/static|_next/image|favicon.ico).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
    ]
  },
  // Optimize for Vercel free tier
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig
