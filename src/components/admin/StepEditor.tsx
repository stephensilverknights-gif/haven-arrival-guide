import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Plus } from 'lucide-react'
import type { StepDraft } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { StepRow } from './StepRow'

interface StepEditorProps {
  steps: StepDraft[]
  onChange: (next: StepDraft[]) => void
}

let tempIdCounter = 0
function newTempId() {
  tempIdCounter += 1
  return `new-${Date.now()}-${tempIdCounter}`
}

export function StepEditor({ steps, onChange }: StepEditorProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIdx = steps.findIndex((s) => s.id === active.id)
    const newIdx = steps.findIndex((s) => s.id === over.id)
    if (oldIdx === -1 || newIdx === -1) return
    onChange(arrayMove(steps, oldIdx, newIdx))
  }

  const patchAt = (idx: number, patch: Partial<StepDraft>) => {
    const next = steps.slice()
    next[idx] = { ...next[idx], ...patch }
    onChange(next)
  }

  const removeAt = (idx: number) => {
    onChange(steps.filter((_, i) => i !== idx))
  }

  const addStep = () => {
    onChange([
      ...steps,
      {
        id: newTempId(),
        order_index: steps.length,
        label: `Step ${steps.length + 1}`,
        body: '',
        photo_url: null,
        door_code: null,
        persisted: false,
      },
    ])
  }

  return (
    <div className="flex flex-col gap-4">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={steps.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          {steps.map((s, i) => (
            <StepRow
              key={s.id}
              step={s}
              index={i}
              onChange={(patch) => patchAt(i, patch)}
              onRemove={() => removeAt(i)}
            />
          ))}
        </SortableContext>
      </DndContext>

      <div>
        <Button type="button" variant="outline" onClick={addStep}>
          <Plus className="size-4" />
          Add step
        </Button>
      </div>
    </div>
  )
}
