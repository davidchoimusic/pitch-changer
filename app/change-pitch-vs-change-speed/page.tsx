import Link from 'next/link'

export const metadata = {
  title: 'Change Pitch vs Change Speed — What\'s the Difference? | Complete Guide',
  description: 'Understand the difference between pitch shifting and speed/tempo changes. Learn when to use each technique for singing, music practice, DJing, and more.',
  keywords: ['change pitch vs tempo', 'what is pitch shifting', 'pitch vs speed audio', 'time stretching vs pitch shifting'],
  alternates: {
    canonical: 'https://pitchchanger.io/change-pitch-vs-change-speed',
  },
  openGraph: {
    title: 'Change Pitch vs Change Speed — What\'s the Difference?',
    description: 'Understand the difference between pitch shifting and speed/tempo changes. Learn when to use each technique.',
    url: 'https://pitchchanger.io/change-pitch-vs-change-speed',
    siteName: 'Pitch Changer',
    type: 'article',
    images: [
      {
        url: 'https://pitchchanger.io/pitchchanger.png',
        width: 1024,
        height: 1024,
        alt: 'Pitch vs Speed Explanation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Change Pitch vs Change Speed — What\'s the Difference?',
    description: 'Understand the difference between pitch shifting and speed/tempo changes. Learn when to use each technique.',
    images: ['https://pitchchanger.io/1200x600-pitchchanger-x.png'],
  },
}

export default function PitchVsSpeedPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <article className="max-w-3xl mx-auto space-y-10 text-gray-300">
        {/* Hero */}
        <header className="text-center py-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            🎵 Pitch vs Speed — What's the Difference?
          </h1>
        </header>

        {/* Visual: Two icons side by side */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6 text-center">
            <div className="text-5xl mb-3">🎹</div>
            <h3 className="text-xl font-bold text-purple-300">Pitch</h3>
            <p className="text-sm text-gray-400 mt-2">How HIGH or LOW it sounds</p>
          </div>
          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl p-6 text-center">
            <div className="text-5xl mb-3">⏱️</div>
            <h3 className="text-xl font-bold text-cyan-300">Speed</h3>
            <p className="text-sm text-gray-400 mt-2">How FAST or SLOW it plays</p>
          </div>
        </div>

        {/* The Vinyl Problem with SVG illustration */}
        <section id="the-vinyl-problem" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">📀 The Vinyl Record Problem</h2>

          {/* Vinyl Record SVG Illustration */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-600/30 rounded-xl p-6">
            <div className="flex justify-center mb-4">
              <svg viewBox="0 0 200 120" className="w-full max-w-xs" aria-label="Vinyl record showing pitch and speed linked">
                {/* Record */}
                <circle cx="60" cy="60" r="50" fill="#1a1a2e" stroke="#333" strokeWidth="2"/>
                <circle cx="60" cy="60" r="35" fill="#1a1a2e" stroke="#444" strokeWidth="1"/>
                <circle cx="60" cy="60" r="20" fill="#1a1a2e" stroke="#444" strokeWidth="1"/>
                <circle cx="60" cy="60" r="8" fill="#e94560"/>
                <circle cx="60" cy="60" r="3" fill="#1a1a2e"/>
                {/* Grooves */}
                <circle cx="60" cy="60" r="45" fill="none" stroke="#333" strokeWidth="0.5"/>
                <circle cx="60" cy="60" r="40" fill="none" stroke="#333" strokeWidth="0.5"/>
                <circle cx="60" cy="60" r="30" fill="none" stroke="#333" strokeWidth="0.5"/>
                <circle cx="60" cy="60" r="25" fill="none" stroke="#333" strokeWidth="0.5"/>
                {/* Arrow showing spin */}
                <path d="M 95 30 Q 110 60 95 90" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round"/>
                <polygon points="95,90 90,82 100,82" fill="#f97316"/>
                {/* Labels */}
                <text x="140" y="45" fill="#f97316" style={{fontSize: '10px', fontWeight: 'bold'}}>FASTER</text>
                <text x="140" y="58" fill="#f97316" style={{fontSize: '8px'}}>= Higher pitch</text>
                <text x="140" y="85" fill="#60a5fa" style={{fontSize: '10px', fontWeight: 'bold'}}>SLOWER</text>
                <text x="140" y="98" fill="#60a5fa" style={{fontSize: '8px'}}>= Lower pitch</text>
              </svg>
            </div>
            <p className="text-center text-sm text-gray-400">
              On vinyl, speed and pitch are <span className="text-orange-400 font-semibold">locked together</span>
            </p>
          </div>

          <p>
            Play a record too fast → chipmunk voices. Too slow → deep monster sounds.
            For decades, that's just how it worked!
          </p>

          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-5">
            <p className="text-sm">
              <span className="text-lg">✨</span> <strong className="text-green-400">The digital fix:</strong> Modern tools use
              "pitch shifting" and "time stretching" algorithms to separate these. Now you can change one without affecting the other!
            </p>
          </div>
        </section>

        {/* What is Pitch */}
        <section id="what-is-pitch" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">🎹 What is Pitch?</h2>
          <p>
            Pitch = how HIGH or LOW something sounds. Think of piano keys — left side is low, right side is high.
            When you "change pitch," you shift everything up or down while keeping the same length.
          </p>

          {/* Waveform SVG showing pitch change */}
          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-6">
            <p className="text-center text-sm text-purple-300 mb-4 font-semibold">Pitch Shift Visualization</p>
            <svg viewBox="0 0 300 100" className="w-full" aria-label="Waveform showing pitch change">
              {/* Original waveform */}
              <text x="10" y="15" fill="#94a3b8" style={{fontSize: '10px'}}>Original</text>
              <path d="M 10 35 Q 25 20 40 35 Q 55 50 70 35 Q 85 20 100 35 Q 115 50 130 35 Q 145 20 160 35"
                    fill="none" stroke="#94a3b8" strokeWidth="2"/>

              {/* Arrow */}
              <text x="175" y="35" fill="#a855f7" style={{fontSize: '16px'}}>→</text>

              {/* Higher pitch waveform (more compressed waves) */}
              <text x="200" y="15" fill="#a855f7" style={{fontSize: '10px'}}>+3 semitones</text>
              <path d="M 200 35 Q 210 22 220 35 Q 230 48 240 35 Q 250 22 260 35 Q 270 48 280 35 Q 290 22 300 35"
                    fill="none" stroke="#a855f7" strokeWidth="2"/>

              {/* Labels */}
              <text x="70" y="60" fill="#94a3b8" style={{fontSize: '9px'}} textAnchor="middle">Normal waves</text>
              <text x="250" y="60" fill="#a855f7" style={{fontSize: '9px'}} textAnchor="middle">Tighter waves = Higher</text>

              {/* Duration bar - same length */}
              <rect x="10" y="75" width="150" height="8" rx="4" fill="#334155"/>
              <text x="85" y="95" fill="#64748b" style={{fontSize: '8px'}} textAnchor="middle">3:00</text>

              <rect x="200" y="75" width="100" height="8" rx="4" fill="#334155"/>
              <text x="250" y="95" fill="#64748b" style={{fontSize: '8px'}} textAnchor="middle">Still 3:00!</text>
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 text-center">
              <span className="text-2xl">⬆️</span>
              <p className="text-sm text-purple-300 mt-1">Higher pitch</p>
              <p className="text-xs text-gray-500">+1 to +12 semitones</p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 text-center">
              <span className="text-2xl">⬇️</span>
              <p className="text-sm text-purple-300 mt-1">Lower pitch</p>
              <p className="text-xs text-gray-500">-1 to -12 semitones</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4">
            <p className="text-sm">
              <span className="text-lg">💡</span> <strong className="text-purple-300">Example:</strong> Song too high for your voice?
              Drop it by -2 or -3 semitones. The song stays the same length, just in a lower key!
            </p>
          </div>
        </section>

        {/* What is Speed */}
        <section id="what-is-speed" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">⏱️ What is Speed?</h2>
          <p>
            Speed = how FAST or SLOW the audio plays. Unlike pitch, changing speed affects the total length
            of your audio. But with modern tools, the pitch stays natural — no chipmunks!
          </p>

          {/* Waveform SVG showing speed/time change */}
          <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-xl p-6">
            <p className="text-center text-sm text-cyan-300 mb-4 font-semibold">Time Stretch Visualization</p>
            <svg viewBox="0 0 300 100" className="w-full" aria-label="Waveform showing time stretch">
              {/* Original waveform */}
              <text x="10" y="15" fill="#94a3b8" style={{fontSize: '10px'}}>Original</text>
              <path d="M 10 35 Q 25 20 40 35 Q 55 50 70 35 Q 85 20 100 35 Q 115 50 130 35"
                    fill="none" stroke="#94a3b8" strokeWidth="2"/>

              {/* Arrow */}
              <text x="145" y="35" fill="#22d3ee" style={{fontSize: '16px'}}>→</text>

              {/* Slower waveform (same wave shape, stretched out) */}
              <text x="170" y="15" fill="#22d3ee" style={{fontSize: '10px'}}>0.75x speed</text>
              <path d="M 170 35 Q 190 20 210 35 Q 230 50 250 35 Q 270 20 290 35"
                    fill="none" stroke="#22d3ee" strokeWidth="2"/>

              {/* Labels */}
              <text x="70" y="55" fill="#94a3b8" style={{fontSize: '9px'}} textAnchor="middle">Same wave shape</text>
              <text x="230" y="55" fill="#22d3ee" style={{fontSize: '9px'}} textAnchor="middle">Stretched out!</text>

              {/* Duration bars - different lengths */}
              <rect x="10" y="70" width="120" height="8" rx="4" fill="#334155"/>
              <text x="70" y="90" fill="#64748b" style={{fontSize: '8px'}} textAnchor="middle">3:00</text>

              <rect x="170" y="70" width="120" height="8" rx="4" fill="#0e7490"/>
              <text x="230" y="90" fill="#22d3ee" style={{fontSize: '8px'}} textAnchor="middle">4:00 (longer!)</text>
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 text-center">
              <span className="text-2xl">🐢</span>
              <p className="text-sm text-cyan-300 mt-1">Slower</p>
              <p className="text-xs text-gray-500">0.5x - 0.9x</p>
            </div>
            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 text-center">
              <span className="text-2xl">🚀</span>
              <p className="text-sm text-cyan-300 mt-1">Faster</p>
              <p className="text-xs text-gray-500">1.1x - 1.5x</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-4">
            <p className="text-sm">
              <span className="text-lg">💡</span> <strong className="text-cyan-300">Example:</strong> A 4-minute song at 0.75x becomes ~5:20.
              Perfect for learning tricky guitar solos or catching every word in fast speech!
            </p>
          </div>
        </section>

        {/* Comparison - Visual Cards */}
        <section id="comparison" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">📊 Quick Comparison</h2>

          {/* Visual comparison cards */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Pitch Card */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🎹</span>
                <h3 className="text-xl font-bold text-purple-300">Pitch Change</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Changes:</span>
                  <span className="text-purple-300">How high/low</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Keeps same:</span>
                  <span className="text-purple-300">Duration</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Units:</span>
                  <span className="text-purple-300">Semitones</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tech name:</span>
                  <span className="text-purple-300">Pitch shifting</span>
                </div>
              </div>
            </div>

            {/* Speed Card */}
            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">⏱️</span>
                <h3 className="text-xl font-bold text-cyan-300">Speed Change</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Changes:</span>
                  <span className="text-cyan-300">How fast/slow</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Keeps same:</span>
                  <span className="text-cyan-300">Pitch</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Units:</span>
                  <span className="text-cyan-300">0.5x - 1.5x</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tech name:</span>
                  <span className="text-cyan-300">Time stretching</span>
                </div>
              </div>
            </div>
          </div>

          {/* Simple sketch: before/after visual */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-600/30 rounded-xl p-6">
            <p className="text-center text-sm text-gray-400 mb-4">Think of it like this...</p>
            <svg viewBox="0 0 300 80" className="w-full" aria-label="Simple comparison sketch">
              {/* Pitch side */}
              <text x="75" y="15" fill="#a855f7" style={{fontSize: '11px', fontWeight: 'bold'}} textAnchor="middle">PITCH</text>
              {/* Piano keys sketch */}
              <rect x="30" y="25" width="15" height="35" fill="#fff" stroke="#666" rx="2"/>
              <rect x="47" y="25" width="15" height="35" fill="#fff" stroke="#666" rx="2"/>
              <rect x="64" y="25" width="15" height="35" fill="#fff" stroke="#666" rx="2"/>
              <rect x="81" y="25" width="15" height="35" fill="#fff" stroke="#666" rx="2"/>
              <rect x="98" y="25" width="15" height="35" fill="#fff" stroke="#666" rx="2"/>
              {/* Black keys */}
              <rect x="40" y="25" width="10" height="22" fill="#333" rx="1"/>
              <rect x="57" y="25" width="10" height="22" fill="#333" rx="1"/>
              <rect x="91" y="25" width="10" height="22" fill="#333" rx="1"/>
              {/* Arrow */}
              <path d="M 50 65 L 90 65" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrowPurple)"/>
              <text x="70" y="78" fill="#a855f7" style={{fontSize: '8px'}} textAnchor="middle">higher/lower</text>

              {/* Divider */}
              <line x1="150" y1="10" x2="150" y2="75" stroke="#475569" strokeWidth="1" strokeDasharray="4 4"/>

              {/* Speed side */}
              <text x="225" y="15" fill="#22d3ee" style={{fontSize: '11px', fontWeight: 'bold'}} textAnchor="middle">SPEED</text>
              {/* Clock sketch */}
              <circle cx="225" cy="45" r="20" fill="none" stroke="#22d3ee" strokeWidth="2"/>
              <line x1="225" y1="45" x2="225" y2="32" stroke="#22d3ee" strokeWidth="2"/>
              <line x1="225" y1="45" x2="235" y2="45" stroke="#22d3ee" strokeWidth="2"/>
              <circle cx="225" cy="45" r="3" fill="#22d3ee"/>
              {/* Speed lines */}
              <path d="M 250 35 L 260 35" stroke="#22d3ee" strokeWidth="1"/>
              <path d="M 250 45 L 265 45" stroke="#22d3ee" strokeWidth="1"/>
              <path d="M 250 55 L 260 55" stroke="#22d3ee" strokeWidth="1"/>
              <text x="225" y="78" fill="#22d3ee" style={{fontSize: '8px'}} textAnchor="middle">faster/slower</text>

              {/* Arrow marker */}
              <defs>
                <marker id="arrowPurple" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L9,3 z" fill="#a855f7"/>
                </marker>
              </defs>
            </svg>
          </div>
        </section>

        {/* When to Use Each */}
        <section id="when-to-use" className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">🎯 When to Use Each</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Pitch Use Cases */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎹</span>
                <h3 className="text-lg font-bold text-purple-300">Use Pitch Change For:</h3>
              </div>
              <div className="space-y-3">
                <div className="flex gap-3 items-start">
                  <span className="text-xl">🎤</span>
                  <div>
                    <p className="text-white font-medium">Vocals</p>
                    <p className="text-sm text-gray-400">Song too high/low for your voice? Shift it!</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-xl">🎸</span>
                  <div>
                    <p className="text-white font-medium">Instruments</p>
                    <p className="text-sm text-gray-400">Transpose to match different tunings</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-xl">🎧</span>
                  <div>
                    <p className="text-white font-medium">DJ Mixing</p>
                    <p className="text-sm text-gray-400">Match keys for smooth mashups</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-xl">🎵</span>
                  <div>
                    <p className="text-white font-medium">Karaoke</p>
                    <p className="text-sm text-gray-400">Get backing tracks in YOUR range</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Speed Use Cases */}
            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⏱️</span>
                <h3 className="text-lg font-bold text-cyan-300">Use Speed Change For:</h3>
              </div>
              <div className="space-y-3">
                <div className="flex gap-3 items-start">
                  <span className="text-xl">🐢</span>
                  <div>
                    <p className="text-white font-medium">Learning Music</p>
                    <p className="text-sm text-gray-400">Slow down fast solos to nail every note</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-xl">📝</span>
                  <div>
                    <p className="text-white font-medium">Transcription</p>
                    <p className="text-sm text-gray-400">Catch every word or note clearly</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-xl">🚀</span>
                  <div>
                    <p className="text-white font-medium">Podcasts/Books</p>
                    <p className="text-sm text-gray-400">Speed through content, save time</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-xl">✨</span>
                  <div>
                    <p className="text-white font-medium">Aesthetic Vibes</p>
                    <p className="text-sm text-gray-400">Slowed + reverb? You know the vibe</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Using Both Together */}
        <section id="both-together" className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">🔥 Pro Move: Use Both Together</h2>
          <p>
            Here's where it gets fun — since pitch and speed are now <em>independent</em>, you can combine them for ultimate control:
          </p>

          {/* Visual: Combined controls diagram */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-600/30 rounded-xl p-6">
            <svg viewBox="0 0 300 100" className="w-full max-w-md mx-auto" aria-label="Combined pitch and speed controls">
              {/* Pitch slider */}
              <text x="20" y="25" fill="#a855f7" style={{fontSize: '10px', fontWeight: 'bold'}}>🎹 PITCH</text>
              <rect x="20" y="35" width="120" height="8" rx="4" fill="#334155"/>
              <circle cx="90" cy="39" r="8" fill="#a855f7"/>
              <text x="20" y="58" fill="#64748b" style={{fontSize: '8px'}}>-12</text>
              <text x="130" y="58" fill="#64748b" style={{fontSize: '8px'}}>+12</text>

              {/* Plus sign */}
              <text x="155" y="45" fill="#fff" style={{fontSize: '20px', fontWeight: 'bold'}}>+</text>

              {/* Speed slider */}
              <text x="180" y="25" fill="#22d3ee" style={{fontSize: '10px', fontWeight: 'bold'}}>⏱️ SPEED</text>
              <rect x="180" y="35" width="100" height="8" rx="4" fill="#334155"/>
              <circle cx="210" cy="39" r="8" fill="#22d3ee"/>
              <text x="180" y="58" fill="#64748b" style={{fontSize: '8px'}}>0.5x</text>
              <text x="265" y="58" fill="#64748b" style={{fontSize: '8px'}}>1.5x</text>

              {/* Result */}
              <text x="150" y="85" fill="#10b981" style={{fontSize: '10px', fontWeight: 'bold'}} textAnchor="middle">= Total Control! 🎉</text>
            </svg>
          </div>

          {/* Example combinations */}
          <div className="grid gap-4">
            <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/30 rounded-xl p-4">
              <div className="flex gap-3 items-start">
                <span className="text-2xl">🎸</span>
                <div>
                  <p className="text-white font-semibold">Practice Mode</p>
                  <p className="text-sm text-gray-400">Slow down a fast solo to 0.7x <strong className="text-cyan-300">AND</strong> transpose +2 semitones to match your tuning</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-500/30 rounded-xl p-4">
              <div className="flex gap-3 items-start">
                <span className="text-2xl">🎤</span>
                <div>
                  <p className="text-white font-semibold">Performance Prep</p>
                  <p className="text-sm text-gray-400">Drop the key -3 semitones <strong className="text-purple-300">AND</strong> slow it down for a chill vibe</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/30 rounded-xl p-4">
              <div className="flex gap-3 items-start">
                <span className="text-2xl">💫</span>
                <div>
                  <p className="text-white font-semibold">Aesthetic Remix</p>
                  <p className="text-sm text-gray-400">The classic "slowed + reverb" uses slower speed + lower pitch for that dreamy, nostalgic sound</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4">
            <p className="text-sm">
              <span className="text-lg">💡</span> <Link href="/" className="text-accent hover:underline font-semibold">PitchChanger.io</Link> gives you both sliders on one screen —
              pitch from -12 to +12 semitones, speed from 0.5x to 1.5x. Hear changes in real-time as you adjust!
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-purple-500/20 via-accent/20 to-cyan-500/20 border border-accent/30 rounded-2xl p-8 text-center space-y-4">
          <div className="text-4xl">🎵✨🎧</div>
          <h2 className="text-2xl font-bold text-white">Ready to Try It?</h2>
          <p className="text-gray-300">
            Adjust pitch and speed independently — free, fast, and totally private.
          </p>
          <Link href="/" className="inline-block px-8 py-4 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-all hover:scale-105 text-lg">
            Open PitchChanger.io →
          </Link>
        </section>

        {/* Related Links */}
        <div className="pt-6 border-t border-divider">
          <p className="text-sm text-gray-500 mb-3">More guides & tools:</p>
          <div className="flex gap-3 text-sm flex-wrap">
            <Link href="/" className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-full text-gray-300 transition-colors">← Home</Link>
            <Link href="/audio-pitch-changer" className="px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-full text-purple-300 transition-colors">🎹 Pitch Changer</Link>
            <Link href="/audio-speed-changer" className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 rounded-full text-cyan-300 transition-colors">⏱️ Speed Changer</Link>
            <Link href="/how-to-change-the-key-of-a-song" className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-full text-gray-300 transition-colors">🎵 Change Key</Link>
            <Link href="/resources" className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-full text-gray-300 transition-colors">📚 All Resources</Link>
          </div>
        </div>
      </article>
    </div>
  )
}
