import { Hono } from 'hono';
import { PrismaClient } from './generated/prisma/index.js';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import mainRouter from './routes/index.routes.ts';
import authRouter from './routes/auth.routes.ts';
import cookiesRouter from './routes/cookies.ts';
import tagRouter from './routes/tag.routes.ts';
const app = new Hono()

app.use(

  "*",
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
app.route('/tag',tagRouter);
