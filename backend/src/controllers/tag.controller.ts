import type {Context} from "hono";
import * as tagsModel from "../models/tag.model.ts";

export const getTags = async (c:Context)=>{
    try{
        const userId = c.get('userId');
        if(!userId){
            return c.json({ success: false, msg: 'Unauthorized' }, 401);
        }
        const tags = await tagsModel.getTag(userId);
        return c.json({
            success:true,
            data:tags,
            msg:'Fetch tags Sucessfully'
        })
    }catch(e){
        return c.json({
            success:false,
            data:null,
            msg: `Internal Server Error: ${e}`
        },500)
    }
}
export const createManualTag = async(c:Context)=>{
    const userId = c.get('userId');
    try{
        const body = await c.req.json();
        const {
            tagManual,
            tagColorManual,
        } = body;
        const newTag = await tagsModel.addTags(userId,tagManual,tagColorManual)
        return c.json({
            success:true,
            data:newTag,
            msg:"Tag created"
        })
    }catch(e){
        return c.json({
            success:false,
            data:null,
            msg:`Internal server Error ${e}`
        },500)
    }
}

export const editTag = async (c:Context)=>{
    try{
        const tagId = Number(c.req.param("id"));
        const body = await c.req.json();
        const updatedTag = await tagsModel.editManualTag(tagId, body);
        return c.json({
                success: true,
                data: updatedTag,
                msg: "Post edited successfully"
        })
    }catch (e) {
    return c.json({
      success: false,
      data: null,
      msg: `Internal server Error: ${e instanceof Error ? e.message : e}`
    }, 500);
  }
}

export const deletedPost = async (c:Context)=>{
    try{
        const tagId = Number(c.req.param("id"));
        const deletedTag = await tagsModel.deleteManualTag(tagId);
        return c.json({
            success:true,
            data:deletedTag,
            msg:"Tag deleted successfully"
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