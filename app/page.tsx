'use client'

import { useState } from 'react'
import { FileUpload } from '@/components/FileUpload'
import { PitchControl } from '@/components/PitchControl'

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  return (
    <div className="container mx-auto px-4 py-12">
      {!selectedFile ? (
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl md:text-6xl font-light tracking-tight">
              Audio Pitch <span className="text-electric-blue">Shifting</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 font-light max-w-2xl mx-auto">
              Free, fast, and powerful pitch shifting tool for musicians and creators.
              Upload your MP3 or WAV file and adjust pitch in seconds.
            </p>
          </div>

          {/* Upload Section */}
          <FileUpload onFileSelect={setSelectedFile} maxSizeMB={25} />

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 pt-8">
            <div className="text-center space-y-2">
              <div className="text-3xl">⚡</div>
              <h3 className="font-light">Lightning Fast</h3>
              <p className="text-sm text-white/50 font-light">
                Client-side processing for instant results
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl">🔒</div>
              <h3 className="font-light">100% Private</h3>
              <p className="text-sm text-white/50 font-light">
                Your audio never leaves your device
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl">🎯</div>
              <h3 className="font-light">Pro Quality</h3>
              <p className="text-sm text-white/50 font-light">
                Choose simple or advanced processing modes
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div className="border-t border-white/10 pt-12 space-y-6">
            <h2 className="text-2xl font-light text-center">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-electric-blue/20 text-electric-blue flex items-center justify-center text-sm">
                  1
                </div>
                <h3 className="font-light">Upload Audio</h3>
                <p className="text-sm text-white/50 font-light">
                  Drag and drop or select your MP3/WAV file (max 25MB)
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-electric-blue/20 text-electric-blue flex items-center justify-center text-sm">
                  2
                </div>
                <h3 className="font-light">Adjust Pitch</h3>
                <p className="text-sm text-white/50 font-light">
                  Shift up or down by semitones with real-time preview
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-electric-blue/20 text-electric-blue flex items-center justify-center text-sm">
                  3
                </div>
                <h3 className="font-light">Download</h3>
                <p className="text-sm text-white/50 font-light">
                  Get your processed audio as high-quality WAV
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PitchControl
          audioFile={selectedFile}
          onReset={() => setSelectedFile(null)}
        />
      )}
    </div>
  )
}
