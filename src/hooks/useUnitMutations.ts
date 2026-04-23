import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { StepDraft, Unit } from '@/lib/types'

export type UnitFormValues = Omit<
  Unit,
  'id' | 'created_at' | 'updated_at'
>

/**
 * Save a unit and its steps together. If `id` is null, inserts a new unit.
 * Otherwise updates the existing unit, then diffs the step drafts against
 * the current DB rows: updates persisted rows, inserts new ones, deletes
 * any rows no longer present in `steps`.
 *
 * Supabase JS does not expose multi-statement transactions from the client,
 * so this is a best-effort sequence. Failures mid-way will leave partial
 * state; admin can re-save to reconcile.
 */
async function saveUnitWithSteps(args: {
  id: string | null
  values: UnitFormValues
  steps: StepDraft[]
}) {
  const { id, values, steps } = args

  let unitId = id
  if (!unitId) {
    const { data, error } = await supabase
      .from('units')
      .insert(values)
      .select('id')
      .single()
    if (error) throw error
    unitId = data.id as string
  } else {
    const { error } = await supabase
      .from('units')
      .update(values)
      .eq('id', unitId)
    if (error) throw error
  }

  // Load existing step ids so we can detect deletions.
  const { data: existing, error: exErr } = await supabase
    .from('arrival_steps')
    .select('id')
    .eq('unit_id', unitId)
  if (exErr) throw exErr

  const existingIds = new Set((existing ?? []).map((r) => r.id as string))
  const keptIds = new Set(steps.filter((s) => s.persisted).map((s) => s.id))

  // Delete removed steps
  const toDelete = [...existingIds].filter((x) => !keptIds.has(x))
  if (toDelete.length > 0) {
    const { error } = await supabase
      .from('arrival_steps')
      .delete()
      .in('id', toDelete)
    if (error) throw error
  }

  // Upsert persisted + insert new. Labels are auto-derived from position —
  // the guest page renders "Step N" based on index, so we normalize the
  // stored label to match on every save.
  for (let i = 0; i < steps.length; i++) {
    const s = steps[i]
    const row = {
      unit_id: unitId,
      order_index: i,
      label: `Step ${i + 1}`,
      body: s.body,
      photo_url: s.photo_url,
      door_code: s.door_code,
    }
    if (s.persisted) {
      const { error } = await supabase
        .from('arrival_steps')
        .update(row)
        .eq('id', s.id)
      if (error) throw error
    } else {
      const { error } = await supabase.from('arrival_steps').insert(row)
      if (error) throw error
    }
  }

  return { id: unitId as string }
}

export function useSaveUnit() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: saveUnitWithSteps,
    onSuccess: (res, variables) => {
      qc.invalidateQueries({ queryKey: ['units'] })
      qc.invalidateQueries({ queryKey: ['unit-by-id', res.id] })
      qc.invalidateQueries({ queryKey: ['unit', variables.values.slug] })
    },
  })
}

export function useDeleteUnit() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('units').delete().eq('id', id)
      if (error) throw error
      return { id }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['units'] })
    },
  })
}
