import { Link } from 'react-router-dom'
import { Clock, HelpCircle, Info } from 'lucide-react'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip'
import type { InterviewRound } from '@/types'
import { cn } from '@/lib/utils'

function statusConfig(status: InterviewRound['status']) {
  if (status === 'cleared') return { label: 'Cleared', variant: 'success' as const }
  if (status === 'failed') return { label: 'Failed', variant: 'destructive' as const }
  return { label: 'Not attempted', variant: 'muted' as const }
}

function confidenceBarColor(score: number) {
  if (score >= 80) return 'bg-emerald-500'
  if (score >= 60) return 'bg-amber-500'
  return 'bg-red-500'
}

export function RoundCard({ round }: { round: InterviewRound }) {
  const { label, variant } = statusConfig(round.status)

  return (
    <Link to={`/rounds/${round.id}`}>
      <Card className="hover:border-primary/40 transition-colors cursor-pointer h-full">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground">{round.roundType}</h3>
            <Badge variant={variant}>{label}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {round.confidenceScore !== null && round.confidenceScore !== undefined && round.status !== 'not_attempted' && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Confidence</span>
                <span>{round.confidenceScore}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className={cn('h-full rounded-full transition-all', confidenceBarColor(round.confidenceScore))}
                  style={{ width: `${round.confidenceScore}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {!!round.estimatedDurationMinutes && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />~{round.estimatedDurationMinutes} min
              </span>
            )}
            {!!round.questionCount && (
              <span className="flex items-center gap-1">
                <HelpCircle className="h-3 w-3" />{round.questionCount} questions
              </span>
            )}
          </div>

          {round.depthCalibrationRationale && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground cursor-help">
                    <Info className="h-3 w-3 shrink-0" />
                    <span className="truncate">{round.depthCalibrationRationale}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>{round.depthCalibrationRationale}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
