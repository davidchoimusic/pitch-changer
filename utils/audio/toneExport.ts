/**
 * Export audio using Tone.js offline rendering
 * Ensures preview matches download quality
 */
import * as Tone from 'tone'

export async function exportWithTone(
  audioBuffer: AudioBuffer,
  semitones: number,
  onProgress?: (progress: number) => void
): Promise<AudioBuffer> {
  // Create offline context with same sample rate and duration
  const offlineContext = new Tone.OfflineContext(
    audioBuffer.numberOfChannels,
    audioBuffer.duration,
    audioBuffer.sampleRate
  )

  // Set offline context as current
  Tone.setContext(offlineContext)

  // Create player from buffer
  const player = new Tone.Player(audioBuffer)

  // Create pitch shift effect
  const pitchShift = new Tone.PitchShift({
    pitch: semitones,
    windowSize: 0.1,
    delayTime: 0,
    feedback: 0
  }).toDestination()

  // Connect chain
  player.connect(pitchShift)

  // Start playback
  player.start(0)

  // Render offline
  const rendered = await offlineContext.render()

  // Clean up
  player.dispose()
  pitchShift.dispose()

  if (onProgress) {
    onProgress(100)
  }

  return rendered
}
