import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { ArrivalStep, Unit, UnitWithSteps } from '@/lib/types'
import { fixtureUnits, isFixtureMode } from '@/lib/fixtures'

async function fetchUnitBySlug(slug: string): Promise<UnitWithSteps | null> {
  if (isFixtureMode()) {
    return fixtureUnits[slug] ?? null
  }

  const { data: unit, error: unitErr } = await supabase
    .from('units')
    .select('*')
    .eq('slug', slug)
    .maybeSingle<Unit>()

  if (unitErr) throw unitErr
  if (!unit) return null

  const { data: steps, error: stepsErr } = await supabase
    .from('arrival_steps')
    .select('*')
    .eq('unit_id', unit.id)
    .order('order_index', { ascending: true })

  if (stepsErr) throw stepsErr

  return { ...unit, arrival_steps: (steps ?? []) as ArrivalStep[] }
}

export function useUnit(slug: string | undefined) {
  return useQuery({
    queryKey: ['unit', slug],
    queryFn: () => fetchUnitBySlug(slug as string),
    enabled: Boolean(slug),
  })
}
