import { PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const host = 'localhost';

const app = express();

// Add CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.get('/', async (req, res) => {
  const posts = await prisma.post.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' },
  });

  res.json(posts);
});

app.listen(port, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
