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
            image: 'https://pitchchanger.io/guide/step-1-upload.png',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Upload your audio',
                text: 'Go to pitchchanger.io and drag & drop your audio file (MP3, WAV, FLAC, M4A, AAC).',
                image: 'https://pitchchanger.io/guide/step-1-upload.png'
              },
              {
                '@type': 'HowToStep',
                name: 'Adjust the pitch',
                text: 'Use the pitch slider to shift up or down in semitones.',
                image: 'https://pitchchanger.io/guide/step-2-pitch.png'
              },
              {
                '@type': 'HowToStep',
                name: 'Preview your changes',
                text: 'Hit Play to hear how it sounds with the new pitch.',
                image: 'https://pitchchanger.io/guide/step-3-preview.png'
              },
              {
                '@type': 'HowToStep',
                name: 'Process the audio',
                text: 'Click Process Audio to apply your changes.',
                image: 'https://pitchchanger.io/guide/step-4-process.png'
              },
              {
                '@type': 'HowToStep',
                name: 'Download',
                text: 'Download your pitch-shifted audio file.',
                image: 'https://pitchchanger.io/guide/step-5-download.png'
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
        <article className="max-w-3xl mx-auto space-y-10 text-gray-300">
          {/* Hero */}
          <header className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              🎵 How to Change Pitch Online
            </h1>
            <p className="text-lg text-gray-400">
              5 simple steps — no downloads, no sign-up, totally free
            </p>
          </header>

          {/* Step-by-Step with Screenshots */}
          <section className="space-y-8">
            {/* Step 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white font-bold text-lg">1</span>
                <h2 className="text-xl font-semibold text-white">Upload your audio</h2>
              </div>
              <p className="ml-13 text-gray-400">
                Go to <Link href="/" className="text-accent hover:underline">pitchchanger.io</Link> and drag & drop your file. Supports MP3, WAV, FLAC, M4A, AAC.
              </p>
              <div className="rounded-xl overflow-hidden border border-divider">
                <img
                  src="/guide/step-1-upload.png"
                  alt="PitchChanger.io upload interface"
                  className="w-full"
                />
              </div>
            </div>

            {/* Step 2 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white font-bold text-lg">2</span>
                <h2 className="text-xl font-semibold text-white">Adjust the pitch</h2>
              </div>
              <p className="ml-13 text-gray-400">
                Drag the slider left to lower the key, or right to raise it. Each notch is one semitone.
              </p>
              <div className="rounded-xl overflow-hidden border border-divider">
                <img
                  src="/guide/step-2-pitch.png"
                  alt="Pitch slider showing +5 semitones"
                  className="w-full"
                />
              </div>
            </div>

            {/* Step 3 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white font-bold text-lg">3</span>
                <h2 className="text-xl font-semibold text-white">Preview your changes</h2>
              </div>
              <p className="ml-13 text-gray-400">
                Hit Play to hear how it sounds. The tempo stays the same — only the pitch changes.
              </p>
              <div className="rounded-xl overflow-hidden border border-divider">
                <img
                  src="/guide/step-3-preview.png"
                  alt="Waveform player with Play button"
                  className="w-full"
                />
              </div>
            </div>

            {/* Step 4 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white font-bold text-lg">4</span>
                <h2 className="text-xl font-semibold text-white">Process the audio</h2>
              </div>
              <p className="ml-13 text-gray-400">
                Happy with the preview? Click the green button to render your pitch-shifted file.
              </p>
              <div className="flex justify-center">
                <div className="rounded-xl overflow-hidden border border-divider inline-block">
                  <img
                    src="/guide/step-4-process.png"
                    alt="Process Audio button"
                    className="w-auto max-w-full"
                  />
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500 text-white font-bold text-lg">✓</span>
                <h2 className="text-xl font-semibold text-white">Download!</h2>
              </div>
              <p className="ml-13 text-gray-400">
                That's it! Download your new audio file and you're done.
              </p>
              <div className="rounded-xl overflow-hidden border border-green-500/30">
                <img
                  src="/guide/step-5-download.png"
                  alt="Download ready screen"
                  className="w-full"
                />
              </div>
            </div>
          </section>

          {/* Quick Tips */}
          <section className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6 space-y-3">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <span>💡</span> Quick Tips
            </h2>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-purple-400">•</span>
                <span><strong className="text-white">Small shifts sound best</strong> — ±1 to 3 semitones keeps things natural</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-400">•</span>
                <span><strong className="text-white">Use headphones</strong> — easier to hear if the new key fits your voice</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-400">•</span>
                <span><strong className="text-white">100% private</strong> — all processing happens in your browser, nothing uploaded</span>
              </li>
            </ul>
          </section>

          {/* FAQ */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">❓ FAQ</h2>
            <div className="grid gap-3">
              <div className="bg-bg-card border border-divider rounded-lg p-4">
                <h3 className="font-semibold text-white">Is this really free?</h3>
                <p className="text-sm text-gray-400 mt-1">Yep, 100% free. No sign-up, no limits.</p>
              </div>
              <div className="bg-bg-card border border-divider rounded-lg p-4">
                <h3 className="font-semibold text-white">Does changing pitch affect speed?</h3>
                <p className="text-sm text-gray-400 mt-1">Nope! Pitch and speed are independent. The tempo stays exactly the same.</p>
              </div>
              <div className="bg-bg-card border border-divider rounded-lg p-4">
                <h3 className="font-semibold text-white">What file types work?</h3>
                <p className="text-sm text-gray-400 mt-1">MP3, WAV, FLAC, M4A, and AAC — up to 250MB.</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-accent/20 to-cyan-500/20 border border-accent/30 rounded-2xl p-8 text-center space-y-4">
            <div className="text-4xl">🎹</div>
            <h2 className="text-2xl font-bold text-white">Ready to Try It?</h2>
            <p className="text-gray-300">
              Change the pitch of any song in seconds — free and private.
            </p>
            <Link href="/" className="inline-block px-8 py-4 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-all hover:scale-105 text-lg">
              Open PitchChanger.io →
            </Link>
          </section>

          {/* Related Links */}
          <div className="pt-6 border-t border-divider">
            <p className="text-sm text-gray-500 mb-3">More guides:</p>
            <div className="flex gap-3 text-sm flex-wrap">
              <Link href="/" className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-full text-gray-300 transition-colors">← Home</Link>
              <Link href="/audio-pitch-changer" className="px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-full text-purple-300 transition-colors">🎹 Pitch Changer</Link>
              <Link href="/how-to-change-the-key-of-a-song" className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-full text-gray-300 transition-colors">🎵 Change Key Guide</Link>
              <Link href="/change-pitch-vs-change-speed" className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-full text-gray-300 transition-colors">📊 Pitch vs Speed</Link>
            </div>
          </div>
        </article>
      </div>
    </>
  )
}
