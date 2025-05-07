import type { Context } from "hono";
import * as postModel from "../models/post.model.ts"
import type {  CreatePostInput } from "../types/post.type.ts";

const getPost = async (c:Context) => {
    try {
        const posts = await postModel.getPost();
        return c.json({
            success: true,
            data: posts,
        });
    } catch (e) {
        return c.json ({
            success: false,
            data: null
     
        },500 )
    }
}
const addPost = async (c:Context) => {
    try{
        const body = await c.req.json<CreatePostInput>
        if(body&&body.content){

        }
    }
}
