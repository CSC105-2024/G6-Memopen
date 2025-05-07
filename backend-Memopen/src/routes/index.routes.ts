import { Hono } from "hono";
import { postRouter } from "./post.routes.ts";
const mainRouter = new Hono();

mainRouter.route("/post", postRouter);

export { mainRouter };
