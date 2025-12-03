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
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            🎹 Free Online Audio Pitch Changer
          </h1>
        </header>

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
          <div className="bg-gradient-to-r from-teal-500/10 to-emerald-500/10 border border-teal-500/30 rounded-xl p-5 space-y-3">
            <h3 className="text-lg font-semibold text-teal-300">💡 Why Quality Varies Between Tools</h3>
            <p className="text-sm">
              The difference between good and bad pitch shifters comes down to:
            </p>
            <ul className="text-sm space-y-1">
              <li className="flex gap-2">
                <span className="text-teal-400">•</span>
                <span><strong className="text-white">Frame size & overlap</strong> — smaller frames = more temporal accuracy, but more frequency smearing</span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-400">•</span>
                <span><strong className="text-white">Phase coherence</strong> — keeping phases aligned between frames prevents "phasiness"</span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-400">•</span>
                <span><strong className="text-white">Transient handling</strong> — drums and percussive sounds need special treatment to stay punchy</span>
              </li>
            </ul>
          </div>
        </section>

        {/* History Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">📜 A Brief History of Pitch Shifting</h2>
          <p>
            The quest to change pitch independently from speed has driven audio innovation for over a century. Here's how we got from spinning records to real-time browser-based processing:
          </p>

          {/* Timeline */}
          <div className="space-y-4">
            {/* 1920s-1940s */}
            <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 border border-amber-500/30 rounded-xl p-5 space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📻</span>
                <h3 className="text-lg font-semibold text-amber-300">1920s–1940s: The Rotating Head Era</h3>
              </div>
              <p className="text-sm">
                The earliest pitch-changing patents date back to the <strong className="text-white">1920s</strong>. The basic idea: record audio onto tape or film, then use a <strong className="text-white">rotating playback head</strong> moving at a different rate than the recording head. By the 1940s, this technique appeared in Disney's <em>Cinderella</em> (1950), where many characters had pitched voices created this way.
              </p>
            </div>

            {/* 1950s-1960s */}
            <div className="bg-gradient-to-br from-indigo-900/30 to-blue-900/30 border border-indigo-500/30 rounded-xl p-5 space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎞️</span>
                <h3 className="text-lg font-semibold text-indigo-300">1950s–1960s: Varispeed & The Beatles</h3>
              </div>
              <p className="text-sm">
                Studio engineers discovered they could tweak reel-to-reel tape recorder <strong className="text-white">varispeed</strong> for crude pitch control. The technique became popular in the '60s — many <strong className="text-white">Beatles tracks</strong> used analog pitch-shifting effects. The Eltro "Information Rate Changer" (a rotary tape head device) was famously used for <strong className="text-white">HAL 9000's voice</strong> in <em>2001: A Space Odyssey</em>.
              </p>
            </div>

            {/* 1966 */}
            <div className="bg-gradient-to-br from-lime-900/30 to-green-900/30 border border-lime-500/30 rounded-xl p-5 space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔬</span>
                <h3 className="text-lg font-semibold text-lime-300">1966: The Phase Vocoder is Born</h3>
              </div>
              <p className="text-sm">
                <strong className="text-white">J.L. Flanagan and R.M. Golden</strong> at Bell Laboratories developed the <strong className="text-white">phase vocoder</strong> — originally for speech analysis. This mathematical technique (using FFT to analyze and resynthesize audio) would eventually become the foundation for all modern pitch shifters.
              </p>
            </div>

            {/* 1975 */}
            <div className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border border-emerald-500/30 rounded-xl p-5 space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎛️</span>
                <h3 className="text-lg font-semibold text-emerald-300">1975: The Digital Revolution Begins</h3>
              </div>
              <p className="text-sm">
                Eventide released the <strong className="text-white">H910 Harmonizer</strong> — the world's first commercially available digital pitch shifter. This groundbreaking hardware could shift pitch in real-time and became a staple in professional studios. It was used on countless hit records throughout the late '70s and '80s.
              </p>
            </div>

            {/* 1980s */}
            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-xl p-5 space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎹</span>
                <h3 className="text-lg font-semibold text-cyan-300">1980s: Samplers Take Over</h3>
              </div>
              <p className="text-sm">
                The <strong className="text-white">Fairlight CMI</strong> (1979) and other digital samplers gave musicians real-time pitch control over any recorded sound. Artists like <strong className="text-white">Peter Gabriel, Kate Bush, and Trevor Horn</strong> pioneered creative uses. The Publison Infernal Machine 90 could change pitch without affecting duration — a breakthrough for the era.
              </p>
            </div>

            {/* 1997-2000s */}
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-5 space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎤</span>
                <h3 className="text-lg font-semibold text-purple-300">1997: Auto-Tune Changes Everything</h3>
              </div>
              <p className="text-sm">
                Dr. Andy Hildebrand (an ex-Exxon engineer who used similar algorithms for seismic data!) created <strong className="text-white">Auto-Tune</strong>. Originally designed for subtle pitch correction, Cher's 1998 hit "<strong className="text-white">Believe</strong>" deliberately pushed the effect to its extreme — creating the iconic robotic vocal sound that defined a generation of pop music.
              </p>
            </div>

            {/* 2000s-2020s */}
            <div className="bg-gradient-to-br from-rose-900/30 to-red-900/30 border border-rose-500/30 rounded-xl p-5 space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">💻</span>
                <h3 className="text-lg font-semibold text-rose-300">2000s–Today: Software & AI</h3>
              </div>
              <p className="text-sm">
                DAWs like <strong className="text-white">Ableton Live</strong> (2001) and <strong className="text-white">Logic Pro</strong> integrated pitch shifting as standard features. The 2020s brought <strong className="text-white">AI-powered tools</strong> using neural networks for natural-sounding corrections. And now? Browser-based tools like PitchChanger.io let anyone shift pitch instantly — no downloads, no expensive software, no expertise required.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-accent/10 to-purple-500/10 border border-accent/30 rounded-xl p-4">
            <p className="text-sm text-center">
              <span className="text-lg">✨</span> From rotating tape heads to real-time browser processing — <strong className="text-white">100 years of innovation</strong> in your hands, for free.
            </p>
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
