import Link from 'next/link'

export const metadata = {
  title: 'Free Online Audio Speed Changer | Speed Up or Slow Down Audio',
  description: 'Change audio speed online — slow down or speed up any song or recording without changing pitch. Free, fast, and private. Works with MP3, WAV, FLAC, M4A, AAC.',
  keywords: ['audio speed changer', 'change audio speed online', 'speed up audio online', 'slow down audio online'],
  alternates: {
    canonical: 'https://pitchchanger.io/audio-speed-changer',
  },
  openGraph: {
    title: 'Free Online Audio Speed Changer | Speed Up or Slow Down Audio',
    description: 'Change audio speed online — slow down or speed up any song or recording without changing pitch. Free, fast, and private.',
    url: 'https://pitchchanger.io/audio-speed-changer',
    siteName: 'Pitch Changer',
    type: 'website',
    images: [
      {
        url: 'https://pitchchanger.io/pitchchanger.png',
        width: 1024,
        height: 1024,
        alt: 'Audio Speed Changer Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Audio Speed Changer',
    description: 'Change audio speed online — slow down or speed up any song without changing pitch. Free, fast, and private.',
    images: ['https://pitchchanger.io/1200x600-pitchchanger-x.png'],
  },
}

export default function AudioSpeedChangerPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-8 text-gray-300">
        <h1 className="text-4xl font-bold text-white">Free Online Audio Speed Changer</h1>

        <p className="text-lg">
          Change audio speed online — slow down or speed up any song or recording without changing pitch.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">What This Tool Does</h2>
          <p>
            PitchChanger.io lets you instantly adjust playback speed while keeping pitch the same. Slow down music for practice, speed up audio for workouts, or fine-tune tempo for editing.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Features</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Slow down or speed up audio in your browser</li>
            <li>Keep original pitch (no chipmunk or deep voice effect)</li>
            <li>Supports MP3, WAV, FLAC, M4A, AAC</li>
            <li>No upload needed — 100% private</li>
            <li>Free and instant</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">How to Change Audio Speed</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Upload your audio file</li>
            <li>Move the speed slider (e.g., 0.5×, 1.25×, 1.5×)</li>
            <li>Download the adjusted track instantly</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Common Uses</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Music practice and instrumental learning</li>
            <li>Dance/choreography</li>
            <li>Podcast editing</li>
            <li>Language learning</li>
            <li>Transcription</li>
          </ul>
        </section>

        <div className="pt-8 border-t border-divider">
          <Link href="/" className="inline-block px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors">
            Use the Tool Now →
          </Link>
        </div>

        <div className="flex gap-4 text-sm flex-wrap">
          <Link href="/" className="text-accent hover:underline">← Back to Home</Link>
          <Link href="/audio-pitch-changer" className="text-accent hover:underline">Audio Pitch Changer</Link>
          <Link href="/how-to-slow-down-audio" className="text-accent hover:underline">How to Slow Down Audio</Link>
          <Link href="/how-to-speed-up-audio" className="text-accent hover:underline">How to Speed Up Audio</Link>
        </div>
      </div>
    </div>
  )
}
