import { useQuery } from '@tanstack/react-query'
import { getApplication } from '@/api/applications'

export function useApplication(id: string) {
  return useQuery({ queryKey: ['application', id], queryFn: () => getApplication(id), enabled: !!id })
}
