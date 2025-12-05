declare module 'soundtouchjs' {
  export class PitchShifter {
    constructor(
      context: AudioContext | OfflineAudioContext,
      buffer: AudioBuffer,
      bufferSize: number
    )

    tempo: number
    pitch: number
    pitchSemitones: number
    rate: number

    connect(destination: AudioNode | AudioDestinationNode): PitchShifter
    disconnect(): void

    on(event: 'play', callback: (detail: {
      timePlayed: number
      formattedTimePlayed: string
      percentagePlayed: number
    }) => void): void

    on(event: 'end', callback: () => void): void

    off(event?: string): void
  }

  export class SoundTouch {
    constructor(sampleRate: number)

    tempo: number
    pitch: number
    rate: number

    clear(): void
    clone(): SoundTouch

    process(input: Float32Array, output: Float32Array): number
  }

  export class SimpleFilter {
    constructor(sourceSound: any, pipe: any)

    fillInputBuffer(numFrames?: number): void
    extract(target: Float32Array, numFrames?: number): number
  }
}
