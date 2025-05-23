import type { Context } from 'hono'
import { deleteCookie } from 'hono/cookie'

export const clearCookies = async (c: Context) => {
  
  const target = c.req.query('target')
  if (!target) {
    return c.text('Please give a cookie name using ?target=cookieName', 400)
  }

  try {
    deleteCookie(c, target, { path: '/' })
    return c.text(`The "${target}" cookie has been cleared.`)
  } catch (error) {
    console.error(error)
    return c.text('Something went wrong. Cookie was not cleared.', 500)
  }
}