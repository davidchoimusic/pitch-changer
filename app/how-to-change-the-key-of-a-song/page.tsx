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
        <article className="max-w-3xl mx-auto space-y-10 text-gray-300">
          {/* Hero */}
          <header className="space-y-4 text-center py-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              🎵 How to Change the Key of a Song
            </h1>
            <p className="text-xl text-gray-400 max-w-xl mx-auto">
              Your go-to guide for transposing music online. Free, fast, and super easy!
            </p>
          </header>

          {/* What is a Musical Key */}
          <section id="what-is-key" className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">🎹 What's a Musical Key?</h2>
            <p>
              Think of a musical key as the "home base" for a song. When someone says a song is "in the key of C major,"
              they mean it's built around those notes. The key decides whether a song sounds higher or lower overall.
            </p>
            <p>
              Imagine keys like floors in a building — going up a key is like taking the elevator up a floor.
              Everything stays the same, just... higher! That's basically what "transposing" means.
            </p>
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-5">
              <p className="text-sm">
                <span className="text-lg">💡</span> <strong className="text-white">Real talk:</strong> Ever sing "Happy Birthday" with friends?
                Notice how everyone just kinda finds a comfortable pitch to sing together? That's you naturally finding a key!
                Transposing a recorded song is the same idea — finding the version that fits YOUR voice.
              </p>
            </div>
          </section>

          {/* Understanding Semitones */}
          <section id="semitones" className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">🔑 Semitones: Your Secret Weapon</h2>
            <p>
              A <strong className="text-pink-400">semitone</strong> (or half-step) is the smallest step you can take in music.
              On a piano, it's moving from one key to the very next — including black keys. When you shift by +1 or -1 semitone,
              you're nudging the whole song up or down by one tiny step!
            </p>

            {/* Piano Keyboard SVG Diagram - Colorful version */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-600/30 rounded-xl p-6 space-y-4">
              <p className="font-semibold text-white text-center">🎹 One Octave = 12 Semitones</p>
              <div className="flex justify-center overflow-x-auto py-4">
                <svg viewBox="0 0 350 120" className="w-full max-w-md" aria-label="Piano keyboard showing one octave with semitone numbers">
                  <defs>
                    <linearGradient id="whiteKeyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#e2e8f0" />
                    </linearGradient>
                    <linearGradient id="blackKeyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#334155" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                  </defs>
                  {/* White keys with gradient */}
                  {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <g key={`white-${i}`}>
                      <rect
                        x={i * 50}
                        y="0"
                        width="48"
                        height="100"
                        fill="url(#whiteKeyGrad)"
                        stroke="#94a3b8"
                        strokeWidth="1"
                        rx="4"
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
                  {/* Black keys with gradient */}
                  {[0, 1, 3, 4, 5].map((i, idx) => (
                    <rect
                      key={`black-${idx}`}
                      x={i * 50 + 33}
                      y="0"
                      width="30"
                      height="60"
                      fill="url(#blackKeyGrad)"
                      stroke="#475569"
                      strokeWidth="1"
                      rx="3"
                    />
                  ))}
                  {/* Colorful semitone numbers */}
                  <text x="24" y="85" textAnchor="middle" fill="#f472b6" style={{ fontSize: '12px', fontWeight: 'bold' }}>0</text>
                  <text x="48" y="50" textAnchor="middle" fill="#fb7185" style={{ fontSize: '11px', fontWeight: 'bold' }}>1</text>
                  <text x="74" y="85" textAnchor="middle" fill="#f97316" style={{ fontSize: '12px', fontWeight: 'bold' }}>2</text>
                  <text x="98" y="50" textAnchor="middle" fill="#fbbf24" style={{ fontSize: '11px', fontWeight: 'bold' }}>3</text>
                  <text x="124" y="85" textAnchor="middle" fill="#a3e635" style={{ fontSize: '12px', fontWeight: 'bold' }}>4</text>
                  <text x="174" y="85" textAnchor="middle" fill="#34d399" style={{ fontSize: '12px', fontWeight: 'bold' }}>5</text>
                  <text x="198" y="50" textAnchor="middle" fill="#2dd4bf" style={{ fontSize: '11px', fontWeight: 'bold' }}>6</text>
                  <text x="224" y="85" textAnchor="middle" fill="#22d3ee" style={{ fontSize: '12px', fontWeight: 'bold' }}>7</text>
                  <text x="248" y="50" textAnchor="middle" fill="#60a5fa" style={{ fontSize: '11px', fontWeight: 'bold' }}>8</text>
                  <text x="274" y="85" textAnchor="middle" fill="#818cf8" style={{ fontSize: '12px', fontWeight: 'bold' }}>9</text>
                  <text x="298" y="50" textAnchor="middle" fill="#a78bfa" style={{ fontSize: '11px', fontWeight: 'bold' }}>10</text>
                  <text x="324" y="85" textAnchor="middle" fill="#c084fc" style={{ fontSize: '12px', fontWeight: 'bold' }}>11</text>
                </svg>
              </div>
              <p className="text-sm text-gray-400 text-center">
                Each number = semitones from C. <span className="text-orange-400">C to D = +2</span> (skips C#!)
              </p>
            </div>

            {/* Visual Semitone Reference - More colorful */}
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-slate-600/20 rounded-xl p-6 space-y-4">
              <p className="font-semibold text-white text-center">📊 Cheat Sheet: Common Semitone Jumps</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-3 text-center">
                  <span className="text-2xl font-bold text-pink-400">+1</span>
                  <p className="text-xs text-gray-400 mt-1">Half step</p>
                  <p className="text-xs text-gray-500">C → C#</p>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 text-center">
                  <span className="text-2xl font-bold text-orange-400">+2</span>
                  <p className="text-xs text-gray-400 mt-1">Whole step</p>
                  <p className="text-xs text-gray-500">C → D</p>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-center">
                  <span className="text-2xl font-bold text-yellow-400">+5</span>
                  <p className="text-xs text-gray-400 mt-1">Perfect 4th</p>
                  <p className="text-xs text-gray-500">C → F</p>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
                  <span className="text-2xl font-bold text-green-400">+7</span>
                  <p className="text-xs text-gray-400 mt-1">Perfect 5th</p>
                  <p className="text-xs text-gray-500">C → G</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 text-center">
                ⬇️ Use <span className="text-cyan-400">negative numbers</span> (-1, -2, etc.) to go lower!
              </p>
            </div>

            {/* Circle of Fifths SVG - Rainbow Edition */}
            <div id="circle-of-fifths" className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-600/20 rounded-xl p-6 space-y-4">
              <p className="font-semibold text-white text-center">🌈 The Circle of Fifths</p>
              <p className="text-sm text-gray-400 text-center">
                All 12 keys in a circle! Find your key, then count to the target key.
              </p>
              <div className="flex justify-center py-4">
                <svg viewBox="0 0 300 300" className="w-full max-w-sm" aria-label="Circle of Fifths showing all 12 musical keys">
                  {/* Rainbow gradient for outer ring */}
                  <defs>
                    <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f472b6" />
                      <stop offset="25%" stopColor="#fb923c" />
                      <stop offset="50%" stopColor="#4ade80" />
                      <stop offset="75%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                  </defs>
                  {/* Outer circle with gradient */}
                  <circle cx="150" cy="150" r="130" fill="none" stroke="url(#rainbowGrad)" strokeWidth="3" opacity="0.3" />
                  <circle cx="150" cy="150" r="95" fill="none" stroke="#475569" strokeWidth="1" strokeDasharray="4 4" />

                  {/* Key labels with rainbow colors */}
                  {[
                    { key: 'C', semi: 0, angle: -90, color: '#f472b6' },
                    { key: 'G', semi: 7, angle: -60, color: '#fb7185' },
                    { key: 'D', semi: 2, angle: -30, color: '#f97316' },
                    { key: 'A', semi: 9, angle: 0, color: '#fbbf24' },
                    { key: 'E', semi: 4, angle: 30, color: '#a3e635' },
                    { key: 'B', semi: 11, angle: 60, color: '#4ade80' },
                    { key: 'F♯', semi: 6, angle: 90, color: '#2dd4bf' },
                    { key: 'D♭', semi: 1, angle: 120, color: '#22d3ee' },
                    { key: 'A♭', semi: 8, angle: 150, color: '#60a5fa' },
                    { key: 'E♭', semi: 3, angle: 180, color: '#818cf8' },
                    { key: 'B♭', semi: 10, angle: 210, color: '#a78bfa' },
                    { key: 'F', semi: 5, angle: 240, color: '#c084fc' },
                  ].map(({ key, semi, angle, color }) => {
                    const radians = (angle * Math.PI) / 180
                    const x = 150 + 110 * Math.cos(radians)
                    const y = 150 + 110 * Math.sin(radians)
                    const innerX = 150 + 70 * Math.cos(radians)
                    const innerY = 150 + 70 * Math.sin(radians)
                    return (
                      <g key={key}>
                        {/* Key circle with color */}
                        <circle
                          cx={x}
                          cy={y}
                          r="22"
                          fill={`${color}20`}
                          stroke={color}
                          strokeWidth="2"
                        />
                        {/* Key letter */}
                        <text
                          x={x}
                          y={y + 1}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill={color}
                          style={{ fontSize: '14px', fontWeight: 'bold' }}
                        >
                          {key}
                        </text>
                        {/* Semitone number */}
                        <text
                          x={innerX}
                          y={innerY}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="#94a3b8"
                          style={{ fontSize: '10px' }}
                        >
                          {semi === 0 ? '0' : `+${semi}`}
                        </text>
                      </g>
                    )
                  })}

                  {/* Center label */}
                  <text x="150" y="145" textAnchor="middle" fill="#64748b" style={{ fontSize: '10px' }}>
                    semitones
                  </text>
                  <text x="150" y="158" textAnchor="middle" fill="#64748b" style={{ fontSize: '10px' }}>
                    from C
                  </text>
                </svg>
              </div>
              {/* Direction labels outside the circle */}
              <div className="flex justify-center gap-6 text-sm">
                <span className="text-green-400">↻ clockwise = +7</span>
                <span className="text-orange-400">↺ counter = -5</span>
              </div>
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 text-center">
                <p className="text-sm">
                  <span className="text-lg">🎯</span> <strong className="text-cyan-400">Quick trick:</strong> Going from C to A?
                  Just read the inner number: <span className="text-cyan-300 font-mono">+9</span> semitones!
                </p>
              </div>
            </div>
          </section>

          {/* Common Transpositions */}
          <section id="common-transpositions" className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">🔥 Common Scenarios (Copy These!)</h2>
            <p>
              Here's what most people need — just copy these numbers!
            </p>
            <div className="grid gap-3">
              <div className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 border border-pink-500/30 rounded-xl p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎤</span>
                  <span>Song too high? Lower it for deeper voice</span>
                </div>
                <span className="bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full font-mono font-bold text-sm">-2 to -4</span>
              </div>
              <div className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/30 rounded-xl p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">✨</span>
                  <span>Song too low? Raise it for higher voice</span>
                </div>
                <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full font-mono font-bold text-sm">+2 to +4</span>
              </div>
              <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/30 rounded-xl p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎸</span>
                  <span>Match capo on 2nd fret</span>
                </div>
                <span className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full font-mono font-bold text-sm">+2</span>
              </div>
              <div className="bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/30 rounded-xl p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎹</span>
                  <span>Make it easier to play (Eb → C)</span>
                </div>
                <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full font-mono font-bold text-sm">-3</span>
              </div>
            </div>

            {/* Pro tip */}
            <div className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/30 rounded-xl p-4">
              <p className="text-sm">
                <span className="text-lg">💡</span> <strong className="text-yellow-400">Pro tip:</strong> Start with <span className="text-yellow-300">+2 or -2</span> and adjust from there.
                Most vocal adjustments are between -4 and +4. Going beyond ±6 might sound weird!
              </p>
            </div>
          </section>

          {/* CTA - with pulse animation */}
          <div className="text-center py-10 space-y-6">
            <div className="space-y-2">
              <p className="text-2xl text-white font-bold">Ready to try it? 🚀</p>
              <p className="text-gray-400">Upload your song and start transposing in seconds</p>
            </div>
            <Link href="/" className="inline-block px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all text-lg hover:scale-105 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40">
              Try PitchChanger.io Free →
            </Link>
          </div>

          {/* Related Links */}
          <div className="flex gap-4 text-sm flex-wrap justify-center pt-4 border-t border-slate-700/50">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">← Home</Link>
            <Link href="/audio-pitch-changer" className="text-gray-400 hover:text-white transition-colors">Audio Pitch Changer</Link>
            <Link href="/change-pitch-online" className="text-gray-400 hover:text-white transition-colors">Change Pitch Online</Link>
            <Link href="/mp3-pitch-changer" className="text-gray-400 hover:text-white transition-colors">MP3 Pitch Changer</Link>
            <Link href="/resources" className="text-gray-400 hover:text-white transition-colors">Resources</Link>
          </div>
        </article>
      </div>
    </>
  )
}
