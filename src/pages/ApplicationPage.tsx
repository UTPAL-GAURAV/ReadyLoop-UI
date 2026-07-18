import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronRight, ChevronDown, ChevronUp } from 'lucide-react'
import axios from 'axios'
import { useApplication } from '@/hooks/useApplication'
import { RoundCard } from '@/components/rounds/RoundCard'
import { Skeleton } from '@/components/ui/skeleton'
import { WakingUp } from '@/components/ui/waking-up'
import { Badge } from '@/components/ui/badge'

export function ApplicationPage() {
  const { id } = useParams<{ id: string }>()
  const { data: app, isLoading, isError, isFetching, failureCount, error: appErr } = useApplication(id!)
  const [gistExpanded, setGistExpanded] = useState(false)

  const is404 = axios.isAxiosError(appErr) && appErr.response?.status === 404

  if (is404) {
    return (
      <div className="pt-10 text-center space-y-2">
        <p className="text-sm text-foreground">Application not found.</p>
        <Link to="/" className="text-xs text-primary hover:underline">Back to home</Link>
      </div>
    )
  }

  if (isLoading || (isError && failureCount < 4 && isFetching)) {
    if (failureCount > 0) return <WakingUp />
    return (
      <div className="pt-6 space-y-4">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-20 rounded-xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-36 rounded-xl" />)}
        </div>
      </div>
    )
  }

  if (isError || !app) return <WakingUp />

  return (
    <div className="pt-6 space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{app.company} — {app.role}</span>
        <Badge variant="mono" className="ml-1 text-[10px]">{app.shortId}</Badge>
      </nav>

      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-xl font-bold text-foreground">{app.company}</h1>
          <span className="text-muted-foreground">·</span>
          <span className="text-base text-foreground">{app.role}</span>
          {app.level && <Badge variant="secondary">{app.level}</Badge>}
          {app.geography && <Badge variant="outline">{app.geography}</Badge>}
        </div>
      </div>

      {/* Plan gist */}
      {app.planGist && (
        <div className="rounded-lg border border-border bg-muted/30 overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/50 transition-colors"
            onClick={() => setGistExpanded(v => !v)}
          >
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Interview Plan Overview</span>
            {gistExpanded ? <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />}
          </button>
          {gistExpanded && (
            <div className="px-4 pb-4">
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{app.planGist}</p>
            </div>
          )}
        </div>
      )}

      {/* Rounds */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-foreground">Interview Rounds</h2>
        {!app.rounds || app.rounds.length === 0 ? (
          <p className="text-sm text-muted-foreground">No rounds yet — Claude will create them when you start a session.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {app.rounds
              .slice()
              .sort((a, b) => a.orderIndex - b.orderIndex)
              .map(round => <RoundCard key={round.id} round={round} />)}
          </div>
        )}
      </div>
    </div>
  )
}
