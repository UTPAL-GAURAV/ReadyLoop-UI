import { apiClient } from './client'
import type { User } from '@/types'

export const getMe = () => apiClient.get<User>('/api/me').then(r => r.data)

export const exchangeGoogleToken = (idToken: string) =>
  apiClient.post<{ token: string }>('/auth/google', { idToken }).then(r => r.data)
