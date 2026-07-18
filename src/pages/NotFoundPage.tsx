import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center text-center px-4">
      <div className="space-y-3">
        <p className="text-4xl font-bold text-foreground">404</p>
        <p className="text-sm text-muted-foreground">Page not found.</p>
        <Link to="/" className="text-sm text-primary hover:underline">Back to home</Link>
      </div>
    </div>
  )
}
