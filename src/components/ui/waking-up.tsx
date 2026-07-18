import { Loader2 } from 'lucide-react'

export function WakingUp() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
      <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      <p className="text-sm text-muted-foreground">Waking up the server…</p>
      <p className="text-xs text-muted-foreground/60">Render free tier cold-starts in ~30s. Hang tight.</p>
    </div>
  )
}
