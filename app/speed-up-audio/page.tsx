import Link from 'next/link'

export const metadata = {
  title: 'Speed Up Audio Online (Free Tool) | Make Audio Faster Without Pitch Change',
  description: 'Increase the speed of any song or recording without changing pitch. Free online audio speed-up tool for workouts, dance practice, studying, and editing.',
  keywords: ['speed up audio without changing pitch', 'speed up song online', 'make audio faster online'],
  alternates: {
    canonical: 'https://pitchchanger.io/speed-up-audio',
  },
  openGraph: {
    title: 'Speed Up Audio Online (Free Tool)',
    description: 'Increase the speed of any song or recording without changing pitch. Free online audio speed-up tool for workouts, dance practice, studying.',
    url: 'https://pitchchanger.io/speed-up-audio',
    siteName: 'Pitch Changer',
    type: 'website',
    images: [
      {
        url: 'https://pitchchanger.io/pitchchanger.png',
        width: 1024,
        height: 1024,
        alt: 'Speed Up Audio Tool',
      },
    ],
  },
}

export default function SpeedUpAudioPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-8 text-gray-300">
        <h1 className="text-4xl font-bold text-white">Speed Up Audio Online (Free Tool)</h1>

        <p className="text-lg">
          Increase the speed of any song or recording without changing pitch.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">About This Tool</h2>
          <p>
            PitchChanger.io lets you speed up audio for workouts, dance practice, studying, or editing — while keeping pitch natural.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Features</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Speed audio up to 1.5×</li>
            <li>Pitch stays constant</li>
            <li>Supports MP3, WAV, FLAC, M4A, AAC</li>
            <li>Private, fast, no installs</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">How to Speed Up Audio</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Upload your file</li>
            <li>Move the speed slider above 1×</li>
            <li>Download the faster version</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Use Cases</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Dance / choreography</li>
            <li>Lecture speed-up</li>
            <li>Podcast editing</li>
            <li>Learning routines</li>
          </ul>
        </section>

        <div className="pt-8 border-t border-divider">
          <Link href="/" className="inline-block px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors">
            Try It Here →
          </Link>
        </div>

        <div className="flex gap-4 text-sm">
          <Link href="/" className="text-accent hover:underline">← Back to Home</Link>
          <Link href="/how-to-speed-up-audio" className="text-accent hover:underline">How-To Guide</Link>
          <Link href="/audio-speed-changer" className="text-accent hover:underline">Audio Speed Changer</Link>
        </div>
      </div>
    </div>
  )
}
