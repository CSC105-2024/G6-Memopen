import { Hono } from "hono";
import {login, signup, updateProfileImage } from "../controllers/auth.controller.ts";

const authRouter = new Hono();
authRouter.post('/register',signup);
authRouter.post('/login',login);
authRouter.post('/profile-image/:id', updateProfileImage);

export default authRouter;