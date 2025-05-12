import { getCookie } from 'hono/cookie'
import type { Context } from 'hono'

export const showCookies = (c: Context) => {
  const cookies = getCookie(c)
  return c.json(cookies)
}