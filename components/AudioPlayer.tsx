'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from './ui/Button'
import { pitchShift, encodeToWav } from '@/utils/audio/pitchShift'
import * as Tone from 'tone'

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
  const [isReady, setIsReady] = useState(false)

  const tonePlayerRef = useRef<Tone.Player | null>(null)
  const pitchShiftRef = useRef<Tone.PitchShift | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null)
  const audioBufferRef = useRef<AudioBuffer | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)
  const offsetRef = useRef<number>(0)
  const lastCurrentTimeRef = useRef<number>(0)

  // Load audio file
  useEffect(() => {
    const loadAudio = async () => {
      try {
        setUploadProgress(0)
        setIsReady(false)

        const arrayBuffer = await file.arrayBuffer()
        setUploadProgress(30)

        // Decode audio buffer
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        audioContextRef.current = audioContext
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
        audioBufferRef.current = audioBuffer
        setDuration(audioBuffer.duration)
        setUploadProgress(60)

        // Create blob URL for Tone.js
        const blob = new Blob([arrayBuffer], { type: file.type })
        const url = URL.createObjectURL(blob)

        // Create Tone.js player for preserve duration mode
        const player = new Tone.Player({
          url: url,
          loop: false,
          onload: () => {
            console.log('Tone.js player loaded successfully')
            setUploadProgress(100)
            setIsReady(true)
          },
          onerror: (err) => {
            console.error('Tone.js player error:', err)
            setUploadProgress(100)
            setIsReady(true) // Still enable playback with fallback
          }
        })

        // Create pitch shift effect
        const pitchShiftEffect = new Tone.PitchShift({
          pitch: 0,
          windowSize: 0.1,
          delayTime: 0,
          feedback: 0
        }).toDestination()

        player.connect(pitchShiftEffect)
        tonePlayerRef.current = player
        pitchShiftRef.current = pitchShiftEffect

      } catch (error) {
        console.error('Error loading audio:', error)
        setUploadProgress(100)
        setIsReady(true) // Enable playback anyway
      }
    }
    loadAudio()

    return () => {
      stopPlayback()
      if (tonePlayerRef.current) {
        tonePlayerRef.current.dispose()
      }
      if (pitchShiftRef.current) {
        pitchShiftRef.current.dispose()
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [file])

  // Spacebar to play/pause
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && isReady) {
        e.preventDefault()
        handlePlayPause()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isPlaying, isReady])

  const stopPlayback = () => {
    if (preserveDuration && tonePlayerRef.current) {
      tonePlayerRef.current.stop()
    } else if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop()
      } catch (e) {
        // Already stopped
      }
      sourceNodeRef.current.disconnect()
      sourceNodeRef.current = null
    }
    setIsPlaying(false)
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }

  // Update time for Tone.js
  const updateTimeTone = () => {
    if (!tonePlayerRef.current || !isPlaying) return

    const time = tonePlayerRef.current.immediate()
    setCurrentTime(time)

    if (time >= duration - 0.1) {
      setIsPlaying(false)
      setCurrentTime(0)
      tonePlayerRef.current.stop()
    } else {
      animationFrameRef.current = requestAnimationFrame(updateTimeTone)
    }
  }

  // Update time for native Web Audio
  const updateTimeNative = () => {
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
      animationFrameRef.current = requestAnimationFrame(updateTimeNative)
    }
  }

  useEffect(() => {
    if (isPlaying) {
      if (preserveDuration) {
        animationFrameRef.current = requestAnimationFrame(updateTimeTone)
      } else {
        animationFrameRef.current = requestAnimationFrame(updateTimeNative)
      }
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
  }, [isPlaying, preserveDuration, duration])

  const handlePlayPause = async () => {
    if (!isReady) return

    await Tone.start()

    if (isPlaying) {
      stopPlayback()
      if (preserveDuration) {
        // Save position for Tone.js
        offsetRef.current = currentTime
      } else {
        // Save position for native
        offsetRef.current = lastCurrentTimeRef.current
      }
    } else {
      if (preserveDuration) {
        // Use Tone.js for preserved duration
        if (!tonePlayerRef.current) return

        if (pitchShiftRef.current) {
          pitchShiftRef.current.pitch = pitchShiftValue
        }

        if (currentTime > 0) {
          tonePlayerRef.current.start(undefined, currentTime)
        } else {
          tonePlayerRef.current.start()
        }
        setIsPlaying(true)
      } else {
        // Use native Web Audio for simple mode (pitch + duration change)
        if (!audioBufferRef.current || !audioContextRef.current) return

        const source = audioContextRef.current.createBufferSource()
        source.buffer = audioBufferRef.current

        const playbackRate = Math.pow(2, pitchShiftValue / 12)
        source.playbackRate.value = playbackRate

        source.connect(audioContextRef.current.destination)
        source.start(0, offsetRef.current)

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

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    offsetRef.current = newTime
    lastCurrentTimeRef.current = newTime

    if (isPlaying) {
      stopPlayback()

      // Restart at new position
      if (preserveDuration && tonePlayerRef.current) {
        tonePlayerRef.current.start(undefined, newTime)
        setIsPlaying(true)
      } else if (audioBufferRef.current && audioContextRef.current) {
        const source = audioContextRef.current.createBufferSource()
        source.buffer = audioBufferRef.current
        const playbackRate = Math.pow(2, pitchShiftValue / 12)
        source.playbackRate.value = playbackRate
        source.connect(audioContextRef.current.destination)
        source.start(0, newTime)
        startTimeRef.current = audioContextRef.current.currentTime
        sourceNodeRef.current = source
        setIsPlaying(true)
      }
    }
  }

  const handlePitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPitch = parseInt(e.target.value)
    setPitchShiftValue(newPitch)

    if (pitchShiftRef.current) {
      pitchShiftRef.current.pitch = newPitch
    }

    // If playing in simple mode, restart with new pitch
    if (isPlaying && !preserveDuration && audioBufferRef.current && audioContextRef.current) {
      const currentOffset = lastCurrentTimeRef.current

      stopPlayback()

      const source = audioContextRef.current.createBufferSource()
      source.buffer = audioBufferRef.current
      const playbackRate = Math.pow(2, newPitch / 12)
      source.playbackRate.value = playbackRate
      source.connect(audioContextRef.current.destination)
      source.start(0, currentOffset)
      startTimeRef.current = audioContextRef.current.currentTime
      offsetRef.current = currentOffset
      sourceNodeRef.current = source
      setIsPlaying(true)
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
            <p className="text-sm text-gray-400">
              {uploadProgress < 100 ? 'Loading...' : isReady ? '✅ Ready to Play' : 'Initializing player...'}
            </p>
            <p className="text-lg font-medium mt-1">{file.name}</p>
            <p className="text-sm text-gray-500 mt-1">
              {(file.size / 1024 / 1024).toFixed(2)} MB
              {duration > 0 && ` • ${formatTime(duration)}`}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-400">
            <span>
              {uploadProgress < 100 ? 'Loading audio...' : isReady ? 'Ready!' : 'Initializing player...'}
            </span>
            <span>{uploadProgress}%</span>
          </div>
          {uploadProgress < 100 && (
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-accent h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Audio Player */}
      <div className="bg-bg-card border border-white/10 rounded-lg p-8 space-y-6">
        {/* Pitch Control Slider */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-base font-medium">Pitch Shift</label>
            <span className="text-2xl font-bold text-accent">
              {pitchShiftValue > 0 ? '+' : ''}{pitchShiftValue} semitones
            </span>
          </div>
          <div className="relative px-2">
            <input
              type="range"
              min="-12"
              max="12"
              step="1"
              value={pitchShiftValue}
              onChange={handlePitchChange}
              style={{
                background: `linear-gradient(to right,
                  rgb(59 130 246) 0%,
                  rgb(59 130 246) ${((pitchShiftValue + 12) / 24) * 100}%,
                  rgb(55 65 81) ${((pitchShiftValue + 12) / 24) * 100}%,
                  rgb(55 65 81) 100%)`
              }}
              className="w-full h-3 rounded-lg appearance-none cursor-pointer
                         [&::-webkit-slider-thumb]:appearance-none
                         [&::-webkit-slider-thumb]:w-8
                         [&::-webkit-slider-thumb]:h-8
                         [&::-webkit-slider-thumb]:rounded-full
                         [&::-webkit-slider-thumb]:bg-white
                         [&::-webkit-slider-thumb]:border-4
                         [&::-webkit-slider-thumb]:border-accent
                         [&::-webkit-slider-thumb]:cursor-grab
                         [&::-webkit-slider-thumb]:shadow-lg
                         [&::-webkit-slider-thumb]:active:cursor-grabbing
                         [&::-webkit-slider-thumb]:hover:scale-110
                         [&::-webkit-slider-thumb]:transition-transform
                         [&::-moz-range-thumb]:w-8
                         [&::-moz-range-thumb]:h-8
                         [&::-moz-range-thumb]:rounded-full
                         [&::-moz-range-thumb]:bg-white
                         [&::-moz-range-thumb]:border-4
                         [&::-moz-range-thumb]:border-accent
                         [&::-moz-range-thumb]:cursor-grab
                         [&::-moz-range-thumb]:shadow-lg
                         [&::-moz-range-thumb]:active:cursor-grabbing
                         [&::-moz-range-thumb]:hover:scale-110
                         [&::-moz-range-thumb]:transition-transform"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-3 px-1">
              <span className="font-semibold">-12</span>
              <span>-6</span>
              <div className="flex flex-col items-center -mt-2">
                <span className="text-xs text-accent font-medium mb-1">Original Key</span>
                <span className="font-bold text-accent text-base">0</span>
              </div>
              <span>+6</span>
              <span className="font-semibold">+12</span>
            </div>
          </div>
        </div>

        {/* Preserve Duration Checkbox */}
        <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg border border-white/10">
          <input
            type="checkbox"
            id="preserve-duration"
            checked={preserveDuration}
            onChange={async (e) => {
              const newValue = e.target.checked
              const wasPlaying = isPlaying
              const currentPosition = currentTime

              // Stop current playback
              stopPlayback()
              offsetRef.current = currentPosition

              // Switch mode
              setPreserveDuration(newValue)

              // Resume playback in new mode if it was playing
              if (wasPlaying) {
                await Tone.start()

                if (newValue) {
                  // Switch to Tone.js
                  if (tonePlayerRef.current && pitchShiftRef.current) {
                    pitchShiftRef.current.pitch = pitchShiftValue
                    tonePlayerRef.current.start(undefined, currentPosition)
                    setIsPlaying(true)
                  }
                } else {
                  // Switch to native
                  if (audioBufferRef.current && audioContextRef.current) {
                    const source = audioContextRef.current.createBufferSource()
                    source.buffer = audioBufferRef.current
                    const playbackRate = Math.pow(2, pitchShiftValue / 12)
                    source.playbackRate.value = playbackRate
                    source.connect(audioContextRef.current.destination)
                    source.start(0, currentPosition)
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
            }}
            className="w-5 h-5 rounded border-gray-600 text-accent focus:ring-accent focus:ring-offset-0 cursor-pointer"
          />
          <label htmlFor="preserve-duration" className="text-sm cursor-pointer flex-1">
            <span className="font-medium">Preserve Duration</span>
            <span className="text-gray-400 ml-2 block mt-1">
              {preserveDuration
                ? '✨ Pitch changes, duration stays same (uses Tone.js - real-time!)'
                : '⚡ Pitch AND duration change together (faster/slower playback)'}
            </span>
          </label>
        </div>

        {/* Playback Controls */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={handlePlayPause}
              disabled={!isReady}
              variant="play"
              className="w-32"
            >
              {isPlaying ? '⏸ Pause' : '▶ Play'}
            </Button>
            <div className="flex-1 flex items-center gap-3">
              <span className="text-sm text-gray-400 w-14 text-right font-mono">{formatTime(currentTime)}</span>
              <input
                type="range"
                min="0"
                max={duration || 100}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
                disabled={!isReady}
                className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer
                           [&::-webkit-slider-thumb]:appearance-none
                           [&::-webkit-slider-thumb]:w-5
                           [&::-webkit-slider-thumb]:h-5
                           [&::-webkit-slider-thumb]:rounded-full
                           [&::-webkit-slider-thumb]:bg-white
                           [&::-webkit-slider-thumb]:cursor-pointer
                           [&::-webkit-slider-thumb]:shadow-md
                           [&::-webkit-slider-thumb]:hover:scale-110
                           [&::-webkit-slider-thumb]:transition-transform
                           [&::-moz-range-thumb]:w-5
                           [&::-moz-range-thumb]:h-5
                           [&::-moz-range-thumb]:rounded-full
                           [&::-moz-range-thumb]:bg-white
                           [&::-moz-range-thumb]:border-0
                           [&::-moz-range-thumb]:cursor-pointer
                           [&::-moz-range-thumb]:shadow-md
                           [&::-moz-range-thumb]:hover:scale-110
                           [&::-moz-range-thumb]:transition-transform"
              />
              <span className="text-sm text-gray-400 w-14 font-mono">{formatTime(duration)}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center">
            Press <kbd className="px-2 py-1 bg-gray-700 rounded text-white">Spacebar</kbd> to play/pause
            {preserveDuration && ' • Using Tone.js (duration preserved)'}
            {!preserveDuration && ' • Using native playback (duration changes)'}
          </p>
        </div>

        {/* Download Button */}
        <div className="pt-4 border-t border-white/10">
          <Button
            onClick={handleDownload}
            disabled={!audioBufferRef.current || !isReady || pitchShiftValue === 0}
            className="w-full"
            size="lg"
          >
            ⬇ Download Processed Audio (WAV)
          </Button>
          {pitchShiftValue === 0 && (
            <p className="text-xs text-gray-500 text-center mt-2">Adjust pitch to enable download</p>
          )}
        </div>
      </div>
    </div>
  )
}
