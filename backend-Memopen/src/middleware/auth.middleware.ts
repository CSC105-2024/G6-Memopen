import type { MiddlewareHandler } from 'hono';
import { getCookie } from 'hono/cookie';

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const userId = await getCookie(c, 'userId');  // Use getCookie helper here

  if (!userId) {
    return c.json({ success: false, msg: 'Unauthorized' }, 401);
  }

  c.set('userId', Number(userId));

  await next();
};
