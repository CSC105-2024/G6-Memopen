import { Hono } from 'hono';
import * as tagController from '../controllers/tag.controller.ts';

const tagRouter = new Hono();

tagRouter.get('/',tagController.GetAllTag);
tagRouter.post('/',tagController.CreateTag);
tagRouter.delete('/:id',tagController.DeleteTag);

export default tagRouter ;