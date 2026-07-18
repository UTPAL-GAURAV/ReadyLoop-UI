import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { RoundAttempt } from '@/types'
import { useAttempt } from '@/hooks/useAttempt'
import { QuestionAttemptRow } from './QuestionAttemptRow'
import { Skeleton } from '@/components/ui/skeleton'

function confidenceColor(score: number | null) {
  if (score === null) return 'muted'
  if (score >= 80) return 'success'
  if (score >= 60) return 'warning'
  return 'destructive'
}

export function AttemptList({ attempts }: { attempts: RoundAttempt[] }) {
  if (attempts.length === 0) {
    return <p className="text-sm text-muted-foreground py-4">No attempts yet. Start a Claude session to begin.</p>
  }

  return (
    <div className="space-y-3">
      {attempts.map((attempt, i) => (
        <AttemptItem key={attempt.id} attempt={attempt} index={attempts.length - i} />
      ))}
    </div>
  )
}

function AttemptItem({ attempt, index }: { attempt: RoundAttempt; index: number }) {
  const [expanded, setExpanded] = useState(index === 1)
  const { data: questions, isLoading } = useAttempt(expanded ? attempt.id : '')

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-4 py-3 bg-muted/30 hover:bg-muted/50 transition-colors text-left"
        onClick={() => setExpanded(v => !v)}
      >
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-foreground">Attempt {index}</span>
          {attempt.status && (
            <Badge variant={confidenceColor(attempt.confidenceScore) as 'success' | 'warning' | 'destructive' | 'muted'}>
              {attempt.status === 'cleared' ? 'Cleared' : 'Failed'}
            </Badge>
          )}
          {attempt.confidenceScore !== null && (
            <span className="text-xs text-muted-foreground">{attempt.confidenceScore}% confidence</span>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{new Date(attempt.startedAt).toLocaleDateString()}</span>
          {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </div>
      </button>

      {expanded && (
        <div className="divide-y divide-border">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24 m-4 rounded-md" />)
            : questions?.map((q, qi) => <QuestionAttemptRow key={q.id} question={q} index={qi + 1} />)
          }
        </div>
      )}
    </div>
  )
}
