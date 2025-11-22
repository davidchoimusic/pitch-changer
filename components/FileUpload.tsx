'use client'

import { useRef, useState } from 'react'
import { Button } from './ui/Button'

interface FileUploadProps {
  onFileSelect: (file: File) => void
  maxSizeMB?: number
  acceptedFormats?: string[]
}

export function FileUpload({
  onFileSelect,
  maxSizeMB = 25,
  acceptedFormats = ['audio/mpeg', 'audio/wav', 'audio/mp3']
}: FileUploadProps) {
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): boolean => {
    setError(null)

    // Check file type
    if (!acceptedFormats.includes(file.type) && !file.name.match(/\.(mp3|wav)$/i)) {
      setError('Please upload an MP3 or WAV file')
      return false
    }

    // Check file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024
    if (file.size > maxSizeBytes) {
      setError(`File size must be less than ${maxSizeMB}MB`)
      return false
    }

    return true
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && validateFile(file)) {
      onFileSelect(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file && validateFile(file)) {
      onFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  return (
    <div className="w-full">
      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
          transition-all duration-200
          ${isDragging
            ? 'border-electric-blue bg-electric-blue/5 glow-blue-sm'
            : 'border-white/20 hover:border-electric-blue/50 hover:bg-white/5'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".mp3,.wav,audio/mpeg,audio/wav"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="space-y-4">
          <div className="text-6xl">🎵</div>
          <div className="space-y-2">
            <p className="text-lg font-light">
              Drop your audio file here
            </p>
            <p className="text-sm text-white/50 font-light">
              or click to browse
            </p>
          </div>
          <div className="text-xs text-white/40 font-light">
            MP3 or WAV • Max {maxSizeMB}MB
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-sm text-red-400 font-light">{error}</p>
        </div>
      )}
    </div>
  )
}
