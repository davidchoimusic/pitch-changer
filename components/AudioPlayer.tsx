'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from './ui/Button'

interface AudioPlayerProps {
  file: File
  onProcessComplete?: (blob: Blob) => void
}

export function AudioPlayer({ file, onProcessComplete }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [pitchShift, setPitchShift] = useState(0)
  const [preserveDuration, setPreserveDuration] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const audioContextRef = useRef<AudioContext | null>(null)
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null)
  const audioBufferRef = useRef<AudioBuffer | null>(null)
  const startTimeRef = useRef<number>(0)
  const pauseTimeRef = useRef<number>(0)

  // Load audio file
  useEffect(() => {
    const loadAudio = async () => {
      try {
        setUploadProgress(0)
        const arrayBuffer = await file.arrayBuffer()
        setUploadProgress(50)

        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        audioContextRef.current = audioContext

        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
        audioBufferRef.current = audioBuffer
        setDuration(audioBuffer.duration)
        setUploadProgress(100)
      } catch (error) {
        console.error('Error loading audio:', error)
      }
    }
    loadAudio()

    return () => {
      if (sourceNodeRef.current) {
        sourceNodeRef.current.stop()
      }
    }
  }, [file])

  // Update current time during playback
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      if (audioContextRef.current && startTimeRef.current > 0) {
        const elapsed = audioContextRef.current.currentTime - startTimeRef.current + pauseTimeRef.current

        // Adjust for pitch shift if not preserving duration
        const adjustedElapsed = preserveDuration ? elapsed : elapsed / Math.pow(2, pitchShift / 12)

        setCurrentTime(adjustedElapsed)

        if (adjustedElapsed >= duration) {
          setIsPlaying(false)
          setCurrentTime(0)
          pauseTimeRef.current = 0
        }
      }
    }, 100)

    return () => clearInterval(interval)
  }, [isPlaying, duration, pitchShift, preserveDuration])

  const handlePlayPause = () => {
    if (!audioBufferRef.current || !audioContextRef.current) return

    if (isPlaying) {
      // Pause
      if (sourceNodeRef.current) {
        sourceNodeRef.current.stop()
        sourceNodeRef.current = null
      }
      pauseTimeRef.current = currentTime
      setIsPlaying(false)
    } else {
      // Play
      const source = audioContextRef.current.createBufferSource()
      source.buffer = audioBufferRef.current

      // Apply pitch shift (real-time)
      const playbackRate = Math.pow(2, pitchShift / 12)
      source.playbackRate.value = preserveDuration ? 1 : playbackRate

      source.connect(audioContextRef.current.destination)

      const startOffset = pauseTimeRef.current
      source.start(0, startOffset)

      startTimeRef.current = audioContextRef.current.currentTime - pauseTimeRef.current
      sourceNodeRef.current = source
      setIsPlaying(true)

      source.onended = () => {
        setIsPlaying(false)
        setCurrentTime(0)
        pauseTimeRef.current = 0
      }
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    pauseTimeRef.current = newTime

    if (isPlaying && sourceNodeRef.current) {
      sourceNodeRef.current.stop()
      sourceNodeRef.current = null

      if (audioBufferRef.current && audioContextRef.current) {
        const source = audioContextRef.current.createBufferSource()
        source.buffer = audioBufferRef.current
        const playbackRate = Math.pow(2, pitchShift / 12)
        source.playbackRate.value = preserveDuration ? 1 : playbackRate
        source.connect(audioContextRef.current.destination)
        source.start(0, newTime)
        startTimeRef.current = audioContextRef.current.currentTime - newTime
        sourceNodeRef.current = source
      }
    }
  }

  const handlePitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPitch = parseInt(e.target.value)
    setPitchShift(newPitch)

    // If playing, restart with new pitch
    if (isPlaying && sourceNodeRef.current) {
      sourceNodeRef.current.stop()
      sourceNodeRef.current = null

      if (audioBufferRef.current && audioContextRef.current) {
        const source = audioContextRef.current.createBufferSource()
        source.buffer = audioBufferRef.current
        const playbackRate = Math.pow(2, newPitch / 12)
        source.playbackRate.value = preserveDuration ? 1 : playbackRate
        source.connect(audioContextRef.current.destination)
        source.start(0, currentTime)
        startTimeRef.current = audioContextRef.current.currentTime - currentTime
        sourceNodeRef.current = source
      }
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* File Info & Upload Progress */}
      <div className="bg-bg-card border border-white/10 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-400">Playing Local File</p>
            <p className="text-lg font-medium mt-1">{file.name}</p>
            <p className="text-sm text-gray-500 mt-1">
              {(file.size / 1024 / 1024).toFixed(2)} MB • {formatTime(duration)}
            </p>
          </div>
        </div>

        {uploadProgress < 100 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Loading audio...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-accent h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Audio Player */}
      <div className="bg-bg-card border border-white/10 rounded-lg p-8 space-y-6">
        {/* Pitch Control Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-base font-medium">Pitch Shift</label>
            <span className="text-xl font-semibold text-accent">
              {pitchShift > 0 ? '+' : ''}{pitchShift} semitones
            </span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="-12"
              max="12"
              step="1"
              value={pitchShift}
              onChange={handlePitchChange}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer
                         [&::-webkit-slider-thumb]:appearance-none
                         [&::-webkit-slider-thumb]:w-6
                         [&::-webkit-slider-thumb]:h-6
                         [&::-webkit-slider-thumb]:rounded-full
                         [&::-webkit-slider-thumb]:bg-accent
                         [&::-webkit-slider-thumb]:cursor-pointer
                         [&::-webkit-slider-thumb]:shadow-lg
                         [&::-moz-range-thumb]:w-6
                         [&::-moz-range-thumb]:h-6
                         [&::-moz-range-thumb]:rounded-full
                         [&::-moz-range-thumb]:bg-accent
                         [&::-moz-range-thumb]:border-0
                         [&::-moz-range-thumb]:cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>-12</span>
              <span>-6</span>
              <span className="font-semibold">0</span>
              <span>+6</span>
              <span>+12</span>
            </div>
          </div>
        </div>

        {/* Preserve Duration Checkbox */}
        <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg">
          <input
            type="checkbox"
            id="preserve-duration"
            checked={preserveDuration}
            onChange={(e) => setPreserveDuration(e.target.checked)}
            className="w-5 h-5 rounded border-gray-600 text-accent focus:ring-accent focus:ring-offset-0"
          />
          <label htmlFor="preserve-duration" className="text-sm cursor-pointer">
            <span className="font-medium">Preserve Duration</span>
            <span className="text-gray-400 ml-2">
              {preserveDuration ? '(pitch changes, duration stays same)' : '(pitch and duration both change)'}
            </span>
          </label>
        </div>

        {/* Playback Controls */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={handlePlayPause}
              disabled={!audioBufferRef.current}
              className="w-24"
            >
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            <div className="flex-1 flex items-center gap-3">
              <span className="text-sm text-gray-400 w-12 text-right">{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration || 100}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer
                           [&::-webkit-slider-thumb]:appearance-none
                           [&::-webkit-slider-thumb]:w-4
                           [&::-webkit-slider-thumb]:h-4
                           [&::-webkit-slider-thumb]:rounded-full
                           [&::-webkit-slider-thumb]:bg-white
                           [&::-webkit-slider-thumb]:cursor-pointer
                           [&::-moz-range-thumb]:w-4
                           [&::-moz-range-thumb]:h-4
                           [&::-moz-range-thumb]:rounded-full
                           [&::-moz-range-thumb]:bg-white
                           [&::-moz-range-thumb]:border-0"
              />
              <span className="text-sm text-gray-400 w-12">{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
