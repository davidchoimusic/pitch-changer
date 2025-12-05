'use client'

import { useState } from 'react'
import { AudioPlayerSoundTouch } from '@/components/AudioPlayerSoundTouch'
import { FileUpload } from '@/components/FileUpload'

export default function SoundTouchTest() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  return (
    <main className="min-h-screen bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <a href="/" className="text-2xl font-bold text-white hover:text-accent transition-colors">
              PitchChanger.io
            </a>
            <span className="px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full text-green-400 text-sm font-semibold">
              SoundTouch Beta
            </span>
          </div>
          <p className="text-lg text-gray-300">
            Testing new audio engine with WSOLA time-stretching
          </p>
          <p className="text-sm text-gray-500 mt-2">
            This is a test version - the main app is at <a href="/" className="text-accent underline">pitchchanger.io</a>
          </p>
        </div>

        {/* Info Banner */}
        <div className="max-w-4xl mx-auto mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <h3 className="text-white font-semibold mb-2">🔬 What's Different?</h3>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>✅ TRUE time-stretching (not playbackRate + compensation)</li>
            <li>✅ Independent pitch and tempo controls (via WSOLA algorithm)</li>
            <li>✅ Should eliminate 99+ phantom frequencies found in Tone.js version</li>
            <li>⚠️ Export works best on Chrome/Edge (Safari/Firefox may have issues)</li>
          </ul>
        </div>

        {/* Main Content */}
        {!selectedFile ? (
          <div className="max-w-4xl mx-auto">
            <FileUpload onFileSelect={setSelectedFile} />

            {/* Testing Instructions */}
            <div className="mt-8 p-6 bg-bg-card border border-divider rounded-lg">
              <h3 className="text-white font-semibold mb-3">📋 Testing Instructions</h3>
              <ol className="text-sm text-gray-300 space-y-2 list-decimal list-inside">
                <li>Generate a pure 440Hz tone using <code className="text-accent">/public/tone-generator.html</code></li>
                <li>Upload the tone here and at the main site (to compare)</li>
                <li>Process at various speeds: 0.55x, 0.7x, 1.05x, 1.5x (with 0 pitch)</li>
                <li>Download the processed files</li>
                <li>Analyze with <code className="text-accent">/public/frequency-analyzer-v2.html</code></li>
                <li><strong>Success criteria:</strong> Only 440Hz detected (not 99+ frequencies!)</li>
              </ol>
            </div>

            {/* Quick Links */}
            <div className="mt-6 p-6 bg-bg-card border border-divider rounded-lg">
              <h3 className="text-white font-semibold mb-3">🔗 Test Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <a
                  href="/tone-generator.html"
                  target="_blank"
                  className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 transition-colors"
                >
                  <div className="text-white font-medium">Tone Generator</div>
                  <div className="text-xs text-gray-400">Generate pure 440Hz test tones</div>
                </a>
                <a
                  href="/frequency-analyzer-v2.html"
                  target="_blank"
                  className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg hover:bg-green-500/20 transition-colors"
                >
                  <div className="text-white font-medium">Frequency Analyzer</div>
                  <div className="text-xs text-gray-400">Analyze processed audio spectrum</div>
                </a>
              </div>
            </div>
          </div>
        ) : (
          <AudioPlayerSoundTouch
            file={selectedFile}
            onBack={() => setSelectedFile(null)}
          />
        )}
      </div>
    </main>
  )
}
