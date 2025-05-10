import { Hono } from "hono";
import { getAllUsers, login, signup } from "../controllers/auth.controller.ts";

const authRouter = new Hono();
authRouter.post('/register',signup);
authRouter.post('/login',login);
authRouter.get('/',getAllUsers)
export default authRouter;