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
      <div className="max-w-3xl mx-auto space-y-8 text-gray-300">
        <h1 className="text-4xl font-bold text-white">Free Online Audio Pitch Changer</h1>

        <p className="text-lg">
          Change the pitch of any song or audio file directly in your browser. PitchChanger.io is a free online audio pitch changer that lets you shift key up or down without changing speed. It works with MP3, WAV, FLAC, M4A, and AAC — no software, no uploads.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">What This Tool Does</h2>
          <p className="mb-4">
            Use this tool when you need to <Link href="/" className="text-accent hover:underline">change music pitch online</Link>. With PitchChanger.io, you can:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Raise or lower the key of a song</li>
            <li>Change pitch without affecting tempo</li>
            <li>Practice vocals or instruments in the perfect key</li>
            <li>Prepare tracks for karaoke, lessons, or performance</li>
          </ul>
          <p className="mt-4">
            All processing happens in your browser, so your audio never leaves your device.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Features</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Online audio pitch changer — works in any modern browser</li>
            <li>Change pitch without changing speed — tempo stays locked</li>
            <li>Supports multiple formats — MP3, WAV, FLAC, M4A, AAC</li>
            <li>Real-time preview — hear changes instantly as you move the slider</li>
            <li>No install, no upload — private, fast, free</li>
            <li>Precise semitone control — shift by up to ±12 semitones</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">How to Change Music Pitch Online</h2>
          <ol className="list-decimal list-inside space-y-3">
            <li>
              <span className="font-semibold text-white">Upload your audio file</span>
              <p className="ml-6 mt-1 text-sm">Drag and drop your MP3, WAV, FLAC, M4A, or AAC file into the upload area.</p>
            </li>
            <li>
              <span className="font-semibold text-white">Move the pitch slider</span>
              <p className="ml-6 mt-1 text-sm">Use the slider to change pitch in semitones. Shift the key up or down until it fits your voice or instrument.</p>
            </li>
            <li>
              <span className="font-semibold text-white">Preview your new key</span>
              <p className="ml-6 mt-1 text-sm">Press play to hear the adjusted audio in real time. Tempo stays the same while pitch changes.</p>
            </li>
            <li>
              <span className="font-semibold text-white">Download your file</span>
              <p className="ml-6 mt-1 text-sm">When you're happy with the result, export your new version instantly — all in your browser.</p>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Common Uses</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><span className="text-white">Singers & vocalists</span> — change the key of backing tracks to match your range</li>
            <li><span className="text-white">Guitarists & pianists</span> — transpose songs without re-tuning or re-charting</li>
            <li><span className="text-white">Karaoke & performances</span> — adjust pitch for live shows or practice</li>
            <li><span className="text-white">Producers & DJs</span> — experiment with key changes for remixes and mashups</li>
            <li><span className="text-white">Teachers & students</span> — quickly adapt songs for lessons and rehearsals</li>
          </ul>
        </section>

        <section className="bg-bg-card border border-divider rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-3">Ready to Change Music Pitch Online?</h2>
          <p className="mb-4">
            Use this free audio pitch changer online to change the key of any song in seconds.
          </p>
          <Link href="/" className="inline-block px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors">
            Open PitchChanger.io →
          </Link>
        </section>

        <div className="pt-8 border-t border-divider">
          <p className="text-sm mb-4">Related tools and guides:</p>
          <div className="flex gap-4 text-sm flex-wrap">
            <Link href="/" className="text-accent hover:underline">← Back to Home</Link>
            <Link href="/how-to-change-the-key-of-a-song" className="text-accent hover:underline">How to Change Key</Link>
            <Link href="/change-pitch-online" className="text-accent hover:underline">Change Pitch Online</Link>
            <Link href="/resources" className="text-accent hover:underline">All Resources</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
