import type { Context } from "hono";
import * as authModel from '../models/user.model.ts';
import { generateToken } from "../utils/token.ts";

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

export const login = async (c:Context)=>{
    try{
        const {username,password}= await c.req.json<AuthBody>()
        const user = await authModel.findUserByUsername(username);
        if(!user){
            return c.json({
                success:false,
                msg:"Invalid credentials"
            },401)
        }
        const isValid = await authModel.validatePassword(password,user.password)
        if(!isValid){
            return c.json({
                sucess:false,
                msg:"Invalid credentials"
            },401)
        }
        const token = generateToken(user);
        return c.json({
            success:true,
            token
        })
    }catch(e){
        console.error(e);
        return c.json({
            sucess:false,
            msg:"Failed to login"
        },500)
    }
}


export const getAllUsers = async (c: Context) => {
    try {
        const users = await authModel.getAllUser();
        return c.json({
            success: true,
            data: users,
            msg: "Fetched all users"
        });
    } catch (e) {
        return c.json({
            success: false,
            data: null,
            msg: "Failed to fetch users"
        }, 500);
    }
};
