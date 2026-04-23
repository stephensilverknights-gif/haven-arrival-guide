import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useStorageUpload, type UploadBucket } from '@/hooks/useStorageUpload'
import { X, Upload } from 'lucide-react'

interface ImageUploadFieldProps {
  bucket: UploadBucket
  value: string | null
  onChange: (url: string | null) => void
  label?: string
  previewAspect?: string
}

export function ImageUploadField({
  bucket,
  value,
  onChange,
  label = 'Upload image',
  previewAspect = '16 / 9',
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { upload, uploading, error } = useStorageUpload()
  const [localErr, setLocalErr] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const handlePick = () => inputRef.current?.click()

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setLocalErr('Please drop an image file.')
      return
    }
    setLocalErr(null)
    try {
      const url = await upload(bucket, file)
      onChange(url)
    } catch (err) {
      setLocalErr(err instanceof Error ? err.message : 'Upload failed')
    }
  }

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    await uploadFile(file)
    // Allow re-selecting the same file
    if (inputRef.current) inputRef.current.value = ''
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!dragActive) setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const file = e.dataTransfer.files?.[0]
    if (!file) return
    await uploadFile(file)
  }

  const dropZoneStyle = {
    aspectRatio: previewAspect,
    borderColor: dragActive ? 'var(--color-accent)' : 'var(--color-stone)',
    background: dragActive
      ? 'rgba(191,143,93,0.08)'
      : 'var(--color-warm-white)',
    transition: 'background 120ms ease, border-color 120ms ease',
  }

  return (
    <div className="flex flex-col gap-2">
      {value ? (
        <div
          className="relative overflow-hidden rounded-[10px]"
          style={{
            aspectRatio: previewAspect,
            background: 'var(--color-stone)',
            outline: dragActive
              ? '2px solid var(--color-accent)'
              : '2px solid transparent',
            transition: 'outline-color 120ms ease',
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <img
            src={value}
            alt=""
            className="block h-full w-full object-cover"
          />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
            aria-label="Remove image"
          >
            <X className="size-4" />
          </button>
          {dragActive && (
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              style={{ background: 'rgba(44,44,42,0.55)' }}
            >
              <span
                className="flex items-center gap-2 text-white"
                style={{ fontSize: 13, letterSpacing: '0.02em' }}
              >
                <Upload className="size-4" />
                Drop to replace
              </span>
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={handlePick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          disabled={uploading}
          className="flex flex-col items-center justify-center gap-1.5 rounded-[10px] border border-dashed text-center"
          style={dropZoneStyle}
        >
          <Upload
            className="size-5"
            style={{ color: 'var(--color-mid)' }}
          />
          <span style={{ color: 'var(--color-mid)', fontSize: 13 }}>
            {uploading
              ? 'Uploading…'
              : dragActive
                ? 'Drop to upload'
                : 'Drop an image or click to pick'}
          </span>
        </button>
      )}

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handlePick}
          disabled={uploading}
        >
          {uploading ? 'Uploading…' : label}
        </Button>
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onChange(null)}
          >
            Remove
          </Button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />

      {(localErr || error) && (
        <p style={{ fontSize: 12, color: '#c0392b' }}>
          {localErr || error?.message}
        </p>
      )}
    </div>
  )
}
