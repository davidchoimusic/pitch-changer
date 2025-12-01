import Link from 'next/link'
import Script from 'next/script'

export const metadata = {
  title: 'How to Change Pitch Online (Free Tool) | Change Pitch of a Song',
  description: 'Learn how to change the pitch of a song online for free. Step-by-step guide using a browser-based audio pitch changer that works with MP3, WAV, FLAC, M4A, and AAC.',
  keywords: ['change pitch online', 'change music pitch online', 'change the pitch of a song online free', 'how to change pitch online'],
  alternates: {
    canonical: 'https://pitchchanger.io/change-pitch-online',
  },
  openGraph: {
    title: 'How to Change Pitch Online – Free Step-by-Step Guide',
    description: 'Change the pitch of any song online for free. Follow this simple guide using PitchChanger.io to shift keys without changing speed.',
    url: 'https://pitchchanger.io/change-pitch-online',
    siteName: 'Pitch Changer',
    type: 'article',
    images: [
      {
        url: 'https://pitchchanger.io/pitchchanger.png',
        width: 1024,
        height: 1024,
        alt: 'How to Change Pitch Online Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Change Pitch Online – Free Step-by-Step Guide',
    description: 'Change the pitch of any song online for free. Follow this simple guide using PitchChanger.io to shift keys without changing speed.',
    images: ['https://pitchchanger.io/1200x600-pitchchanger-x.png'],
  },
}

export default function ChangePitchOnlinePage() {
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
            name: 'How to Change Pitch Online',
            description: 'Learn how to change the pitch of a song online for free using PitchChanger.io.',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Open PitchChanger.io',
                text: 'Go to https://pitchchanger.io in your browser. It works on desktop and laptop devices with no installation.',
                url: 'https://pitchchanger.io'
              },
              {
                '@type': 'HowToStep',
                name: 'Upload your audio file',
                text: 'Drag and drop your song (MP3, WAV, FLAC, M4A, AAC) into the upload area. The file is processed locally in your browser.'
              },
              {
                '@type': 'HowToStep',
                name: 'Adjust the pitch slider',
                text: 'Use the slider to change pitch in semitones. Move it to the right to raise the key, or to the left to lower the key.'
              },
              {
                '@type': 'HowToStep',
                name: 'Preview your changes',
                text: 'Press play to hear the new pitch instantly. Tempo stays the same, so you\'re only changing pitch — not speed.'
              },
              {
                '@type': 'HowToStep',
                name: 'Download the new version',
                text: 'When you\'re happy with the pitch, download the processed file. You\'ve now changed the pitch of your song online for free.'
              }
            ]
          })
        }}
      />
      {/* FAQ Schema for Google Rich Results */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Is this really free?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. PitchChanger.io lets you change the pitch of a song online free in your browser.'
                }
              },
              {
                '@type': 'Question',
                name: 'Does changing pitch affect speed?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. You can change pitch without changing speed. Tempo stays constant.'
                }
              },
              {
                '@type': 'Question',
                name: 'What file types can I use?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'You can change pitch online for MP3, WAV, FLAC, M4A, and AAC files.'
                }
              },
              {
                '@type': 'Question',
                name: 'Do I need to upload my audio to a server?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. All processing happens locally in your browser, so your audio stays private.'
                }
              }
            ]
          })
        }}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8 text-gray-300">
          <h1 className="text-4xl font-bold text-white">How to Change Pitch Online (Free & Easy)</h1>

          <p className="text-lg">
            Need to change the pitch of a song without downloading software? This guide shows you how to <Link href="/audio-pitch-changer" className="text-accent hover:underline">change pitch online</Link> for free using PitchChanger.io. You can change the pitch of a song, shift keys for vocals, or tweak MP3 files directly in your browser.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Why Change Pitch Online?</h2>
            <p className="mb-4">Changing pitch is useful when you:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Want a song in a higher or lower key for singing</li>
              <li>Need to adjust backing tracks for different vocalists</li>
              <li>Practice instruments in a more comfortable key</li>
              <li>Create alternate versions for karaoke, performances, or remixes</li>
            </ul>
            <p className="mt-4">
              An online tool lets you do all of this without installing DAWs or plugins.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Step-by-Step: Change the Pitch of a Song Online Free</h2>
            <ol className="list-decimal list-inside space-y-4">
              <li>
                <span className="font-semibold text-white">Open PitchChanger.io</span>
                <p className="ml-6 mt-1 text-sm">Go to <Link href="/" className="text-accent hover:underline">pitchchanger.io</Link> in your browser. It works on desktop and laptop devices with no installation.</p>
              </li>
              <li>
                <span className="font-semibold text-white">Upload your audio file</span>
                <p className="ml-6 mt-1 text-sm">Drag and drop your song (MP3, WAV, FLAC, M4A, AAC) into the upload area. The file is processed locally in your browser.</p>
              </li>
              <li>
                <span className="font-semibold text-white">Adjust the pitch slider</span>
                <p className="ml-6 mt-1 text-sm">Use the slider to change pitch in semitones. Move it to the right to raise the key, or to the left to lower the key.</p>
              </li>
              <li>
                <span className="font-semibold text-white">Preview your changes</span>
                <p className="ml-6 mt-1 text-sm">Press play to hear the new pitch instantly. Tempo stays the same, so you're only changing pitch — not speed.</p>
              </li>
              <li>
                <span className="font-semibold text-white">Download the new version</span>
                <p className="ml-6 mt-1 text-sm">When you're happy with the pitch, download the processed file. You've now changed the pitch of your song online for free.</p>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Examples</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white">Change music pitch online for singing</h3>
                <p className="text-sm mt-1">If the original key is too high, drop the pitch by –2 or –3 semitones until it fits your voice.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white">Change pitch of MP3 backing tracks</h3>
                <p className="text-sm mt-1">Load an <Link href="/mp3-pitch-changer" className="text-accent hover:underline">MP3</Link>, shift the pitch to match your band or choir, and export the new track for rehearsal.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Tips for Better Results</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Small changes (±1–3 semitones) usually sound the most natural</li>
              <li>Use headphones to clearly hear how the new key feels for your voice</li>
              <li>Save both the original and the adjusted versions in case you want to try different keys later</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">FAQ</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white">Is this really free?</h3>
                <p className="text-sm mt-1">Yes. PitchChanger.io lets you change the pitch of a song online free in your browser.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white">Does changing pitch affect speed?</h3>
                <p className="text-sm mt-1">No. You can change pitch without changing speed. Tempo stays constant.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white">What file types can I use?</h3>
                <p className="text-sm mt-1">You can change pitch online for MP3, WAV, FLAC, M4A, and AAC files.</p>
              </div>
              <div>
                <h3 className="font-semibold text-white">Do I need to upload my audio to a server?</h3>
                <p className="text-sm mt-1">No. All processing happens locally in your browser, so your audio stays private.</p>
              </div>
            </div>
          </section>

          <section className="bg-bg-card border border-divider rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-3">Ready to Change Pitch Online Right Now?</h2>
            <Link href="/" className="inline-block px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors">
              Open PitchChanger.io →
            </Link>
          </section>

          <div className="pt-8 border-t border-divider">
            <p className="text-sm mb-4">See more guides in the <Link href="/resources" className="text-accent hover:underline">Resources</Link> section.</p>
            <div className="flex gap-4 text-sm flex-wrap">
              <Link href="/" className="text-accent hover:underline">← Back to Home</Link>
              <Link href="/audio-pitch-changer" className="text-accent hover:underline">Audio Pitch Changer</Link>
              <Link href="/mp3-pitch-changer" className="text-accent hover:underline">MP3 Pitch Changer</Link>
              <Link href="/how-to-change-the-key-of-a-song" className="text-accent hover:underline">How to Change Key</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
