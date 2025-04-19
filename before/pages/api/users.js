// before/pages/api/users.js
import { PrismaClient } from '@prisma/client'


export default async function handler(req, res) {
  const users = await prisma.user.findMany({ include: { posts: true } })
  res.status(200).json(users)
}

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
