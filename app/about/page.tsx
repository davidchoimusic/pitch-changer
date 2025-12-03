import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'About PitchChanger.io - Free Online Pitch & Speed Changer',
  description: 'Learn about PitchChanger.io, a free browser-based tool for musicians, singers, and creators to change pitch and speed of audio files privately and instantly.',
  alternates: {
    canonical: 'https://pitchchanger.io/about',
  },
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-8 text-sm md:text-base text-gray-300 leading-relaxed">
        {/* Header */}
        <div className="text-center space-y-4">
          <Image
            src="/pitchchanger.png"
            alt="PitchChanger.io Logo"
            width={80}
            height={80}
            className="mx-auto rounded-xl"
          />
          <h1 className="text-4xl font-bold text-white">About PitchChanger.io</h1>
          <p className="text-lg text-gray-400">Free, private, browser-based audio pitch and speed shifting</p>
        </div>

        {/* Mission */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Our Mission</h2>
          <p>
            PitchChanger.io was created with a simple goal: to provide musicians, singers, DJs, teachers, and creators
            with a fast, free, and completely private way to change the pitch and speed of audio files. We believe
            that essential audio tools should be accessible to everyone, without requiring expensive software,
            complicated installations, or uploading sensitive files to remote servers.
          </p>
          <p>
            Unlike traditional pitch-shifting software that can cost hundreds of dollars or online services that
            upload your files to their servers, PitchChanger.io processes everything directly in your web browser.
            Your audio files never leave your device, ensuring complete privacy and instant results.
          </p>
        </section>

        {/* How It Works */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">How It Works</h2>
          <div className="bg-bg-card border border-divider rounded-lg p-6 space-y-4">
            <p>
              PitchChanger.io uses advanced Web Audio API technology and the Tone.js library to perform
              professional-grade pitch shifting directly in your browser. Here's what makes it special:
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-accent font-bold">1.</span>
                <span><strong className="text-white">Client-Side Processing:</strong> All audio processing happens on your computer, not on our servers. This means faster results and complete privacy.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">2.</span>
                <span><strong className="text-white">Real-Time Preview:</strong> Hear your changes instantly as you adjust the pitch slider. No waiting for processing—just drag and listen.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">3.</span>
                <span><strong className="text-white">Tempo Preservation:</strong> Our pitch-shifting algorithm changes the key without affecting the speed. A 3-minute song stays 3 minutes, just in a different key.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent font-bold">4.</span>
                <span><strong className="text-white">Speed Control:</strong> Independently adjust playback speed from 0.5x to 1.5x without affecting pitch—perfect for practice and transcription.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Who It's For */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Who Uses PitchChanger.io?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-bg-card border border-divider rounded-lg p-5 space-y-2">
              <h3 className="font-semibold text-white">Singers & Vocalists</h3>
              <p className="text-sm">Transpose backing tracks to match your vocal range. Whether you need a song higher for soprano or lower for bass, adjust it in seconds.</p>
            </div>
            <div className="bg-bg-card border border-divider rounded-lg p-5 space-y-2">
              <h3 className="font-semibold text-white">Musicians & Bands</h3>
              <p className="text-sm">Practice along with songs in any key. Match the tuning of different instruments or prepare tracks for live performances.</p>
            </div>
            <div className="bg-bg-card border border-divider rounded-lg p-5 space-y-2">
              <h3 className="font-semibold text-white">DJs & Producers</h3>
              <p className="text-sm">Quickly test remix ideas, match keys for mashups, or create slowed/sped-up versions of tracks for your sets.</p>
            </div>
            <div className="bg-bg-card border border-divider rounded-lg p-5 space-y-2">
              <h3 className="font-semibold text-white">Music Teachers</h3>
              <p className="text-sm">Slow down complex passages for students to learn. Transpose songs to appropriate keys for different skill levels.</p>
            </div>
            <div className="bg-bg-card border border-divider rounded-lg p-5 space-y-2">
              <h3 className="font-semibold text-white">Karaoke Enthusiasts</h3>
              <p className="text-sm">Adjust any karaoke track to perfectly match your voice. No more straining for high notes or mumbling through low ones.</p>
            </div>
            <div className="bg-bg-card border border-divider rounded-lg p-5 space-y-2">
              <h3 className="font-semibold text-white">Content Creators</h3>
              <p className="text-sm">Create unique audio effects, adjust background music for videos, or experiment with creative pitch effects.</p>
            </div>
          </div>
        </section>

        {/* Supported Formats */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Supported Audio Formats</h2>
          <p>
            PitchChanger.io supports all common audio formats that modern web browsers can decode:
          </p>
          <div className="flex flex-wrap gap-3">
            {['MP3', 'WAV', 'FLAC', 'M4A', 'AAC', 'OGG', 'WEBM'].map((format) => (
              <span key={format} className="px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium">
                {format}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-400">
            Files up to 250MB are supported. Exported files are saved as high-quality WAV format to preserve audio fidelity.
          </p>
        </section>

        {/* Privacy Commitment */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Our Privacy Commitment</h2>
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 space-y-3">
            <p className="text-green-300 font-semibold">Your files stay on your device. Always.</p>
            <p>
              We take privacy seriously. When you use PitchChanger.io, your audio files are processed entirely
              within your web browser using JavaScript. No audio data is ever uploaded to our servers. This means:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>No file uploads to external servers</li>
              <li>No storage of your audio on our systems</li>
              <li>No third-party access to your files</li>
              <li>Instant processing without upload/download wait times</li>
            </ul>
            <p className="text-sm">
              Read our full <Link href="/privacy" className="text-accent hover:underline">Privacy Policy</Link> for more details.
            </p>
          </div>
        </section>

        {/* Free & Ad-Supported */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Free & Ad-Supported</h2>
          <p>
            PitchChanger.io is completely free to use. We're able to offer this service at no cost through
            advertising support. The ads you see help cover our hosting and development costs, allowing us to
            keep this tool accessible to musicians and creators around the world.
          </p>
        </section>

        {/* CTA */}
        <div className="text-center pt-8 border-t border-divider space-y-4">
          <p className="text-lg text-white font-medium">Ready to get started?</p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors"
          >
            Try PitchChanger.io Free →
          </Link>
        </div>

        {/* Back Link */}
        <div className="flex gap-4 text-sm">
          <Link href="/" className="text-accent hover:underline">← Back to Home</Link>
          <Link href="/resources" className="text-accent hover:underline">Resources & Guides</Link>
          <Link href="/contact" className="text-accent hover:underline">Contact Us</Link>
        </div>
      </div>
    </div>
  )
}
