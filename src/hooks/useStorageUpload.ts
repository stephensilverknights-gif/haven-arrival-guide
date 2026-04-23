import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export type UploadBucket = 'unit-hero-images' | 'step-photos'

export function useStorageUpload() {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  /**
   * Uploads a file to the given bucket and returns its public URL.
   * Filename is timestamp-prefixed to avoid collisions.
   */
  const upload = async (bucket: UploadBucket, file: File): Promise<string> => {
    setUploading(true)
    setError(null)
    try {
      const ext = file.name.split('.').pop() || 'jpg'
      const safeBase = file.name
        .replace(/\.[^.]+$/, '')
        .replace(/[^a-zA-Z0-9_-]/g, '-')
        .slice(0, 40) || 'image'
      const path = `${Date.now()}-${safeBase}.${ext}`

      const { error: upErr } = await supabase.storage
        .from(bucket)
        .upload(path, file, { cacheControl: '3600', upsert: false })
      if (upErr) throw upErr

      const { data } = supabase.storage.from(bucket).getPublicUrl(path)
      return data.publicUrl
    } catch (e) {
      const err = e instanceof Error ? e : new Error('Upload failed')
      setError(err)
      throw err
    } finally {
      setUploading(false)
    }
  }

  return { upload, uploading, error }
}
