import { db } from "../index.ts";

const getPost = async() => {
    const post = await db.post.findMany();
    return post
};

const addPost = async (userID: number, json: any, thumbnail: string, tagIds: number[]) => {
    const newPost = await db.post.create({
      data: {
        json,
        thumbnail,
        user: { connect: { id: userID } },
        tags: {
          connect: tagIds.map(id => ({ id }))
        }
      },
    });
    return newPost;
  };

  const editPost = async (postId: number, updatedJson: any, thumbnail: string) => {
    const editedPost = await db.post.update({
      where: { id: postId },
      data: {
        json: updatedJson,
        ...(thumbnail && { thumbnail }), 
      },
    });
    return editedPost;
  }

const deletePost = async (postId:number) => {
    const deletedPost = await db.post.delete({
        where:{
            id: postId,
        }
    })
    return deletedPost;
}

export { getPost, addPost, editPost, deletePost }