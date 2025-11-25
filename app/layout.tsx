import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'Free Online Pitch Changer | Change Pitch Without Changing Speed',
  description:
    'PitchChanger.io is a free online pitch changer. Upload MP3, WAV, FLAC, M4A, AAC and instantly change pitch without changing speed. 100% browser-based, no uploads.',
  keywords: [
    'free online pitch changer',
    'change pitch of a song',
    'pitch shifter',
    'change pitch without changing speed',
    'mp3 pitch changer',
    'transpose music',
    'audio pitch changer'
  ],
  openGraph: {
    title: 'Free Online Pitch Changer | Change Pitch Without Changing Speed',
    description:
      'PitchChanger.io is a free online pitch changer. Upload MP3, WAV, FLAC, M4A, AAC and instantly change pitch without changing speed. 100% browser-based, no uploads.',
    url: 'https://pitchchanger.io',
    siteName: 'PitchChanger.io',
    type: 'website',
    images: [
      {
        url: 'https://pitchchanger.io/pitchchanger.png',
        width: 1024,
        height: 1024,
        alt: 'PitchChanger.io logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PitchChangerIO',
    creator: '@PitchChangerIO',
    title: 'Free Online Pitch Changer | Change Pitch Without Changing Speed',
    description:
      'PitchChanger.io is a free online pitch changer. Upload MP3, WAV, FLAC, M4A, AAC and instantly change pitch without changing speed. 100% browser-based, no uploads.'
    ,
    images: ['https://pitchchanger.io/pitchchanger.png'],
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
      <head>
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2950955479321117"
          crossOrigin="anonymous"
        />

        {/* Google Analytics 4 */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-RB68Q82Z1B"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-RB68Q82Z1B', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
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
                <div className="mt-2 space-x-4">
                  <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                  <Link href="/terms" className="hover:text-white transition-colors">Terms of Condition</Link>
                  <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                  <Link href="/about" className="hover:text-white transition-colors">About</Link>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  )
}
