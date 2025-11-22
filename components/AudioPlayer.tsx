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

  const playerRef = useRef<Tone.Player | null>(null)
  const pitchShiftRef = useRef<Tone.PitchShift | null>(null)
  const audioBufferRef = useRef<AudioBuffer | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  // Load audio file
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

        // Decode for both Tone.js and download processing
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
        audioBufferRef.current = audioBuffer
        setDuration(audioBuffer.duration)

        // Create Tone.js player from buffer
        await Tone.start()
        const player = new Tone.Player().toDestination()
        player.buffer.set(audioBuffer)
        player.loop = false
        playerRef.current = player

        // Create pitch shift effect
        const pitchShiftEffect = new Tone.PitchShift({
          pitch: 0,
          windowSize: 0.1,
          delayTime: 0,
          feedback: 0
        }).toDestination()

        player.disconnect()
        player.connect(pitchShiftEffect)
        pitchShiftRef.current = pitchShiftEffect

        clearInterval(uploadInterval)
        setUploadProgress(100)
      } catch (error) {
        console.error('Error loading audio:', error)
      }
    }
    loadAudio()

    return () => {
      if (playerRef.current) {
        playerRef.current.stop()
        playerRef.current.dispose()
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
    if (!playerRef.current || !isPlaying) return

    const time = playerRef.current.immediate()
    setCurrentTime(time)

    if (time >= duration - 0.1) {
      setIsPlaying(false)
      setCurrentTime(0)
      if (playerRef.current) {
        playerRef.current.stop()
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
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isPlaying, duration])

  const handlePlayPause = async () => {
    if (!playerRef.current) return

    await Tone.start()

    if (isPlaying) {
      playerRef.current.stop()
      setIsPlaying(false)
    } else {
      if (currentTime > 0) {
        playerRef.current.start(undefined, currentTime)
      } else {
        playerRef.current.start()
      }
      setIsPlaying(true)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)

    if (playerRef.current && isPlaying) {
      playerRef.current.stop()
      playerRef.current.start(undefined, newTime)
    }
  }

  const handlePitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPitch = parseInt(e.target.value)
    setPitchShiftValue(newPitch)

    if (pitchShiftRef.current) {
      pitchShiftRef.current.pitch = newPitch
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

        {/* Real-time pitch shifting info */}
        <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
          <div className="text-green-400 text-xl mt-0.5">✨</div>
          <div className="text-sm">
            <p className="font-medium text-green-200">Real-Time Pitch Shifting Enabled</p>
            <p className="text-green-100/80 mt-1">
              Powered by Tone.js - hear pitch changes instantly while preserving duration! Move the slider while playing to hear it in real-time.
            </p>
          </div>
        </div>

        {/* Preserve Duration Checkbox */}
        <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg border border-white/10">
          <input
            type="checkbox"
            id="preserve-duration"
            checked={preserveDuration}
            onChange={(e) => setPreserveDuration(e.target.checked)}
            className="w-5 h-5 rounded border-gray-600 text-accent focus:ring-accent focus:ring-offset-0 cursor-pointer"
          />
          <label htmlFor="preserve-duration" className="text-sm cursor-pointer flex-1">
            <span className="font-medium">Preserve Duration (for Download)</span>
            <span className="text-gray-400 ml-2 block mt-1">
              {preserveDuration
                ? 'Download will use advanced processing to maintain original duration'
                : 'Download will use simple mode (pitch and duration change together)'}
            </span>
          </label>
        </div>

        {/* Playback Controls */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={handlePlayPause}
              disabled={!playerRef.current || uploadProgress < 100}
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
                disabled={uploadProgress < 100}
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
          <p className="text-xs text-gray-500 text-center">Press <kbd className="px-2 py-1 bg-gray-700 rounded text-white">Spacebar</kbd> to play/pause</p>
        </div>

        {/* Download Button */}
        <div className="pt-4 border-t border-white/10">
          <Button
            onClick={handleDownload}
            disabled={!audioBufferRef.current || uploadProgress < 100 || pitchShiftValue === 0}
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
