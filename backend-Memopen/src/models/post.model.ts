import { Prisma } from "@prisma/client";
import { db } from "../index.ts";

const getPost = async() => {
    const post = await db.post.findMany();
    return post
};


const addPost = async (
    userId: number,
    json:any,
    tag:string,
    tagColor: string,
    thumbnail: string
  ) => {
    const newPost = await db.post.create({
      data: {
        json,
        tag,
        tagColor,
        thumbnail,
        user: {
          connect: { id: userId }
        }
      }
    });
    return newPost;
  };

const editPost = async (id:string, data:Partial<{
    json:any,
    tag:string,
    tagColor:string,
    thumbnail:string,
}>)=>{
    const updatedPost = await db.post.update({
        where:{id},
        data
    })
    return updatedPost;
}

const deletePost = async (id:string)=>{
    const deletedPost = await db.post.delete({
        where:{id}
    })
    return deletedPost;
}

export { getPost, addPost, editPost, deletePost }