import type { Context } from "hono";
import * as userModel from '../models/user.model.ts';

export const register = async (c:Context)=>{
    const {username, password, pfpURL} = await c.req.json();
    try{
        const user = await userModel.registerUser(username, password,pfpURL);
        return c.json({
            success:true,
            user
        })
    }catch(e){
        return c.json({
            success:false,
            msg:"Username already exists"
        },400)
    }
}

export const login = async (c:Context) =>{
    const {username,password}= await c.req.json();
    const loginresult = await userModel.loginUser(username,password);
    if(!loginresult){
        return c.json({
            success:false,
            msg:"Invalid"
        },400)
    }
    return c.json({
        sucess:true,
        user:loginresult.user,
        token: loginresult.token
    })
}