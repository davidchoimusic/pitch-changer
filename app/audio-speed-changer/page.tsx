import Link from 'next/link'

export const metadata = {
  title: 'Free Online Audio Speed Changer | Slow Down or Speed Up Audio',
  description: 'Change audio speed online — slow down songs for practice or speed up lectures without changing pitch. Free, browser-based tool for MP3, WAV, FLAC, M4A, AAC.',
  keywords: ['audio speed changer', 'slow down audio', 'speed up audio', 'slow down song online', 'change audio speed online', 'time stretch audio'],
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
      <article className="max-w-3xl mx-auto space-y-10 text-gray-300">
        {/* Hero */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            ⏱️ Free Online Audio Speed Changer
          </h1>
        </header>

        {/* The Science Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">🔬 The Science: How Time Stretching Works</h2>

          <p>
            Changing speed without changing pitch requires sophisticated algorithms. Here's what's happening under the hood:
          </p>

          {/* The Problem */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-600/30 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white">The Challenge</h3>
            <p className="text-sm">
              Normally, speed and pitch are locked together. Play a tape faster → higher pitch (chipmunk voice).
              Play it slower → lower pitch (monster voice). The goal of <strong className="text-white">time-scale modification (TSM)</strong> is to break this link.
            </p>
            <svg viewBox="0 0 300 80" className="w-full max-w-md mx-auto" aria-label="Speed and pitch linked">
              <text x="40" y="20" fill="#22d3ee" style={{fontSize: '10px', fontWeight: 'bold'}}>Without TSM</text>
              <path d="M 30 45 Q 45 30 60 45 Q 75 60 90 45 Q 105 30 120 45" fill="none" stroke="#94a3b8" strokeWidth="2"/>
              <text x="75" y="70" fill="#94a3b8" style={{fontSize: '8px'}} textAnchor="middle">Normal</text>

              <text x="160" y="40" fill="#64748b" style={{fontSize: '14px'}}>→</text>

              <path d="M 190 45 Q 197 35 204 45 Q 211 55 218 45 Q 225 35 232 45 Q 239 55 246 45 Q 253 35 260 45 Q 267 55 274 45 Q 281 35 288 45" fill="none" stroke="#f97316" strokeWidth="2"/>
              <text x="240" y="70" fill="#f97316" style={{fontSize: '8px'}} textAnchor="middle">2× speed = chipmunk!</text>
            </svg>
          </div>

          {/* SOLA/WSOLA */}
          <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-cyan-300">The Solution: Overlap-Add Methods</h3>
            <p className="text-sm">
              Modern time stretchers use <strong className="text-white">overlap-add</strong> techniques. The most common are:
            </p>
            <ul className="text-sm space-y-2 ml-4">
              <li className="flex gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong className="text-white">SOLA</strong> (Synchronized Overlap-Add) — chops audio into overlapping segments and crossfades them at optimal points</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong className="text-white">WSOLA</strong> (Waveform Similarity OLA) — improved version that finds the best matching waveforms to minimize artifacts</span>
              </li>
              <li className="flex gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong className="text-white">Phase Vocoder</strong> — works in the frequency domain using FFT, better for polyphonic music</span>
              </li>
            </ul>
          </div>

          {/* Visual: The Process */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-600/30 rounded-xl p-6">
            <p className="text-center text-sm text-gray-400 mb-4 font-semibold">WSOLA: Slowing Down Audio</p>
            <svg viewBox="0 0 340 120" className="w-full" aria-label="WSOLA time stretching process">
              {/* Original */}
              <text x="10" y="20" fill="#94a3b8" style={{fontSize: '9px'}}>Original (1.0×)</text>
              <rect x="10" y="30" width="140" height="30" rx="4" fill="#334155" stroke="#475569"/>
              <rect x="20" y="35" width="30" height="20" rx="2" fill="#22d3ee" opacity="0.7"/>
              <rect x="55" y="35" width="30" height="20" rx="2" fill="#22d3ee" opacity="0.7"/>
              <rect x="90" y="35" width="30" height="20" rx="2" fill="#22d3ee" opacity="0.7"/>
              <text x="80" y="75" fill="#94a3b8" style={{fontSize: '8px'}} textAnchor="middle">3 segments</text>

              {/* Arrow */}
              <path d="M 160 45 L 180 45" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow2)"/>

              {/* Stretched */}
              <text x="190" y="20" fill="#10b981" style={{fontSize: '9px'}}>Stretched (0.75×)</text>
              <rect x="190" y="30" width="140" height="30" rx="4" fill="#334155" stroke="#10b981"/>
              <rect x="200" y="35" width="30" height="20" rx="2" fill="#10b981" opacity="0.7"/>
              <rect x="225" y="35" width="30" height="20" rx="2" fill="#10b981" opacity="0.5"/>
              <rect x="250" y="35" width="30" height="20" rx="2" fill="#10b981" opacity="0.7"/>
              <rect x="275" y="35" width="30" height="20" rx="2" fill="#10b981" opacity="0.5"/>
              <rect x="300" y="35" width="20" height="20" rx="2" fill="#10b981" opacity="0.7"/>
              <text x="260" y="75" fill="#10b981" style={{fontSize: '8px'}} textAnchor="middle">Overlapped + crossfaded</text>

              {/* Key insight */}
              <text x="170" y="100" fill="#64748b" style={{fontSize: '8px'}} textAnchor="middle">Same pitch, longer duration!</text>

              <defs>
                <marker id="arrow2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L9,3 z" fill="#475569"/>
                </marker>
              </defs>
            </svg>
          </div>

          {/* Why Quality Varies */}
          <div className="bg-gradient-to-r from-teal-500/10 to-emerald-500/10 border border-teal-500/30 rounded-xl p-5 space-y-3">
            <h3 className="text-lg font-semibold text-teal-300">💡 Why Quality Varies Between Tools</h3>
            <p className="text-sm">
              The difference between good and bad time stretchers comes down to:
            </p>
            <ul className="text-sm space-y-1">
              <li className="flex gap-2">
                <span className="text-teal-400">•</span>
                <span><strong className="text-white">Segment matching</strong> — finding optimal crossfade points to avoid clicks and pops</span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-400">•</span>
                <span><strong className="text-white">Transient detection</strong> — drums and attacks need special handling to stay crisp</span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-400">•</span>
                <span><strong className="text-white">Extreme ratios</strong> — below 0.5× or above 2× gets exponentially harder</span>
              </li>
            </ul>
          </div>
        </section>

        {/* History Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">📜 A Brief History of Time Stretching</h2>
          <p>
            The ability to change tempo without affecting pitch has evolved dramatically over the decades:
          </p>

          <div className="space-y-4">
            {/* 1940s-1970s */}
            <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 border border-amber-500/30 rounded-xl p-5 space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📻</span>
                <h3 className="text-lg font-semibold text-amber-300">1940s–1970s: Mechanical Solutions</h3>
              </div>
              <p className="text-sm">
                Early attempts used <strong className="text-white">rotating head tape machines</strong> and <strong className="text-white">variable-speed film projectors</strong>.
                The Springer Tempo Changer (1950s) and Lexicon Varispeech (1970s) were pioneering hardware units, but quality was limited.
              </p>
            </div>

            {/* 1978 */}
            <div className="bg-gradient-to-br from-indigo-900/30 to-blue-900/30 border border-indigo-500/30 rounded-xl p-5 space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔬</span>
                <h3 className="text-lg font-semibold text-indigo-300">1978: SOLA is Born</h3>
              </div>
              <p className="text-sm">
                <strong className="text-white">Rabiner and Schafer</strong> published foundational work on time-domain methods.
                The <strong className="text-white">Synchronized Overlap-Add (SOLA)</strong> technique used pitch detection and crossfading —
                faster than phase vocoders but struggled with complex harmonics.
              </p>
            </div>

            {/* 1993 */}
            <div className="bg-gradient-to-br from-lime-900/30 to-green-900/30 border border-lime-500/30 rounded-xl p-5 space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✨</span>
                <h3 className="text-lg font-semibold text-lime-300">1993: WSOLA Breakthrough</h3>
              </div>
              <p className="text-sm">
                <strong className="text-white">Verhelst and Roelands</strong> at Vrije Universiteit Brussels introduced
                <strong className="text-white"> WSOLA</strong> — a smarter version that finds optimal waveform matches.
                This became the foundation for most modern real-time time stretchers.
              </p>
            </div>

            {/* 2000s */}
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-5 space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">💻</span>
                <h3 className="text-lg font-semibold text-purple-300">2000s: DAW Integration</h3>
              </div>
              <p className="text-sm">
                <strong className="text-white">Ableton Live</strong> (2001) made time stretching mainstream with its revolutionary warping engine.
                <strong className="text-white"> Pro Tools</strong>, <strong className="text-white">Logic</strong>, and other DAWs followed with their own algorithms.
                Suddenly, DJs and producers could remix at any tempo.
              </p>
            </div>

            {/* Today */}
            <div className="bg-gradient-to-br from-rose-900/30 to-red-900/30 border border-rose-500/30 rounded-xl p-5 space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌐</span>
                <h3 className="text-lg font-semibold text-rose-300">Today: Browser-Based & AI</h3>
              </div>
              <p className="text-sm">
                Web Audio API enables <strong className="text-white">real-time time stretching in browsers</strong> — no plugins needed.
                AI-powered tools are emerging that can intelligently separate and process different elements (drums, vocals, bass) independently.
              </p>
            </div>
          </div>
        </section>

        {/* When to Use */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">🎯 When to Use Speed Control</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Slow Down */}
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🐢</span>
                <h3 className="text-lg font-bold text-green-300">Slow Down For:</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <span>🎸</span>
                  <span><strong className="text-white">Learning music</strong> — nail fast solos note-by-note</span>
                </div>
                <div className="flex gap-3">
                  <span>📝</span>
                  <span><strong className="text-white">Transcription</strong> — catch every word clearly</span>
                </div>
                <div className="flex gap-3">
                  <span>🌍</span>
                  <span><strong className="text-white">Language learning</strong> — understand native speakers</span>
                </div>
                <div className="flex gap-3">
                  <span>💃</span>
                  <span><strong className="text-white">Dance practice</strong> — learn choreography step-by-step</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 pt-2 border-t border-green-500/20">
                <strong>Recommended:</strong> 0.75× for moderate, 0.5× for detailed study
              </p>
            </div>

            {/* Speed Up */}
            <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/30 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                <h3 className="text-lg font-bold text-orange-300">Speed Up For:</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <span>🎓</span>
                  <span><strong className="text-white">Lectures & podcasts</strong> — save time without losing info</span>
                </div>
                <div className="flex gap-3">
                  <span>📚</span>
                  <span><strong className="text-white">Audiobooks</strong> — get through books faster</span>
                </div>
                <div className="flex gap-3">
                  <span>🏃</span>
                  <span><strong className="text-white">Workout music</strong> — increase BPM for energy</span>
                </div>
                <div className="flex gap-3">
                  <span>🎙️</span>
                  <span><strong className="text-white">Review recordings</strong> — scan meetings quickly</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 pt-2 border-t border-orange-500/20">
                <strong>Recommended:</strong> 1.25× for comfort, 1.5× for efficiency
              </p>
            </div>
          </div>
        </section>

        {/* Speed vs Pitch */}
        <section className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/30 rounded-xl p-6 space-y-3">
          <h3 className="text-lg font-semibold text-white">🔄 Need to Change Pitch Instead?</h3>
          <p className="text-sm">
            Speed changes the <em>tempo</em> (how fast it plays). Pitch changes the <em>key</em> (how high or low it sounds).
            They're independent! Check out our <Link href="/audio-pitch-changer" className="text-accent hover:underline">Audio Pitch Changer</Link> or
            read <Link href="/change-pitch-vs-change-speed" className="text-accent hover:underline">Pitch vs Speed explained</Link>.
          </p>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-cyan-500/20 via-accent/20 to-green-500/20 border border-accent/30 rounded-2xl p-8 text-center space-y-4">
          <div className="text-4xl">⏱️✨</div>
          <h2 className="text-2xl font-bold text-white">Ready to Change Speed?</h2>
          <p className="text-gray-300">
            Slow down or speed up any audio — free, fast, and private.
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
            <Link href="/change-pitch-vs-change-speed" className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-full text-gray-300 transition-colors">📊 Pitch vs Speed</Link>
            <Link href="/resources" className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-full text-gray-300 transition-colors">📚 All Resources</Link>
          </div>
        </div>
      </article>
    </div>
  )
}
