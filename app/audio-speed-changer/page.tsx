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
      <div className="max-w-3xl mx-auto space-y-8 text-gray-300">
        <h1 className="text-4xl font-bold text-white">Free Online Audio Speed Changer</h1>

        <p className="text-lg">
          Change audio speed online — slow down or speed up any song or recording without changing pitch.
          Perfect for musicians learning songs, students reviewing lectures, dancers practicing choreography,
          and anyone who needs audio at a different tempo.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">What This Tool Does</h2>
          <p className="mb-4">
            PitchChanger.io uses time-stretching technology to adjust playback speed while keeping the pitch
            exactly the same. Unlike old-school methods (like speeding up a vinyl record), our tool maintains
            natural-sounding voices and instruments at any speed.
          </p>
          <p>
            Slow down a fast guitar solo to 0.5× to learn it note-by-note, or speed up a lecture to 1.5×
            to save time — the audio stays clear and the pitch stays true.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Features</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong className="text-white">Speed range 0.5× to 1.5×</strong> — half speed to 50% faster</li>
            <li><strong className="text-white">Pitch stays constant</strong> — no chipmunk or monster voice effects</li>
            <li><strong className="text-white">Works with any format</strong> — MP3, WAV, FLAC, M4A, AAC</li>
            <li><strong className="text-white">100% browser-based</strong> — your files never leave your device</li>
            <li><strong className="text-white">Real-time preview</strong> — hear changes instantly as you adjust</li>
            <li><strong className="text-white">Free, no sign-up required</strong> — just upload and go</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">How to Change Audio Speed Online</h2>
          <ol className="list-decimal list-inside space-y-3">
            <li>
              <span className="font-semibold text-white">Upload your audio file</span>
              <p className="ml-6 mt-1 text-sm">Drag and drop or click to upload. Supports MP3, WAV, FLAC, M4A, AAC up to 250MB.</p>
            </li>
            <li>
              <span className="font-semibold text-white">Adjust the speed slider</span>
              <p className="ml-6 mt-1 text-sm">Move left to slow down (0.5× minimum), move right to speed up (1.5× maximum).</p>
            </li>
            <li>
              <span className="font-semibold text-white">Preview your changes</span>
              <p className="ml-6 mt-1 text-sm">Press play to hear the adjusted audio in real time. Fine-tune until it's perfect.</p>
            </li>
            <li>
              <span className="font-semibold text-white">Download the result</span>
              <p className="ml-6 mt-1 text-sm">Click Process Audio, then download your speed-adjusted file as high-quality WAV.</p>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">When to Slow Down Audio</h2>
          <div className="bg-bg-card border border-divider rounded-lg p-6 space-y-3">
            <ul className="space-y-2">
              <li className="flex gap-3">
                <span className="text-green-400">🐢</span>
                <span><strong className="text-white">Learning music:</strong> Slow down fast solos, complex riffs, or tricky passages to practice at your own pace</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400">🐢</span>
                <span><strong className="text-white">Transcription:</strong> Slow down speech or lyrics to catch every word accurately</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400">🐢</span>
                <span><strong className="text-white">Language learning:</strong> Slow down native speakers to better understand pronunciation</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400">🐢</span>
                <span><strong className="text-white">Dance practice:</strong> Learn choreography at a slower tempo before building up to full speed</span>
              </li>
            </ul>
            <p className="text-sm text-gray-400 mt-4">
              <strong>Recommended speeds:</strong> 0.75× for moderate slow-down, 0.5× for detailed study
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">When to Speed Up Audio</h2>
          <div className="bg-bg-card border border-divider rounded-lg p-6 space-y-3">
            <ul className="space-y-2">
              <li className="flex gap-3">
                <span className="text-orange-400">🚀</span>
                <span><strong className="text-white">Lectures & podcasts:</strong> Save time by listening at 1.25× or 1.5× without losing comprehension</span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-400">🚀</span>
                <span><strong className="text-white">Audiobooks:</strong> Get through books faster while still following the story</span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-400">🚀</span>
                <span><strong className="text-white">Workout music:</strong> Increase BPM for higher-energy exercise sessions</span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-400">🚀</span>
                <span><strong className="text-white">Review recordings:</strong> Quickly scan through meeting recordings or voice memos</span>
              </li>
            </ul>
            <p className="text-sm text-gray-400 mt-4">
              <strong>Recommended speeds:</strong> 1.25× for comfortable speed-up, 1.5× for maximum efficiency
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Speed vs Pitch: What's the Difference?</h2>
          <p className="mb-4">
            Traditional audio playback links speed and pitch together — play a record faster and everything
            sounds higher (the "chipmunk effect"). Our tool separates these using digital time-stretching,
            so you can change speed independently.
          </p>
          <p>
            Need to change the musical key instead of the tempo? Check out our{' '}
            <Link href="/audio-pitch-changer" className="text-accent hover:underline">Audio Pitch Changer</Link>{' '}
            or read our guide on{' '}
            <Link href="/change-pitch-vs-change-speed" className="text-accent hover:underline">Pitch vs Speed</Link>.
          </p>
        </section>

        <section className="bg-bg-card border border-divider rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-3">Ready to Change Audio Speed?</h2>
          <p className="mb-4">
            Upload any audio file and adjust the speed instantly — free, private, and no software to install.
          </p>
          <Link href="/" className="inline-block px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors">
            Open PitchChanger.io →
          </Link>
        </section>

        <div className="pt-8 border-t border-divider">
          <p className="text-sm mb-4">Related tools and guides:</p>
          <div className="flex gap-4 text-sm flex-wrap">
            <Link href="/" className="text-accent hover:underline">← Back to Home</Link>
            <Link href="/audio-pitch-changer" className="text-accent hover:underline">Audio Pitch Changer</Link>
            <Link href="/change-pitch-vs-change-speed" className="text-accent hover:underline">Pitch vs Speed Guide</Link>
            <Link href="/resources" className="text-accent hover:underline">All Resources</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
