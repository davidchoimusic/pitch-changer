'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import Link from 'next/link'
import Image from 'next/image'
import { FileUpload } from '@/components/FileUpload'
import { AudioPlayerBeta } from '@/components/AudioPlayerBeta'
import { Button } from '@/components/ui/Button'

// Deterministic spectrum analyzer values (no Math.random for hydration)
const spectrumSpeeds = [0.6, 0.9, 0.5, 1.1, 0.7, 0.8, 1.0, 0.6, 0.9, 0.7, 0.5, 0.8, 1.2, 0.6, 0.9, 0.7, 0.8, 0.6, 1.0, 0.5, 0.9, 0.7, 0.8, 0.6, 1.1, 0.5, 0.9, 0.8, 0.7, 1.0, 0.6, 0.8, 0.9, 0.7, 0.5, 1.1, 0.8, 0.6, 0.9, 0.7]

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Ensure page loads at top (avoid restoring deep scroll on refresh)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    const id = setTimeout(() => window.scrollTo({ top: 0, behavior: 'auto' }), 50)
    return () => clearTimeout(id)
  }, [])

  // Disable browser scroll restoration (especially on mobile Safari)
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      const prev = window.history.scrollRestoration
      window.history.scrollRestoration = 'manual'
      return () => {
        window.history.scrollRestoration = prev
      }
    }
  }, [])

  return (
    <>
      {/* FAQ Schema for Google Rich Results */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Does this change the pitch without changing speed?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. PitchChanger.io lets you change pitch without tempo change (preserve duration).'
                }
              },
              {
                '@type': 'Question',
                name: 'Is it really online and free?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Yes. It's a free online pitch changer that works directly in your browser with real-time preview."
                }
              },
              {
                '@type': 'Question',
                name: 'Are my files private?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '100%. This audio pitch changer processes everything locally — nothing is uploaded.'
                }
              }
            ]
          })
        }}
      />

      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Nav */}
      <header className="w-full mb-8 sticky top-0 z-20 bg-bg-page/90 backdrop-blur border-b border-divider">
        <div className="flex items-center gap-3 py-3">
          <Image
            src="/pitchchanger.png"
            alt="Pitch Changer Logo"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span
            className="text-xl md:text-2xl font-black bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(to bottom, rgb(255 255 255), rgb(191 219 254))' }}
          >
            PitchChanger.io
          </span>
        </div>
      </header>

      {!selectedFile ? (
        <div className="max-w-4xl mx-auto space-y-8 md:space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-0">
            {/* Branding */}
            <div className="pb-3 md:pb-8">
              <h1
                className="text-4xl md:text-5xl font-black bg-clip-text text-transparent leading-tight pb-1"
                style={{ backgroundImage: 'linear-gradient(to bottom, rgb(255 255 255), rgb(191 219 254))' }}
              >
                Free Online Pitch Changer
              </h1>
              <p
                className="text-lg md:text-xl font-semibold bg-clip-text text-transparent mt-2"
                style={{ backgroundImage: 'linear-gradient(to bottom, rgb(255 255 255), rgb(191 219 254))' }}
              >
                Change Pitch of Any Song or Audio
              </p>

              {/* Glowing gradient line */}
              <div className="mt-6 md:mt-8 mb-2 flex justify-center">
                <div
                  className="h-1 w-48 rounded-full"
                  style={{
                    backgroundImage: 'linear-gradient(to right, transparent, rgb(59 130 246), transparent)',
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)'
                  }}
                />
              </div>
            </div>

            {/* Tagline */}
            <div className="space-y-1 mt-0">
              <div className="text-center max-w-3xl mx-auto text-sm md:text-base leading-relaxed px-4">
                <p
                  className="font-semibold bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(to bottom, rgb(255 255 255), rgb(191 219 254))' }}
                >
                  PitchChanger.io is a free online pitch changer that lets you instantly change the pitch of a song without changing speed. This audio pitch changer works directly in your browser — no uploads, no installation required.
                </p>
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div id="upload">
            <FileUpload onFileSelect={setSelectedFile} maxSizeMB={250} />
          </div>

          {/* Supporting Copy */}
          <div className="text-center max-w-3xl mx-auto text-sm md:text-base text-gray-300 leading-relaxed space-y-2">
            <p>
              This free music pitch changer supports MP3, WAV, FLAC, and M4A. Easily transpose songs, shift keys, adjust vocals, or prepare tracks for karaoke, practice, teaching, and remixes — all without altering tempo.
            </p>
          </div>

          {/* Why Use PitchChanger.io */}
          <div className="space-y-4">
            <div className="mt-6 md:mt-8 mb-6 md:mb-8 flex justify-center">
              <div
                className="h-1 w-48 rounded-full"
                style={{
                  backgroundImage: 'linear-gradient(to right, transparent, rgb(59 130 246), transparent)',
                  boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)'
                }}
              />
            </div>
            <h2 className="text-3xl font-bold text-center mb-6 md:mb-8">Why Use PitchChanger.io?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2 bg-bg-card border border-divider rounded-lg p-5">
                <h3 className="text-lg font-semibold">Musicians & Vocalists</h3>
                <p className="text-sm text-gray-400">
                  Transpose songs, change pitch for practice, adjust keys for your vocal range, or prepare backing tracks.
                </p>
              </div>
              <div className="space-y-2 bg-bg-card border border-divider rounded-lg p-5">
                <h3 className="text-lg font-semibold">DJs & Producers</h3>
                <p className="text-sm text-gray-400">
                  A fast online pitch changer for remixes, edits, and mixing — shift pitch without changing speed.
                </p>
              </div>
              <div className="space-y-2 bg-bg-card border border-divider rounded-lg p-5">
                <h3 className="text-lg font-semibold">Teachers & Karaoke Users</h3>
                <p className="text-sm text-gray-400">
                  Change pitch of a song instantly for lessons, sing-alongs, and rehearsals with real-time preview.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="space-y-4">
            <div className="mt-6 md:mt-8 mb-6 md:mb-8 flex justify-center">
              <div
                className="h-1 w-48 rounded-full"
                style={{
                  backgroundImage: 'linear-gradient(to right, transparent, rgb(59 130 246), transparent)',
                  boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)'
                }}
              />
            </div>
            <h2 className="text-3xl font-bold text-center mb-6 md:mb-8">FAQ</h2>
            <div className="space-y-3 max-w-3xl mx-auto text-left">
              {[
                {
                  q: 'Does this change the pitch without changing speed?',
                  a: 'Yes. PitchChanger.io lets you change pitch without tempo change (preserve duration).'
                },
                {
                  q: 'Is it really online and free?',
                  a: 'Yes. It’s a free online pitch changer that works directly in your browser with real-time preview.'
                },
                {
                  q: 'Are my files private?',
                  a: '100%. This audio pitch changer processes everything locally — nothing is uploaded.'
                }
              ].map((item, idx) => {
                const isOpen = openFaq === idx
                return (
                  <div
                    key={item.q}
                    className="rounded-lg bg-bg-card border border-divider transition-colors"
                  >
                    <button
                      className="w-full px-4 py-3 flex items-center justify-between text-left"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-${idx}`}
                    >
                      <span className="text-lg md:text-lg font-semibold text-white">{item.q}</span>
                      <span className="text-accent text-xl">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div id={`faq-${idx}`} className="px-4 pb-4 text-sm text-gray-400">
                        {item.a}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 md:space-y-8">
          {/* Inline Title */}
          <div className="text-center pb-3 md:pb-6">
            <h1
              className="text-5xl md:text-6xl font-black bg-clip-text text-transparent leading-tight pb-1"
              style={{ backgroundImage: 'linear-gradient(to bottom, rgb(255 255 255), rgb(191 219 254))' }}
            >
              Free Online Pitch Changer
            </h1>
            <p
              className="text-xl md:text-2xl font-semibold bg-clip-text text-transparent mt-2"
              style={{ backgroundImage: 'linear-gradient(to bottom, rgb(255 255 255), rgb(191 219 254))' }}
            >
              Change Pitch of Any Song or Audio
            </p>

            {/* Glowing gradient line */}
            <div className="mt-12 md:mt-12 mb-2 flex justify-center">
              <div
                className="h-1 w-48 rounded-full"
                style={{
                  backgroundImage: 'linear-gradient(to right, transparent, rgb(59 130 246), transparent)',
                  boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)'
                }}
              />
            </div>
          </div>

          <AudioPlayerBeta
            file={selectedFile}
            onBack={() => setSelectedFile(null)}
          />
        </div>
      )}
    </div>
    </>
  )
}
