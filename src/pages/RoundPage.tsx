import { useParams, Link } from 'react-router-dom'
import { ChevronRight, Clock, HelpCircle } from 'lucide-react'
import axios from 'axios'
import { useRound, useRoundAttempts } from '@/hooks/useRound'
import { useApplication } from '@/hooks/useApplication'
import { AttemptList } from '@/components/attempts/AttemptList'
import { Skeleton } from '@/components/ui/skeleton'
import { WakingUp } from '@/components/ui/waking-up'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

function confidenceBarColor(score: number) {
  if (score >= 80) return 'bg-emerald-500'
  if (score >= 60) return 'bg-amber-500'
  return 'bg-red-500'
}

export function RoundPage() {
  const { id } = useParams<{ id: string }>()
  const { data: round, isLoading: roundLoading, isError: roundError, isFetching: roundFetching, failureCount, error: roundErr } = useRound(id!)
  const { data: attempts, isLoading: attemptsLoading } = useRoundAttempts(id!, !!round)
  const { data: app } = useApplication(round?.jobApplicationId ?? '')

  const is404 = axios.isAxiosError(roundErr) && roundErr.response?.status === 404

  if (is404) {
    return (
      <div className="pt-10 text-center space-y-2">
        <p className="text-sm text-foreground">Round not found.</p>
        <p className="text-xs text-muted-foreground">This round may not exist yet — start a Claude session to generate it.</p>
        <Link to="/" className="text-xs text-primary hover:underline">Back to home</Link>
      </div>
    )
  }

  if (roundLoading || (roundError && failureCount < 4 && roundFetching)) {
    if (failureCount > 0) return <WakingUp />
    return (
      <div className="pt-6 space-y-4">
        <Skeleton className="h-6 w-64" />
        <Skeleton className="h-20 rounded-xl" />
        <Skeleton className="h-40 rounded-xl" />
      </div>
    )
  }

  if (roundError || !round) return <WakingUp />

  return (
    <div className="pt-6 space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        {app && (
          <>
            <Link to={`/applications/${app.id}`} className="hover:text-foreground transition-colors">
              {app.company} — {app.role}
            </Link>
            <ChevronRight className="h-3 w-3" />
          </>
        )}
        <span className="text-foreground">{round.roundType}</span>
      </nav>

      {/* Round summary */}
      <div className="rounded-lg border border-border bg-card p-5 space-y-4">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h1 className="text-lg font-bold text-foreground">{round.roundType}</h1>
            {app && <p className="text-sm text-muted-foreground">{app.company} · {app.role}</p>}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {round.status === 'cleared' && <Badge variant="success">Cleared</Badge>}
            {round.status === 'failed' && <Badge variant="destructive">Failed</Badge>}
            {round.status === 'not_attempted' && <Badge variant="muted">Not attempted</Badge>}
          </div>
        </div>

        {round.confidenceScore !== null && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Confidence score</span>
              <span>{round.confidenceScore}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div
                className={cn('h-full rounded-full', confidenceBarColor(round.confidenceScore))}
                style={{ width: `${round.confidenceScore}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />~{round.estimatedDurationMinutes} min</span>
          <span className="flex items-center gap-1"><HelpCircle className="h-3 w-3" />{round.questionCount} questions</span>
        </div>

        {round.depthCalibrationRationale && (
          <p className="text-xs text-muted-foreground border-t border-border pt-3">{round.depthCalibrationRationale}</p>
        )}
      </div>

      {/* Attempts */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">Attempt History</h2>
          {attempts && <span className="text-xs text-muted-foreground">{attempts.length} attempt{attempts.length !== 1 ? 's' : ''}</span>}
        </div>
        {attemptsLoading
          ? <Skeleton className="h-24 rounded-lg" />
          : <AttemptList attempts={attempts ?? []} />
        }
      </div>
    </div>
  )
}
