import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash2 } from 'lucide-react'
import type { StepDraft } from '@/lib/types'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ImageUploadField } from './ImageUploadField'

interface StepRowProps {
  step: StepDraft
  index: number
  onChange: (patch: Partial<StepDraft>) => void
  onRemove: () => void
}

export function StepRow({ step, index, onChange, onRemove }: StepRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: step.id })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    background: 'var(--color-warm-white)',
    borderColor: 'var(--color-divider)',
    opacity: isDragging ? 0.7 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="rounded-2xl border p-4 shadow-sm"
    >
      <div className="mb-3 flex items-center gap-2">
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="flex size-8 cursor-grab touch-none items-center justify-center rounded-md hover:bg-black/5 active:cursor-grabbing"
          aria-label="Drag to reorder"
        >
          <GripVertical className="size-4" />
        </button>
        <div
          className="uppercase"
          style={{
            fontSize: 10,
            letterSpacing: '0.16em',
            color: 'var(--color-sage)',
            fontWeight: 500,
          }}
        >
          Step {index + 1}
        </div>
        <div className="ml-auto">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={onRemove}
            aria-label="Remove step"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-3">
        <div>
          <Label htmlFor={`body-${step.id}`}>Body</Label>
          <Textarea
            id={`body-${step.id}`}
            value={step.body}
            onChange={(e) => onChange({ body: e.target.value })}
            placeholder="Pull into the gravel driveway…"
            className="mt-1 min-h-[96px]"
          />
          <p
            className="mt-1"
            style={{ fontSize: 11, color: 'var(--color-mid)' }}
          >
            Inline <code>&lt;strong&gt;…&lt;/strong&gt;</code> is allowed for
            emphasis. The guide auto-labels this as "Step {index + 1}".
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Photo (optional)</Label>
            <div className="mt-1">
              <ImageUploadField
                bucket="step-photos"
                value={step.photo_url}
                onChange={(url) => onChange({ photo_url: url })}
                previewAspect="3 / 4"
              />
            </div>
          </div>
          <div>
            <Label htmlFor={`code-${step.id}`}>Door code (optional)</Label>
            <Input
              id={`code-${step.id}`}
              value={step.door_code ?? ''}
              onChange={(e) =>
                onChange({ door_code: e.target.value || null })
              }
              placeholder="e.g. 4829"
              className="mt-1 tracking-widest"
            />
            <p
              className="mt-1"
              style={{ fontSize: 11, color: 'var(--color-mid)' }}
            >
              When set, a code block is rendered on the guest page for this
              step.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
