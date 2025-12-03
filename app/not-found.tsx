import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-md mx-auto text-center space-y-6">
        <h1 className="text-6xl font-bold text-white">404</h1>
        <h2 className="text-2xl font-semibold text-gray-300">Page Not Found</h2>
        <p className="text-gray-400">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors"
        >
          ← Back to PitchChanger.io
        </Link>
      </div>
    </div>
  )
}
