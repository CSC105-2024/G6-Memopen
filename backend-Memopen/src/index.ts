import { Hono } from 'hono';
import { PrismaClient } from './generated/prisma/index.js';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import mainRouter from './routes/index.routes.ts';
import authRouter from './routes/auth.routes.ts';
import cookiesRouter from './routes/cookies.ts';
const app = new Hono()

app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials:true, //allow cookies
  })
)
export const db = new PrismaClient()
app.route("/",mainRouter);
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/tags', async (c) => {
  const tags = await db.tag.findMany();
  return c.json(tags);
});

app.post('/tags', async (c) => {
  const body = await c.req.json();
  const { name, color } = body;

const tag = await db.tag.create({
  data: { name, color },
});

  return c.json(tag);
});

app.delete('/tags/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  await db.tag.delete({ where: { id } });
  return c.text('Deleted');
});
app.put('/tags/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const { name, color } = body;

  try {
    const updatedTag = await db.tag.update({
      where: { id },
      data: { name, color },
    });

    return c.json(updatedTag);
  } catch (err) {
    console.error("Failed to update tag", err);
    return c.json({ error: 'Update failed' }, 500);
  }
});

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})


db.$connect()
	.then(() => {
		console.log("Connected to the database");
	})
	.catch((error) => {
		console.error("Error connecting to the database:", error);
	});

app.route('/cookies',cookiesRouter);
app.route('/auth', authRouter);
