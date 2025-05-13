import { Hono } from 'hono';
import * as postController from '../controllers/post.controller.ts'
const postRouter = new Hono();

postRouter.get('/',postController.getPost);
postRouter.get('/:tagId/posts',postController.getPostsByTagId);
postRouter.post('/', postController.createPost);
postRouter.patch('/:id',postController.editPost);
postRouter.delete('/:id', postController.deletedPost);

export default postRouter ;
