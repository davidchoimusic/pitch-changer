import Link from 'next/link'

export const metadata = {
  title: 'Resources & Guides | PitchChanger.io',
  description: 'Free guides and tools for pitch shifting, speed changing, and audio editing. Learn how to change pitch, transpose music, and adjust audio speed.',
  alternates: {
    canonical: 'https://pitchchanger.io/resources',
  },
}

export default function ResourcesPage() {
  const toolPages = [
    {
      title: 'Audio Speed Changer',
      href: '/audio-speed-changer',
      description: 'Change audio speed without affecting pitch'
    },
    {
      title: 'MP3 Pitch Changer',
      href: '/mp3-pitch-changer',
      description: 'Change the pitch of MP3 files instantly'
    },
    {
      title: 'Slow Down Audio',
      href: '/slow-down-audio',
      description: 'Slow down songs and recordings for practice'
    },
    {
      title: 'Speed Up Audio',
      href: '/speed-up-audio',
      description: 'Make audio faster without changing pitch'
    },
  ]

  const guides = [
    {
      title: 'How to Change the Key of a Song',
      href: '/how-to-change-the-key-of-a-song',
      description: 'Transpose music online for different vocal ranges'
    },
    {
      title: 'How to Slow Down Audio',
      href: '/how-to-slow-down-audio',
      description: 'Step-by-step guide to slowing down audio files'
    },
    {
      title: 'How to Speed Up Audio',
      href: '/how-to-speed-up-audio',
      description: 'Learn to increase playback speed effectively'
    },
    {
      title: 'Change Pitch vs Change Speed',
      href: '/change-pitch-vs-change-speed',
      description: 'Understand the difference between pitch and tempo'
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Resources & Guides</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Free guides and specialized tools for pitch shifting, speed changing, and audio editing.
          </p>
        </div>

        {/* Tool Pages */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Audio Tools</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {toolPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="block bg-bg-card border border-divider rounded-lg p-6 hover:border-accent transition-colors"
              >
                <h3 className="text-xl font-semibold text-white mb-2">{page.title}</h3>
                <p className="text-sm text-gray-400">{page.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Guides */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">How-To Guides</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {guides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="block bg-bg-card border border-divider rounded-lg p-6 hover:border-accent transition-colors"
              >
                <h3 className="text-xl font-semibold text-white mb-2">{guide.title}</h3>
                <p className="text-sm text-gray-400">{guide.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <div className="text-center pt-8 border-t border-divider">
          <Link href="/" className="text-accent hover:underline">
            ← Back to PitchChanger.io
          </Link>
        </div>
      </div>
    </div>
  )
}
