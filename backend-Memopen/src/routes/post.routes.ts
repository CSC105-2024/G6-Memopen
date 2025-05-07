import { Hono } from 'hono';
import * as postController from '../controllers/post.controller.ts'

const postRouter = new Hono();

postRouter.get('/test', (c) => c.text('Hello From Todo Router'));

postRouter.post('/')
/*todoRouter.get('/', postController.GetTodo);
todoRouter.post('/', postController.AddTodo);
todoRouter.patch('/', postController.EditTodoName);
todoRouter.patch('/success/:id', postController.CompleteTodo);
todoRouter.delete('/:id', postController.DeleteTodo);
*/
export { postRouter };
