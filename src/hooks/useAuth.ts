import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { decodeJwt, isTokenExpired } from '@/lib/auth'

const JWT_KEY = 'rl_jwt'

export function useAuth() {
  const [copied, setCopied] = useState(false)
  const navigate = useNavigate()

  // On mount: check if backend redirected back with #token=<jwt> in the URL hash
  useEffect(() => {
    const hash = window.location.hash
    if (hash.startsWith('#token=')) {
      const jwt = hash.slice('#token='.length)
      localStorage.setItem(JWT_KEY, jwt)
      // Clean the hash from the URL then navigate home
      window.history.replaceState(null, '', window.location.pathname)
      navigate('/', { replace: true })
    }
  }, [navigate])

  const token = localStorage.getItem(JWT_KEY)
  const isAuthenticated = !!token && !isTokenExpired(token)
  const user = token ? decodeJwt(token) : null

  const login = useCallback(() => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(JWT_KEY)
    navigate('/login')
  }, [navigate])

  const copyToken = useCallback(async () => {
    const t = localStorage.getItem(JWT_KEY)
    if (!t) return
    await navigator.clipboard.writeText(t)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [])

  return { isAuthenticated, user, login, logout, copyToken, copied }
}
