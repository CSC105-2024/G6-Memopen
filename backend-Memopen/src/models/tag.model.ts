import { db } from "../index.ts";

export const getTag = async (userId: number)=>{
    const tags = await db.manualTag.findMany({
        where:{
            userId,
        },
        orderBy:{
            createAt:'desc'
        }
        
    })
    return tags;
}

export const addTags = async(
    userId:number,
    tagManual:string,
    tagColorManual:string
)=>{
    const user = await db.user.findUnique({
        where:{
            id:userId,
        }
    })
     if(!user){
      throw new Error("user not found ")
    }
    const newTagManual = await db.manualTag.create({
        data:{
            tagManual,
            tagColorManual,
            user:{
                connect:{id:userId}
            }
        }
    })
    return newTagManual;
}
export const editManualTag = async (id:number , data:Partial<{
    tagManual:string,
    tagColorManual:string,
}>)=>{
    const updatedManualTag = await db.manualTag.update({
        where:{id},
        data
    })
    return updatedManualTag
}

export const deleteManualTag = async (id:number)=>{
    const tagManualDeleted = await db.manualTag.delete({
        where:{id}
    })
    return tagManualDeleted;
}
