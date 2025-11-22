/**
 * Audio Pitch Shifting Utilities
 * Supports two modes:
 * 1. Simple (time-coupled): Fast, uses playbackRate
 * 2. Preserve Duration (time-independent): Slower, uses AudioWorklet
 */

export type PitchShiftMode = 'simple' | 'preserve-duration'

export interface PitchShiftOptions {
  semitones: number
  mode: PitchShiftMode
  onProgress?: (progress: number) => void
}

/**
 * Simple pitch shift (time-coupled)
 * Changes pitch AND duration using playbackRate
 * Fast and efficient for quick previews
 */
export async function simplePitchShift(
  audioBuffer: AudioBuffer,
  semitones: number
): Promise<AudioBuffer> {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

  // Calculate playback rate from semitones
  const playbackRate = Math.pow(2, semitones / 12)

  // Create offline context with adjusted duration
  const duration = audioBuffer.duration / playbackRate
  const offlineContext = new OfflineAudioContext(
    audioBuffer.numberOfChannels,
    audioBuffer.sampleRate * duration,
    audioBuffer.sampleRate
  )

  const source = offlineContext.createBufferSource()
  source.buffer = audioBuffer
  source.playbackRate.value = playbackRate
  source.connect(offlineContext.destination)
  source.start(0)

  return await offlineContext.startRendering()
}

/**
 * Preserve duration pitch shift (time-independent)
 * Changes pitch WITHOUT changing duration
 * Uses phase vocoder algorithm via AudioWorklet
 *
 * Note: This is a placeholder for the AudioWorklet implementation
 * For production, use a library like Tone.js or implement custom Worklet
 */
export async function preserveDurationPitchShift(
  audioBuffer: AudioBuffer,
  semitones: number,
  onProgress?: (progress: number) => void
): Promise<AudioBuffer> {
  // For now, we'll use a simple granular synthesis approach
  // In production, you'd use a proper phase vocoder or WSOLA algorithm

  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  const pitchRatio = Math.pow(2, semitones / 12)

  // Create offline context with same duration
  const offlineContext = new OfflineAudioContext(
    audioBuffer.numberOfChannels,
    audioBuffer.length,
    audioBuffer.sampleRate
  )

  // Basic granular synthesis for time-independent pitch shifting
  // This is a simplified version - production would use proper WSOLA/phase vocoder
  const grainSize = 0.1 // 100ms grains
  const overlap = 0.5
  const numGrains = Math.ceil(audioBuffer.duration / (grainSize * (1 - overlap)))

  for (let i = 0; i < numGrains; i++) {
    const source = offlineContext.createBufferSource()
    source.buffer = audioBuffer
    source.playbackRate.value = pitchRatio

    const gainNode = offlineContext.createGain()
    // Simple envelope for grain
    const startTime = i * grainSize * (1 - overlap)
    gainNode.gain.setValueAtTime(0, startTime)
    gainNode.gain.linearRampToValueAtTime(1, startTime + grainSize * 0.1)
    gainNode.gain.linearRampToValueAtTime(0, startTime + grainSize * 0.9)

    source.connect(gainNode)
    gainNode.connect(offlineContext.destination)
    source.start(startTime, i * grainSize, grainSize)

    if (onProgress && i % 10 === 0) {
      onProgress((i / numGrains) * 100)
    }
  }

  return await offlineContext.startRendering()
}

/**
 * Main pitch shift function
 * Routes to appropriate algorithm based on mode
 */
export async function pitchShift(
  audioBuffer: AudioBuffer,
  options: PitchShiftOptions
): Promise<AudioBuffer> {
  const { semitones, mode, onProgress } = options

  if (mode === 'simple') {
    return simplePitchShift(audioBuffer, semitones)
  } else {
    return preserveDurationPitchShift(audioBuffer, semitones, onProgress)
  }
}

/**
 * Decode audio file to AudioBuffer
 */
export async function decodeAudioFile(file: File): Promise<AudioBuffer> {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  const arrayBuffer = await file.arrayBuffer()
  return await audioContext.decodeAudioData(arrayBuffer)
}

/**
 * Encode AudioBuffer to WAV blob
 */
export function encodeToWav(audioBuffer: AudioBuffer): Blob {
  const numberOfChannels = audioBuffer.numberOfChannels
  const length = audioBuffer.length * numberOfChannels * 2
  const buffer = new ArrayBuffer(44 + length)
  const view = new DataView(buffer)

  // WAV header
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i))
    }
  }

  writeString(0, 'RIFF')
  view.setUint32(4, 36 + length, true)
  writeString(8, 'WAVE')
  writeString(12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, numberOfChannels, true)
  view.setUint32(24, audioBuffer.sampleRate, true)
  view.setUint32(28, audioBuffer.sampleRate * numberOfChannels * 2, true)
  view.setUint16(32, numberOfChannels * 2, true)
  view.setUint16(34, 16, true)
  writeString(36, 'data')
  view.setUint32(40, length, true)

  // Write audio data
  const channels = []
  for (let i = 0; i < numberOfChannels; i++) {
    channels.push(audioBuffer.getChannelData(i))
  }

  let offset = 44
  for (let i = 0; i < audioBuffer.length; i++) {
    for (let channel = 0; channel < numberOfChannels; channel++) {
      const sample = Math.max(-1, Math.min(1, channels[channel][i]))
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true)
      offset += 2
    }
  }

  return new Blob([buffer], { type: 'audio/wav' })
}
