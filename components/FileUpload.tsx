'use client'

import { useRef, useState } from 'react'

interface FileUploadProps {
  onFileSelect: (file: File) => void
  maxSizeMB?: number
  acceptedFormats?: string[]
}

export function FileUpload({
  onFileSelect,
  maxSizeMB = 250,
  acceptedFormats = [
    'audio/mpeg',
    'audio/wav',
    'audio/mp3',
    'audio/flac',
    'audio/m4a',
    'audio/x-m4a',
    'audio/aac',
    'audio/mp4'
  ]
}: FileUploadProps) {
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): boolean => {
    setError(null)

    // Check file type
    if (!acceptedFormats.includes(file.type) && !file.name.match(/\.(mp3|wav|flac|m4a|aac)$/i)) {
      setError('Please upload an MP3, WAV, FLAC, M4A, or AAC file')
      return false
    }

    // Check file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024
    if (file.size > maxSizeBytes) {
      setError(`File size must be less than ${maxSizeMB}MB`)
      return false
    }

    // Memory guard for mobile devices
    const fileSizeMB = file.size / 1024 / 1024
    const deviceMemory = (navigator as any).deviceMemory // Experimental API
    if (fileSizeMB > 100 && deviceMemory && deviceMemory < 4) {
      setError('⚠️ Large file on low-memory device. For best results, use files under 100MB or try on desktop.')
      return false
    }

    // Soft warning for very large files
    if (fileSizeMB > 150) {
      console.warn(`Large file (${fileSizeMB.toFixed(0)}MB) - may be slow on mobile devices`)
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
          relative border-2 border-dashed rounded-xl p-16 text-center cursor-pointer
          transition-all duration-200
          ${isDragging
            ? 'border-accent bg-accent/10 scale-105'
            : 'border-gray-600 hover:border-accent/70 hover:bg-gray-800/30'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".mp3,.wav,.flac,.m4a,.aac,audio/mpeg,audio/wav,audio/flac,audio/m4a,audio/aac,audio/mp4"
          onChange={handleFileChange}
          className="hidden"
        />

        <div className="space-y-6">
          <div className="text-7xl">🎵</div>
          <div className="space-y-3">
            <p className="text-2xl font-semibold">
              Drop your audio file here
            </p>
            <p className="text-base text-gray-400">
              or click to browse
            </p>
          </div>
          <div className="text-sm text-gray-500">
            MP3, WAV, FLAC, M4A, AAC • Max {maxSizeMB}MB
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}
    </div>
  )
}
