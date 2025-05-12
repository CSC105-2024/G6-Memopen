import { db } from "../index.ts";

const getTag = async() => {
    const tag = await db.tag.findMany({
        include: {
            posts: true,
        }
    })
};

const addTag = async (title: string, color: string) => {
    return await db.tag.create({
      data: { title, color,
      },
    });
  };

  const deleteTag = async (tagId: number) => {
    return await db.tag.delete({
      where: { id: tagId },
    });
  };

  const editTag = async (tagId: number, title: string, color: string) => {
    return await db.tag.update({
      where: { id: tagId },
      data: {
        title, color,
      },
    });
  };

export { getTag, addTag, deleteTag, editTag}