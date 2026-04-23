import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export function ProtectedRoute() {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div
        className="flex min-h-svh items-center justify-center"
        style={{ background: 'var(--color-cream)' }}
      >
        <p style={{ color: 'var(--color-mid)', fontSize: 14 }}>Loading…</p>
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}
