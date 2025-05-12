import type {Context} from 'hono';

export const sendCookie = async(c:Context)=>{
    const key = 'firstCookie';
    const value = 'This is the data inside the cookie';
    try {
        c.header('Set-Cookie', `${key}=${encodeURIComponent(value)}; Path=/; HttpOnly`)
        return c.text('Very First Cookie')
      } catch (error) {
        console.error(error)
        return c.text('An error occurred, Cookie not set', 500)
      }
}