import { Link, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'

export function AdminLayout() {
  const { signOut, user } = useAuth()
  const location = useLocation()

  return (
    <div className="min-h-svh" style={{ background: 'var(--color-cream)' }}>
      <header
        className="flex items-center justify-between"
        style={{
          padding: '14px 20px',
          borderBottom: '1px solid var(--color-divider)',
          background: 'var(--color-warm-white)',
        }}
      >
        <Link
          to="/admin"
          className="font-serif uppercase"
          style={{
            fontSize: 14,
            fontWeight: 400,
            letterSpacing: '0.2em',
            color: 'var(--color-charcoal)',
          }}
        >
          Haven Arrival Guide
        </Link>
        <div className="flex items-center gap-3">
          <span
            className="hidden sm:inline"
            style={{ fontSize: 12, color: 'var(--color-mid)' }}
          >
            {user?.email}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              void signOut()
            }}
          >
            Sign out
          </Button>
        </div>
      </header>

      <main key={location.pathname} className="mx-auto max-w-5xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
