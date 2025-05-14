import { Hono } from 'hono';
import * as tagController from '../controllers/tag.controller.ts';
import { db } from '../index.ts';

const tagRouter = new Hono();

tagRouter.get('/',tagController.GetAllTag);
tagRouter.get("/user/:userId", tagController.getTagsByUserId);
tagRouter.post('/',tagController.CreateTag);
tagRouter.delete('/:id',tagController.DeleteTag);

tagRouter.put('/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const { title, color } = await c.req.json();
  const updated = await db.tag.update({
    where: { id },
    data: { title, color },
  });
  return c.json(updated);
});
export default tagRouter ;