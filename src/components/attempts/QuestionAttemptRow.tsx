import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import type { QuestionAttempt } from '@/types'

export function QuestionAttemptRow({ question, index }: { question: QuestionAttempt; index: number }) {
  const [answerExpanded, setAnswerExpanded] = useState(false)
  const longAnswer = (question.userAnswer?.length ?? 0) > 200

  return (
    <div className="px-4 py-4 space-y-3">
      {question.questionText && (
        <p className="text-sm font-semibold text-foreground">Q{index}. {question.questionText}</p>
      )}
      {!question.questionText && (
        <p className="text-sm font-medium text-foreground">Question {index}</p>
      )}

      {question.userAnswer && (
        <div className="space-y-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Your answer</p>
          <p className={`text-sm text-foreground leading-relaxed ${!answerExpanded && longAnswer ? 'line-clamp-3' : ''}`}>
            {question.userAnswer}
          </p>
          {longAnswer && (
            <button
              className="flex items-center gap-1 text-xs text-primary hover:underline"
              onClick={() => setAnswerExpanded(v => !v)}
            >
              {answerExpanded ? <><ChevronUp className="h-3 w-3" />Show less</> : <><ChevronDown className="h-3 w-3" />Show more</>}
            </button>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.strongPoints?.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wide">Strong points</p>
            <div className="flex flex-wrap gap-1.5">
              {question.strongPoints.map((pt, i) => (
                <span key={i} className="inline-flex rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs text-emerald-400">{pt}</span>
              ))}
            </div>
          </div>
        )}

        {question.missedPoints?.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-amber-500 uppercase tracking-wide">Missed points</p>
            <div className="flex flex-wrap gap-1.5">
              {question.missedPoints.map((pt, i) => (
                <span key={i} className="inline-flex rounded-full bg-amber-500/15 px-2.5 py-0.5 text-xs text-amber-400">{pt}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {question.evaluationRubric && (
        <div className="space-y-1 border-t border-border pt-3">
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-wide">Model answer</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{question.evaluationRubric}</p>
        </div>
      )}
    </div>
  )
}
