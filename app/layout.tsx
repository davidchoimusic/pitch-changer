import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'Change the Pitch of Your Song or Audio Online',
  description:
    'Free online pitch and speed changer. Change the pitch or tempo of any song or audio file without changing speed or quality. Works with MP3, WAV, FLAC, M4A, AAC — fast, easy, and secure.',
  keywords: [
    'free online pitch changer',
    'change pitch of a song',
    'pitch shifter',
    'change pitch without changing speed',
    'mp3 pitch changer',
    'transpose music',
    'audio pitch changer'
  ],
  alternates: {
    canonical: 'https://pitchchanger.io',
  },
  openGraph: {
    title: 'Change the Pitch of Your Song or Audio Online',
    description:
      'Free online pitch and speed changer. Change the pitch or tempo of any song or audio file without changing speed or quality. Works with MP3, WAV, FLAC, M4A, AAC — fast, easy, and secure.',
    url: 'https://pitchchanger.io',
    siteName: 'Pitch Changer',
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
    title: 'Change the Pitch of Your Song or Audio Online',
    description:
      'Free online pitch and speed changer. Change the pitch or tempo of any song or audio file without changing speed or quality. Works with MP3, WAV, FLAC, M4A, AAC — fast, easy, and secure.',
    images: ['https://pitchchanger.io/1200x600-pitchchanger-x.png'],
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
        {/* Favicon */}
        <link rel="icon" href="/pitchchanger.png" type="image/png" />
        <link rel="apple-touch-icon" href="/pitchchanger.png" />

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

        {/* WebSite Schema - Controls site name in Google Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Pitch Changer',
              alternateName: 'PitchChanger.io',
              url: 'https://pitchchanger.io',
            }),
          }}
        />

        {/* Schema.org Structured Data for Google Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Pitch Changer',
              alternateName: 'PitchChanger.io',
              url: 'https://pitchchanger.io',
              description: 'Free online pitch and speed changer. Change the pitch or tempo of any song or audio file without changing speed or quality.',
              applicationCategory: 'MultimediaApplication',
              operatingSystem: 'Any (Web Browser)',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              featureList: 'Pitch shifting, Speed control, Waveform visualization, MP3/WAV/FLAC/M4A/AAC support',
            }),
          }}
        />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Pitch Changer',
              alternateName: 'PitchChanger.io',
              url: 'https://pitchchanger.io',
              logo: 'https://pitchchanger.io/pitchchanger.png',
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'contact@pitchchanger.io',
                contactType: 'customer support'
              },
              sameAs: [
                'https://twitter.com/PitchChangerIO'
              ]
            }),
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
                  <Link href="/resources" className="hover:text-white transition-colors">Resources</Link>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  )
}
