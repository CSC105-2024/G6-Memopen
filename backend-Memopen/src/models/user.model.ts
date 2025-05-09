import { db } from "../index.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = "secret-key";

export const registerUser = async (username:string, password:string , pfpURL?:string)=>{
    const handlePassword = await bcrypt.hash(password,10);
    const user = await db.user.create({
        data:{
            username,
            password: handlePassword,
            pfpURL,
        }
    })
    return user;
}

export const loginUser = async (username:string , password:string)=>{
    const user = await db.user.findUnique({
        where:{username}
    })
    if(!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return null;

    const token = jwt.sign({id:user.id , username: user.username}, SECRET, {expiresIn:"1d"})
    //SECRET a string from env use to secure , the token will expire in 1 day  -> log in again 
    return {user, token};
}