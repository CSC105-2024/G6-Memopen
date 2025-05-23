import { db } from "../index.ts";
import {hash,compare} from 'bcrypt';

export const createUser = async (username:string, password:string)=>{
    const hashedPassword = await hash(password,10);
    return db.user.create({
        data:{username,password:hashedPassword}
    })
}

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



export const updateUserProfileImage = async (id: number, imageBase64: string) => {
  return db.user.update({
    where: { id },
    data: { pfpURL: imageBase64 }
  });
};
