/**
 * Export audio using Tone.js offline rendering
 * Ensures preview matches download quality
 */
import * as Tone from 'tone'

export async function exportWithTone(
  audioBuffer: AudioBuffer,
  semitones: number,
  speed: number = 1.0,
  onProgress?: (progress: number) => void
): Promise<AudioBuffer> {
  // Save current context to restore later
  const previousContext = Tone.getContext()

  let player: Tone.Player | null = null
  let pitchShift: Tone.PitchShift | null = null

  try {
    // Calculate duration adjusted for speed, with safety buffer for PitchShift processing
    const PITCH_SHIFT_WINDOW = 0.2
    const SAFETY_MARGIN = 0.1
    const adjustedDuration = (audioBuffer.duration / speed) + (PITCH_SHIFT_WINDOW / speed) + SAFETY_MARGIN

    // Create offline context with adjusted duration
    const offlineContext = new Tone.OfflineContext(
      audioBuffer.numberOfChannels,
      adjustedDuration,
      audioBuffer.sampleRate
    )

    // Set offline context as current
    Tone.setContext(offlineContext)

    // Create player from buffer
    player = new Tone.Player(audioBuffer)
    player.playbackRate = speed

    // Create pitch shift effect
    pitchShift = new Tone.PitchShift({
      pitch: semitones,
      windowSize: 0.2, // Higher quality, balanced with offline render time
      delayTime: 0,
      feedback: 0,
      wet: 1 // 100% wet signal only - prevents dry/wet mix causing doubled audio
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

    // Convert ToneAudioBuffer to native AudioBuffer
    return rendered.get() as AudioBuffer
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
