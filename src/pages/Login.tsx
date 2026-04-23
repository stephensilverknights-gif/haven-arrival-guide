import { useState, type FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function Login() {
  const { session, loading, signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

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

  if (session) {
    return <Navigate to="/admin" replace />
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    const result = await signIn(email, password)
    if (result.error) setError(result.error.message)
    setSubmitting(false)
  }

  return (
    <div
      className="flex min-h-svh items-center justify-center px-4"
      style={{ background: 'var(--color-cream)' }}
    >
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div
            className="font-serif uppercase"
            style={{
              fontSize: 13,
              fontWeight: 400,
              letterSpacing: '0.22em',
              color: 'var(--color-accent)',
            }}
          >
            Haven by Design Stays
          </div>
          <div
            className="font-serif"
            style={{
              fontSize: 24,
              fontWeight: 400,
              color: 'var(--color-charcoal)',
              marginTop: 4,
            }}
          >
            Admin Sign-In
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="mt-1"
              />
            </div>

            {error && (
              <p
                className="rounded-md px-3 py-2"
                style={{
                  background: 'rgba(192,57,43,0.08)',
                  color: '#c0392b',
                  fontSize: 13,
                }}
              >
                {error}
              </p>
            )}

            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? 'Please wait…' : 'Sign in'}
            </Button>

            <p
              className="text-center"
              style={{ fontSize: 12, color: 'var(--color-mid)' }}
            >
              Admin accounts are created in the Supabase dashboard.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
