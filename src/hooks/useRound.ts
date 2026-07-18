import { useQuery } from '@tanstack/react-query'
import { getRound, getRoundAttempts } from '@/api/rounds'

export function useRound(id: string) {
  return useQuery({ queryKey: ['round', id], queryFn: () => getRound(id), enabled: !!id })
}

export function useRoundAttempts(id: string) {
  return useQuery({ queryKey: ['round-attempts', id], queryFn: () => getRoundAttempts(id), enabled: !!id })
}
