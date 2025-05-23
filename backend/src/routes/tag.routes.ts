import { Hono } from "hono";
import * as TagController from '../controllers/tag.controller.ts';
import { authMiddleware } from '../middleware/auth.middleware.ts'
const tagRouter = new Hono();
tagRouter.use('*',authMiddleware);
tagRouter.get('/',TagController.getTags);
tagRouter.post('/',TagController.createManualTag);
tagRouter.patch('/:id',TagController.editTag);
tagRouter.delete('/:id',TagController.deletedPost);
export default tagRouter;
