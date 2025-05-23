import type { Context } from "hono";
import * as postModel from "../models/post.model.ts"

export const getPost = async (c: Context) => {
  try {
    const userId = c.get('userId'); 

    if (!userId) {
      return c.json({ success: false, msg: 'Unauthorized' }, 401);
    }

    const posts = await postModel.getPost(userId);

    return c.json({
      success: true,
      data: posts,
      msg: 'Successfully fetched user posts',
    });
  } catch (e) {
    return c.json(
      {
        success: false,
        data: null,
        msg: `Internal Server Error: ${e}`,
      },
      500
    );
  }
};


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

export const getSinglePost = async (c: Context) => {
  try {
    const postId = String(c.req.param("id"));

    const post = await postModel.getPostById(postId);

    if (!post) {
      return c.json({
        success: false,
        data: null,
        msg: "Post not found",
      }, 404);
    }

    return c.json({
      success: true,
      data: post,
      msg: "Post fetched successfully",
    });
  } catch (e) {
    return c.json({
      success: false,
      data: null,
      msg: `Internal Server Error: ${e instanceof Error ? e.message : e}`,
    }, 500);
  }
};
