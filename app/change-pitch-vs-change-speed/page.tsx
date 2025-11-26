import Link from 'next/link'

export const metadata = {
  title: 'Change Pitch vs Change Speed — What\'s the Difference?',
  description: 'A simple explanation of pitch shifting vs tempo changing. Learn the difference between changing pitch and changing speed for audio files.',
  keywords: ['change pitch vs tempo', 'what is pitch shifting', 'pitch vs speed audio'],
  alternates: {
    canonical: 'https://pitchchanger.io/change-pitch-vs-change-speed',
  },
}

export default function PitchVsSpeedPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-8 text-gray-300">
        <h1 className="text-4xl font-bold text-white">Change Pitch vs Change Speed — What's the Difference?</h1>

        <p className="text-lg">
          A simple explanation of pitch shifting vs tempo changing.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Pitch Changing</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Raises or lowers the musical key</li>
            <li>Tempo stays the same</li>
            <li>Used by singers, musicians, DJs</li>
            <li>Example: Original song in C, change to E (higher)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Speed Changing (Tempo)</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Audio plays faster or slower</li>
            <li>Pitch stays the same</li>
            <li>Used for practice, transcription, studying</li>
            <li>Example: 0.75× speed for learning difficult passages</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Why It Matters</h2>
          <p>
            Pitch and speed are independent — modern tools separate them so you can adjust one without affecting the other.
            This gives you complete control over how your audio sounds.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Try Both</h2>
          <p>
            Experiment with both features and hear the difference for yourself using PitchChanger.io's independent pitch and speed controls.
          </p>
        </section>

        <div className="pt-8 border-t border-divider">
          <Link href="/" className="inline-block px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors">
            Experiment with Pitch & Speed →
          </Link>
        </div>

        <div className="flex gap-4 text-sm flex-wrap">
          <Link href="/" className="text-accent hover:underline">← Back to Home</Link>
          <Link href="/mp3-pitch-changer" className="text-accent hover:underline">MP3 Pitch Changer</Link>
          <Link href="/audio-speed-changer" className="text-accent hover:underline">Audio Speed Changer</Link>
        </div>
      </div>
    </div>
  )
}
