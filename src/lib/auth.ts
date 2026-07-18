export interface JwtClaims {
  sub: string
  email: string
  name: string
  picture?: string
  exp: number
}

export function decodeJwt(token: string): JwtClaims | null {
  try {
    const payload = token.split('.')[1]
    return JSON.parse(atob(payload)) as JwtClaims
  } catch {
    return null
  }
}

export function isTokenExpired(token: string): boolean {
  const claims = decodeJwt(token)
  if (!claims) return true
  return claims.exp * 1000 < Date.now()
}
