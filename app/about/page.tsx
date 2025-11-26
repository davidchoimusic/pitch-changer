import Link from 'next/link'

export const metadata = {
  title: 'About - PitchChanger.io',
  description: 'About PitchChanger.io',
  alternates: {
    canonical: 'https://pitchchanger.io/about',
  },
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-6 text-sm md:text-base text-gray-300 leading-relaxed">
        <div>
          <h1 className="text-3xl font-bold">About PitchChanger.io</h1>
        </div>

        <p>
          PitchChanger.io is a free, browser-based pitch changer built for musicians, singers, DJs, teachers, and
          creators. It runs entirely in your browser, so your audio never leaves your device.
        </p>

        <p>
          We created this tool to make pitch shifting fast, private, and accessible. Upload common formats like MP3,
          WAV, FLAC, or M4A, adjust pitch up or down in real time, and download instantly—no installs, no accounts, no
          uploads.
        </p>

        <p>
          Whether you’re transposing songs for practice, preparing karaoke tracks, tweaking vocals, or testing remix
          ideas, PitchChanger.io keeps the workflow simple: real-time preview, preserve tempo, and a clean, ad-supported
          experience.
        </p>

        <Link href="/" className="text-accent hover:underline text-sm">
          ← Back to PitchChanger.io
        </Link>
      </div>
    </div>
  )
}
