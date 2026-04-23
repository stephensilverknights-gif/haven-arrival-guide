import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Unit } from '@/lib/types'

async function fetchUnits(): Promise<Unit[]> {
  const { data, error } = await supabase
    .from('units')
    .select('*')
    .order('updated_at', { ascending: false })
  if (error) throw error
  return (data ?? []) as Unit[]
}

export function useUnits() {
  return useQuery({ queryKey: ['units'], queryFn: fetchUnits })
}

async function fetchUnitById(id: string) {
  const { data: unit, error: unitErr } = await supabase
    .from('units')
    .select('*')
    .eq('id', id)
    .maybeSingle<Unit>()
  if (unitErr) throw unitErr
  if (!unit) return null

  const { data: steps, error: stepsErr } = await supabase
    .from('arrival_steps')
    .select('*')
    .eq('unit_id', id)
    .order('order_index', { ascending: true })
  if (stepsErr) throw stepsErr

  return { ...unit, arrival_steps: steps ?? [] }
}

export function useUnitById(id: string | undefined) {
  return useQuery({
    queryKey: ['unit-by-id', id],
    queryFn: () => fetchUnitById(id as string),
    enabled: Boolean(id),
  })
}
