import Link from 'next/link'

export const metadata = {
  title: 'How to Speed Up Audio Online | Free Step-by-Step Guide',
  description: 'Learn how to increase playback speed without affecting pitch. Great for studying, editing, or workouts. Simple tutorial with examples.',
  keywords: ['how to speed up audio', 'speed up mp3', 'make audio faster tutorial'],
  alternates: {
    canonical: 'https://pitchchanger.io/how-to-speed-up-audio',
  },
  openGraph: {
    title: 'How to Speed Up Audio Online | Free Step-by-Step Guide',
    description: 'Learn how to increase playback speed without affecting pitch. Great for studying, editing, or workouts.',
    url: 'https://pitchchanger.io/how-to-speed-up-audio',
    siteName: 'Pitch Changer',
    type: 'article',
    images: [
      {
        url: 'https://pitchchanger.io/pitchchanger.png',
        width: 1024,
        height: 1024,
        alt: 'How to Speed Up Audio Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Speed Up Audio Online',
    description: 'Learn how to increase playback speed without affecting pitch. Great for studying, editing, or workouts.',
    images: ['https://pitchchanger.io/1200x600-pitchchanger-x.png'],
  },
}

export default function HowToSpeedUpAudioPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-8 text-gray-300">
        <h1 className="text-4xl font-bold text-white">How to Speed Up Audio Online</h1>

        <p className="text-lg">
          Increase playback speed without affecting pitch — great for studying, editing, or workouts.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Fastest Method</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Visit <Link href="/" className="text-accent hover:underline">PitchChanger.io</Link></li>
            <li>Upload your audio</li>
            <li>Slide speed above 1×</li>
            <li>Download the faster version</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Examples</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>1.25× = faster lectures without losing clarity</li>
            <li>1.5× = more efficient studying</li>
            <li>1.2× = slightly faster practice tempo</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Who Benefits</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Students reviewing lectures</li>
            <li>Podcast listeners</li>
            <li>Fitness instructors</li>
            <li>DJs preparing sets</li>
          </ul>
        </section>

        <div className="pt-8 border-t border-divider">
          <Link href="/" className="inline-block px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors">
            Try It Now →
          </Link>
        </div>

        <div className="flex gap-4 text-sm flex-wrap">
          <Link href="/" className="text-accent hover:underline">← Back to Home</Link>
          <Link href="/speed-up-audio" className="text-accent hover:underline">Speed Up Audio Tool</Link>
          <Link href="/how-to-slow-down-audio" className="text-accent hover:underline">How to Slow Down Audio</Link>
        </div>
      </div>
    </div>
  )
}
