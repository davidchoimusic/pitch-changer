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
    // Try OfflineAudioContext approach on all browsers
    // It should work on most modern browsers despite some known quirks
    return await exportWithOfflineContext(audioBuffer, semitones, speed, onProgress)
  } catch (error) {
    console.error('SoundTouch export error:', error)

    // Provide helpful error message
    const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
    const isFirefox = /Firefox/.test(navigator.userAgent)

    if (isSafari || isFirefox) {
      throw new Error(
        'Export failed on this browser. Chrome or Edge recommended for best results. ' +
        'Preview playback works on all browsers.'
      )
    }

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
 * Check if browser is recommended for SoundTouch offline export
 * Note: Export may still work on other browsers, but Chrome/Edge are most reliable
 */
export function isSoundTouchExportSupported(): boolean {
  const ua = navigator.userAgent
  const isChrome = /Chrome/.test(ua) && !/Safari/.test(ua)
  const isEdge = /Edg/.test(ua) // Modern Edge uses "Edg" in UA

  return isChrome || isEdge
}
