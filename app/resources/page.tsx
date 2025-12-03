import Link from 'next/link'

export const metadata = {
  title: 'Resources & Guides | PitchChanger.io - Audio Editing Tutorials',
  description: 'Free guides and tools for pitch shifting, speed changing, and audio editing. Learn how to change pitch, transpose music, adjust audio speed, and more.',
  alternates: {
    canonical: 'https://pitchchanger.io/resources',
  },
}

export default function ResourcesPage() {
  const toolPages = [
    {
      title: 'Audio Pitch Changer',
      href: '/audio-pitch-changer',
      description: 'Change music pitch online without changing speed. Perfect for transposing songs to match your vocal range.',
      icon: '🎵'
    },
    {
      title: 'Audio Speed Changer',
      href: '/audio-speed-changer',
      description: 'Speed up or slow down audio without affecting pitch. Ideal for practice, transcription, and learning.',
      icon: '⏱️'
    },
  ]

  const guides = [
    {
      title: 'How to Change Pitch Online',
      href: '/change-pitch-online',
      description: 'Complete step-by-step guide to changing the pitch of any song online. Learn about semitones, transposition, and more.',
      readTime: '5 min read'
    },
    {
      title: 'How to Change the Key of a Song',
      href: '/how-to-change-the-key-of-a-song',
      description: 'Learn to transpose music online for different vocal ranges. Includes semitone reference chart and common examples.',
      readTime: '8 min read'
    },
    {
      title: 'Change Pitch vs Change Speed',
      href: '/change-pitch-vs-change-speed',
      description: 'Understand the difference between pitch shifting and tempo changes. Learn when to use each technique.',
      readTime: '6 min read'
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Resources & Guides</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to master audio pitch shifting and speed changing. Free tools and comprehensive guides.
          </p>
        </div>

        {/* Introduction */}
        <section className="bg-bg-card border border-divider rounded-lg p-6 md:p-8 space-y-4">
          <h2 className="text-2xl font-bold text-white">Welcome to the PitchChanger.io Learning Center</h2>
          <p className="text-gray-300">
            Whether you're a singer looking to transpose songs to your vocal range, a musician learning new pieces,
            a DJ preparing tracks for mixing, or a teacher creating educational materials, our resources will help
            you get the most out of audio pitch shifting and speed adjustment.
          </p>
          <p className="text-gray-300">
            All our tools work directly in your web browser with no software installation required. Your files
            are processed locally for complete privacy. Choose a tool below to get started, or read our guides
            to learn the fundamentals of pitch and tempo manipulation.
          </p>
          <div className="pt-4">
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors"
            >
              Start Using PitchChanger.io →
            </Link>
          </div>
        </section>

        {/* Tool Pages */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Audio Tools</h2>
            <p className="text-gray-400">Specialized tools for different audio manipulation tasks</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {toolPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="block bg-bg-card border border-divider rounded-lg p-6 hover:border-accent transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{page.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-accent transition-colors">{page.title}</h3>
                    <p className="text-sm text-gray-400">{page.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Guides */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">How-To Guides</h2>
            <p className="text-gray-400">In-depth tutorials and explanations</p>
          </div>
          <div className="grid gap-4">
            {guides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="block bg-bg-card border border-divider rounded-lg p-6 hover:border-accent transition-colors group"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-accent transition-colors">{guide.title}</h3>
                    <p className="text-sm text-gray-400">{guide.description}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap bg-gray-800 px-2 py-1 rounded">{guide.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Key Concepts Section */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Key Concepts</h2>
            <p className="text-gray-400">Understanding the fundamentals</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-bg-card border border-divider rounded-lg p-6 space-y-3">
              <h3 className="text-lg font-semibold text-white">What is Pitch?</h3>
              <p className="text-sm text-gray-400">
                Pitch is how high or low a sound is. In music, pitch is measured in semitones (half-steps).
                Raising the pitch by 12 semitones brings a note up one full octave. Our pitch changer lets
                you adjust pitch from -12 to +12 semitones without changing the tempo.
              </p>
            </div>
            <div className="bg-bg-card border border-divider rounded-lg p-6 space-y-3">
              <h3 className="text-lg font-semibold text-white">What is Tempo?</h3>
              <p className="text-sm text-gray-400">
                Tempo is the speed of the music, typically measured in beats per minute (BPM). Our speed
                changer lets you adjust playback speed from 0.5x to 1.5x without affecting the pitch.
                This is called time-stretching.
              </p>
            </div>
            <div className="bg-bg-card border border-divider rounded-lg p-6 space-y-3">
              <h3 className="text-lg font-semibold text-white">What is Transposition?</h3>
              <p className="text-sm text-gray-400">
                Transposition means moving all the notes in a piece of music up or down by the same interval.
                When you "change the key" of a song, you're transposing it. This preserves all the musical
                relationships while shifting everything higher or lower.
              </p>
            </div>
            <div className="bg-bg-card border border-divider rounded-lg p-6 space-y-3">
              <h3 className="text-lg font-semibold text-white">Pitch vs Speed</h3>
              <p className="text-sm text-gray-400">
                Traditional methods (like vinyl speed) change pitch and speed together. Modern digital
                processing separates these—you can change one without affecting the other. This is what
                makes PitchChanger.io so useful for musicians and creators.
              </p>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Popular Use Cases</h2>
            <p className="text-gray-400">How people use PitchChanger.io</p>
          </div>
          <div className="bg-bg-card border border-divider rounded-lg p-6 space-y-4">
            <ul className="space-y-3">
              <li className="flex gap-3 items-start">
                <span className="text-accent">•</span>
                <span><strong className="text-white">Singers:</strong> Transpose backing tracks to match your vocal range for performances or practice</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-accent">•</span>
                <span><strong className="text-white">Musicians:</strong> Slow down complex solos to learn them note-by-note, then speed up as you improve</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-accent">•</span>
                <span><strong className="text-white">DJs:</strong> Match keys between tracks for harmonic mixing or create slowed/nightcore versions</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-accent">•</span>
                <span><strong className="text-white">Teachers:</strong> Create practice materials at appropriate difficulty levels for students</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-accent">•</span>
                <span><strong className="text-white">Karaoke:</strong> Adjust any song to fit your voice perfectly</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-accent">•</span>
                <span><strong className="text-white">Transcription:</strong> Slow down audio to catch every word or note</span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center pt-8 border-t border-divider space-y-4">
          <p className="text-lg text-white">Ready to get started?</p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors"
          >
            Try PitchChanger.io Free →
          </Link>
          <div className="pt-4">
            <Link href="/" className="text-accent hover:underline text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
