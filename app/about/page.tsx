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

        {/* About the Creator */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Why I Built This</h2>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 space-y-3">
            <p>
              Hi 👋, I'm <a href="https://en.wikipedia.org/wiki/David_Choi" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline font-semibold hover:text-white">David Choi</a> — singer, songwriter, and founder of <a href="https://choismusic.com" target="_blank" rel="noopener noreferrer" className="text-blue-300 underline font-semibold hover:text-white">CHOISMUSIC</a>.
            </p>
            <p>
              As a musician, I've spent countless hours needing to transpose songs for different vocal ranges, slow down
              tricky passages to learn them, or match keys for collaborations.
            </p>
            <p>
              So I built PitchChanger.io — a tool I actually wanted to use myself. It's fast, it's free, and most
              importantly, your files never leave your device. Everything processes right in your browser. No uploads,
              no waiting, no privacy concerns.
            </p>
            <p>
              Whether you're a singer adjusting a backing track, a guitarist learning a solo, or a teacher preparing
              materials for students, I hope this tool helps you the way I wished something like it existed years ago.
            </p>
          </div>
        </section>

        {/* Supported Formats */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white">Supported Audio Formats</h2>
          <p>
            PitchChanger.io supports all common audio formats that modern web browsers can decode:
          </p>
          <div className="flex flex-wrap gap-3">
            {['MP3', 'WAV', 'FLAC', 'M4A', 'AAC', 'OGG'].map((format) => (
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
