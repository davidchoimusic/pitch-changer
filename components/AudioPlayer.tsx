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
  const [preserveDuration, setPreserveDuration] = useState(true)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processProgress, setProcessProgress] = useState(0)
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null)
  const [safariUnlocked, setSafariUnlocked] = useState(false)

  const tonePlayerRef = useRef<Tone.Player | null>(null)
  const pitchShiftRef = useRef<Tone.PitchShift | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null)
  const audioBufferRef = useRef<AudioBuffer | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)
  const offsetRef = useRef<number>(0)
  const lastCurrentTimeRef = useRef<number>(0)
  const downloadSectionRef = useRef<HTMLDivElement | null>(null)

  // Load audio file
  useEffect(() => {
    const abortController = new AbortController()

    const loadAudio = async () => {
      try {
        setUploadProgress(0)
        setIsReady(false)

        // Read file as ArrayBuffer (single copy in memory)
        const arrayBuffer = await file.arrayBuffer()

        // Check if aborted (user uploaded new file)
        if (abortController.signal.aborted) return

        setUploadProgress(30)

        // Decode audio buffer for Web Audio API (reuses same ArrayBuffer, no copy)
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        audioContextRef.current = audioContext

        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

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
          setIsReady(false) // FIX: Don't enable playback on error
        }
      }
    }
    loadAudio()

    return () => {
      abortController.abort() // Cancel stale decode
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
    // Stop Tone playback path
    if (tonePlayerRef.current) {
      try {
        tonePlayerRef.current.stop()
        tonePlayerRef.current.dispose() // FIX: Dispose to prevent memory leaks
      } catch (e) {
        console.error('Error stopping Tone player:', e)
      }
      tonePlayerRef.current = null
    }

    // Dispose pitch shift effect too
    if (pitchShiftRef.current) {
      try {
        pitchShiftRef.current.dispose() // FIX: Dispose to prevent memory leaks
      } catch (e) {
        console.error('Error disposing pitch shift:', e)
      }
      pitchShiftRef.current = null
    }

    // Stop native Web Audio path
    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop()
        sourceNodeRef.current.disconnect()
      } catch (e) {
        console.error('Error stopping native player:', e)
      }
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

    // Safari unlock pattern (run once on first user gesture)
    if (!safariUnlocked && audioContextRef.current) {
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume()

        // Create silent buffer to fully unlock Safari audio
        const buffer = audioContextRef.current.createBuffer(1, 1, 22050)
        const source = audioContextRef.current.createBufferSource()
        source.buffer = buffer
        source.connect(audioContextRef.current.destination)
        source.start(0)

        setSafariUnlocked(true)
      }
    }

    await Tone.start()

    // Lazy init Tone.js on first play (Safari requires user gesture)
    if (preserveDuration && !tonePlayerRef.current && audioBufferRef.current) {
      const player = new Tone.Player()
      player.buffer.set(audioBufferRef.current)
      player.loop = false
      tonePlayerRef.current = player

      const pitchShiftEffect = new Tone.PitchShift({
        pitch: pitchShiftValue,
        windowSize: 0.1, // Higher quality, bugs were causing Safari delay
        delayTime: 0,
        feedback: 0
      }).toDestination()

      player.connect(pitchShiftEffect)
      pitchShiftRef.current = pitchShiftEffect
      console.log('Tone.js initialized on first play (Safari compatibility)')
    }

    if (isPlaying) {
      stopPlayback()
      if (preserveDuration) {
        offsetRef.current = currentTime
      } else {
        offsetRef.current = lastCurrentTimeRef.current
      }
    } else {
      if (preserveDuration) {
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

    // Always update Tone.js pitch shift (even when paused)
    if (pitchShiftRef.current) {
      pitchShiftRef.current.pitch = newPitch
    }

    // If playing in simple mode (native), restart with new pitch
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
    // Note: Tone.js updates pitch in real-time, no restart needed
  }

  const handleStartProcessing = async () => {
    if (!audioBufferRef.current) return

    setIsProcessing(true)
    setProcessProgress(0)
    setProcessedBlob(null)

    try {
      let processed: AudioBuffer

      if (preserveDuration) {
        // Use Tone.js for export (matches preview)
        processed = await exportWithTone(
          audioBufferRef.current,
          pitchShiftValue,
          (progress) => setProcessProgress(progress)
        )
      } else {
        // Use simple playbackRate mode
        processed = await pitchShift(audioBufferRef.current, {
          semitones: pitchShiftValue,
          mode: 'simple',
          onProgress: (progress) => setProcessProgress(progress)
        })
      }

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

  const getAdjustedDuration = () => {
    if (preserveDuration || pitchShiftValue === 0) {
      return duration
    }
    const playbackRate = Math.pow(2, pitchShiftValue / 12)
    return duration / playbackRate
  }

  const adjustedDuration = getAdjustedDuration()

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
              {duration > 0 && ` • ${formatTime(duration)} original`}
              {!preserveDuration && pitchShiftValue !== 0 && duration > 0 && ` → ${formatTime(adjustedDuration)} adjusted`}
            </p>
          </div>
        </div>

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
              {!preserveDuration && pitchShiftValue !== 0 && (
                <span className="text-sm text-gray-400 block mt-1">
                  Playback: {(Math.pow(2, pitchShiftValue / 12) * 100).toFixed(1)}% speed
                  {pitchShiftValue > 0 ? ' (faster)' : ' (slower)'}
                </span>
              )}
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

        {/* Preserve Duration Checkbox */}
        <div className="p-5 bg-gray-800/50 rounded-lg border border-divider space-y-3">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="preserve-duration"
              checked={preserveDuration}
              onChange={async (e) => {
                const newValue = e.target.checked
                const wasPlaying = isPlaying
                const currentPosition = currentTime

                stopPlayback()
                offsetRef.current = currentPosition

                setPreserveDuration(newValue)

                if (wasPlaying) {
                  await Tone.start()

                  if (newValue) {
                    // FIX: Re-initialize Tone player/effect if null
                    if (!tonePlayerRef.current || !pitchShiftRef.current) {
                      if (audioBufferRef.current) {
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
                      }
                    }

                    if (tonePlayerRef.current && pitchShiftRef.current) {
                      pitchShiftRef.current.pitch = pitchShiftValue
                      tonePlayerRef.current.start(undefined, currentPosition)
                      setIsPlaying(true)
                    }
                  } else {
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
              className="w-5 h-5 rounded border-gray-600 text-accent focus:ring-accent focus:ring-offset-0 cursor-pointer flex-shrink-0"
            />
            <label htmlFor="preserve-duration" className="font-medium cursor-pointer">
              Preserve Duration
            </label>
          </div>

          <div className="text-sm text-gray-400 space-y-2 ml-8">
            {preserveDuration ? (
              <>
                <p className="font-medium text-white">Checked (Recommended):</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Song stays the same length</li>
                  <li>Only pitch changes</li>
                </ul>
              </>
            ) : (
              <>
                <p className="font-medium text-white">When unchecked:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Higher pitch = audio speeds up and length gets shorter</li>
                  <li>Lower pitch = audio slows down and length gets longer</li>
                </ul>
              </>
            )}
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
                max={adjustedDuration || 100}
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
              <span className="text-sm text-gray-400 w-14 font-mono">{formatTime(adjustedDuration)}</span>
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
