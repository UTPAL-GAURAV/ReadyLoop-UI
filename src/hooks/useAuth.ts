import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { decodeJwt, isTokenExpired } from '@/lib/auth'

const JWT_KEY = 'rl_jwt'

// Read token from hash immediately on module load — before React mounts.
// The backend redirects to <FRONTEND_URL>/#token=<jwt> after Google OAuth.
const hashToken = (() => {
  const hash = window.location.hash
  if (hash.startsWith('#token=')) {
    const jwt = hash.slice('#token='.length)
    localStorage.setItem(JWT_KEY, jwt)
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
    return jwt
  }
  return null
})()

export function useAuth() {
  const [copied, setCopied] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (hashToken) navigate('/', { replace: true })
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
