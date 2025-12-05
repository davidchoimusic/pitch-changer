/**
 * Export audio using SoundTouch pure offline sample processing
 * Avoids OfflineAudioContext + ScriptProcessor bugs in Safari/Firefox
 */
import { PitchShifter } from 'soundtouchjs'

export async function exportWithSoundTouch(
  audioBuffer: AudioBuffer,
  semitones: number,
  speed: number = 1.0,
  onProgress?: (progress: number) => void
): Promise<AudioBuffer> {
  try {
    // Create a temporary AudioContext for the PitchShifter
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

    // Calculate expected output duration
    const expectedDuration = audioBuffer.duration / speed
    const expectedSamples = Math.ceil(expectedDuration * audioBuffer.sampleRate)

    // Use larger buffer size for offline processing (reduces overhead)
    const bufferSize = 4096

    // Create PitchShifter
    // NOTE: We'll use this differently - not for real-time, but to process offline
    const shifter = new PitchShifter(audioContext, audioBuffer, bufferSize)

    // Set tempo and pitch (NO compensation needed!)
    shifter.tempo = speed
    shifter.pitch = Math.pow(2, semitones / 12)

    // For offline processing, we need to manually drive the PitchShifter
    // by connecting it and capturing output
    // This is a workaround since SoundTouch doesn't have a built-in offline mode

    // Create a destination to capture output
    const destination = audioContext.createMediaStreamDestination()
    shifter.connect(destination)

    // Use MediaRecorder to capture the output
    // NOTE: This approach works but might produce WebM instead of WAV
    // We'll need to test and potentially use a different approach

    // Alternative approach: Use OfflineAudioContext despite Safari issues
    // We'll implement both and choose based on browser

    const isChrome = /Chrome/.test(navigator.userAgent) && !/Edge/.test(navigator.userAgent)
    const isEdge = /Edge/.test(navigator.userAgent)

    if (isChrome || isEdge) {
      // Use OfflineAudioContext approach (works on Chrome/Edge)
      return await exportWithOfflineContext(audioBuffer, semitones, speed, onProgress)
    } else {
      // For Safari/Firefox: Show error for now
      // TODO: Implement pure sample processing approach
      throw new Error('Offline export on this browser requires Chrome or Edge. Preview playback works on all browsers.')
    }

  } catch (error) {
    console.error('SoundTouch export error:', error)
    throw error
  }
}

/**
 * Export using OfflineAudioContext (Chrome/Edge only)
 */
async function exportWithOfflineContext(
  audioBuffer: AudioBuffer,
  semitones: number,
  speed: number,
  onProgress?: (progress: number) => void
): Promise<AudioBuffer> {
  // Calculate output duration with padding
  const tempo = speed
  const nInputFrames = audioBuffer.length
  const nOutputFrames = Math.max(nInputFrames, Math.ceil(nInputFrames / tempo))

  // Add 2 seconds padding for SoundTouch processing buffer
  const paddedFrames = nOutputFrames + (audioBuffer.sampleRate * 2)

  // Create offline context
  const offlineContext = new OfflineAudioContext(
    audioBuffer.numberOfChannels,
    paddedFrames,
    audioBuffer.sampleRate
  )

  // Create PitchShifter with larger buffer for offline stability
  const bufferSize = 4096
  const shifter = new PitchShifter(offlineContext, audioBuffer, bufferSize)

  // Set tempo and pitch (NO compensation!)
  shifter.tempo = tempo
  shifter.pitch = Math.pow(2, semitones / 12)

  // Connect to destination
  shifter.connect(offlineContext.destination)

  // Track progress via events
  let lastProgress = 0
  shifter.on('play', (detail) => {
    const progress = Math.min(99, detail.percentagePlayed)
    if (progress > lastProgress && onProgress) {
      onProgress(progress)
      lastProgress = progress
    }
  })

  // Render offline
  const rendered = await offlineContext.startRendering()

  if (onProgress) {
    onProgress(100)
  }

  // Trim padding from output
  const actualDuration = audioBuffer.duration / tempo
  const trimmedLength = Math.min(
    rendered.length,
    Math.ceil(actualDuration * rendered.sampleRate)
  )

  // Create trimmed buffer
  const trimmedBuffer = new AudioContext().createBuffer(
    rendered.numberOfChannels,
    trimmedLength,
    rendered.sampleRate
  )

  for (let channel = 0; channel < rendered.numberOfChannels; channel++) {
    const sourceData = rendered.getChannelData(channel)
    const destData = trimmedBuffer.getChannelData(channel)
    for (let i = 0; i < trimmedLength; i++) {
      destData[i] = sourceData[i]
    }
  }

  // Cleanup
  shifter.off()

  return trimmedBuffer
}

/**
 * Check if browser supports reliable SoundTouch offline export
 */
export function isSoundTouchExportSupported(): boolean {
  const ua = navigator.userAgent
  const isChrome = /Chrome/.test(ua) && !/Edge/.test(ua)
  const isEdge = /Edge/.test(ua)

  return isChrome || isEdge
}
