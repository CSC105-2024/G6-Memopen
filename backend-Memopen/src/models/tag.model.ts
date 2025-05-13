import { db } from "../index.ts"


const GetAllTag = async() => {
    const tag = await db.tag.findMany();
    return tag;
};

const CreateTag = async (title: string, color: string)=> {
    const tag = await db.tag.create({
      data: { title, color },
    });
    return tag;
};

const deleteTag = async (id: number)=> {
  const deletedTag = await db.tag.delete({
    where: { id },
  });
  return deletedTag;
}
export {GetAllTag, CreateTag, deleteTag}

