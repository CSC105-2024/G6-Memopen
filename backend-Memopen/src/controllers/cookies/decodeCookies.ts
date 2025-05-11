import type { Context } from 'hono'
import { getCookie } from 'hono/cookie'
import jwt from 'jsonwebtoken'

export const decodeCookies = async (c: Context) => {
  const cookie = getCookie(c).firstSecureCookie
  const secret = process.env.JWT_SECRET as string

  if (!secret) {
    console.error('JWT_SECRET missing in environment variables')
    return c.text('Server error: missing secret', 500)
  }

  if (!cookie) {
    return c.text('No secure cookie found', 400)
  }

  try {
    const decoded = jwt.verify(cookie, secret) as { value: string }
    return c.text(decoded.value)
  } catch (err) {
    console.error('JWT verification failed:', err)
    return c.text('Invalid or expired token', 401)
  }
}