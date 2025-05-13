import type { Context } from "hono";
import * as tagModel from '../models/tag.model.ts'

export const GetAllTag = async(c:Context)=> {
    try {
        const tags = await tagModel.GetAllTag();
        return c.json({
            success:true,
            data:tags,
            msg:'Sucessfully get all tags'
        })
    } catch(e){
         return c.json(
            {
                success:false,
                data:null,
                msg:`Internal Server Error: ${e}`
            },500
        )  
    }
}

export const getTagsByUserId = async (c:Context) => {
    try {
        const body = await c.req.json();
        const {userId} = body;
        const tagsFromUser = await tagModel.getTagsByUserId( userId);
        return c.json({
            success:true,
            data:tagsFromUser,
            msg:'Sucessfully created tag'
        })
    } catch (e){
        return c.json(
            {
                success:false,
                data:null,
                msg:`Internal Server Error: ${e}`    
            },500
        )
    }
}

export const CreateTag = async(c:Context) => {
    try {
        const body = await c.req.json();
        const { userId, title, color } = body;
        const newTag = await tagModel.CreateTag(userId,title,color)
        return c.json({
            success:true,
            data:newTag,
            msg:'Sucessfully created tag'
        })
    } catch (e){
        return c.json(
            {
                success:false,
                data:null,
                msg:`Internal Server Error: ${e}`    
            },500
        )
    }
}

export const DeleteTag = async(c:Context) => {
    try {
        const id = parseInt(c.req.param('id'));
        const deleted = await tagModel.deleteTag(id);
        return c.json({
            success:true,
            data:deleted,
            msg:'Sucessfully created tag'
        })
    } catch (e){
        return c.json(
            {
                success:false,
                data:null,
                msg:`Internal Server Error: ${e}`    
            },500
        )
    }
}
