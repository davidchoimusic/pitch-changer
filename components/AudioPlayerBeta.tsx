'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from './ui/Button'
import { exportWithTone } from '@/utils/audio/toneExport'
import { encodeToWav } from '@/utils/audio/pitchShift'
import * as Tone from 'tone'

interface AudioPlayerBetaProps {
  file: File
  onBack: () => void
}

export function AudioPlayerBeta({ file, onBack }: AudioPlayerBetaProps) {
  // State
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [pitchValue, setPitchValue] = useState(0) // Semitones
  const [speedValue, setSpeedValue] = useState(1.0) // Playback rate
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processProgress, setProcessProgress] = useState(0)
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null)

  // Refs - SIMPLIFIED: Only Tone.js, no dual systems
  const playerRef = useRef<Tone.Player | null>(null)
  const pitchShiftRef = useRef<Tone.PitchShift | null>(null)
  const audioBufferRef = useRef<AudioBuffer | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const playStartTimeRef = useRef<number>(0)
  const playStartOffsetRef = useRef<number>(0)
  const waveformCanvasRef = useRef<HTMLCanvasElement | null>(null)
  // Refs for spacebar handler
  const isReadyRef = useRef(isReady)
  const handlePlayPauseRef = useRef<(() => void) | null>(null)

  // Load audio file
  useEffect(() => {
    const abortController = new AbortController()

    const loadAudio = async () => {
      try {
        setUploadProgress(0)
        setIsReady(false)
        setError(null)

        const arrayBuffer = await file.arrayBuffer()
        if (abortController.signal.aborted) return

        setUploadProgress(30)

        // Decode with regular AudioContext (Tone.start() needs user gesture)
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
        await audioContext.close()

        if (abortController.signal.aborted) return

        audioBufferRef.current = audioBuffer
        setDuration(audioBuffer.duration)
        setUploadProgress(100)
        setIsReady(true)

        // Draw waveform
        drawWaveform(audioBuffer)

        // Track upload
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'file_uploaded_beta', {
            file_size_mb: (file.size / 1024 / 1024).toFixed(2),
            file_type: file.type,
          })
        }
      } catch (error) {
        if (!abortController.signal.aborted) {
          console.error('Error loading audio:', error)
          setError('Unable to load audio file. Format may not be supported.')
          setIsReady(false)
        }
      }
    }

    loadAudio()

    return () => {
      abortController.abort()
      stopPlayback()
      if (playerRef.current) {
        playerRef.current.dispose()
      }
      if (pitchShiftRef.current) {
        pitchShiftRef.current.dispose()
      }
    }
  }, [file])

  // Draw waveform visualization (ONCE - no playhead in canvas)
  const drawWaveform = (buffer: AudioBuffer) => {
    if (!waveformCanvasRef.current) return

    const canvas = waveformCanvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const data = buffer.getChannelData(0)
    const step = Math.ceil(data.length / width)
    const amp = height / 2

    // Background
    ctx.fillStyle = '#1e293b'
    ctx.fillRect(0, 0, width, height)

    // Waveform
    ctx.strokeStyle = '#3b82f6'
    ctx.lineWidth = 1.5
    ctx.beginPath()

    for (let i = 0; i < width; i++) {
      const min = Math.min(...Array.from(data.slice(i * step, (i + 1) * step)))
      const max = Math.max(...Array.from(data.slice(i * step, (i + 1) * step)))

      const yMin = (1 + min) * amp
      const yMax = (1 + max) * amp

      if (i === 0) {
        ctx.moveTo(i, yMin)
      }
      ctx.lineTo(i, yMin)
      ctx.lineTo(i, yMax)
    }

    ctx.stroke()
  }

  // Click on waveform to seek
  const handleWaveformClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!waveformCanvasRef.current || !audioBufferRef.current) return

    const canvas = waveformCanvasRef.current
    const rect = canvas.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentageClicked = clickX / rect.width
    const newTime = percentageClicked * duration

    setCurrentTime(newTime)

    // Restart playback from new position if playing
    if (isPlaying && playerRef.current) {
      try {
        playerRef.current.stop()
      } catch (err) {}

      playStartOffsetRef.current = newTime
      playStartTimeRef.current = Tone.now()
      playerRef.current.start(undefined, newTime)
    }
  }

  // Update refs for spacebar handler
  useEffect(() => {
    isReadyRef.current = isReady
  }, [isReady])

  // Calculate playhead position percentage for CSS
  const playheadPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  // Stop playback
  const stopPlayback = () => {
    if (playerRef.current) {
      try {
        playerRef.current.stop()
      } catch (e) {
        console.error('Error stopping player:', e)
      }
    }

    setIsPlaying(false)
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }

  // Animation loop
  const updateTime = () => {
    if (!playerRef.current) return

    const elapsed = Tone.now() - playStartTimeRef.current
    const time = playStartOffsetRef.current + (elapsed * speedValue)
    setCurrentTime(time)

    if (time >= duration - 0.1) {
      setIsPlaying(false)
      setCurrentTime(0)
      playerRef.current.stop()
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
  }, [isPlaying, duration, speedValue])

  // Play/pause
  const handlePlayPause = async () => {
    if (!isReady) return

    await Tone.start()

    // Lazy init on first play
    if (!playerRef.current && audioBufferRef.current) {
      const player = new Tone.Player()
      player.buffer.set(audioBufferRef.current)
      player.loop = false
      playerRef.current = player

      const pitchShift = new Tone.PitchShift({
        pitch: pitchValue,
        windowSize: 0.1,
      }).toDestination()

      player.connect(pitchShift)
      pitchShiftRef.current = pitchShift
    }

    if (isPlaying) {
      stopPlayback()
    } else {
      if (!playerRef.current) return

      // Apply current settings
      if (pitchShiftRef.current) {
        pitchShiftRef.current.pitch = pitchValue
      }
      playerRef.current.playbackRate = speedValue

      const startOffset = currentTime > 0 ? currentTime : 0
      playStartOffsetRef.current = startOffset
      playStartTimeRef.current = Tone.now()
      playerRef.current.start(undefined, startOffset)
      setIsPlaying(true)
    }
  }

  // Keep handlePlayPauseRef updated for spacebar
  useEffect(() => {
    handlePlayPauseRef.current = handlePlayPause
  })

  // Spacebar to play/pause with stable callback
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target instanceof HTMLInputElement) {
        const blockTypes = ['text', 'search', 'email', 'url', 'tel', 'number', 'password']
        if (blockTypes.includes(target.type)) return
      }
      if (target.tagName === 'TEXTAREA') return

      const isSpace =
        e.code === 'Space' ||
        e.key === ' ' ||
        e.key === 'Spacebar' ||
        e.keyCode === 32

      if (isSpace && isReadyRef.current && handlePlayPauseRef.current) {
        e.preventDefault()
        handlePlayPauseRef.current()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, []) // Empty deps = stable callback

  // Seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)

    if (isPlaying && playerRef.current) {
      try {
        playerRef.current.stop()
      } catch (e) {}

      playStartOffsetRef.current = newTime
      playStartTimeRef.current = Tone.now()
      playerRef.current.start(undefined, newTime)
    }
  }

  // Pitch change
  const handlePitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPitch = parseInt(e.target.value)
    setPitchValue(newPitch)

    if (pitchShiftRef.current) {
      pitchShiftRef.current.pitch = newPitch
    }

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'pitch_adjusted_beta', {
        pitch_value: newPitch,
      })
    }
  }

  // Speed change
  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = parseFloat(e.target.value)
    setSpeedValue(newSpeed)

    if (playerRef.current) {
      playerRef.current.playbackRate = newSpeed

      // If playing, restart to apply speed change smoothly
      if (isPlaying) {
        try {
          playerRef.current.stop()
        } catch (e) {}

        playStartOffsetRef.current = currentTime
        playStartTimeRef.current = Tone.now()
        playerRef.current.start(undefined, currentTime)
      }
    }

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'speed_adjusted_beta', {
        speed_value: newSpeed,
      })
    }
  }

  // Processing
  const handleStartProcessing = async () => {
    if (!audioBufferRef.current) return

    stopPlayback()
    setIsProcessing(true)
    setProcessProgress(0)
    setProcessedBlob(null)

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'processing_started_beta', {
        pitch_value: pitchValue,
        speed_value: speedValue,
      })
    }

    try {
      // Use Tone.js for export
      const processed = await exportWithTone(
        audioBufferRef.current,
        pitchValue,
        (progress) => setProcessProgress(progress)
      )

      const blob = encodeToWav(processed)
      setProcessedBlob(blob)
      setProcessProgress(100)
    } catch (error) {
      console.error('Processing error:', error)
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (!processedBlob) return

    const url = URL.createObjectURL(processedBlob)
    const a = document.createElement('a')
    a.href = url

    const baseName = file.name.replace(/\.[^/.]+$/, '')
    a.download = `${baseName} - PITCH ${pitchValue > 0 ? '+' : ''}${pitchValue} - PitchChanger.io.wav`
    a.click()
    URL.revokeObjectURL(url)

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'download_completed_beta', {
        pitch_value: pitchValue,
        speed_value: speedValue,
      })
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Calculate adjusted duration based on speed
  const adjustedDuration = duration / speedValue

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <Button onClick={onBack} variant="ghost" size="sm">
        ← Upload Different File
      </Button>

      {/* File Info */}
      <div className="bg-bg-card border border-divider rounded-lg p-6">
        <p className="text-sm text-gray-400">
          {uploadProgress < 100 ? 'Loading...' : isReady ? '✅ Ready' : 'Initializing...'}
        </p>
        <p className="text-lg font-medium mt-1">{file.name}</p>
        <p className="text-sm text-gray-500 mt-1">
          {(file.size / 1024 / 1024).toFixed(2)} MB • {formatTime(duration)} original
          {speedValue !== 1.0 && ` → ${formatTime(adjustedDuration)} at ${speedValue}x speed`}
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mt-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-bg-card border border-divider rounded-lg p-8 space-y-6">
        {/* Waveform Scrubber - Integrated with CSS Overlay Playhead */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span className="font-mono">{formatTime(currentTime)}</span>
            <span className="font-mono">{formatTime(adjustedDuration)}</span>
          </div>
          <div className="relative">
            {/* Waveform canvas (drawn once) */}
            <canvas
              ref={waveformCanvasRef}
              width={800}
              height={120}
              onClick={handleWaveformClick}
              className="w-full h-auto rounded cursor-pointer hover:opacity-90 transition-opacity"
              title="Click to seek"
            />
            {/* CSS Playhead Overlay (GPU accelerated) */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-orange-400 shadow-lg pointer-events-none"
              style={{
                left: `${playheadPercent}%`,
                boxShadow: '0 0 10px rgba(251, 146, 60, 0.8)'
              }}
            >
              {/* Time label on playhead */}
              <div className="absolute -top-6 -left-8 bg-orange-500 text-white text-xs px-2 py-0.5 rounded font-mono whitespace-nowrap">
                {formatTime(currentTime)}
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center">Click waveform to seek</p>
        </div>

        {/* Playback Button */}
        <div className="flex justify-center pt-2 pb-4 border-b border-divider">
          <Button
            onClick={handlePlayPause}
            disabled={!isReady}
            variant="play"
            className="w-40"
          >
            {isPlaying ? '⏸ Pause' : '▶ Play'}
          </Button>
        </div>

        {/* Pitch Slider */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-base font-medium">Pitch</label>
            <span className="text-2xl font-bold text-accent">
              {pitchValue > 0 ? '+' : ''}{pitchValue} semitones
            </span>
          </div>
          <input
            type="range"
            min="-12"
            max="12"
            step="1"
            value={pitchValue}
            onChange={handlePitchChange}
            className="w-full h-3 rounded-lg appearance-none cursor-pointer
                       [&::-webkit-slider-runnable-track]:bg-gray-700
                       [&::-webkit-slider-runnable-track]:rounded-lg
                       [&::-webkit-slider-runnable-track]:h-3
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:w-6
                       [&::-webkit-slider-thumb]:h-6
                       [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-accent
                       [&::-webkit-slider-thumb]:cursor-grab
                       [&::-webkit-slider-thumb]:shadow-lg
                       [&::-moz-range-track]:bg-gray-700
                       [&::-moz-range-track]:rounded-lg
                       [&::-moz-range-track]:h-3
                       [&::-moz-range-thumb]:w-6
                       [&::-moz-range-thumb]:h-6
                       [&::-moz-range-thumb]:rounded-full
                       [&::-moz-range-thumb]:bg-accent
                       [&::-moz-range-thumb]:border-0"
          />
        </div>

        {/* Speed Slider */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-base font-medium">Speed</label>
            <span className="text-2xl font-bold text-green-400">
              {speedValue.toFixed(2)}x
            </span>
          </div>
          <input
            type="range"
            min="0.5"
            max="2.0"
            step="0.05"
            value={speedValue}
            onChange={handleSpeedChange}
            className="w-full h-3 rounded-lg appearance-none cursor-pointer
                       [&::-webkit-slider-runnable-track]:bg-gray-700
                       [&::-webkit-slider-runnable-track]:rounded-lg
                       [&::-webkit-slider-runnable-track]:h-3
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:w-6
                       [&::-webkit-slider-thumb]:h-6
                       [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-green-400
                       [&::-webkit-slider-thumb]:cursor-grab
                       [&::-webkit-slider-thumb]:shadow-lg
                       [&::-moz-range-track]:bg-gray-700
                       [&::-moz-range-track]:rounded-lg
                       [&::-moz-range-track]:h-3
                       [&::-moz-range-thumb]:w-6
                       [&::-moz-range-thumb]:h-6
                       [&::-moz-range-thumb]:rounded-full
                       [&::-moz-range-thumb]:bg-green-400
                       [&::-moz-range-thumb]:border-0"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0.5x (slower)</span>
            <span>1.0x (normal)</span>
            <span>2.0x (faster)</span>
          </div>
        </div>

        {/* Export */}
        <div className="pt-4 border-t border-divider">
          {!isProcessing && !processedBlob ? (
            <Button
              onClick={handleStartProcessing}
              disabled={!isReady || (pitchValue === 0 && speedValue === 1.0)}
              variant="download"
              size="md"
              className="w-full"
            >
              ⬇ Process & Download (WAV)
            </Button>
          ) : isProcessing ? (
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Processing...</span>
                <span className="text-accent font-semibold">{processProgress.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all"
                  style={{ width: `${processProgress}%` }}
                />
              </div>
            </div>
          ) : processedBlob ? (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl mb-2">✅</div>
                <h3 className="text-xl font-bold text-green-400">Ready to Download!</h3>
              </div>
              <Button
                onClick={handleDownload}
                variant="download"
                size="md"
                className="w-full"
              >
                ⬇ Download Your Audio
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
