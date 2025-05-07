import { db } from "../index.ts";

const getPost = async() => {
    const post = await db.post.findMany();
    return post
};

const addPost = async (newContent: string,userId: number) => {
    const newPost = await db.post.create({
        data: {
            content: newContent,
            userID: userId,
        }
    });
    return newPost;
}

const editPost = async (postId:number, editContent: string) => {
    const editedPost = await db.post.update({
        where: {
            id:postId,
        },
        data: {
            content: editContent,
        }
    })
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