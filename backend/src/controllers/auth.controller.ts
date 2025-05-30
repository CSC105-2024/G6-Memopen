import type { Context } from "hono";
import * as authModel from '../models/user.model.ts';
import { generateToken } from "../utils/token.ts";
import { setCookie } from 'hono/cookie';

type AuthBody = {
    username:string
    password:string
}

export const signup = async (c:Context)=>{
    try{
        const {username,password} = await c.req.json<AuthBody>()
        const Alreadyexisting = await authModel.findUserByUsername(username);
        if(Alreadyexisting){
            return c.json({
                success:false,
                msg:'This username alreay taken'
            },409)
        }
        const user = await authModel.createUser(username,password)
        const token = generateToken(user);
        return c.json({
            success:true,
            token
        },201)
    }catch(e){
        console.error(e);
        return c.json({
            success:false,
            msg:'Failed to create user'
        },500)
    }
}

export const login = async (c: Context) => {
  try {
    const { username, password } = await c.req.json();

    const user = await authModel.findUserByUsername(username);

    if (!user) {
      return c.json({ success: false, msg: "Invalid credentials" }, 401);
    }

    const isValid = await authModel.validatePassword(password, user.password);
    if (!isValid) {
      return c.json({ success: false, msg: "Invalid credentials" }, 401);
    }

    const token = generateToken(user);

   await setCookie(c, 'userId', String(user.id), {
        httpOnly: true,
        secure: false,  
        sameSite: 'Lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, 
});
    return c.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        pfpURL: user.pfpURL || null,
      },
    });
  } catch (e) {
    console.error(e);
    return c.json({ success: false, msg: "Failed to login" }, 500);
  }
};


export const updateProfileImage = async (c: Context) => {
  const userId = Number(c.req.param("id")); 
  const formData = await c.req.formData();
  const image = formData.get("image");

  if (!image || typeof image === "string") {
    return c.json({ success: false, msg: "No valid image provided" }, 400);
  }

  const arrayBuffer = await image.arrayBuffer();
  const base64Image = Buffer.from(arrayBuffer).toString("base64");

  const updatedUser = await authModel.updateUserProfileImage(userId, base64Image);

  return c.json({
    success: true,
    msg: "Profile image updated",
    data: updatedUser,
  });
};

