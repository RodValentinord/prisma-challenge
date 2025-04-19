// after/prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const TOTAL_USERS = 1_000;
  const POSTS_PER_USER = 10;

  const users = Array.from({ length: TOTAL_USERS }, (_, i) => ({
    name: `User ${i+1}`,
  }));
  await prisma.user.createMany({ data: users });

  // pegar todos os IDs recém-criados
  const created = await prisma.user.findMany({ select: { id: true } });

  // criar posts
  const posts = [];
  for (const { id } of created) {
    for (let j = 1; j <= POSTS_PER_USER; j++) {
      posts.push({
        title: `Post ${j} of User ${id}`,
        content: `Conteúdo do post ${j} do usuário ${id}`,
        userId: id,
      });
    }
  }
  // cria em batch (se > 10k, talvez divida em vários createMany)
  for (let i = 0; i < posts.length; i += 1000) {
    await prisma.post.createMany({ data: posts.slice(i, i + 1000) });
  }

  console.log(`Seed completo: ${TOTAL_USERS} usuários e ${TOTAL_USERS * POSTS_PER_USER} posts.`);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
