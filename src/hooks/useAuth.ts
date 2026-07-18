import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { decodeJwt, isTokenExpired } from '@/lib/auth'
import { exchangeGoogleToken } from '@/api/auth'

const JWT_KEY = 'rl_jwt'

export function useAuth() {
  const [copied, setCopied] = useState(false)
  const navigate = useNavigate()

  const token = localStorage.getItem(JWT_KEY)
  const isAuthenticated = !!token && !isTokenExpired(token)
  const user = token ? decodeJwt(token) : null

  const login = useCallback(async (googleIdToken: string) => {
    const { token: jwt } = await exchangeGoogleToken(googleIdToken)
    localStorage.setItem(JWT_KEY, jwt)
    navigate('/')
  }, [navigate])

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
