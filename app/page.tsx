'use client'

import { useState } from 'react'
import { FileUpload } from '@/components/FileUpload'
import { AudioPlayer } from '@/components/AudioPlayer'

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  return (
    <div className="container mx-auto px-4 py-12">
      {!selectedFile ? (
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-12">
            {/* Branding */}
            <div className="pb-8">
              <h1
                className="text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-white via-accent/80 to-accent bg-clip-text text-transparent"
                style={{ textShadow: '0 1px 0 rgba(255,255,255,0.35), 0 8px 22px rgba(59,130,246,0.35), 0 0 1px rgba(255,255,255,0.6)' }}
              >
                Pitch Changer Tool
              </h1>
              <p
                className="text-xl md:text-2xl font-semibold tracking-wide bg-gradient-to-r from-accent via-white/85 to-accent bg-clip-text text-transparent"
                style={{ textShadow: '0 1px 0 rgba(255,255,255,0.35), 0 6px 18px rgba(59,130,246,0.32)' }}
              >
                PitchChanger.io
              </p>

              {/* Unique separator */}
              <div className="mt-6 flex items-center justify-center gap-3 text-accent/80 text-lg tracking-widest">
                <span className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
                <span className="px-3 py-1 rounded-full border border-accent/40 bg-accent/10 shadow-[0_8px_20px_rgba(59,130,246,0.25)]">
                  ◎ ◎ ◎
                </span>
                <span className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
              </div>
            </div>

            {/* Tagline */}
            <div className="space-y-4">
              <h2
                className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-pink-400 via-purple-300 to-purple-500 bg-clip-text text-transparent"
                style={{ textShadow: '0 1px 0 rgba(255,255,255,0.35), 0 6px 18px rgba(192,132,252,0.28)' }}
              >
                Change the Pitch of Your<br />Song or Audio
              </h2>
              <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
                Free, instant pitch shifting in your browser. 100% client-side - your files never leave your device.
              </p>
            </div>
          </div>

          {/* Upload Section */}
          <FileUpload onFileSelect={setSelectedFile} maxSizeMB={250} />

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 pt-8">
            <div className="text-center space-y-3">
              <div className="text-5xl">⚡</div>
              <h3 className="text-lg font-semibold">Real-Time Processing</h3>
              <p className="text-sm text-gray-400">
                Hear changes instantly as you adjust the pitch slider
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="text-5xl">🔒</div>
              <h3 className="text-lg font-semibold">100% Private</h3>
              <p className="text-sm text-gray-400">
                Zero uploads - everything processed locally in your browser
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="text-5xl">🎯</div>
              <h3 className="text-lg font-semibold">Preserve Duration</h3>
              <p className="text-sm text-gray-400">
                Change pitch without affecting playback speed
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div className="border-t border-divider pt-16 space-y-8">
            <h2 className="text-3xl font-bold text-center">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 text-accent flex items-center justify-center text-lg font-semibold">
                  1
                </div>
                <h3 className="text-lg font-semibold">Upload Audio</h3>
                <p className="text-sm text-gray-400">
                  Drag and drop or select your MP3/WAV file (up to 250MB)
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 text-accent flex items-center justify-center text-lg font-semibold">
                  2
                </div>
                <h3 className="text-lg font-semibold">Adjust Pitch</h3>
                <p className="text-sm text-gray-400">
                  Use the slider to shift pitch up or down by semitones while listening in real-time
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 text-accent flex items-center justify-center text-lg font-semibold">
                  3
                </div>
                <h3 className="text-lg font-semibold">Download</h3>
                <p className="text-sm text-gray-400">
                  Export your pitch-shifted audio when you're satisfied with the result
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Inline Title */}
          <div className="text-center pb-6">
            <h1
              className="text-5xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-white via-accent/80 to-accent bg-clip-text text-transparent"
              style={{ textShadow: '0 1px 0 rgba(255,255,255,0.35), 0 8px 22px rgba(59,130,246,0.35), 0 0 1px rgba(255,255,255,0.6)' }}
            >
              Pitch Changer Tool
            </h1>
            <p
              className="text-xl md:text-2xl font-semibold tracking-wide bg-gradient-to-r from-accent via-white/85 to-accent bg-clip-text text-transparent"
              style={{ textShadow: '0 1px 0 rgba(255,255,255,0.35), 0 6px 18px rgba(59,130,246,0.32)' }}
            >
              PitchChanger.io
            </p>

            {/* Simple divider */}
            <div className="mt-6 flex items-center justify-center">
              <div className="h-px bg-accent/30 flex-1 max-w-xs"></div>
              <div className="w-2 h-2 bg-accent rounded-full mx-4"></div>
              <div className="h-px bg-accent/30 flex-1 max-w-xs"></div>
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
