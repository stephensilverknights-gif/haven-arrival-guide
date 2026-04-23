import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { UnitForm } from '@/components/admin/UnitForm'
import { useUnitById } from '@/hooks/useUnits'
import { Button } from '@/components/ui/button'
import type { UnitWithSteps } from '@/lib/types'

export default function UnitEdit() {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, error } = useUnitById(id)

  if (isLoading) {
    return (
      <p style={{ color: 'var(--color-mid)', fontSize: 14 }}>Loading unit…</p>
    )
  }

  if (error) {
    return (
      <p style={{ color: '#c0392b', fontSize: 14 }}>
        {error instanceof Error ? error.message : 'Failed to load unit'}
      </p>
    )
  }

  if (!data) {
    return (
      <p style={{ color: 'var(--color-mid)', fontSize: 14 }}>Unit not found.</p>
    )
  }

  const unit = data as UnitWithSteps

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link
          to="/admin"
          className="inline-flex items-center gap-1 hover:underline"
          style={{ fontSize: 13, color: 'var(--color-mid)' }}
        >
          <ArrowLeft className="size-4" />
          Back to units
        </Link>
        <div className="mt-2 flex items-center gap-3">
          <div
            className="font-serif"
            style={{
              fontSize: 28,
              fontWeight: 400,
              color: 'var(--color-charcoal)',
            }}
          >
            {unit.name}
          </div>
          <Button asChild variant="outline" size="sm">
            <a
              href={`/arrive/${unit.slug}`}
              target="_blank"
              rel="noreferrer"
            >
              <ExternalLink className="size-4" />
              View guest page
            </a>
          </Button>
        </div>
      </div>

      <UnitForm initial={unit} />
    </div>
  )
}
