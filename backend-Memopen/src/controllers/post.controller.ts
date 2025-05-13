import type { Context } from "hono";

import * as postModel from "../models/post.model.ts"


export const getPost = async (c:Context)=>{
    try{
        const posts = await postModel.getPost();
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

export const getPostsByTagIdController = async (c: Context) => {
  try {
    const tagIdParam = c.req.param("tagId");
    const tagId = parseInt(tagIdParam, 10);

    if (isNaN(tagId)) {
      return c.json({
        success: false,
        message: "Invalid tag ID",
      }, 400);
    }
    const tagWithPosts = await postModel.getPostsByTagId(tagId);
    return c.json({
      success: true,
      data: tagWithPosts,
    });
  } catch (error) {
    return c.json({
      success: false,
      message: "Internal Server Error",
    }, 500);
  }
};

export const createPost = async (c:Context)=>{
    try{
        const body = await c.req.json();
        const {userId, json,tag,tagColor,thumbnail} = body;
        const newPost = await postModel.addPost(body);
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


export const editPost = async (c:Context)=>{
    try{
        const postId = String(c.req.param("id"));
        const {content} = await c.req.json();
        const updatedPost = await postModel.editPost(postId, content);
        return c.json({
            sucess:true,
            data:updatedPost,
            msg:"Post edited successfully"
        })

    }catch(e){
        return c.json({
            success:false,
            data:null,
            msg:`Internal server Error ${e}`
        },500)
    }
}

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