'use client'

import { useEffect, useState } from 'react'
import { FileUpload } from '@/components/FileUpload'
import { AudioPlayerBeta } from '@/components/AudioPlayerBeta'

export default function BetaPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Header */}
      <header className="w-full mb-8 sticky top-0 z-20 bg-bg-page/90 backdrop-blur border-b border-divider">
        <div className="flex items-center justify-between py-3">
          <span
            className="text-xl md:text-2xl font-black bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(to bottom, rgb(255 255 255), rgb(191 219 254))' }}
          >
            PitchChanger.io
          </span>
          <span className="text-sm px-3 py-1 bg-yellow-500/20 border border-yellow-500/50 rounded-full text-yellow-400 font-semibold">
            BETA
          </span>
        </div>
      </header>

      {!selectedFile ? (
        <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
          {/* Hero */}
          <div className="text-center space-y-4">
            <h1
              className="text-4xl md:text-5xl font-black bg-clip-text text-transparent leading-tight"
              style={{ backgroundImage: 'linear-gradient(to bottom, rgb(255 255 255), rgb(191 219 254))' }}
            >
              Beta: Pitch + Speed Control
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Experimental version with independent pitch and speed controls. Built with Tone.js only for simpler, more reliable audio processing.
            </p>
            <p className="text-sm text-yellow-400">
              ⚠️ Beta - Experimental features. Use at your own risk.
            </p>
          </div>

          {/* Upload */}
          <FileUpload onFileSelect={setSelectedFile} maxSizeMB={250} />

          {/* What's Different */}
          <div className="bg-bg-card border border-divider rounded-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-4">What's Different in Beta?</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>✅ <strong>Independent Pitch & Speed:</strong> Control pitch and tempo separately</li>
              <li>✅ <strong>Waveform Visualization:</strong> See your audio as you edit</li>
              <li>✅ <strong>Single Tone.js Engine:</strong> Simpler, cleaner architecture</li>
              <li>✅ <strong>No Mode Toggle:</strong> Direct control over both parameters</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <AudioPlayerBeta file={selectedFile} onBack={() => setSelectedFile(null)} />
        </div>
      )}
    </div>
  )
}
