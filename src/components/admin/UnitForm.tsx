import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ImageUploadField } from './ImageUploadField'
import { StepEditor } from './StepEditor'
import type { ArrivalStep, StepDraft, UnitWithSteps } from '@/lib/types'
import {
  useDeleteUnit,
  useSaveUnit,
  type UnitFormValues,
} from '@/hooks/useUnitMutations'

interface UnitFormProps {
  initial?: UnitWithSteps | null
}

function toDrafts(steps: ArrivalStep[]): StepDraft[] {
  return steps.map((s) => ({
    id: s.id,
    order_index: s.order_index,
    label: s.label,
    body: s.body,
    photo_url: s.photo_url,
    door_code: s.door_code,
    persisted: true,
  }))
}

const emptyUnit: UnitFormValues = {
  slug: '',
  name: '',
  address: '',
  hero_image_url: null,
  welcome_message: '',
  wifi_name: '',
  wifi_password: '',
  youtube_id: null,
  youtube_is_short: false,
  quiet_hours: '',
}

export function UnitForm({ initial }: UnitFormProps) {
  const navigate = useNavigate()
  const saveMutation = useSaveUnit()
  const deleteMutation = useDeleteUnit()

  const [values, setValues] = useState<UnitFormValues>(() =>
    initial
      ? {
          slug: initial.slug,
          name: initial.name,
          address: initial.address,
          hero_image_url: initial.hero_image_url,
          welcome_message: initial.welcome_message ?? '',
          wifi_name: initial.wifi_name ?? '',
          wifi_password: initial.wifi_password ?? '',
          youtube_id: initial.youtube_id,
          youtube_is_short: initial.youtube_is_short ?? false,
          quiet_hours: initial.quiet_hours ?? '',
        }
      : emptyUnit,
  )
  const [steps, setSteps] = useState<StepDraft[]>(() =>
    initial ? toDrafts(initial.arrival_steps) : [],
  )
  const [error, setError] = useState<string | null>(null)

  const patch = (p: Partial<UnitFormValues>) =>
    setValues((v) => ({ ...v, ...p }))

  const slugIsValid = useMemo(
    () => /^[a-z0-9-]+$/.test(values.slug.trim()),
    [values.slug],
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!values.slug.trim() || !values.name.trim() || !values.address.trim()) {
      setError('Slug, name, and address are required.')
      return
    }
    if (!slugIsValid) {
      setError('Slug must contain only lowercase letters, numbers, and dashes.')
      return
    }

    try {
      const res = await saveMutation.mutateAsync({
        id: initial?.id ?? null,
        values: {
          ...values,
          welcome_message: values.welcome_message?.trim() || null,
          wifi_name: values.wifi_name?.trim() || null,
          wifi_password: values.wifi_password?.trim() || null,
          youtube_id: values.youtube_id?.trim() || null,
          quiet_hours: values.quiet_hours?.trim() || null,
        },
        steps,
      })
      navigate(`/admin/units/${res.id}`)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed')
    }
  }

  const handleDelete = async () => {
    if (!initial) return
    if (!window.confirm(`Delete "${initial.name}" and all its steps?`)) return
    try {
      await deleteMutation.mutateAsync(initial.id)
      navigate('/admin')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Delete failed')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Card>
        <CardContent className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="slug">URL slug</Label>
              <Input
                id="slug"
                value={values.slug}
                onChange={(e) => patch({ slug: e.target.value.toLowerCase() })}
                placeholder="buttercup"
                className="mt-1"
                required
              />
              <p
                className="mt-1"
                style={{ fontSize: 11, color: 'var(--color-mid)' }}
              >
                Guest URL: <code>/arrive/{values.slug || '…'}</code> — lowercase letters,
                numbers, and dashes only.
              </p>
            </div>
            <div>
              <Label htmlFor="name">Property name</Label>
              <Input
                id="name"
                value={values.name}
                onChange={(e) => patch({ name: e.target.value })}
                placeholder="Buttercup"
                className="mt-1"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={values.address}
              onChange={(e) => patch({ address: e.target.value })}
              placeholder="9647 N Buttercup Lane, Hayden, ID"
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label>Hero image</Label>
            <div className="mt-1 max-w-md">
              <ImageUploadField
                bucket="unit-hero-images"
                value={values.hero_image_url}
                onChange={(url) => patch({ hero_image_url: url })}
                previewAspect="16 / 10"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="welcome">Welcome message</Label>
            <Textarea
              id="welcome"
              value={values.welcome_message ?? ''}
              onChange={(e) => patch({ welcome_message: e.target.value })}
              placeholder="We're so glad you're here…"
              className="mt-1 min-h-[96px]"
            />
            <p
              className="mt-1"
              style={{ fontSize: 11, color: 'var(--color-mid)' }}
            >
              Inline <code>&lt;strong&gt;…&lt;/strong&gt;</code> is allowed.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="wifi-name">WiFi network name</Label>
              <Input
                id="wifi-name"
                value={values.wifi_name ?? ''}
                onChange={(e) => patch({ wifi_name: e.target.value })}
                placeholder="Haven"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="wifi-pass">WiFi password</Label>
              <Input
                id="wifi-pass"
                value={values.wifi_password ?? ''}
                onChange={(e) => patch({ wifi_password: e.target.value })}
                placeholder="buttercup24"
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="quiet-hours">Quiet hours</Label>
              <Input
                id="quiet-hours"
                value={values.quiet_hours ?? ''}
                onChange={(e) => patch({ quiet_hours: e.target.value })}
                placeholder="10pm - 8am"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="youtube">YouTube video ID (optional)</Label>
              <Input
                id="youtube"
                value={values.youtube_id ?? ''}
                onChange={(e) =>
                  patch({ youtube_id: e.target.value || null })
                }
                placeholder="dQw4w9WgXcQ"
                className="mt-1"
              />
              <p
                className="mt-1"
                style={{ fontSize: 11, color: 'var(--color-mid)' }}
              >
                Just the ID — the part after <code>v=</code> or in the Shorts URL.
              </p>
              <label
                className="mt-2 flex items-center gap-2"
                style={{ fontSize: 12, color: 'var(--color-mid)' }}
              >
                <input
                  type="checkbox"
                  checked={values.youtube_is_short}
                  onChange={(e) =>
                    patch({ youtube_is_short: e.target.checked })
                  }
                />
                This is a vertical YouTube Short (9:16)
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <div
          className="mb-3 font-serif"
          style={{
            fontSize: 22,
            fontWeight: 400,
            color: 'var(--color-charcoal)',
          }}
        >
          Arrival steps
        </div>
        <p
          className="mb-4"
          style={{ fontSize: 13, color: 'var(--color-mid)' }}
        >
          Drag to reorder. Each step can have its own photo and optional door
          code.
        </p>
        <StepEditor steps={steps} onChange={setSteps} />
      </div>

      {error && (
        <div
          className="rounded-md px-3 py-2"
          style={{
            background: 'rgba(192,57,43,0.08)',
            color: '#c0392b',
            fontSize: 13,
          }}
        >
          {error}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="submit"
          disabled={saveMutation.isPending}
        >
          {saveMutation.isPending ? 'Saving…' : initial ? 'Save changes' : 'Create unit'}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => navigate('/admin')}
        >
          Cancel
        </Button>
        {initial && (
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="ml-auto"
          >
            {deleteMutation.isPending ? 'Deleting…' : 'Delete unit'}
          </Button>
        )}
      </div>
    </form>
  )
}
