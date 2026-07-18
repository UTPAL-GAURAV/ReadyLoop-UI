import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001',
  timeout: 48000,
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('rl_jwt')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('rl_jwt')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
