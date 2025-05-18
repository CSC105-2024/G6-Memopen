import type { Context } from "hono";
import * as postModel from "../models/post.model.ts"
import { getSignedCookie } from "hono/cookie";
const secret = process.env.JWT_SECRET;
if (!secret) {
  throw new Error("JWT_SECRET not set in environment variables");
}
export const getPost = async (c:Context)=>{
    try{
        const userId = (await getSignedCookie(c, "userId", secret));
        if (!userId) {
      return c.json({ success: false, data: null, msg: "No userId cookie found" }, 401);
    }
        const posts = await postModel.getPost(Number(userId));
        return c.json({
            success:true,
            data:posts,
            msg:'SucessFully get all post'
        })
    }catch(e){
        return c.json(
            {
                success:false,
                data:null,
                msg:`Internal Server Error: ${e}`
            },500
        )
    }
}

export const createPost = async (c:Context)=>{
    try{
        const body = await c.req.json();
        const {userId, json,tag,tagColor,thumbnail,backgroundImg} = body;
        const newPost = await postModel.addPost(userId, json,tag,tagColor,thumbnail,backgroundImg);
        return c.json({
            success:true,
            data:newPost,
            msg:"Post Created Successfully"
        })
    }catch(e){
        return c.json(
            {
                success:false,
                data:null,
                msg:`Internal server Error ${e}`
            },500
        )
    }
}

export const editPost = async (c: Context) => {
  try {
    const postId = String(c.req.param("id"));

    const body = await c.req.json(); 

    const updatedPost = await postModel.editPost(postId, body);

    return c.json({
      success: true,
      data: updatedPost,
      msg: "Post edited successfully"
    });

  } catch (e) {
    return c.json({
      success: false,
      data: null,
      msg: `Internal server Error: ${e instanceof Error ? e.message : e}`
    }, 500);
  }
};


export const deletedPost =  async (c:Context) =>{
    try{
        const postId = String(c.req.param("id"));
        const deletedPost = await postModel.deletePost(postId);
        return c.json({
            sucess:true,
            data:deletedPost,
            msg:"Post deleted successfully"
        })
    }catch (e){
        return c.json(
            {
                success:false,
                data:null,
                msg:`Internal Server Error ${e}`
            },500
        )
    }
}