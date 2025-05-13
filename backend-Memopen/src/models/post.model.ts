import { Prisma } from "@prisma/client";
import { db } from "../index.ts";

const getPost = async() => {
    const post = await db.post.findMany();
    return post
};

const addPost = async (data: {
  userId: number;
  json: any;
  tagName: string;
  tagColor: string;
  thumbnail: string;
}) => {
  const { userId, json, tagName, tagColor, thumbnail } = data;

  let tag = await db.tag.findFirst({
    where: {
      title: tagName,
      color: tagColor,
      userId: userId
    },
  });

  if (!tag) {
    tag = await db.tag.create({
      data: {
        title: tagName,
        color: tagColor,
        userId: userId
      },
    });
  }

  const post = await db.post.create({
    data: {
      user: { connect: { id: userId } },
      json,
      tagColor,
      thumbnail,
      tag: {
        connect: [{ id: tag.id }],
      },
    },
    include: {
      tag: true,
    },
  });

  return post;
};

const editPost = async (id:string, data:Partial<{
    json:any,
    tagName: string,
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