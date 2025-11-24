import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PitchChanger.io - Change the Pitch of Your Song or Audio',
  description: 'Free web-based audio pitch shifting tool. Upload MP3 or WAV files and adjust pitch instantly.',
  keywords: ['pitch shift', 'audio editor', 'pitch changer', 'music tool', 'audio processing'],
  openGraph: {
    title: 'PitchChanger.io',
    description: 'Free audio pitch shifting tool for musicians and creators',
    url: 'https://pitchchanger.io',
    siteName: 'PitchChanger.io',
    type: 'website',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans overflow-x-hidden">
        <div className="min-h-screen flex">
          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-x-hidden">
            <main className="flex-1 overflow-x-hidden">
              {children}
            </main>
            <footer className="border-t border-divider py-6 mt-auto bg-bg-card">
              <div className="container mx-auto px-4 text-center text-sm text-gray-400">
                <p>&copy; 2025 PitchChanger.io - Free Audio Pitch Shifting Tool</p>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  )
}
