'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from './ui/Button'
import { exportWithSoundTouch, isSoundTouchExportSupported } from '@/utils/audio/soundTouchExport'
import { encodeToWav } from '@/utils/audio/pitchShift'
import { SoundTouchPlayer } from '@/utils/audio/soundTouchPlayer'

interface AudioPlayerSoundTouchProps {
  file: File
  onBack: () => void
}

export function AudioPlayerSoundTouch({ file, onBack }: AudioPlayerSoundTouchProps) {
  // State
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [pitchValue, setPitchValue] = useState(0) // Semitones
  const [speedValue, setSpeedValue] = useState(1.0) // Tempo
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processProgress, setProcessProgress] = useState(0)
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null)
  const [isPrivateMode, setIsPrivateMode] = useState(false)
  const [processError, setProcessError] = useState<string | null>(null)

  // Refs - SIMPLIFIED: SoundTouch player only
  const soundTouchPlayerRef = useRef<SoundTouchPlayer | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const audioBufferRef = useRef<AudioBuffer | null>(null)
  const waveformCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const downloadSectionRef = useRef<HTMLDivElement | null>(null)
  const processTimeoutRef = useRef<NodeJS.Timeout | null>(null)
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

        // Decode with regular AudioContext
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
          window.gtag('event', 'file_uploaded', {
            file_size_mb: (file.size / 1024 / 1024).toFixed(2),
            file_type: file.type,
            audio_engine: 'soundtouch',
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
      if (soundTouchPlayerRef.current) {
        soundTouchPlayerRef.current.dispose()
        soundTouchPlayerRef.current = null
      }
      if (audioContextRef.current) {
        audioContextRef.current.close()
        audioContextRef.current = null
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
  const handleWaveformClick = async (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!waveformCanvasRef.current || !audioBufferRef.current || !soundTouchPlayerRef.current) return

    const canvas = waveformCanvasRef.current
    const rect = canvas.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentageClicked = clickX / rect.width
    const newTime = percentageClicked * duration

    // Update time immediately for visual feedback
    setCurrentTime(newTime)

    // Seek using SoundTouch player
    try {
      await soundTouchPlayerRef.current.seek(newTime)
    } catch (error) {
      console.error('Seek error:', error)
    }
  }

  // Update refs for spacebar handler
  useEffect(() => {
    isReadyRef.current = isReady
  }, [isReady])

  // Detect private mode
  useEffect(() => {
    let cancelled = false
    const detectPrivate = async () => {
      try {
        if (navigator.storage?.estimate) {
          const est = await navigator.storage.estimate()
          if (!cancelled && est.quota && est.quota < 120 * 1024 * 1024) {
            setIsPrivateMode(true)
          }
        }
      } catch (e) {
        // Ignore detection errors
      }
    }
    detectPrivate()
    return () => {
      cancelled = true
    }
  }, [])

  // Calculate playhead position percentage for CSS
  const playheadPercent = duration > 0 ? (currentTime / duration) * 100 : 0
  const pitchFillPercent = ((pitchValue + 12) / 24) * 100
  const speedFillPercent = ((speedValue - 0.5) / 1.0) * 100

  // Stop playback
  const stopPlayback = () => {
    if (soundTouchPlayerRef.current) {
      soundTouchPlayerRef.current.stop()
    }
    setIsPlaying(false)
  }

  // Play/pause - SIMPLIFIED with SoundTouch (NO compensation!)
  const handlePlayPause = async () => {
    if (!isReady || !audioBufferRef.current) return

    // Create AudioContext on first interaction (user gesture required)
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }

    await audioContextRef.current.resume()

    // Lazy init on first play
    if (!soundTouchPlayerRef.current) {
      const player = new SoundTouchPlayer({
        audioContext: audioContextRef.current,
        audioBuffer: audioBufferRef.current,
        semitones: pitchValue,
        tempo: speedValue,
        onTimeUpdate: (time, percent) => {
          setCurrentTime(time)
        },
        onEnded: () => {
          setIsPlaying(false)
          setCurrentTime(0)
        }
      })

      await player.initialize()
      soundTouchPlayerRef.current = player
    }

    if (isPlaying) {
      soundTouchPlayerRef.current.pause()
      setIsPlaying(false)
    } else {
      soundTouchPlayerRef.current.play()
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

  // Pitch change - SIMPLIFIED (NO compensation!)
  const handlePitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPitch = parseInt(e.target.value)
    setPitchValue(newPitch)

    // Direct update, NO COMPENSATION NEEDED!
    if (soundTouchPlayerRef.current) {
      soundTouchPlayerRef.current.updatePitch(newPitch)
    }

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'pitch_adjusted', {
        pitch_value: newPitch,
        audio_engine: 'soundtouch',
      })
    }
  }

  // Speed change - SIMPLIFIED (NO compensation!)
  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = parseFloat(e.target.value)
    setSpeedValue(newSpeed)

    // Direct update, NO COMPENSATION NEEDED!
    if (soundTouchPlayerRef.current) {
      soundTouchPlayerRef.current.updateTempo(newSpeed)
    }

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'speed_adjusted', {
        speed_value: newSpeed,
        audio_engine: 'soundtouch',
      })
    }
  }

  // Processing - Use SoundTouch export
  const handleStartProcessing = async () => {
    if (!audioBufferRef.current) return

    if (isPrivateMode) {
      setProcessError('Processing may not work in private browsing. Please use a regular window.')
      setIsProcessing(false)
      setProcessProgress(0)
      return
    }

    // Check browser support for SoundTouch export
    if (!isSoundTouchExportSupported()) {
      setProcessError('Offline export works best on Chrome or Edge. Preview playback works on all browsers.')
    }

    stopPlayback()
    setIsProcessing(true)
    setProcessProgress(0)
    setProcessedBlob(null)
    setProcessError(null)

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'processing_started', {
        pitch_value: pitchValue,
        speed_value: speedValue,
        audio_engine: 'soundtouch',
      })
    }

    // Add timeout guard for slower devices
    if (processTimeoutRef.current) {
      clearTimeout(processTimeoutRef.current)
    }
    processTimeoutRef.current = setTimeout(() => {
      setIsProcessing(false)
      setProcessError('Processing timed out on this device. Try a smaller file or use desktop.')
    }, 45000)

    try {
      // Use SoundTouch for export (NO compensation!)
      const processed = await exportWithSoundTouch(
        audioBufferRef.current,
        pitchValue,
        speedValue,
        (progress) => setProcessProgress(progress)
      )

      if (processTimeoutRef.current) {
        clearTimeout(processTimeoutRef.current)
        processTimeoutRef.current = null
      }

      const blob = encodeToWav(processed)
      setProcessedBlob(blob)
      setProcessProgress(100)
      setIsProcessing(false)

    } catch (error) {
      console.error('Processing error:', error)
      if (processTimeoutRef.current) {
        clearTimeout(processTimeoutRef.current)
        processTimeoutRef.current = null
      }
      setIsProcessing(false)
      setProcessError(
        error instanceof Error
          ? error.message
          : 'Processing failed. Please try again or use a smaller file.'
      )
    }
  }

  const handleDownload = () => {
    if (!processedBlob) return

    const url = URL.createObjectURL(processedBlob)
    const a = document.createElement('a')
    a.href = url

    // Generate filename based on pitch direction
    const baseName = file.name.replace(/\.[^/.]+$/, '')
    let suffix = ''
    if (pitchValue > 0) {
      suffix = ' - SPED UP - PitchChanger.io'
    } else if (pitchValue < 0) {
      suffix = ' - SLOWED - PitchChanger.io'
    } else {
      suffix = ' - PitchChanger.io'
    }

    a.download = `${baseName}${suffix}.wav`
    a.click()
    URL.revokeObjectURL(url)

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'download_completed', {
        pitch_value: pitchValue,
        speed_value: speedValue,
        audio_engine: 'soundtouch',
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
          {uploadProgress < 100 ? 'Loading...' : isReady ? '✅ Ready (SoundTouch Engine)' : 'Initializing...'}
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
            style={{
              background: `linear-gradient(to right,
                rgb(59 130 246) 0%,
                rgb(59 130 246) ${pitchFillPercent}%,
                rgb(55 65 81) ${pitchFillPercent}%,
                rgb(55 65 81) 100%)`
            }}
            className="w-full h-4 rounded-lg appearance-none cursor-pointer bg-gray-700
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:w-5
                       [&::-webkit-slider-thumb]:h-5
                       [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-white
                       [&::-webkit-slider-thumb]:border-4
                       [&::-webkit-slider-thumb]:border-accent
                       [&::-webkit-slider-thumb]:cursor-grab
                       [&::-webkit-slider-thumb]:shadow-lg
                       [&::-webkit-slider-thumb]:active:cursor-grabbing
                       [&::-webkit-slider-thumb]:hover:scale-110
                       [&::-webkit-slider-thumb]:transition-transform
                       [&::-moz-range-thumb]:w-5
                       [&::-moz-range-thumb]:h-5
                       [&::-moz-range-thumb]:rounded-full
                       [&::-moz-range-thumb]:bg-white
                       [&::-moz-range-thumb]:border-4
                       [&::-moz-range-thumb]:border-accent
                       [&::-moz-range-thumb]:cursor-grab
                       [&::-moz-range-thumb]:shadow-lg
                       [&::-moz-range-thumb]:active:cursor-grabbing
                       [&::-moz-range-thumb]:hover:scale-110
                       [&::-moz-range-thumb]:transition-transform
                       focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
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
            max="1.5"
            step="0.05"
            value={speedValue}
            onChange={handleSpeedChange}
            style={{
              background: `linear-gradient(to right,
                rgb(74 222 128) 0%,
                rgb(74 222 128) ${speedFillPercent}%,
                rgb(55 65 81) ${speedFillPercent}%,
                rgb(55 65 81) 100%)`
            }}
            className="w-full h-4 rounded-lg appearance-none cursor-pointer bg-gray-700
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:w-5
                       [&::-webkit-slider-thumb]:h-5
                       [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-white
                       [&::-webkit-slider-thumb]:border-4
                       [&::-webkit-slider-thumb]:border-green-400
                       [&::-webkit-slider-thumb]:cursor-grab
                       [&::-webkit-slider-thumb]:shadow-lg
                       [&::-webkit-slider-thumb]:active:cursor-grabbing
                       [&::-webkit-slider-thumb]:hover:scale-110
                       [&::-webkit-slider-thumb]:transition-transform
                       [&::-moz-range-thumb]:w-5
                       [&::-moz-range-thumb]:h-5
                       [&::-moz-range-thumb]:rounded-full
                       [&::-moz-range-thumb]:bg-white
                       [&::-moz-range-thumb]:border-4
                       [&::-moz-range-thumb]:border-green-400
                       [&::-moz-range-thumb]:cursor-grab
                       [&::-moz-range-thumb]:shadow-lg
                       [&::-moz-range-thumb]:active:cursor-grabbing
                       [&::-moz-range-thumb]:hover:scale-110
                       [&::-moz-range-thumb]:transition-transform
                       focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0.5x (slower)</span>
            <span>1.0x (normal)</span>
            <span>1.5x (faster)</span>
          </div>
        </div>

        {/* Process Button / Progress */}
        <div className="pt-4 border-t border-divider">
          {processError && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-300">
              {processError}
            </div>
          )}
          {!isProcessing && !processedBlob ? (
            <>
              <div className="flex justify-center">
                <Button
                  onClick={handleStartProcessing}
                  disabled={!audioBufferRef.current || !isReady || (pitchValue === 0 && speedValue === 1.0) || isPrivateMode}
                  variant="download"
                  size="md"
                  className="px-12"
                >
                  ⬇ Process Audio (WAV)
                </Button>
              </div>
              {isPrivateMode && (
                <p className="text-xs text-red-300 text-center font-semibold mt-2">
                  ⚠️ Processing may not work in private browsing mode
                </p>
              )}
            </>
          ) : (isProcessing || processedBlob) ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white font-medium">Processing your audio...</span>
                  <span className="text-accent font-semibold">{processProgress.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${processProgress}%` }}
                  />
                </div>
              </div>

              {processProgress < 100 ? (
                <div className="text-center space-y-3 py-4">
                  <p className="text-2xl font-bold text-white">⏳ While you wait...</p>
                  <p className="text-lg text-gray-300">Check out these ads below.</p>
                  <div className="text-4xl animate-bounce">⬇️</div>
                  <p className="text-sm text-gray-400">The ads keep this tool free for you</p>
                  <p className="text-xs text-red-300 font-semibold">⚠️ Processing may not work in private browsing. Use a regular window.</p>
                </div>
              ) : (
                <div className="text-center space-y-3 py-4">
                  <div className="text-5xl">✅</div>
                  <p className="text-3xl font-bold text-green-400">
                    SUCCESS!
                  </p>
                  <p className="text-xl font-semibold text-white">
                    YOUR FILE IS READY!
                  </p>
                  <p className="text-sm text-gray-400">
                    Scroll down to download
                  </p>
                  <div className="text-3xl animate-bounce">
                    ⬇️
                  </div>
                </div>
              )}
            </div>
          ) : null}

          {(pitchValue === 0 && speedValue === 1.0) && !isProcessing && (
            <p className="text-xs text-white text-center mt-2">Adjust pitch or speed to enable processing</p>
          )}
        </div>
      </div>

      {/* Download Ready Section */}
      {(isProcessing || processedBlob) && (
        <>
          {processedBlob && (
            <div ref={downloadSectionRef} className="bg-green-500/10 border-2 border-green-500/50 rounded-lg p-8 space-y-4">
              <div className="text-center space-y-3">
                <div className="text-5xl">✅</div>
                <h3 className="text-2xl font-bold text-green-400">Your Audio is Ready!</h3>
                <p className="text-gray-300">
                  Pitch shifted by <span className="text-accent font-semibold">{pitchValue > 0 ? '+' : ''}{pitchValue} semitones</span>
                  {speedValue !== 1.0 && <span> • Speed adjusted to <span className="text-green-400 font-semibold">{speedValue.toFixed(2)}x</span></span>}
                </p>
              </div>
              <div className="flex justify-center">
                <Button
                  onClick={handleDownload}
                  variant="download"
                  size="md"
                  className="px-12"
                >
                  Download
                </Button>
              </div>
              <p className="text-center text-sm font-semibold text-pink-400 drop-shadow-[0_0_12px_rgba(236,72,153,0.8)] animate-[pulse_0.4s_ease-in-out_infinite]">
                Made with ❤️ by PitchChanger.io
              </p>

              {/* Share Buttons */}
              <div className="pt-4 border-t border-green-500/30 mt-4">
                <p className="text-center text-sm text-gray-400 mb-3">Share this tool</p>
                <div className="flex justify-center gap-3">
                  {/* X (Twitter) */}
                  <a
                    href="https://twitter.com/intent/tweet?text=Just%20used%20this%20free%20pitch%20changer%20to%20transpose%20a%20song%20%E2%80%94%20works%20great!&url=https%3A%2F%2Fpitchchanger.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-black hover:bg-gray-800 transition-colors"
                    title="Share on X"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fpitchchanger.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0A66C2] hover:bg-[#004182] transition-colors"
                    title="Share on LinkedIn"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  {/* Instagram (Copy Link) */}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('https://pitchchanger.io')
                      alert('Link copied! Share it on Instagram')
                    }}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-80 transition-opacity"
                    title="Copy link for Instagram"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </button>
                  {/* Email */}
                  <a
                    href="mailto:?subject=Check%20out%20this%20free%20pitch%20changer&body=I%20found%20this%20free%20tool%20to%20change%20the%20pitch%20of%20songs%20without%20changing%20speed.%20Works%20great!%0A%0Ahttps%3A%2F%2Fpitchchanger.io"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-600 hover:bg-gray-500 transition-colors"
                    title="Share via Email"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Upload Another File - Always Visible at Bottom */}
      <Button onClick={onBack} variant="ghost" size="sm">
        ← Upload Different File
      </Button>
    </div>
  )
}
