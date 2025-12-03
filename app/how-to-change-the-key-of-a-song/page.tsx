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
            totalTime: 'PT2M',
            tool: {
              '@type': 'HowToTool',
              name: 'PitchChanger.io'
            },
            step: [
              {
                '@type': 'HowToStep',
                name: 'Go to PitchChanger.io',
                text: 'Visit PitchChanger.io in your web browser. No account or download required.',
                url: 'https://pitchchanger.io'
              },
              {
                '@type': 'HowToStep',
                name: 'Upload your audio file',
                text: 'Drag and drop or click to upload your MP3, WAV, FLAC, or M4A file (up to 250MB).'
              },
              {
                '@type': 'HowToStep',
                name: 'Adjust the pitch slider',
                text: 'Use the pitch slider to adjust by semitones. Each semitone is one half-step on a piano. +2 semitones raises the key by a whole step (e.g., C to D).'
              },
              {
                '@type': 'HowToStep',
                name: 'Preview your changes',
                text: 'Click play to hear how the song sounds in the new key. Adjust until it matches your needs.'
              },
              {
                '@type': 'HowToStep',
                name: 'Download the transposed file',
                text: 'Click Process Audio, then download your transposed song as a high-quality WAV file.'
              }
            ]
          })
        }}
      />
      <div className="container mx-auto px-4 py-12">
        <article className="max-w-3xl mx-auto space-y-8 text-gray-300">
          {/* Hero */}
          <header className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              How to Change the Key of a Song (Free & Easy)
            </h1>
            <p className="text-xl text-gray-400">
              The complete guide to transposing music online — perfect for singers, musicians, and music teachers.
            </p>
          </header>

          {/* Quick Answer Box */}
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-6 space-y-3">
            <p className="font-semibold text-accent">Quick Answer:</p>
            <p>
              To change the key of a song, upload your audio file to <Link href="/" className="text-accent hover:underline font-medium">PitchChanger.io</Link>,
              adjust the pitch slider (each number = 1 semitone = 1 half-step), preview the result, and download.
              The entire process takes less than 2 minutes and is completely free.
            </p>
          </div>

          {/* Table of Contents */}
          <nav className="bg-bg-card border border-divider rounded-lg p-6">
            <p className="font-semibold text-white mb-3">In This Guide:</p>
            <ul className="space-y-2 text-sm">
              <li><a href="#what-is-key" className="text-accent hover:underline">What is a Musical Key?</a></li>
              <li><a href="#semitones" className="text-accent hover:underline">Understanding Semitones</a></li>
              <li><a href="#common-transpositions" className="text-accent hover:underline">Common Transposition Examples</a></li>
            </ul>
          </nav>

          {/* What is a Musical Key */}
          <section id="what-is-key" className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">What is a Musical Key?</h2>
            <p>
              A musical key is the group of notes that form the foundation of a song. When a song is "in the key of C major,"
              it primarily uses notes from the C major scale. The key determines how high or low the overall pitch of the song sits.
            </p>
            <p>
              Think of keys like floors in a building. Moving to a higher key is like going up a floor — all the musical
              relationships stay the same, but everything is shifted higher. This is why changing keys is also called
              "transposing" — you're moving the entire song up or down the musical ladder.
            </p>
            <div className="bg-bg-card border border-divider rounded-lg p-5">
              <p className="text-sm text-gray-400">
                <strong className="text-white">Real-world example:</strong> The song "Happy Birthday" can be sung in any key.
                When a group of people sing it together without instruments, they naturally find a key that's comfortable for
                most voices. Changing the key of a recorded song works the same way — you're finding a version that fits better.
              </p>
            </div>
          </section>

          {/* Understanding Semitones */}
          <section id="semitones" className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Understanding Semitones (The Secret to Transposition)</h2>
            <p>
              A <strong className="text-white">semitone</strong> (also called a half-step) is the smallest interval in Western music.
              On a piano, it's the distance from one key to the very next key, including black keys. When you change pitch by
              +1 or -1 semitone, you're moving the entire song up or down by one half-step.
            </p>

            {/* Piano Keyboard SVG Diagram */}
            <div className="bg-bg-card border border-divider rounded-lg p-6 space-y-4">
              <p className="font-semibold text-white">Visual: One Octave on a Piano (12 Semitones)</p>
              <div className="flex justify-center overflow-x-auto py-4">
                <svg viewBox="0 0 350 120" className="w-full max-w-md" aria-label="Piano keyboard showing one octave with semitone numbers">
                  {/* White keys */}
                  {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <g key={`white-${i}`}>
                      <rect
                        x={i * 50}
                        y="0"
                        width="48"
                        height="100"
                        fill="#f8fafc"
                        stroke="#334155"
                        strokeWidth="2"
                        rx="2"
                      />
                      <text
                        x={i * 50 + 24}
                        y="115"
                        textAnchor="middle"
                        className="text-xs"
                        fill="#94a3b8"
                      >
                        {['C', 'D', 'E', 'F', 'G', 'A', 'B'][i]}
                      </text>
                    </g>
                  ))}
                  {/* Black keys */}
                  {[0, 1, 3, 4, 5].map((i, idx) => (
                    <rect
                      key={`black-${idx}`}
                      x={i * 50 + 33}
                      y="0"
                      width="30"
                      height="60"
                      fill="#1e293b"
                      stroke="#334155"
                      strokeWidth="2"
                      rx="2"
                    />
                  ))}
                  {/* Semitone numbers */}
                  <text x="24" y="85" textAnchor="middle" fill="#3b82f6" className="text-xs font-bold">0</text>
                  <text x="48" y="50" textAnchor="middle" fill="#3b82f6" className="text-xs font-bold">1</text>
                  <text x="74" y="85" textAnchor="middle" fill="#3b82f6" className="text-xs font-bold">2</text>
                  <text x="98" y="50" textAnchor="middle" fill="#3b82f6" className="text-xs font-bold">3</text>
                  <text x="124" y="85" textAnchor="middle" fill="#3b82f6" className="text-xs font-bold">4</text>
                  <text x="174" y="85" textAnchor="middle" fill="#3b82f6" className="text-xs font-bold">5</text>
                  <text x="198" y="50" textAnchor="middle" fill="#3b82f6" className="text-xs font-bold">6</text>
                  <text x="224" y="85" textAnchor="middle" fill="#3b82f6" className="text-xs font-bold">7</text>
                  <text x="248" y="50" textAnchor="middle" fill="#3b82f6" className="text-xs font-bold">8</text>
                  <text x="274" y="85" textAnchor="middle" fill="#3b82f6" className="text-xs font-bold">9</text>
                  <text x="298" y="50" textAnchor="middle" fill="#3b82f6" className="text-xs font-bold">10</text>
                  <text x="324" y="85" textAnchor="middle" fill="#3b82f6" className="text-xs font-bold">11</text>
                </svg>
              </div>
              <p className="text-sm text-gray-400 text-center">
                Numbers show semitones from C. Moving from C to D (+2) skips one black key.
              </p>
            </div>

            {/* Visual Semitone Reference */}
            <div className="bg-bg-card border border-divider rounded-lg p-6 space-y-4">
              <p className="font-semibold text-white">Semitone Reference Chart:</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-divider">
                      <th className="text-left py-2 pr-4 text-gray-400">Semitones</th>
                      <th className="text-left py-2 pr-4 text-gray-400">Musical Interval</th>
                      <th className="text-left py-2 text-gray-400">Example (from C)</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-divider/50">
                      <td className="py-2 pr-4 text-accent font-mono">+1</td>
                      <td className="py-2 pr-4">Half step (minor 2nd)</td>
                      <td className="py-2">C → C#/Db</td>
                    </tr>
                    <tr className="border-b border-divider/50">
                      <td className="py-2 pr-4 text-accent font-mono">+2</td>
                      <td className="py-2 pr-4">Whole step (major 2nd)</td>
                      <td className="py-2">C → D</td>
                    </tr>
                    <tr className="border-b border-divider/50">
                      <td className="py-2 pr-4 text-accent font-mono">+3</td>
                      <td className="py-2 pr-4">Minor 3rd</td>
                      <td className="py-2">C → Eb</td>
                    </tr>
                    <tr className="border-b border-divider/50">
                      <td className="py-2 pr-4 text-accent font-mono">+4</td>
                      <td className="py-2 pr-4">Major 3rd</td>
                      <td className="py-2">C → E</td>
                    </tr>
                    <tr className="border-b border-divider/50">
                      <td className="py-2 pr-4 text-accent font-mono">+5</td>
                      <td className="py-2 pr-4">Perfect 4th</td>
                      <td className="py-2">C → F</td>
                    </tr>
                    <tr className="border-b border-divider/50">
                      <td className="py-2 pr-4 text-accent font-mono">+7</td>
                      <td className="py-2 pr-4">Perfect 5th</td>
                      <td className="py-2">C → G</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 text-accent font-mono">+12</td>
                      <td className="py-2 pr-4">Octave</td>
                      <td className="py-2">C → C (one octave higher)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-400">
                Use negative numbers (-1, -2, etc.) to lower the key instead of raising it.
              </p>
            </div>
          </section>

          {/* Common Transpositions */}
          <section id="common-transpositions" className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">Common Transposition Examples</h2>
            <p>
              Here are some typical scenarios and the recommended semitone adjustments:
            </p>
            <div className="bg-bg-card border border-divider rounded-lg p-6 space-y-4">
              <div className="grid gap-4">
                <div className="flex justify-between items-center py-2 border-b border-divider/50">
                  <span>Lower for male vocals (baritone/bass)</span>
                  <span className="text-accent font-mono font-bold">-2 to -4</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-divider/50">
                  <span>Raise for female vocals (soprano)</span>
                  <span className="text-accent font-mono font-bold">+2 to +4</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-divider/50">
                  <span>Match guitar capo on 2nd fret</span>
                  <span className="text-accent font-mono font-bold">+2</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-divider/50">
                  <span>Transpose from Eb to C (for easier playing)</span>
                  <span className="text-accent font-mono font-bold">-3</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-divider/50">
                  <span>Up one whole step (e.g., C to D)</span>
                  <span className="text-accent font-mono font-bold">+2</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span>Down a perfect fourth (e.g., G to D)</span>
                  <span className="text-accent font-mono font-bold">-5</span>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center py-8 border-t border-divider space-y-4">
            <p className="text-xl text-white font-medium">Ready to transpose your song?</p>
            <Link href="/" className="inline-block px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors">
              Try PitchChanger.io Free →
            </Link>
          </div>

          {/* Related Links */}
          <div className="flex gap-4 text-sm flex-wrap">
            <Link href="/" className="text-accent hover:underline">← Back to Home</Link>
            <Link href="/audio-pitch-changer" className="text-accent hover:underline">Audio Pitch Changer</Link>
            <Link href="/change-pitch-online" className="text-accent hover:underline">Change Pitch Online</Link>
            <Link href="/mp3-pitch-changer" className="text-accent hover:underline">MP3 Pitch Changer</Link>
            <Link href="/resources" className="text-accent hover:underline">All Resources</Link>
          </div>
        </article>
      </div>
    </>
  )
}
