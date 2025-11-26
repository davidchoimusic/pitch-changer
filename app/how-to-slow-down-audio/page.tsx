import Link from 'next/link'
import Script from 'next/script'

export const metadata = {
  title: 'How to Slow Down Audio (Works on Any File) | Free Guide',
  description: 'Learn how to slow down a song, voice recording, or podcast without losing pitch. Step-by-step guide with examples.',
  keywords: ['how to slow down audio', 'slow down mp3', 'slow down song tutorial'],
  alternates: {
    canonical: 'https://pitchchanger.io/how-to-slow-down-audio',
  },
  openGraph: {
    title: 'How to Slow Down Audio (Works on Any File)',
    description: 'Learn how to slow down a song, voice recording, or podcast without losing pitch. Step-by-step guide with examples.',
    url: 'https://pitchchanger.io/how-to-slow-down-audio',
    siteName: 'Pitch Changer',
    type: 'article',
    images: [
      {
        url: 'https://pitchchanger.io/pitchchanger.png',
        width: 1024,
        height: 1024,
        alt: 'How to Slow Down Audio Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Slow Down Audio (Works on Any File)',
    description: 'Learn how to slow down a song, voice recording, or podcast without losing pitch. Step-by-step guide.',
    images: ['https://pitchchanger.io/1200x600-pitchchanger-x.png'],
  },
}

export default function HowToSlowDownAudioPage() {
  return (
    <>
      {/* HowTo Schema */}
      <Script
        id="howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'How to Slow Down Audio',
            description: 'Learn how to slow down a song, voice recording, or podcast without losing pitch.',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Go to PitchChanger.io',
                text: 'Visit PitchChanger.io',
                url: 'https://pitchchanger.io'
              },
              {
                '@type': 'HowToStep',
                name: 'Upload your file',
                text: 'Upload your audio file to the tool'
              },
              {
                '@type': 'HowToStep',
                name: 'Move the speed slider down',
                text: 'Drag the speed slider below 1.0× to slow down the audio'
              },
              {
                '@type': 'HowToStep',
                name: 'Download the slower version',
                text: 'Download your slowed-down audio file'
              }
            ]
          })
        }}
      />
      <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-8 text-gray-300">
        <h1 className="text-4xl font-bold text-white">How to Slow Down Audio (Works on Any File)</h1>

        <p className="text-lg">
          Here's how to slow down a song, voice recording, or podcast without losing pitch.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Quick Method (No Software)</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Go to <Link href="/" className="text-accent hover:underline">PitchChanger.io</Link></li>
            <li>Upload your audio</li>
            <li>Move the speed slider below 1×</li>
            <li>Download the slowed version</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Examples</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>0.75× = easier for transcription</li>
            <li>0.5× = ideal for learning guitar solos</li>
            <li>0.9× = perfect for practicing tricky rhythms</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Why This Is Useful</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Better clarity for complex passages</li>
            <li>Improved practice efficiency</li>
            <li>Slower pacing for language learning</li>
            <li>Easier transcription of fast speech</li>
          </ul>
        </section>

        <div className="pt-8 border-t border-divider">
          <Link href="/" className="inline-block px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors">
            Use the Tool Instantly →
          </Link>
        </div>

        <div className="flex gap-4 text-sm flex-wrap">
          <Link href="/" className="text-accent hover:underline">← Back to Home</Link>
          <Link href="/slow-down-audio" className="text-accent hover:underline">Slow Down Audio Tool</Link>
          <Link href="/how-to-speed-up-audio" className="text-accent hover:underline">How to Speed Up Audio</Link>
        </div>
      </div>
    </div>
    </>
  )
}
