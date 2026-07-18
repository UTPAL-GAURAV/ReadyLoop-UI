import { GoogleLogin } from '@react-oauth/google'
import { CircleDot } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Navigate } from 'react-router-dom'

export function LoginPage() {
  const { isAuthenticated, login } = useAuth()

  if (isAuthenticated) return <Navigate to="/" replace />

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-8 text-center">
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <CircleDot className="h-7 w-7 text-primary" />
            <span className="text-2xl font-bold text-foreground">ReadyLoop</span>
          </div>
          <p className="text-sm text-muted-foreground">Practice. Feedback. Repeat.</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <p className="text-sm text-foreground">Sign in to access your interview dashboard</p>
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={cred => { if (cred.credential) login(cred.credential) }}
              onError={() => console.error('Google login failed')}
              theme="filled_black"
              shape="rectangular"
              size="large"
            />
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Your Claude token is your own — we never see your AI usage.
        </p>
      </div>
    </div>
  )
}
