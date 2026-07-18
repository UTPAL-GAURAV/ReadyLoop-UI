import { apiClient } from './client'
import type { InterviewRound, RoundAttempt } from '@/types'

export const getRound = (id: string) =>
  apiClient.get<InterviewRound>(`/api/rounds/${id}`).then(r => r.data)

export const getRoundAttempts = (id: string) =>
  apiClient.get<RoundAttempt[]>(`/api/rounds/${id}/attempts`).then(r => r.data)
