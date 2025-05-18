import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import { PrismaClient } from './generated/prisma/index.js';
import dotenv from 'dotenv';
import mainRouter from './routes/index.routes.ts';
import authRouter from './routes/auth.routes.ts';
import cookiesRouter from './routes/cookies.ts';

dotenv.config();

export const db = new PrismaClient();

const app = new Hono();

app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  })
);

app.route("/", mainRouter);
app.route("/auth", authRouter);
app.route("/cookies", cookiesRouter);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});


db.$connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
