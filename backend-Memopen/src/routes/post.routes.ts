import { Hono } from 'hono';
import * as postController from '../controllers/post.controller.ts'
const postRouter = new Hono();
import { authMiddleware } from '../middleware/auth.middleware.ts'

postRouter.use('*', authMiddleware); 
postRouter.get('/',postController.getPost);
postRouter.post('/', postController.createPost);
postRouter.patch('/:id',postController.editPost);
postRouter.delete('/:id', postController.deletedPost);
postRouter.get('/:id', postController.getSinglePost);

export { postRouter };
