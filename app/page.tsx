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
              <h1 className="text-5xl md:text-6xl font-black bg-gradient-brand bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(192,132,252,0.5)]">
                Pitch Changer Tool
              </h1>
              <p className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-primary/80 to-accent-pink/80 bg-clip-text text-transparent mt-3">
                PitchChanger.io
              </p>

              {/* Animated waveform divider */}
              <div className="flex items-center justify-center gap-3 mt-8">
                <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent to-primary/40"></div>
                <div className="flex items-center gap-1.5">
                  {[6, 8, 10, 8, 6].map((height, i) => (
                    <div
                      key={i}
                      className="w-1 bg-gradient-to-t from-accent-pink to-primary rounded-full animate-pulse"
                      style={{
                        height: `${height * 4}px`,
                        animationDelay: `${i * 150}ms`
                      }}
                    />
                  ))}
                </div>
                <div className="h-px flex-1 max-w-xs bg-gradient-to-l from-transparent to-primary/40"></div>
              </div>
            </div>

            {/* Tagline */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-brand bg-clip-text text-transparent">
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
                  Drag and drop your audio file (MP3, WAV, FLAC, M4A, AAC - up to 250MB)
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
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-brand bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(192,132,252,0.5)]">
              Pitch Changer Tool
            </h1>
            <p className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-primary/80 to-accent-pink/80 bg-clip-text text-transparent mt-3">
              PitchChanger.io
            </p>

            {/* Animated waveform divider */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent to-primary/40"></div>
              <div className="flex items-center gap-1.5">
                {[6, 8, 10, 8, 6].map((height, i) => (
                  <div
                    key={i}
                    className="w-1 bg-gradient-to-t from-accent-pink to-primary rounded-full animate-pulse"
                    style={{
                      height: `${height * 4}px`,
                      animationDelay: `${i * 150}ms`
                    }}
                  />
                ))}
              </div>
              <div className="h-px flex-1 max-w-xs bg-gradient-to-l from-transparent to-primary/40"></div>
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
