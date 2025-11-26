import Link from 'next/link'

export const metadata = {
  title: 'Free Online MP3 Pitch Changer | Change MP3 Pitch Without Speed Change',
  description: 'Change the pitch of any MP3 file online without changing speed. Free, browser-based MP3 pitch changer for vocals, instruments, karaoke, and more.',
  keywords: ['mp3 pitch changer', 'change pitch mp3', 'audio pitch changer mp3', 'mp3 pitch shifter'],
}

export default function Mp3PitchChangerPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-8 text-gray-300">
        <h1 className="text-4xl font-bold text-white">Free Online MP3 Pitch Changer</h1>

        <p className="text-lg">
          Change the pitch of any MP3 file online without changing speed.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">About This Tool</h2>
          <p>
            PitchChanger.io is a fast, private MP3 pitch changer that works in your browser. Shift pitch up or down for vocals, instruments, karaoke, and more.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Features</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Change MP3 pitch without altering speed</li>
            <li>Real-time preview</li>
            <li>100% browser-based (no uploads)</li>
            <li>Free, fast, no install</li>
            <li>Semitone-accurate pitch shifting</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">How to Change MP3 Pitch</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Upload your MP3</li>
            <li>Adjust pitch (±12 semitones)</li>
            <li>Download your new audio</li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Who Uses This</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Singers practicing in different keys</li>
            <li>Guitar/piano players</li>
            <li>DJs and remix artists</li>
            <li>Teachers and students</li>
          </ul>
        </section>

        <div className="pt-8 border-t border-divider">
          <Link href="/" className="inline-block px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors">
            Try It Now →
          </Link>
        </div>

        <div className="flex gap-4 text-sm">
          <Link href="/" className="text-accent hover:underline">← Back to Home</Link>
          <Link href="/how-to-change-the-key-of-a-song" className="text-accent hover:underline">How to Change Key</Link>
          <Link href="/change-pitch-vs-change-speed" className="text-accent hover:underline">Pitch vs Speed</Link>
        </div>
      </div>
    </div>
  )
}
