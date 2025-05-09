import { Hono } from "hono";
import { postRouter } from "./post.routes.ts";
import { authRoutes } from "./auth.routes.ts";
const mainRouter = new Hono();

mainRouter.route("/post", postRouter);
mainRouter.route("/auth", authRoutes);

export { mainRouter };
