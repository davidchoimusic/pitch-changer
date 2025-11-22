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
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Change the Pitch of Your<br />Song or Audio
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              Free, instant pitch shifting in your browser. Upload your audio and adjust pitch in real-time with our simple tool.
            </p>
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
                All processing happens in your browser - files never leave your device
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
          <div className="border-t border-white/10 pt-16 space-y-8">
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
      )}
    </div>
  )
}
