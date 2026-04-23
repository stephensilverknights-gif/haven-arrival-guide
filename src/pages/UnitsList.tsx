import { Link } from 'react-router-dom'
import { ExternalLink, Pencil, Plus } from 'lucide-react'
import { useUnits } from '@/hooks/useUnits'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function UnitsList() {
  const { data: units, isLoading, error } = useUnits()

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-2">
        <div>
          <div
            className="font-serif"
            style={{
              fontSize: 28,
              fontWeight: 400,
              color: 'var(--color-charcoal)',
            }}
          >
            Units
          </div>
          <p
            className="mt-1"
            style={{ fontSize: 13, color: 'var(--color-mid)' }}
          >
            Manage arrival guides for every Haven property.
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/units/new">
            <Plus className="size-4" />
            New unit
          </Link>
        </Button>
      </div>

      {isLoading && (
        <p style={{ color: 'var(--color-mid)', fontSize: 14 }}>Loading…</p>
      )}
      {error && (
        <p style={{ color: '#c0392b', fontSize: 14 }}>
          {error instanceof Error ? error.message : 'Failed to load units'}
        </p>
      )}

      {units && units.length === 0 && (
        <Card>
          <CardContent
            className="py-10 text-center"
            style={{ color: 'var(--color-mid)' }}
          >
            <p style={{ fontSize: 14 }}>
              No units yet. Create your first one to get started.
            </p>
          </CardContent>
        </Card>
      )}

      {units && units.length > 0 && (
        <Card>
          <CardContent className="p-0">
            <ul className="divide-y" style={{ borderColor: 'var(--color-divider)' }}>
              {units.map((u) => (
                <li
                  key={u.id}
                  className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                  style={{ borderColor: 'var(--color-divider)' }}
                >
                  <div className="min-w-0">
                    <div
                      className="font-serif truncate"
                      style={{
                        fontSize: 18,
                        fontWeight: 400,
                        color: 'var(--color-charcoal)',
                      }}
                    >
                      {u.name}
                    </div>
                    <div
                      className="truncate"
                      style={{ fontSize: 13, color: 'var(--color-mid)' }}
                    >
                      {u.address}
                    </div>
                    <div
                      className="mt-1 truncate"
                      style={{ fontSize: 12, color: 'var(--color-stone)' }}
                    >
                      /arrive/{u.slug}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm">
                      <a
                        href={`/arrive/${u.slug}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ExternalLink className="size-4" />
                        View
                      </a>
                    </Button>
                    <Button asChild size="sm">
                      <Link to={`/admin/units/${u.id}`}>
                        <Pencil className="size-4" />
                        Edit
                      </Link>
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
