import { db } from "../index.ts";

const getTag = async() => {
    const tag = await db.tag.findMany();
    return tag
};

const addTag = async() => {
    const newTag = await db
    return newTag
}

const deleteTag = async() => {
    const deletedTag = await db
    return deletedTag
}

const editTag = async () => {
    const editedTag = await db
    return editedTag;
}


export { getTag, addTag, deleteTag, editTag}