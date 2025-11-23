'use client'

import { useState } from 'react'
import { FileUpload } from '@/components/FileUpload'
import { AudioPlayer } from '@/components/AudioPlayer'

// Deterministic spectrum analyzer values (no Math.random for hydration)
const spectrumSpeeds = [0.6, 0.9, 0.5, 1.1, 0.7, 0.8, 1.0, 0.6, 0.9, 0.7, 0.5, 0.8, 1.2, 0.6, 0.9, 0.7, 0.8, 0.6, 1.0, 0.5, 0.9, 0.7, 0.8, 0.6, 1.1, 0.5, 0.9, 0.8, 0.7, 1.0, 0.6, 0.8, 0.9, 0.7, 0.5, 1.1, 0.8, 0.6, 0.9, 0.7]

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
                className="text-5xl md:text-6xl font-black bg-clip-text text-transparent leading-tight pb-2"
                style={{ backgroundImage: 'linear-gradient(to bottom, rgb(255 255 255), rgb(191 219 254))' }}
              >
                Pitch Changer Tool
              </h1>
              <p
                className="text-xl md:text-2xl font-semibold bg-clip-text text-transparent mt-3"
                style={{ backgroundImage: 'linear-gradient(to bottom, rgb(255 255 255), rgb(191 219 254))' }}
              >
                PitchChanger.io
              </p>

              {/* Spectrum Analyzer */}
              <div className="flex items-end justify-center gap-1 mt-8 h-24">
                {spectrumSpeeds.map((speed, i) => (
                  <div
                    key={i}
                    className="w-1 bg-gradient-to-t from-accent/80 to-accent rounded-t"
                    style={{
                      height: '20%',
                      animation: `pulse ${speed}s ease-in-out infinite`,
                      animationDelay: `${i * 0.03}s`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Tagline */}
            <div className="space-y-4">
              <h2
                className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(to bottom, rgb(255 255 255), rgb(191 219 254))' }}
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
            <h1
              className="text-5xl md:text-6xl font-black bg-clip-text text-transparent leading-tight pb-2"
              style={{ backgroundImage: 'linear-gradient(to bottom, rgb(255 255 255), rgb(191 219 254))' }}
            >
              Pitch Changer Tool
            </h1>
            <p
              className="text-xl md:text-2xl font-semibold bg-clip-text text-transparent mt-3"
              style={{ backgroundImage: 'linear-gradient(to bottom, rgb(255 255 255), rgb(191 219 254))' }}
            >
              PitchChanger.io
            </p>

            {/* Spectrum Analyzer */}
            <div className="flex items-end justify-center gap-1 mt-8 h-24">
              {spectrumSpeeds.map((speed, i) => (
                <div
                  key={i}
                  className="w-1 bg-gradient-to-t from-accent/80 to-accent rounded-t"
                  style={{
                    height: '20%',
                    animation: `pulse ${speed}s ease-in-out infinite`,
                    animationDelay: `${i * 0.03}s`
                  }}
                />
              ))}
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
