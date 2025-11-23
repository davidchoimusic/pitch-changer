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
  // Save current context to restore later
  const previousContext = Tone.getContext()

  let player: Tone.Player | null = null
  let pitchShift: Tone.PitchShift | null = null

  try {
    // Create offline context with same sample rate and duration
    const offlineContext = new Tone.OfflineContext(
      audioBuffer.numberOfChannels,
      audioBuffer.duration,
      audioBuffer.sampleRate
    )

    // Set offline context as current
    Tone.setContext(offlineContext)

    // Create player from buffer
    player = new Tone.Player(audioBuffer)

    // Create pitch shift effect
    pitchShift = new Tone.PitchShift({
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

    if (onProgress) {
      onProgress(100)
    }

    return rendered
  } finally {
    // ALWAYS restore context and clean up, even on error
    try {
      if (player) player.dispose()
      if (pitchShift) pitchShift.dispose()
    } catch (e) {
      console.error('Error disposing Tone nodes:', e)
    }

    // Restore previous context for live playback
    Tone.setContext(previousContext)
  }
}
