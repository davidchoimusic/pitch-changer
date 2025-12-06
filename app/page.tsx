'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import Link from 'next/link'
import Image from 'next/image'
import { FileUpload } from '@/components/FileUpload'
import { AudioPlayerSoundTouch } from '@/components/AudioPlayerSoundTouch'
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
              },
              {
                '@type': 'Question',
                name: 'What audio formats are supported?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'MP3, WAV, FLAC, M4A, and AAC files up to 250MB.'
                }
              },
              {
                '@type': 'Question',
                name: "What's the maximum file size?",
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '250MB — plenty for most songs and audio files.'
                }
              },
              {
                '@type': 'Question',
                name: 'What format is the output?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'High-quality WAV file, which you can convert to other formats if needed.'
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

          {/* Popular Use Cases */}
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
            <h2 className="text-3xl font-bold text-center mb-6 md:mb-8">Popular Use Cases</h2>
            <div className="bg-bg-card border border-divider rounded-lg p-6 space-y-4 max-w-3xl mx-auto">
              <ul className="space-y-3">
                <li className="flex gap-3 items-start">
                  <span>🎤</span>
                  <span><strong className="text-white">Singers:</strong> Transpose backing tracks to match your vocal range for performances or practice</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span>🎸</span>
                  <span><strong className="text-white">Musicians:</strong> Slow down complex solos to learn them note-by-note, then speed up as you improve</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span>🎧</span>
                  <span><strong className="text-white">DJs:</strong> Match keys between tracks for harmonic mixing or create slowed/nightcore versions</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span>📚</span>
                  <span><strong className="text-white">Teachers:</strong> Create practice materials at appropriate difficulty levels for students</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span>🎵</span>
                  <span><strong className="text-white">Karaoke:</strong> Adjust any song to fit your voice perfectly</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span>📝</span>
                  <span><strong className="text-white">Transcription:</strong> Slow down audio to catch every word or note</span>
                </li>
              </ul>
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
                  a: "Yes. It's a free online pitch changer that works directly in your browser with real-time preview."
                },
                {
                  q: 'Are my files private?',
                  a: '100%. This audio pitch changer processes everything locally — nothing is uploaded.'
                },
                {
                  q: 'What audio formats are supported?',
                  a: 'MP3, WAV, FLAC, M4A, and AAC files up to 250MB.'
                },
                {
                  q: "What's the maximum file size?",
                  a: '250MB — plenty for most songs and audio files.'
                },
                {
                  q: 'What format is the output?',
                  a: 'High-quality WAV file, which you can convert to other formats if needed.'
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

          {/* Share Section */}
          <div className="text-center space-y-4 pt-8">
            <p className="text-gray-400">Share this tool</p>
            <div className="flex justify-center gap-3">
              {/* X (Twitter) */}
              <a
                href="https://twitter.com/intent/tweet?text=Found%20this%20free%20online%20pitch%20changer%20%E2%80%94%20change%20pitch%20without%20changing%20speed!&url=https%3A%2F%2Fpitchchanger.io"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-black hover:bg-gray-800 transition-colors"
                title="Share on X"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fpitchchanger.io"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0A66C2] hover:bg-[#004182] transition-colors"
                title="Share on LinkedIn"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              {/* Instagram (Copy Link) */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText('https://pitchchanger.io')
                  alert('Link copied! Share it on Instagram')
                }}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-80 transition-opacity"
                title="Copy link for Instagram"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </button>
              {/* Email */}
              <a
                href="mailto:?subject=Check%20out%20this%20free%20pitch%20changer&body=I%20found%20this%20free%20tool%20to%20change%20the%20pitch%20of%20songs%20without%20changing%20speed.%20Works%20great!%0A%0Ahttps%3A%2F%2Fpitchchanger.io"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-600 hover:bg-gray-500 transition-colors"
                title="Share via Email"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
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

          <AudioPlayerSoundTouch
            file={selectedFile}
            onBack={() => setSelectedFile(null)}
          />
        </div>
      )}
    </div>
    </>
  )
}
