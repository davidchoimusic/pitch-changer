'use client'

import { useEffect, useState } from 'react'
import { FileUpload } from '@/components/FileUpload'
import { AudioPlayer } from '@/components/AudioPlayer'
import { Button } from '@/components/ui/Button'

// Deterministic spectrum analyzer values (no Math.random for hydration)
const spectrumSpeeds = [0.6, 0.9, 0.5, 1.1, 0.7, 0.8, 1.0, 0.6, 0.9, 0.7, 0.5, 0.8, 1.2, 0.6, 0.9, 0.7, 0.8, 0.6, 1.0, 0.5, 0.9, 0.7, 0.8, 0.6, 1.1, 0.5, 0.9, 0.8, 0.7, 1.0, 0.6, 0.8, 0.9, 0.7, 0.5, 1.1, 0.8, 0.6, 0.9, 0.7]

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

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
    <div className="container mx-auto px-4 py-8 md:py-12">
      {!selectedFile ? (
        <div className="max-w-4xl mx-auto space-y-8 md:space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-7 md:space-y-9">
            {/* Branding */}
            <div className="pb-3 md:pb-8">
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
                PitchChanger.io
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
              <h2
                className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(to bottom, rgb(255 255 255), rgb(191 219 254))' }}
              >
                Change the Pitch of Any Song or Audio Instantly
              </h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                A fast, free audio pitch changer for MP3, WAV, FLAC, M4A, AAC. Change pitch without changing speed — 100% browser-based, no uploads.
              </p>
              <div className="pt-2 flex justify-center">
                <Button
                  variant="primary"
                  size="md"
                  className="px-6 py-3"
                  onClick={() => document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Start Changing Pitch (Free)
                </Button>
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div id="upload">
            <FileUpload onFileSelect={setSelectedFile} maxSizeMB={250} />
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
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Musicians & Vocalists</h3>
                <p className="text-sm text-gray-400">
                  Transpose songs, change pitch for practice, adjust keys for your vocal range, or prepare backing tracks.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">DJs & Producers</h3>
                <p className="text-sm text-gray-400">
                  A fast online pitch changer for remixes, edits, and mixing — shift pitch without changing speed.
                </p>
              </div>
              <div className="space-y-2">
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
            <div className="space-y-4 max-w-3xl mx-auto text-left">
              <div>
                <h3 className="text-lg font-semibold">Does this change the pitch without changing speed?</h3>
                <p className="text-sm text-gray-400">
                  Yes. PitchChanger.io lets you change pitch without tempo change (preserve duration).
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Is it really online and free?</h3>
                <p className="text-sm text-gray-400">
                  Yes. It’s a free online pitch changer that works directly in your browser with real-time preview.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Are my files private?</h3>
                <p className="text-sm text-gray-400">
                  100%. This audio pitch changer processes everything locally — nothing is uploaded.
                </p>
              </div>
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
              Pitch Changer Tool
            </h1>
            <p
              className="text-xl md:text-2xl font-semibold bg-clip-text text-transparent mt-2"
              style={{ backgroundImage: 'linear-gradient(to bottom, rgb(255 255 255), rgb(191 219 254))' }}
            >
              PitchChanger.io
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

          <AudioPlayer
            file={selectedFile}
            onProcessComplete={(blob) => {
              // Handle download
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = `pitch-shifted-${selectedFile.name}`
              a.click()
              URL.revokeObjectURL(url)
            }}
          />
        </div>
      )}
    </div>
  )
}
