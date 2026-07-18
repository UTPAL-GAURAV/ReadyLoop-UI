import { apiClient } from './client'
import type { QuestionAttempt } from '@/types'

export const getQuestionAttempts = (attemptId: string) =>
  apiClient.get<QuestionAttempt[]>(`/api/attempts/${attemptId}/questions`).then(r => r.data)
