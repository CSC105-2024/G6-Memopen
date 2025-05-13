import { db } from "../index.ts"


const GetAllTag = async() => {
    const tag = await db.tag.findMany({
      select: {
        id: true,
        title: true,
        color: true,
        userId: true
      }
    });
    return tag;
};

const getTagsByUserId = async (userId: number) => {
  const tags = await db.tag.findMany({
    where: {
      userId: userId,
    }, 
  });

  return tags;
};

const CreateTag = async (userId: number, title: string, color: string)=> {
    const tag = await db.tag.create({
      data: { userId, title, color },
    });
    return tag;
};

const deleteTag = async (id: number)=> {
  const deletedTag = await db.tag.delete({
    where: { id },
  });
  return deletedTag;
}
export {GetAllTag,getTagsByUserId, CreateTag, deleteTag}

