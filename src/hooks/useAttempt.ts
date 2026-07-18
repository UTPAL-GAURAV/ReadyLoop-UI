import { useQuery } from '@tanstack/react-query'
import { getQuestionAttempts } from '@/api/attempts'

export function useAttempt(attemptId: string) {
  return useQuery({
    queryKey: ['attempt', attemptId],
    queryFn: () => getQuestionAttempts(attemptId),
    enabled: !!attemptId,
  })
}
