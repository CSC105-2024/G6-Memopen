// middleware/auth.middleware.ts
import type { MiddlewareHandler } from 'hono';
import { getSignedCookie } from 'hono/cookie';

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const userId = await getSignedCookie(c, 'userId');

  if (!userId) {
    return c.json({ success: false, msg: 'Unauthorized' }, 401);
  }

  // Attach to context for later access
  c.set('userId', Number(userId));
  await next();
};
