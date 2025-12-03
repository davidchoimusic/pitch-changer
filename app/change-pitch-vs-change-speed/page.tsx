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
      <article className="max-w-3xl mx-auto space-y-8 text-gray-300">
        {/* Hero */}
        <header className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Change Pitch vs Change Speed — What's the Difference?
          </h1>
          <p className="text-xl text-gray-400">
            A complete guide to understanding pitch shifting and tempo changes — and when to use each technique.
          </p>
        </header>

        {/* Quick Summary */}
        <div className="bg-accent/10 border border-accent/30 rounded-lg p-6 space-y-3">
          <p className="font-semibold text-accent">The Short Answer:</p>
          <p>
            <strong className="text-white">Pitch</strong> determines how high or low a sound is (like notes on a piano).
            <strong className="text-white"> Speed</strong> determines how fast the audio plays (the tempo).
            Modern tools like <Link href="/" className="text-accent hover:underline">PitchChanger.io</Link> let you
            change either one independently — so you can raise a song's key without making it faster, or slow it
            down without making it sound deeper.
          </p>
        </div>

        {/* Table of Contents */}
        <nav className="bg-bg-card border border-divider rounded-lg p-6">
          <p className="font-semibold text-white mb-3">In This Guide:</p>
          <ul className="space-y-2 text-sm">
            <li><a href="#the-vinyl-problem" className="text-accent hover:underline">The Vinyl Record Problem</a></li>
            <li><a href="#what-is-pitch" className="text-accent hover:underline">What is Pitch?</a></li>
            <li><a href="#what-is-speed" className="text-accent hover:underline">What is Speed/Tempo?</a></li>
            <li><a href="#comparison" className="text-accent hover:underline">Side-by-Side Comparison</a></li>
            <li><a href="#when-to-use" className="text-accent hover:underline">When to Use Each</a></li>
            <li><a href="#both-together" className="text-accent hover:underline">Using Both Together</a></li>
          </ul>
        </nav>

        {/* The Vinyl Problem */}
        <section id="the-vinyl-problem" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">The Vinyl Record Problem (Why This Matters)</h2>
          <p>
            If you've ever played a vinyl record at the wrong speed, you know what happens: play it too fast and
            the music sounds higher-pitched (like chipmunks). Play it too slow and it sounds lower and deeper.
            This is because on a record player, pitch and speed are physically linked — changing one automatically
            changes the other.
          </p>
          <p>
            For decades, this was just how audio worked. If you wanted a song in a higher key, it would also be
            faster. If you wanted to slow down a recording to hear details, everything would sound unnaturally deep.
          </p>
          <div className="bg-bg-card border border-divider rounded-lg p-5">
            <p className="text-sm">
              <strong className="text-white">The digital solution:</strong> Modern audio processing can separate
              pitch and speed using algorithms called "pitch shifting" and "time stretching." This means you can
              now adjust either property independently, opening up possibilities that were impossible with analog technology.
            </p>
          </div>
        </section>

        {/* What is Pitch */}
        <section id="what-is-pitch" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">What is Pitch? (The Musical Key)</h2>
          <p>
            Pitch is the perceived highness or lowness of a sound. In music, we organize pitches into notes
            (A, B, C, D, E, F, G) and measure the distance between them in "semitones" (half-steps).
          </p>
          <p>
            When you "change the pitch" of audio, you're shifting all the frequencies up or down while keeping
            the duration the same. The song stays the same length — it just sounds higher or lower. Musicians
            call this "transposing" because you're moving the song to a different musical key.
          </p>

          <div className="bg-bg-card border border-divider rounded-lg p-6 space-y-4">
            <p className="font-semibold text-white">What Pitch Changing Does:</p>
            <ul className="space-y-2">
              <li className="flex gap-3">
                <span className="text-green-400">✓</span>
                <span>Raises or lowers the musical key</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400">✓</span>
                <span>Maintains the original tempo and duration</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400">✓</span>
                <span>A 3-minute song stays 3 minutes</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400">✓</span>
                <span>All instruments and vocals shift together</span>
              </li>
            </ul>
          </div>

          <div className="bg-bg-card border border-divider rounded-lg p-5">
            <p className="text-sm">
              <strong className="text-white">Example:</strong> A song originally in the key of C major can be shifted
              up by 2 semitones to D major. The melody, chords, and all instruments move up by the same amount.
              A singer with a higher voice might need this to hit the notes comfortably.
            </p>
          </div>
        </section>

        {/* What is Speed */}
        <section id="what-is-speed" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">What is Speed/Tempo? (Time Stretching)</h2>
          <p>
            Speed (or tempo) refers to how fast the audio plays. In music, tempo is usually measured in beats per
            minute (BPM). A song at 120 BPM has 120 beats in one minute.
          </p>
          <p>
            When you "change the speed" of audio while preserving pitch, you're using a technique called "time
            stretching." The audio plays faster or slower, but the pitch stays the same — voices don't sound
            like chipmunks or monsters.
          </p>

          <div className="bg-bg-card border border-divider rounded-lg p-6 space-y-4">
            <p className="font-semibold text-white">What Speed Changing Does:</p>
            <ul className="space-y-2">
              <li className="flex gap-3">
                <span className="text-green-400">✓</span>
                <span>Makes audio play faster or slower</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400">✓</span>
                <span>Maintains the original pitch and key</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400">✓</span>
                <span>Changes the total duration of the audio</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400">✓</span>
                <span>Voices and instruments sound natural (not chipmunk/monster)</span>
              </li>
            </ul>
          </div>

          <div className="bg-bg-card border border-divider rounded-lg p-5">
            <p className="text-sm">
              <strong className="text-white">Example:</strong> A 4-minute song played at 0.75x speed becomes about
              5 minutes 20 seconds long. The pitch stays exactly the same — perfect for learning a difficult
              guitar solo or catching every word in fast speech.
            </p>
          </div>
        </section>

        {/* Comparison Table */}
        <section id="comparison" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Side-by-Side Comparison</h2>
          <div className="bg-bg-card border border-divider rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-divider bg-gray-800/50">
                  <th className="text-left p-4 text-gray-400">Property</th>
                  <th className="text-left p-4 text-accent">Pitch Change</th>
                  <th className="text-left p-4 text-green-400">Speed Change</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-divider/50">
                  <td className="p-4 text-white">What changes</td>
                  <td className="p-4">How high/low it sounds</td>
                  <td className="p-4">How fast it plays</td>
                </tr>
                <tr className="border-b border-divider/50">
                  <td className="p-4 text-white">What stays the same</td>
                  <td className="p-4">Duration and tempo</td>
                  <td className="p-4">Pitch and key</td>
                </tr>
                <tr className="border-b border-divider/50">
                  <td className="p-4 text-white">Measured in</td>
                  <td className="p-4">Semitones (half-steps)</td>
                  <td className="p-4">Percentage (0.5x - 1.5x)</td>
                </tr>
                <tr className="border-b border-divider/50">
                  <td className="p-4 text-white">Technical term</td>
                  <td className="p-4">Pitch shifting / Transposition</td>
                  <td className="p-4">Time stretching</td>
                </tr>
                <tr>
                  <td className="p-4 text-white">Common use</td>
                  <td className="p-4">Matching vocal range, key matching</td>
                  <td className="p-4">Practice, transcription, podcasts</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* When to Use Each */}
        <section id="when-to-use" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">When to Use Each Technique</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold text-accent">Use Pitch Change When:</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span>•</span>
                  <span>A song is too high or low for your voice</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>You need to transpose for a different instrument</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>You're matching keys for DJ mixing/mashups</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Creating karaoke tracks in your range</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>A student needs a piece in an easier key</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold text-green-400">Use Speed Change When:</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Learning a fast musical passage</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Transcribing lyrics or music</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Speeding through podcasts/audiobooks</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Creating slowed/sped up aesthetic versions</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Practicing at a comfortable pace</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Using Both Together */}
        <section id="both-together" className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Using Both Together</h2>
          <p>
            The real power comes from using pitch and speed changes together. Since they're independent in
            modern tools, you can create combinations that weren't possible before:
          </p>
          <div className="bg-bg-card border border-divider rounded-lg p-6 space-y-4">
            <ul className="space-y-3">
              <li className="flex gap-3 items-start">
                <span className="text-accent">•</span>
                <span>
                  <strong className="text-white">Practice scenario:</strong> Slow down a fast solo (0.7x speed)
                  AND transpose it to match your guitar tuning (+2 semitones)
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-accent">•</span>
                <span>
                  <strong className="text-white">Performance prep:</strong> Transpose a backing track to your key
                  AND slightly slow it for a more relaxed tempo
                </span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-accent">•</span>
                <span>
                  <strong className="text-white">Creative effects:</strong> The "slowed + reverb" aesthetic uses
                  slower speed with sometimes lower pitch for that dreamy sound
                </span>
              </li>
            </ul>
          </div>
          <p>
            <Link href="/" className="text-accent hover:underline">PitchChanger.io</Link> gives you both controls
            on one screen, so you can adjust pitch from -12 to +12 semitones and speed from 0.5x to 1.5x —
            all while hearing real-time previews.
          </p>
        </section>

        {/* CTA */}
        <div className="text-center py-8 border-t border-divider space-y-4">
          <p className="text-xl text-white font-medium">Ready to try it yourself?</p>
          <Link href="/" className="inline-block px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors">
            Experiment with Pitch & Speed →
          </Link>
        </div>

        {/* Related Links */}
        <div className="flex gap-4 text-sm flex-wrap">
          <Link href="/" className="text-accent hover:underline">← Back to Home</Link>
          <Link href="/audio-pitch-changer" className="text-accent hover:underline">Audio Pitch Changer</Link>
          <Link href="/audio-speed-changer" className="text-accent hover:underline">Audio Speed Changer</Link>
          <Link href="/how-to-change-the-key-of-a-song" className="text-accent hover:underline">How to Change Key</Link>
          <Link href="/resources" className="text-accent hover:underline">All Resources</Link>
        </div>
      </article>
    </div>
  )
}
