'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from './ui/Button'
import { pitchShift, encodeToWav } from '@/utils/audio/pitchShift'
import { exportWithTone } from '@/utils/audio/toneExport'
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
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processProgress, setProcessProgress] = useState(0)
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null)
  const [safariUnlocked, setSafariUnlocked] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const tonePlayerRef = useRef<Tone.Player | null>(null)
  const pitchShiftRef = useRef<Tone.PitchShift | null>(null)
  const audioBufferRef = useRef<AudioBuffer | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const downloadSectionRef = useRef<HTMLDivElement | null>(null)
  // Ref for stable keydown callback
  const isReadyRef = useRef(isReady)
  // Track playback timing to keep slider in sync
  const playStartTimeRef = useRef<number>(0)
  const playStartOffsetRef = useRef<number>(0)
  // Track user seek interactions
  const isSeekingRef = useRef(false)
  const pendingSeekRef = useRef<number | null>(null)

  // Load audio file
  useEffect(() => {
    const abortController = new AbortController()

    const loadAudio = async () => {
      try {
        setUploadProgress(0)
        setIsReady(false)
        setError(null) // Clear previous errors
        setSafariUnlocked(false) // FIX: Reset unlock flag for new file

        // Read file as ArrayBuffer (single copy in memory)
        const arrayBuffer = await file.arrayBuffer()

        // Check if aborted (user uploaded new file)
        if (abortController.signal.aborted) return

        setUploadProgress(30)

        // Decode with regular AudioContext (Tone.start() requires user gesture)
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

        // Close immediately after decode - we'll use Tone's context for playback
        await audioContext.close()

        // Check again before setting state
        if (abortController.signal.aborted) return

        audioBufferRef.current = audioBuffer
        setDuration(audioBuffer.duration)
        setUploadProgress(100)

        // Don't create Tone.js player yet - Safari requires user gesture
        // Will be created on first Play button click
        setIsReady(true)
        console.log('Audio decoded successfully - ready for playback')

      } catch (error) {
        if (!abortController.signal.aborted) {
          console.error('Error loading audio:', error)
          setUploadProgress(100)
          setIsReady(false)
          // FIX: Show user-friendly error message
          setError('Unable to load audio file. Format may not be supported in this browser.')
        }
      }
    }
    loadAudio()

    return () => {
      abortController.abort() // Cancel stale decode
      stopPlayback(true) // FIX: Dispose on cleanup
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      // SIMPLIFIED: Tone.js manages its own context, no manual close needed
    }
  }, [file])

  // FIX: Update refs when state changes (for stable keydown callback)
  useEffect(() => {
    isReadyRef.current = isReady
  }, [isReady])

  // FIX: Spacebar to play/pause with stable callback (attach once)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't intercept space if focused on input/textarea
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return
      }

      if (e.code === 'Space' && isReadyRef.current) {
        e.preventDefault()
        handlePlayPause()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, []) // Empty deps = attach once only

  const stopPlayback = () => {
    // SIMPLIFIED: Tone.js only
    if (tonePlayerRef.current) {
      try {
        tonePlayerRef.current.stop()
        tonePlayerRef.current.dispose()
      } catch (e) {
        console.error('Error stopping Tone player:', e)
      }
    }

    if (pitchShiftRef.current) {
      try {
        pitchShiftRef.current.dispose()
      } catch (e) {
        console.error('Error disposing pitch shift:', e)
      }
    }

    setIsPlaying(false)
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }

  // SIMPLIFIED: Single animation loop for Tone.js only
  const updateTime = () => {
    if (!tonePlayerRef.current) return

    // Compute position based on start offset and elapsed time
    const elapsed = Tone.now() - playStartTimeRef.current
    const time = playStartOffsetRef.current + elapsed
    // Avoid fighting user drag
    if (!isSeekingRef.current) {
      setCurrentTime(time)
    }

    if (time >= duration - 0.1) {
      setIsPlaying(false)
      setCurrentTime(0)
      tonePlayerRef.current.stop()
      // Clear any pending RAF
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
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
        animationFrameRef.current = null
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }
  }, [isPlaying, duration])

  const handlePlayPause = async () => {
    if (!isReady) return

    // SIMPLIFIED: Safari unlock for Tone.js context only
    if (!safariUnlocked) {
      await Tone.start()

      if (Tone.context.state === 'suspended') {
        await Tone.context.resume()
      }

      setSafariUnlocked(true)
    }

      // FIX: Also unlock Tone's context (they might be different!)
      if (Tone.context.state === 'suspended') {
        await Tone.context.resume()
      }

      setSafariUnlocked(true)
    }

    // Lazy init Tone.js on first play (Safari requires user gesture)
    if (!tonePlayerRef.current && audioBufferRef.current) {
      const player = new Tone.Player()
      player.buffer.set(audioBufferRef.current)
      player.loop = false
      tonePlayerRef.current = player

      const pitchShiftEffect = new Tone.PitchShift({
        pitch: pitchShiftValue,
        windowSize: 0.1,
        delayTime: 0,
        feedback: 0
      }).toDestination()

      player.connect(pitchShiftEffect)
      pitchShiftRef.current = pitchShiftEffect
      console.log('Tone.js initialized on first play')
    }

    if (isPlaying) {
      stopPlayback()
    } else {
      if (!tonePlayerRef.current) return

      if (pitchShiftRef.current) {
        pitchShiftRef.current.pitch = pitchShiftValue
      }

      const startOffset = currentTime > 0 ? currentTime : 0
      playStartOffsetRef.current = startOffset
      playStartTimeRef.current = Tone.now()
      tonePlayerRef.current.start(undefined, startOffset)
      setIsPlaying(true)
    }
  }

  const handleSeekStart = () => {
    isSeekingRef.current = true
  }

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    pendingSeekRef.current = newTime
    setCurrentTime(newTime)
  }

  const handleSeekEnd = () => {
    const target = pendingSeekRef.current
    isSeekingRef.current = false
    pendingSeekRef.current = null

    if (target == null) return

    if (isPlaying && tonePlayerRef.current) {
      try {
        tonePlayerRef.current.stop()
      } catch (e) {
        // Player might already be stopped
      }
      // Restart and update timing baseline
      playStartOffsetRef.current = target
      playStartTimeRef.current = Tone.now()
      tonePlayerRef.current.start(undefined, target)
    } else {
      // Paused: set position; next play starts from here
      setCurrentTime(target)
      playStartOffsetRef.current = target
    }
  }

  const handlePitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPitch = parseInt(e.target.value)
    setPitchShiftValue(newPitch)

    // SIMPLIFIED: Tone.js updates pitch in real-time, no restart needed
    if (pitchShiftRef.current) {
      pitchShiftRef.current.pitch = newPitch
    }
  }

  const handleStartProcessing = async () => {
    if (!audioBufferRef.current) return

    setIsProcessing(true)
    setProcessProgress(0)
    setProcessedBlob(null)

    try {
      // SIMPLIFIED: Always use Tone.js for export (matches preview)
      const processed = await exportWithTone(
        audioBufferRef.current,
        pitchShiftValue,
        (progress) => setProcessProgress(progress)
      )

      const blob = encodeToWav(processed)
      setProcessedBlob(blob)
      setProcessProgress(100)
    } catch (error) {
      console.error('Error processing audio:', error)
      setIsProcessing(false)
    }
  }

  const handleCancelProcessing = () => {
    setIsProcessing(false)
    setProcessProgress(0)
  }

  const handleFinalDownload = () => {
    if (!processedBlob) return

    const url = URL.createObjectURL(processedBlob)
    const a = document.createElement('a')
    a.href = url

    // Generate filename based on pitch direction
    const baseName = file.name.replace(/\.[^/.]+$/, '')
    let suffix = ''
    if (pitchShiftValue > 0) {
      suffix = ' - SPED UP - PitchChanger.io'
    } else if (pitchShiftValue < 0) {
      suffix = ' - SLOWED - PitchChanger.io'
    } else {
      suffix = ' - PitchChanger.io'
    }

    a.download = `${baseName}${suffix}.wav`
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
      <div className="bg-bg-card border border-divider rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-400">
              {uploadProgress < 100 ? 'Decoding in browser...' : isReady ? '✅ Ready to Play' : 'Initializing...'}
            </p>
            <p className="text-lg font-medium mt-1">{file.name}</p>
            <p className="text-sm text-gray-500 mt-1">
              {(file.size / 1024 / 1024).toFixed(2)} MB
              {duration > 0 && ` • ${formatTime(duration)}`}
            </p>
          </div>
        </div>

        {/* FIX: Display decode errors to user */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {uploadProgress < 100 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Decoding audio in browser...</span>
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
      <div className="bg-bg-card border border-divider rounded-lg p-8 space-y-6">
        {/* Pitch Control Slider */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-base font-medium">Pitch Shift</label>
            <div className="text-right">
              <span className="text-2xl font-bold text-accent block">
                {pitchShiftValue > 0 ? '+' : ''}{pitchShiftValue} semitones
              </span>
            </div>
          </div>
          <div className="space-y-2">
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

            <div className="flex justify-between text-sm text-gray-500 px-2">
              <span className="font-semibold">-12</span>
              <span className="font-semibold">-6</span>
              <div className="flex flex-col items-center">
                <span className="text-xs text-accent font-medium">Original Key</span>
                <span className="font-bold text-accent">0</span>
              </div>
              <span className="font-semibold">+6</span>
              <span className="font-semibold">+12</span>
            </div>
          </div>
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
                onMouseDown={handleSeekStart}
                onTouchStart={handleSeekStart}
                onChange={handleSeekChange}
                onMouseUp={handleSeekEnd}
                onTouchEnd={handleSeekEnd}
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
          </p>
        </div>

        {/* Process Button / Progress */}
        <div className="pt-4 border-t border-divider">
          {!isProcessing && !processedBlob ? (
            <div className="flex justify-center">
              <Button
                onClick={handleStartProcessing}
                disabled={!audioBufferRef.current || !isReady || pitchShiftValue === 0}
                variant="download"
                size="md"
                className="px-12"
              >
                ⬇ Process & Download Audio (WAV)
              </Button>
            </div>
          ) : isProcessing ? (
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
                  <p className="text-2xl font-bold text-white">
                    ⏳ While you wait...
                  </p>
                  <p className="text-lg text-gray-300">
                    Scroll down to view our sponsors!
                  </p>
                  <div className="text-4xl animate-bounce">
                    ⬇️
                  </div>
                  <p className="text-sm text-gray-400">
                    Their support keeps this tool free for you
                  </p>
                  <Button
                    onClick={handleCancelProcessing}
                    variant="ghost"
                    size="sm"
                  >
                    Cancel
                  </Button>
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

          {pitchShiftValue === 0 && !isProcessing && (
            <p className="text-xs text-gray-500 text-center mt-2">Adjust pitch to enable download</p>
          )}
        </div>
      </div>

      {/* Ad Space 1 */}
      {isProcessing && (
        <>
          <div className="bg-bg-card border border-divider rounded-lg p-8">
            <div className="h-[250px] bg-gray-800/50 border border-gray-700 rounded flex items-center justify-center">
              <p className="text-gray-500">Ad Space - Sponsor 1 (728x250)</p>
            </div>
          </div>

          {/* Ad Space 2 */}
          <div className="bg-bg-card border border-divider rounded-lg p-8">
            <div className="h-[250px] bg-gray-800/50 border border-gray-700 rounded flex items-center justify-center">
              <p className="text-gray-500">Ad Space - Sponsor 2 (728x250)</p>
            </div>
          </div>

          {/* Download Ready Section */}
          {processedBlob && (
            <div ref={downloadSectionRef} className="bg-green-500/10 border-2 border-green-500/50 rounded-lg p-8 space-y-4">
              <div className="text-center space-y-3">
                <div className="text-5xl">✅</div>
                <h3 className="text-2xl font-bold text-green-400">Your Audio is Ready!</h3>
                <p className="text-gray-300">
                  Pitch shifted by <span className="text-accent font-semibold">{pitchShiftValue > 0 ? '+' : ''}{pitchShiftValue} semitones</span>
                </p>
              </div>
              <div className="flex justify-center">
                <Button
                  onClick={handleFinalDownload}
                  variant="download"
                  size="md"
                  className="px-12"
                >
                  ⬇ Download Your Processed Audio
                </Button>
              </div>
              <p className="text-xs text-gray-400 text-center">
                Thank you for supporting PitchChanger.io! 🙏
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
