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
              <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-b from-white via-blue-50 to-blue-200 bg-clip-text text-transparent leading-tight pb-4"
                  style={{
                    textShadow: '0 4px 12px rgba(0,0,0,0.5), 0 8px 24px rgba(59,130,246,0.3)',
                    filter: 'drop-shadow(0 0 40px rgba(59,130,246,0.4)) drop-shadow(0 2px 4px rgba(0,0,0,0.6))'
                  }}>
                Pitch Changer Tool
              </h1>
              <p className="text-2xl text-accent mt-4 font-bold tracking-wide"
                 style={{ filter: 'drop-shadow(0 0 20px rgba(59,130,246,0.5))' }}>
                PitchChanger.io
              </p>

              {/* Tech-y divider */}
              <div className="relative mt-8 h-8">
                {/* Main line */}
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-80"></div>
                </div>
                {/* Glow layer */}
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full h-2 bg-gradient-to-r from-transparent via-accent to-transparent blur-lg opacity-60"></div>
                </div>
                {/* Center dot */}
                <div className="relative flex justify-center">
                  <div className="w-4 h-4 bg-accent rounded-full shadow-[0_0_40px_rgba(59,130,246,1),0_0_20px_rgba(59,130,246,0.8)] border-2 border-white/30"></div>
                </div>
              </div>
            </div>

            {/* Tagline */}
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 bg-clip-text text-transparent"
                  style={{
                    textShadow: '0 2px 8px rgba(0,0,0,0.4), 0 4px 16px rgba(219,39,119,0.3), 0 6px 20px rgba(168,85,247,0.2)',
                    filter: 'drop-shadow(0 0 30px rgba(219,39,119,0.3)) drop-shadow(0 0 20px rgba(168,85,247,0.3)) drop-shadow(0 1px 2px rgba(0,0,0,0.5))'
                  }}>
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
            <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-b from-white via-blue-50 to-blue-200 bg-clip-text text-transparent leading-tight pb-4"
                style={{
                  textShadow: '0 4px 12px rgba(0,0,0,0.5), 0 8px 24px rgba(59,130,246,0.3)',
                  filter: 'drop-shadow(0 0 40px rgba(59,130,246,0.4)) drop-shadow(0 2px 4px rgba(0,0,0,0.6))'
                }}>
              Pitch Changer Tool
            </h1>
            <p className="text-2xl text-accent mt-4 font-bold tracking-wide"
               style={{ filter: 'drop-shadow(0 0 20px rgba(59,130,246,0.5))' }}>
              PitchChanger.io
            </p>

            {/* Tech-y divider */}
            <div className="relative mt-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"></div>
              </div>
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent blur-sm"></div>
              </div>
              <div className="relative flex justify-center">
                <div className="w-2 h-2 bg-accent rounded-full shadow-[0_0_20px_rgba(59,130,246,0.8)]"></div>
              </div>
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
