import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'pitchchanger.io - Change the Pitch of Your Song or Audio',
  description: 'Free web-based audio pitch shifting tool. Upload MP3 or WAV files and adjust pitch instantly.',
  keywords: ['pitch shift', 'audio editor', 'pitch changer', 'music tool', 'audio processing'],
  openGraph: {
    title: 'pitchchanger.io',
    description: 'Free audio pitch shifting tool for musicians and creators',
    url: 'https://pitchchanger.io',
    siteName: 'pitchchanger.io',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        {/* Top Ad Banner */}
        <div className="w-full bg-bg-card border-b border-white/10">
          <div className="container mx-auto px-4 py-2">
            <div className="h-24 bg-gray-800/50 border border-gray-700 rounded flex items-center justify-center text-gray-500 text-sm">
              Ad Space - Top Banner (728x90)
            </div>
          </div>
        </div>

        <div className="min-h-screen flex">
          {/* Left Ad Sidebar */}
          <aside className="hidden lg:block w-40 border-r border-white/10 bg-bg-card">
            <div className="sticky top-0 p-4">
              <div className="h-96 bg-gray-800/50 border border-gray-700 rounded flex items-center justify-center">
                <p className="text-gray-500 text-xs text-center rotate-0">Ad Space<br/>160x600</p>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            <header className="border-b border-white/10 bg-bg-card/50 backdrop-blur-sm sticky top-0 z-50">
              <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-semibold">
                    pitchchanger.io
                  </h1>
                </div>
              </div>
            </header>
            <main className="flex-1">
              {children}
            </main>
            <footer className="border-t border-white/10 py-6 mt-auto bg-bg-card">
              <div className="container mx-auto px-4 text-center text-sm text-gray-400">
                <p>&copy; 2025 pitchchanger.io - Free Audio Pitch Shifting Tool</p>
              </div>
            </footer>
          </div>

          {/* Right Ad Sidebar */}
          <aside className="hidden lg:block w-40 border-l border-white/10 bg-bg-card">
            <div className="sticky top-0 p-4">
              <div className="h-96 bg-gray-800/50 border border-gray-700 rounded flex items-center justify-center">
                <p className="text-gray-500 text-xs text-center">Ad Space<br/>160x600</p>
              </div>
            </div>
          </aside>
        </div>
      </body>
    </html>
  )
}
