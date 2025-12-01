import Link from 'next/link'
import Script from 'next/script'

export const metadata = {
  title: 'How to Change the Key of a Song (Free & Easy) | Transpose Music Online',
  description: 'Need a song in a different key? Learn the fastest and easiest way to transpose music online for free. Perfect for singers and musicians.',
  keywords: ['change key of song', 'transpose music online', 'how to change song key', 'transpose song for vocals'],
  alternates: {
    canonical: 'https://pitchchanger.io/how-to-change-the-key-of-a-song',
  },
  openGraph: {
    title: 'How to Change the Key of a Song (Free & Easy)',
    description: 'Learn the fastest and easiest way to transpose music online for free. Perfect for singers and musicians.',
    url: 'https://pitchchanger.io/how-to-change-the-key-of-a-song',
    siteName: 'Pitch Changer',
    type: 'article',
    images: [
      {
        url: 'https://pitchchanger.io/pitchchanger.png',
        width: 1024,
        height: 1024,
        alt: 'How to Change Song Key Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Change the Key of a Song (Free & Easy)',
    description: 'Learn the fastest way to transpose music online for free. Perfect for singers and musicians.',
    images: ['https://pitchchanger.io/1200x600-pitchchanger-x.png'],
  },
}

export default function HowToChangeKeyPage() {
  return (
    <>
      {/* HowTo Schema for Google Rich Results */}
      <Script
        id="howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Change the Key of a Song',
            description: 'Learn the fastest and easiest way to transpose music online for free.',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Go to PitchChanger.io',
                text: 'Visit PitchChanger.io in your web browser',
                url: 'https://pitchchanger.io'
              },
              {
                '@type': 'HowToStep',
                name: 'Upload your audio file',
                text: 'Upload the song or audio file you want to transpose'
              },
              {
                '@type': 'HowToStep',
                name: 'Adjust pitch',
                text: 'Use the pitch slider to adjust semitones (e.g., +2 semitones = a whole step up)'
              },
              {
                '@type': 'HowToStep',
                name: 'Download the new key',
                text: 'Download your transposed audio file in the new key'
              }
            ]
          })
        }}
      />
      <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-8 text-gray-300">
        <h1 className="text-4xl font-bold text-white">How to Change the Key of a Song (Free & Easy)</h1>

        <p className="text-lg">
          Need a song in a different key? Here's the fastest and easiest way to transpose music online.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Why Change the Key?</h2>
          <p>
            Singers, musicians, and teachers often need tracks higher or lower to match vocal range or performance needs.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">How to Change Key Online</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Go to <Link href="/" className="text-accent hover:underline">PitchChanger.io</Link></li>
            <li>Upload your audio file</li>
            <li>Adjust pitch (e.g., +2 semitones = a whole step up)</li>
            <li>Download the new key</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Examples</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>+3 semitones = higher key for soprano range</li>
            <li>–2 semitones = lower key for male vocalists</li>
            <li>+5 semitones = up a fourth for guitar capo simulation</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">FAQ</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-white">Does changing pitch affect speed?</h3>
              <p className="text-sm mt-1">No — the tempo stays the same.</p>
            </div>
            <div>
              <h3 className="font-semibold text-white">Is it free?</h3>
              <p className="text-sm mt-1">Yes — completely free with no sign-up.</p>
            </div>
          </div>
        </section>

        <div className="pt-8 border-t border-divider">
          <Link href="/" className="inline-block px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors">
            Try PitchChanger.io →
          </Link>
        </div>

        <div className="flex gap-4 text-sm flex-wrap">
          <Link href="/" className="text-accent hover:underline">← Back to Home</Link>
          <Link href="/audio-pitch-changer" className="text-accent hover:underline">Audio Pitch Changer</Link>
          <Link href="/change-pitch-online" className="text-accent hover:underline">Change Pitch Online</Link>
          <Link href="/mp3-pitch-changer" className="text-accent hover:underline">MP3 Pitch Changer</Link>
        </div>
      </div>
    </div>
    </>
  )
}
