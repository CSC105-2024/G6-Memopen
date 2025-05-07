import { Hono } from 'hono';
import { PrismaClient } from './generated/prisma/index.js';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';

const app = new Hono()
export const db = new PrismaClient()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.use('*', cors())

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
