import { useQuery } from '@tanstack/react-query'
import { getApplications } from '@/api/applications'

export function useApplications() {
  return useQuery({ queryKey: ['applications'], queryFn: getApplications })
}
