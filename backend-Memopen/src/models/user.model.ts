import { db } from "../index.ts";
import {hash,compare} from 'bcrypt';

export const createUser = async (username: string, password: string) => {
  try {
    const hashedPassword = await hash(password, 10);
    return await db.user.create({
      data: { username, password: hashedPassword }
    });
  } catch (e) {
    console.error("DB createUser error:", e);
    throw e; // re-throw to be caught in your controller
  }
};

export const findUserByUsername = async (username:string)=>{
    return db.user.findUnique(
        {
            where:{username}
        }
    )
}
export const validatePassword = async (input:string, hash:string)=>{
    return compare(input,hash);
}


export const getAllUser = async ()=>{
    const user = await db.user.findMany();
    return user;
}