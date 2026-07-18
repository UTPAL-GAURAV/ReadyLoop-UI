import { apiClient } from './client'
import type { JobApplication } from '@/types'

export const getApplications = () =>
  apiClient.get<JobApplication[]>('/api/applications').then(r => r.data)

export const getApplication = (id: string) =>
  apiClient.get<JobApplication>(`/api/applications/${id}`).then(r => r.data)
