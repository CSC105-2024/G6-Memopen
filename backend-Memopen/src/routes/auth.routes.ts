import { Hono } from "hono";
import { getAllUsers, login, signup, updateProfileImage } from "../controllers/auth.controller.ts";

const authRouter = new Hono();
authRouter.post('/register',signup);
authRouter.post('/login',login);
authRouter.get('/',getAllUsers)  //เดวลบ เอาไว้ดูเฉญๆ
authRouter.post('/profile-image/:id', updateProfileImage);

export default authRouter;