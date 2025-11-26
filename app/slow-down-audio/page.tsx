import Link from 'next/link'

export const metadata = {
  title: 'Slow Down Audio Online (Free Tool) | Slow Down Songs Without Pitch Change',
  description: 'Slow down any song, speech, or recording without changing pitch. Perfect for musicians, transcription, and language study. Free online audio slow-down tool.',
  keywords: ['slow down audio without changing pitch', 'slow down song online', 'slow down music for practice'],
  alternates: {
    canonical: 'https://pitchchanger.io/slow-down-audio',
  },
  openGraph: {
    title: 'Slow Down Audio Online (Free Tool)',
    description: 'Slow down any song, speech, or recording without changing pitch. Perfect for musicians, transcription, and language study.',
    url: 'https://pitchchanger.io/slow-down-audio',
    siteName: 'Pitch Changer',
    type: 'website',
    images: [
      {
        url: 'https://pitchchanger.io/pitchchanger.png',
        width: 1024,
        height: 1024,
        alt: 'Slow Down Audio Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Slow Down Audio Online (Free Tool)',
    description: 'Slow down any song, speech, or recording without changing pitch. Perfect for musicians, transcription, and language study.',
    images: ['https://pitchchanger.io/1200x600-pitchchanger-x.png'],
  },
}

export default function SlowDownAudioPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-8 text-gray-300">
        <h1 className="text-4xl font-bold text-white">Slow Down Audio Online (Free Tool)</h1>

        <p className="text-lg">
          Slow down any song, speech, or recording without changing pitch.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">What This Tool Does</h2>
          <p>
            PitchChanger.io lets you reduce playback speed while keeping the original pitch. Perfect for musicians, transcription, and language study.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Features</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Slow down audio to 0.5×–0.99×</li>
            <li>Pitch stays unchanged</li>
            <li>Works with MP3, WAV, FLAC, M4A, AAC</li>
            <li>100% browser-based</li>
            <li>Free, no sign-up</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">How to Slow Down Audio</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Upload your file</li>
            <li>Drag the speed slider down below 1.0×</li>
            <li>Download the slower version</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Great For</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Music practice</li>
            <li>Transcribing speech</li>
            <li>Learning songs, solos, or riffs</li>
            <li>Studying languages</li>
          </ul>
        </section>

        <div className="pt-8 border-t border-divider">
          <Link href="/" className="inline-block px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors">
            Use It Instantly →
          </Link>
        </div>

        <div className="flex gap-4 text-sm">
          <Link href="/" className="text-accent hover:underline">← Back to Home</Link>
          <Link href="/how-to-slow-down-audio" className="text-accent hover:underline">How-To Guide</Link>
          <Link href="/audio-speed-changer" className="text-accent hover:underline">Audio Speed Changer</Link>
        </div>
      </div>
    </div>
  )
}
