import { Hono } from 'hono';
import * as postController from '../controllers/post.controller.ts'
import { authMiddleware } from '../middleware/auth.middleware.ts';
const postRouter = new Hono();
postRouter.use('*',authMiddleware);
postRouter.get('/',postController.getPost);
postRouter.post('/', postController.createPost);
postRouter.patch('/:id',postController.editPost);
postRouter.delete('/:id', postController.deletedPost);

export { postRouter };
