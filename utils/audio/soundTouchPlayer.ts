/**
 * Real-time playback wrapper for SoundTouch
 * Provides play/pause/seek control and time tracking
 */
import { PitchShifter } from 'soundtouchjs'

export interface SoundTouchPlayerOptions {
  audioContext: AudioContext
  audioBuffer: AudioBuffer
  semitones: number
  tempo: number
  onTimeUpdate?: (currentTime: number, percentPlayed: number) => void
  onEnded?: () => void
}

export class SoundTouchPlayer {
  private shifter: PitchShifter | null = null
  private audioContext: AudioContext
  private audioBuffer: AudioBuffer
  private _isPlaying: boolean = false
  private _currentTime: number = 0
  private _seekOffset: number = 0 // Track seek offset for correct time reporting
  private playEventBound: boolean = false

  constructor(private options: SoundTouchPlayerOptions) {
    this.audioContext = options.audioContext
    this.audioBuffer = options.audioBuffer
  }

  /**
   * Initialize the PitchShifter
   * Must be called before play()
   */
  async initialize() {
    // Use 1024 buffer size for real-time playback (lower latency)
    const bufferSize = 1024

    this.shifter = new PitchShifter(
      this.audioContext,
      this.audioBuffer,
      bufferSize
    )

    // Set initial tempo and pitch
    this.shifter.tempo = this.options.tempo
    this.shifter.pitch = Math.pow(2, this.options.semitones / 12)

    // Set up event listeners
    this.setupEventListeners()
  }

  private setupEventListeners() {
    if (!this.shifter || this.playEventBound) return

    // Time tracking via play event
    // Add seek offset to get absolute time in original buffer
    this.shifter.on('play', (detail) => {
      this._currentTime = this._seekOffset + detail.timePlayed

      if (this.options.onTimeUpdate) {
        // Calculate percentage based on original buffer duration
        const totalDuration = this.audioBuffer.duration
        const percentPlayed = (this._currentTime / totalDuration) * 100
        this.options.onTimeUpdate(this._currentTime, percentPlayed)
      }
    })

    // End event
    this.shifter.on('end', () => {
      this._isPlaying = false
      if (this.options.onEnded) {
        this.options.onEnded()
      }
    })

    this.playEventBound = true
  }

  /**
   * Start or resume playback
   */
  play() {
    if (!this.shifter) {
      throw new Error('PitchShifter not initialized. Call initialize() first.')
    }

    if (this._isPlaying) {
      return // Already playing
    }

    // Connect to destination to start playback
    // NOTE: SoundTouch starts playing as soon as connected
    this.shifter.connect(this.audioContext.destination)
    this._isPlaying = true
  }

  /**
   * Pause playback
   */
  pause() {
    if (!this.shifter || !this._isPlaying) return

    // Disconnect to pause
    this.shifter.disconnect()
    this._isPlaying = false
  }

  /**
   * Stop playback and reset
   */
  stop() {
    if (!this.shifter) return

    this.shifter.disconnect()
    this._isPlaying = false
    this._currentTime = 0
  }

  /**
   * Get current playback time
   */
  getCurrentTime(): number {
    return this._currentTime
  }

  /**
   * Seek to a specific time
   * Note: SoundTouch doesn't support native seeking, so we recreate the player
   */
  async seek(targetTime: number) {
    const wasPlaying = this._isPlaying

    // Stop current playback
    if (this.shifter) {
      this.shifter.off()
      this.shifter.disconnect()
    }

    // Create a new buffer starting at the target time
    const startSample = Math.floor(targetTime * this.audioBuffer.sampleRate)
    const remainingSamples = this.audioBuffer.length - startSample

    if (remainingSamples <= 0) {
      this._currentTime = 0
      this._isPlaying = false
      return
    }

    // Create a new AudioBuffer with the remaining audio
    const seekBuffer = this.audioContext.createBuffer(
      this.audioBuffer.numberOfChannels,
      remainingSamples,
      this.audioBuffer.sampleRate
    )

    // Copy audio data from the seek position
    for (let channel = 0; channel < this.audioBuffer.numberOfChannels; channel++) {
      const sourceData = this.audioBuffer.getChannelData(channel)
      const destData = seekBuffer.getChannelData(channel)
      for (let i = 0; i < remainingSamples; i++) {
        destData[i] = sourceData[startSample + i]
      }
    }

    // Recreate PitchShifter with the new buffer
    const bufferSize = 1024
    this.shifter = new PitchShifter(this.audioContext, seekBuffer, bufferSize)
    this.shifter.tempo = this.options.tempo
    this.shifter.pitch = Math.pow(2, this.options.semitones / 12)

    // Set up event listeners again
    this.playEventBound = false
    this.setupEventListeners()

    // Update current time and seek offset
    this._currentTime = targetTime
    this._seekOffset = targetTime

    // Resume playback if it was playing
    if (wasPlaying) {
      this.shifter.connect(this.audioContext.destination)
      this._isPlaying = true
    }
  }

  /**
   * Update tempo (speed) in real-time
   */
  updateTempo(tempo: number) {
    if (this.shifter) {
      this.shifter.tempo = tempo
      this.options.tempo = tempo
    }
  }

  /**
   * Update pitch in real-time
   */
  updatePitch(semitones: number) {
    if (this.shifter) {
      this.shifter.pitch = Math.pow(2, semitones / 12)
      this.options.semitones = semitones
    }
  }

  /**
   * Update pitch using semitones directly (if supported)
   */
  updatePitchSemitones(semitones: number) {
    if (this.shifter && 'pitchSemitones' in this.shifter) {
      (this.shifter as any).pitchSemitones = semitones
      this.options.semitones = semitones
    } else {
      this.updatePitch(semitones)
    }
  }

  /**
   * Check if currently playing
   */
  get isPlaying(): boolean {
    return this._isPlaying
  }

  /**
   * Clean up and release resources
   */
  dispose() {
    if (this.shifter) {
      this.shifter.off() // Remove all event listeners
      this.shifter.disconnect()
      this.shifter = null
    }
    this._isPlaying = false
    this._currentTime = 0
    this._seekOffset = 0
    this.playEventBound = false
  }
}
