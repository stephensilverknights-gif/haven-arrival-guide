import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { UnitForm } from '@/components/admin/UnitForm'

export default function UnitNew() {
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
        <div
          className="mt-2 font-serif"
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: 'var(--color-charcoal)',
          }}
        >
          New unit
        </div>
      </div>

      <UnitForm />
    </div>
  )
}
