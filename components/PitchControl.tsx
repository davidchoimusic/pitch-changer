'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from './ui/Button'
import { Slider } from './ui/Slider'
import { pitchShift, decodeAudioFile, encodeToWav, PitchShiftMode } from '@/utils/audio/pitchShift'

interface PitchControlProps {
  audioFile: File
  onReset: () => void
}

export function PitchControl({ audioFile, onReset }: PitchControlProps) {
  const [semitones, setSemitones] = useState(0)
  const [mode, setMode] = useState<PitchShiftMode>('simple')
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null)
  const [processedBuffer, setProcessedBuffer] = useState<AudioBuffer | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const audioContextRef = useRef<AudioContext | null>(null)
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null)

  // Load audio file
  useEffect(() => {
    const loadAudio = async () => {
      try {
        const buffer = await decodeAudioFile(audioFile)
        setAudioBuffer(buffer)
      } catch (error) {
        console.error('Error loading audio:', error)
      }
    }
    loadAudio()
  }, [audioFile])

  const handleProcess = async () => {
    if (!audioBuffer) return

    setIsProcessing(true)
    setProgress(0)

    try {
      const processed = await pitchShift(audioBuffer, {
        semitones,
        mode,
        onProgress: (p) => setProgress(p)
      })

      setProcessedBuffer(processed)
      setProgress(100)
    } catch (error) {
      console.error('Error processing audio:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handlePlay = () => {
    if (!processedBuffer && !audioBuffer) return

    // Stop if already playing
    if (isPlaying && sourceNodeRef.current) {
      sourceNodeRef.current.stop()
      sourceNodeRef.current = null
      setIsPlaying(false)
      return
    }

    // Create audio context if needed
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }

    const source = audioContextRef.current.createBufferSource()
    source.buffer = processedBuffer || audioBuffer
    source.connect(audioContextRef.current.destination)
    source.onended = () => {
      setIsPlaying(false)
      sourceNodeRef.current = null
    }
    source.start(0)

    sourceNodeRef.current = source
    setIsPlaying(true)
  }

  const handleDownload = () => {
    if (!processedBuffer) return

    const blob = encodeToWav(processedBuffer)
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `pitch-shifted-${audioFile.name.replace(/\.[^/.]+$/, '')}.wav`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* File Info */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/50 font-light">Current File</p>
            <p className="text-lg font-light mt-1">{audioFile.name}</p>
            <p className="text-sm text-white/40 mt-1">
              {(audioFile.size / 1024 / 1024).toFixed(2)} MB
              {audioBuffer && ` • ${audioBuffer.duration.toFixed(1)}s`}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onReset}>
            Change File
          </Button>
        </div>
      </div>

      {/* Pitch Control */}
      <div className="bg-white/5 border border-white/10 rounded-lg p-8 space-y-6">
        <h2 className="text-xl font-light">Pitch Control</h2>

        <Slider
          label="Pitch Shift"
          min={-12}
          max={12}
          step={1}
          value={semitones}
          onChange={(e) => setSemitones(parseInt(e.target.value))}
          unit=" semitones"
          showValue
        />

        {/* Mode Toggle */}
        <div className="space-y-2">
          <label className="text-sm font-light text-white/70">Processing Mode</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setMode('simple')}
              className={`p-4 rounded-lg border transition-all text-left ${
                mode === 'simple'
                  ? 'border-electric-blue bg-electric-blue/10 text-white'
                  : 'border-white/10 text-white/50 hover:border-white/20'
              }`}
            >
              <div className="font-light">Simple / Fast</div>
              <div className="text-xs text-white/40 mt-1">Changes duration</div>
            </button>
            <button
              onClick={() => setMode('preserve-duration')}
              className={`p-4 rounded-lg border transition-all text-left ${
                mode === 'preserve-duration'
                  ? 'border-electric-blue bg-electric-blue/10 text-white'
                  : 'border-white/10 text-white/50 hover:border-white/20'
              }`}
            >
              <div className="font-light">Preserve Duration</div>
              <div className="text-xs text-white/40 mt-1">Advanced (slower)</div>
            </button>
          </div>
        </div>

        {/* Process Button */}
        <Button
          onClick={handleProcess}
          disabled={semitones === 0 || isProcessing}
          className="w-full"
          isLoading={isProcessing}
        >
          {isProcessing ? `Processing... ${progress.toFixed(0)}%` : 'Process Audio'}
        </Button>

        {/* Preview & Download */}
        {processedBuffer && (
          <div className="pt-4 border-t border-white/10 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Button variant="secondary" onClick={handlePlay}>
                {isPlaying ? 'Stop' : 'Preview'}
              </Button>
              <Button onClick={handleDownload}>
                Download WAV
              </Button>
            </div>
            <p className="text-xs text-center text-white/40 font-light">
              Processed: {processedBuffer.duration.toFixed(1)}s • {processedBuffer.sampleRate}Hz
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
