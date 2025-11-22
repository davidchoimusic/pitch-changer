import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Pitch Changer - Audio Pitch Shifting Tool',
  description: 'Free web-based audio pitch shifting tool. Upload MP3 or WAV files and adjust pitch with precision.',
  keywords: ['pitch shift', 'audio editor', 'pitch changer', 'music tool', 'audio processing'],
  openGraph: {
    title: 'Pitch Changer',
    description: 'Free audio pitch shifting tool for musicians and creators',
    url: 'https://pitchchanger.io',
    siteName: 'Pitch Changer',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-white/5 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-light tracking-tight">
                  Pitch<span className="text-electric-blue">Changer</span>
                </h1>
                <nav className="flex gap-6 text-sm font-light">
                  <a href="#" className="hover:text-electric-blue transition-colors">About</a>
                  <a href="#" className="hover:text-electric-blue transition-colors">Sign In</a>
                </nav>
              </div>
            </div>
          </header>
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t border-white/5 py-8 mt-auto">
            <div className="container mx-auto px-4 text-center text-sm font-light text-white/50">
              <p>&copy; 2025 PitchChanger.io - Audio Pitch Shifting Tool</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
