'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from './ui/Button'
import { pitchShift, encodeToWav } from '@/utils/audio/pitchShift'

interface AudioPlayerProps {
  file: File
  onProcessComplete?: (blob: Blob) => void
}

export function AudioPlayer({ file, onProcessComplete }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [pitchShiftValue, setPitchShiftValue] = useState(0)
  const [preserveDuration, setPreserveDuration] = useState(true)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [processedBuffer, setProcessedBuffer] = useState<AudioBuffer | null>(null)

  const audioContextRef = useRef<AudioContext | null>(null)
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null)
  const audioBufferRef = useRef<AudioBuffer | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)
  const offsetRef = useRef<number>(0)
  const lastCurrentTimeRef = useRef<number>(0)

  // Load audio file and simulate upload
  useEffect(() => {
    const loadAudio = async () => {
      try {
        setUploadProgress(0)

        // Simulate upload progress
        const uploadInterval = setInterval(() => {
          setUploadProgress(prev => {
            if (prev >= 90) {
              clearInterval(uploadInterval)
              return prev
            }
            return prev + 10
          })
        }, 100)

        const arrayBuffer = await file.arrayBuffer()

        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        audioContextRef.current = audioContext

        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
        audioBufferRef.current = audioBuffer
        setDuration(audioBuffer.duration)

        clearInterval(uploadInterval)
        setUploadProgress(100)
      } catch (error) {
        console.error('Error loading audio:', error)
      }
    }
    loadAudio()

    return () => {
      stopPlayback()
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [file])

  // Spacebar to play/pause
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && uploadProgress === 100) {
        e.preventDefault()
        handlePlayPause()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isPlaying, uploadProgress])

  // Update current time during playback
  const updateTime = () => {
    if (!audioContextRef.current || !isPlaying) return

    const elapsed = audioContextRef.current.currentTime - startTimeRef.current + offsetRef.current

    const newTime = Math.min(elapsed, duration)
    setCurrentTime(newTime)
    lastCurrentTimeRef.current = newTime

    if (elapsed >= duration) {
      stopPlayback()
      setCurrentTime(0)
      offsetRef.current = 0
      lastCurrentTimeRef.current = 0
    } else {
      animationFrameRef.current = requestAnimationFrame(updateTime)
    }
  }

  useEffect(() => {
    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(updateTime)
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isPlaying, duration])

  const stopPlayback = () => {
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop()
      } catch (e) {
        // Already stopped
      }
      sourceNodeRef.current.disconnect()
      sourceNodeRef.current = null
    }
    setIsPlaying(false)
  }

  const handlePlayPause = () => {
    if (!audioBufferRef.current || !audioContextRef.current) return

    if (isPlaying) {
      // Pause - save current position
      stopPlayback()
      offsetRef.current = lastCurrentTimeRef.current
    } else {
      // Play from saved position
      const source = audioContextRef.current.createBufferSource()
      source.buffer = audioBufferRef.current

      // Apply pitch shift (real-time)
      const playbackRate = Math.pow(2, pitchShiftValue / 12)
      source.playbackRate.value = preserveDuration ? 1 : playbackRate

      source.connect(audioContextRef.current.destination)

      const startOffset = offsetRef.current
      source.start(0, startOffset)

      startTimeRef.current = audioContextRef.current.currentTime
      sourceNodeRef.current = source
      setIsPlaying(true)

      source.onended = () => {
        if (lastCurrentTimeRef.current < duration) {
          stopPlayback()
          setCurrentTime(0)
          offsetRef.current = 0
          lastCurrentTimeRef.current = 0
        }
      }
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    offsetRef.current = newTime
    lastCurrentTimeRef.current = newTime

    if (isPlaying) {
      stopPlayback()

      // Restart playback at new position
      if (audioBufferRef.current && audioContextRef.current) {
        const source = audioContextRef.current.createBufferSource()
        source.buffer = audioBufferRef.current
        const playbackRate = Math.pow(2, pitchShiftValue / 12)
        source.playbackRate.value = preserveDuration ? 1 : playbackRate
        source.connect(audioContextRef.current.destination)
        source.start(0, newTime)
        startTimeRef.current = audioContextRef.current.currentTime
        sourceNodeRef.current = source
        setIsPlaying(true)

        source.onended = () => {
          stopPlayback()
          setCurrentTime(0)
          offsetRef.current = 0
          lastCurrentTimeRef.current = 0
        }
      }
    }
  }

  const handlePitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPitch = parseInt(e.target.value)
    setPitchShiftValue(newPitch)

    // If playing, restart with new pitch
    if (isPlaying && audioBufferRef.current && audioContextRef.current) {
      const currentOffset = lastCurrentTimeRef.current

      stopPlayback()

      const source = audioContextRef.current.createBufferSource()
      source.buffer = audioBufferRef.current
      const playbackRate = Math.pow(2, newPitch / 12)
      source.playbackRate.value = preserveDuration ? 1 : playbackRate
      source.connect(audioContextRef.current.destination)
      source.start(0, currentOffset)
      startTimeRef.current = audioContextRef.current.currentTime
      offsetRef.current = currentOffset
      sourceNodeRef.current = source
      setIsPlaying(true)

      source.onended = () => {
        stopPlayback()
        setCurrentTime(0)
        offsetRef.current = 0
        lastCurrentTimeRef.current = 0
      }
    }
  }

  const handleDownload = async () => {
    if (!audioBufferRef.current) return

    // Process audio with pitch shift
    const processed = await pitchShift(audioBufferRef.current, {
      semitones: pitchShiftValue,
      mode: preserveDuration ? 'preserve-duration' : 'simple'
    })

    const blob = encodeToWav(processed)
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `pitch-shifted-${file.name.replace(/\.[^/.]+$/, '')}.wav`
    a.click()
    URL.revokeObjectURL(url)
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
              {pitchShiftValue > 0 ? '+' : ''}{pitchShiftValue} semitones
            </span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="-12"
              max="12"
              step="1"
              value={pitchShiftValue}
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
              disabled={!audioBufferRef.current || uploadProgress < 100}
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
                disabled={uploadProgress < 100}
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
          <p className="text-xs text-gray-500 text-center">Press Spacebar to play/pause</p>
        </div>

        {/* Download Button */}
        <div className="pt-4 border-t border-white/10">
          <Button
            onClick={handleDownload}
            disabled={!audioBufferRef.current || uploadProgress < 100}
            className="w-full"
            size="lg"
          >
            Download Processed Audio (WAV)
          </Button>
        </div>
      </div>
    </div>
  )
}
