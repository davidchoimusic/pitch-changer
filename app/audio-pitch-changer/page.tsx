import Link from 'next/link'

export const metadata = {
  title: 'Free Online Audio Pitch Changer | Change Music Pitch Online',
  description: 'Use this free online audio pitch changer to change the pitch of any song or audio file without changing speed. Works with MP3, WAV, FLAC, M4A, and AAC directly in your browser.',
  keywords: ['audio pitch changer', 'audio pitch changer online', 'change music pitch online', 'change pitch online'],
  alternates: {
    canonical: 'https://pitchchanger.io/audio-pitch-changer',
  },
  openGraph: {
    title: 'Free Online Audio Pitch Changer – Change Pitch Without Changing Speed',
    description: 'Change music pitch online in your browser. Shift key up or down without changing tempo. Supports MP3, WAV, FLAC, M4A, AAC.',
    url: 'https://pitchchanger.io/audio-pitch-changer',
    siteName: 'Pitch Changer',
    type: 'website',
    images: [
      {
        url: 'https://pitchchanger.io/pitchchanger.png',
        width: 1024,
        height: 1024,
        alt: 'Audio Pitch Changer Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Audio Pitch Changer',
    description: 'Change music pitch online in your browser. Shift key up or down without changing tempo. Supports MP3, WAV, FLAC, M4A, AAC.',
    images: ['https://pitchchanger.io/1200x600-pitchchanger-x.png'],
  },
}

export default function AudioPitchChangerPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <article className="max-w-3xl mx-auto space-y-10 text-gray-300">
        {/* Hero */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            🎹 Free Online Audio Pitch Changer
          </h1>
          <p className="text-lg text-gray-400">
            Shift the key of any song — without changing the tempo
          </p>
        </header>

        {/* Quick Feature Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4 text-center">
            <div className="text-2xl mb-1">🎵</div>
            <p className="text-sm text-purple-300">±12 semitones</p>
          </div>
          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl p-4 text-center">
            <div className="text-2xl mb-1">⏱️</div>
            <p className="text-sm text-cyan-300">Tempo locked</p>
          </div>
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4 text-center">
            <div className="text-2xl mb-1">🔒</div>
            <p className="text-sm text-green-300">100% private</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/30 rounded-xl p-4 text-center">
            <div className="text-2xl mb-1">💸</div>
            <p className="text-sm text-orange-300">Totally free</p>
          </div>
        </div>

        {/* What This Tool Does */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">🎯 What This Tool Does</h2>
          <p>
            PitchChanger.io is a <Link href="/" className="text-accent hover:underline">free audio pitch changer</Link> that runs entirely in your browser. Upload any audio file (MP3, WAV, FLAC, M4A, AAC), drag the pitch slider, and hear the change in real-time. When you're ready, export the result — no account needed, no files uploaded to servers.
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-bg-card border border-divider rounded-lg p-4 flex gap-3">
              <span className="text-xl">🎤</span>
              <div>
                <p className="text-white font-medium">Vocalists</p>
                <p className="text-sm text-gray-400">Match any song to your vocal range</p>
              </div>
            </div>
            <div className="bg-bg-card border border-divider rounded-lg p-4 flex gap-3">
              <span className="text-xl">🎸</span>
              <div>
                <p className="text-white font-medium">Musicians</p>
                <p className="text-sm text-gray-400">Transpose without retuning</p>
              </div>
            </div>
            <div className="bg-bg-card border border-divider rounded-lg p-4 flex gap-3">
              <span className="text-xl">🎧</span>
              <div>
                <p className="text-white font-medium">DJs & Producers</p>
                <p className="text-sm text-gray-400">Key-match tracks for mixing</p>
              </div>
            </div>
            <div className="bg-bg-card border border-divider rounded-lg p-4 flex gap-3">
              <span className="text-xl">📚</span>
              <div>
                <p className="text-white font-medium">Teachers</p>
                <p className="text-sm text-gray-400">Adapt songs for any student</p>
              </div>
            </div>
          </div>
        </section>

        {/* The Science Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">🔬 The Science: How Pitch Shifting Works</h2>

          <p>
            Changing pitch without changing speed is surprisingly complex. Here's what's happening under the hood:
          </p>

          {/* The Problem */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-600/30 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-white">The Challenge</h3>
            <p className="text-sm">
              In the physical world, pitch and speed are linked. A guitar string vibrating faster produces a higher note.
              A record spinning faster sounds higher <em>and</em> plays faster. This is why old-school methods give you "chipmunk voice" when you speed up audio.
            </p>
            <svg viewBox="0 0 300 80" className="w-full max-w-md mx-auto" aria-label="Pitch and speed linked in physical world">
              <text x="50" y="20" fill="#f97316" style={{fontSize: '10px', fontWeight: 'bold'}}>Physical World</text>
              <path d="M 30 45 Q 45 30 60 45 Q 75 60 90 45 Q 105 30 120 45" fill="none" stroke="#94a3b8" strokeWidth="2"/>
              <text x="75" y="70" fill="#94a3b8" style={{fontSize: '8px'}} textAnchor="middle">Normal</text>

              <text x="160" y="40" fill="#64748b" style={{fontSize: '14px'}}>→</text>

              <path d="M 190 45 Q 200 33 210 45 Q 220 57 230 45 Q 240 33 250 45 Q 260 57 270 45 Q 280 33 290 45" fill="none" stroke="#f97316" strokeWidth="2"/>
              <text x="240" y="70" fill="#f97316" style={{fontSize: '8px'}} textAnchor="middle">Faster = Higher pitch</text>
            </svg>
          </div>

          {/* The Solution: Phase Vocoder */}
          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-purple-300">The Solution: Phase Vocoder</h3>
            <p className="text-sm">
              Modern pitch shifters use a technique called a <strong className="text-white">phase vocoder</strong>. Instead of changing playback speed, it analyzes and reconstructs the audio:
            </p>
            <ol className="text-sm space-y-2 ml-4">
              <li className="flex gap-2">
                <span className="text-purple-400 font-bold">1.</span>
                <span><strong className="text-white">Analysis:</strong> The audio is broken into tiny overlapping chunks (called "frames") and analyzed using FFT (Fast Fourier Transform) to find all the frequencies present.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-400 font-bold">2.</span>
                <span><strong className="text-white">Frequency Shifting:</strong> All detected frequencies are mathematically shifted up or down by the desired amount (e.g., +2 semitones = multiply all frequencies by 1.122).</span>
              </li>
              <li className="flex gap-2">
                <span className="text-purple-400 font-bold">3.</span>
                <span><strong className="text-white">Resynthesis:</strong> The shifted frequencies are converted back to audio and the frames are overlapped smoothly to create continuous sound.</span>
              </li>
            </ol>
          </div>

          {/* Visual: The Process */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-600/30 rounded-xl p-6">
            <p className="text-center text-sm text-gray-400 mb-4 font-semibold">Phase Vocoder Pipeline</p>
            <svg viewBox="0 0 340 100" className="w-full" aria-label="Phase vocoder processing pipeline">
              {/* Input waveform */}
              <rect x="10" y="25" width="60" height="50" rx="8" fill="#334155" stroke="#475569"/>
              <path d="M 20 50 Q 30 35 40 50 Q 50 65 60 50" fill="none" stroke="#94a3b8" strokeWidth="2"/>
              <text x="40" y="90" fill="#94a3b8" style={{fontSize: '9px'}} textAnchor="middle">Input</text>

              {/* Arrow */}
              <path d="M 75 50 L 95 50" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow1)"/>

              {/* FFT Analysis */}
              <rect x="100" y="25" width="60" height="50" rx="8" fill="#4c1d95" stroke="#7c3aed"/>
              <rect x="110" y="45" width="6" height="20" fill="#a855f7"/>
              <rect x="120" y="35" width="6" height="30" fill="#a855f7"/>
              <rect x="130" y="50" width="6" height="15" fill="#a855f7"/>
              <rect x="140" y="55" width="6" height="10" fill="#a855f7"/>
              <text x="130" y="90" fill="#a855f7" style={{fontSize: '9px'}} textAnchor="middle">FFT Analysis</text>

              {/* Arrow */}
              <path d="M 165 50 L 185 50" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow1)"/>

              {/* Frequency Shift */}
              <rect x="190" y="25" width="60" height="50" rx="8" fill="#065f46" stroke="#10b981"/>
              <path d="M 200 55 L 240 40" stroke="#10b981" strokeWidth="2"/>
              <text x="220" y="60" fill="#10b981" style={{fontSize: '8px'}} textAnchor="middle">↑ shift</text>
              <text x="220" y="90" fill="#10b981" style={{fontSize: '9px'}} textAnchor="middle">Pitch Shift</text>

              {/* Arrow */}
              <path d="M 255 50 L 275 50" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow1)"/>

              {/* Output */}
              <rect x="280" y="25" width="50" height="50" rx="8" fill="#334155" stroke="#22d3ee"/>
              <path d="M 290 50 Q 297 38 304 50 Q 311 62 318 50" fill="none" stroke="#22d3ee" strokeWidth="2"/>
              <text x="305" y="90" fill="#22d3ee" style={{fontSize: '9px'}} textAnchor="middle">Output</text>

              <defs>
                <marker id="arrow1" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L9,3 z" fill="#475569"/>
                </marker>
              </defs>
            </svg>
          </div>

          {/* Granular Synthesis */}
          <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-cyan-300">Alternative: Granular Synthesis</h3>
            <p className="text-sm">
              Another approach is <strong className="text-white">granular synthesis</strong>. The audio is chopped into tiny "grains" (10-50ms each), each grain is pitch-shifted independently using simple resampling, then the grains are crossfaded back together.
            </p>
            <p className="text-sm">
              This is computationally simpler but can produce more audible artifacts. The best tools use a combination of techniques to get clean results.
            </p>
          </div>

          {/* Why Quality Varies */}
          <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/30 rounded-xl p-5 space-y-3">
            <h3 className="text-lg font-semibold text-orange-300">💡 Why Quality Varies Between Tools</h3>
            <p className="text-sm">
              The difference between good and bad pitch shifters comes down to:
            </p>
            <ul className="text-sm space-y-1">
              <li className="flex gap-2">
                <span className="text-orange-400">•</span>
                <span><strong className="text-white">Frame size & overlap</strong> — smaller frames = more temporal accuracy, but more frequency smearing</span>
              </li>
              <li className="flex gap-2">
                <span className="text-orange-400">•</span>
                <span><strong className="text-white">Phase coherence</strong> — keeping phases aligned between frames prevents "phasiness"</span>
              </li>
              <li className="flex gap-2">
                <span className="text-orange-400">•</span>
                <span><strong className="text-white">Transient handling</strong> — drums and percussive sounds need special treatment to stay punchy</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Semitones Explained */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">🎼 What's a Semitone?</h2>
          <p>
            A <strong className="text-white">semitone</strong> is the smallest interval in Western music — the distance between two adjacent piano keys (including black keys).
          </p>
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-600/30 rounded-xl p-6">
            <svg viewBox="0 0 300 80" className="w-full" aria-label="Piano keyboard showing semitones">
              {/* White keys */}
              <rect x="20" y="20" width="35" height="50" fill="#fff" stroke="#333" rx="2"/>
              <rect x="57" y="20" width="35" height="50" fill="#fff" stroke="#333" rx="2"/>
              <rect x="94" y="20" width="35" height="50" fill="#fff" stroke="#333" rx="2"/>
              <rect x="131" y="20" width="35" height="50" fill="#fff" stroke="#333" rx="2"/>
              <rect x="168" y="20" width="35" height="50" fill="#fff" stroke="#333" rx="2"/>
              <rect x="205" y="20" width="35" height="50" fill="#fff" stroke="#333" rx="2"/>
              <rect x="242" y="20" width="35" height="50" fill="#fff" stroke="#333" rx="2"/>
              {/* Black keys */}
              <rect x="45" y="20" width="22" height="32" fill="#1a1a2e" rx="2"/>
              <rect x="82" y="20" width="22" height="32" fill="#1a1a2e" rx="2"/>
              <rect x="156" y="20" width="22" height="32" fill="#1a1a2e" rx="2"/>
              <rect x="193" y="20" width="22" height="32" fill="#1a1a2e" rx="2"/>
              <rect x="230" y="20" width="22" height="32" fill="#1a1a2e" rx="2"/>
              {/* Labels */}
              <text x="37" y="78" fill="#64748b" style={{fontSize: '8px'}} textAnchor="middle">C</text>
              <text x="74" y="78" fill="#64748b" style={{fontSize: '8px'}} textAnchor="middle">D</text>
              <text x="111" y="78" fill="#64748b" style={{fontSize: '8px'}} textAnchor="middle">E</text>
              <text x="148" y="78" fill="#64748b" style={{fontSize: '8px'}} textAnchor="middle">F</text>
              {/* Semitone markers */}
              <path d="M 37 15 L 56 15" stroke="#a855f7" strokeWidth="2"/>
              <text x="46" y="12" fill="#a855f7" style={{fontSize: '7px'}} textAnchor="middle">1 semi</text>
            </svg>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400"><strong className="text-white">+12 semitones</strong> = 1 octave up</p>
                <p className="text-gray-400"><strong className="text-white">+7 semitones</strong> = perfect 5th up</p>
              </div>
              <div>
                <p className="text-gray-400"><strong className="text-white">-12 semitones</strong> = 1 octave down</p>
                <p className="text-gray-400"><strong className="text-white">-2 semitones</strong> = whole step down</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick How-To */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">⚡ Quick Start</h2>
          <div className="grid gap-3">
            <div className="flex gap-4 items-center bg-bg-card border border-divider rounded-lg p-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-white font-bold">1</span>
              <p><strong className="text-white">Upload</strong> — drag & drop any audio file (MP3, WAV, FLAC, M4A, AAC)</p>
            </div>
            <div className="flex gap-4 items-center bg-bg-card border border-divider rounded-lg p-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-white font-bold">2</span>
              <p><strong className="text-white">Adjust</strong> — move the pitch slider (±12 semitones)</p>
            </div>
            <div className="flex gap-4 items-center bg-bg-card border border-divider rounded-lg p-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-white font-bold">3</span>
              <p><strong className="text-white">Preview</strong> — hit play to hear changes in real-time</p>
            </div>
            <div className="flex gap-4 items-center bg-bg-card border border-divider rounded-lg p-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white font-bold">4</span>
              <p><strong className="text-white">Download</strong> — process and save your pitch-shifted file</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-purple-500/20 via-accent/20 to-cyan-500/20 border border-accent/30 rounded-2xl p-8 text-center space-y-4">
          <div className="text-4xl">🎹✨</div>
          <h2 className="text-2xl font-bold text-white">Ready to Change Pitch?</h2>
          <p className="text-gray-300">
            Shift any song to the perfect key — free, fast, and private.
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
            <Link href="/change-pitch-online" className="px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-full text-purple-300 transition-colors">📖 Step-by-Step Guide</Link>
            <Link href="/audio-speed-changer" className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 rounded-full text-cyan-300 transition-colors">⏱️ Speed Changer</Link>
            <Link href="/change-pitch-vs-change-speed" className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-full text-gray-300 transition-colors">📊 Pitch vs Speed</Link>
          </div>
        </div>
      </article>
    </div>
  )
}
