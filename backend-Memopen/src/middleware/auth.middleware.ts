import { verifyToken } from "../utils/token.ts";
import type { MiddlewareHandler } from "hono";
export const authMiddleware: MiddlewareHandler = async (c, next) => {
  try {
    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ success: false, msg: "Unauthorized: Missing Bearer token" }, 401);
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token);
    if (!payload) {
      return c.json({ success: false, msg: "Unauthorized: Invalid token" }, 401);
    }

    c.set("userId", payload.userId);
    await next();
  } catch (error) {
    console.error("Error in authMiddleware:", error);
    return c.json({ success: false, msg: "Internal Server Error" }, 500);
  }
};
