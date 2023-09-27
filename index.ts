import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  //create user
  //   const user = await prisma.user.create({
  //     data: {
  //       name: "Bruce Wayne",
  //       email: "batman@mail.com",
  //     },
  //   });
  //   console.log(user);
  // get all users

  const users = await prisma.user.findMany({
    include: {
      articles: true,
    },
  });
  // create article
  const article = await prisma.article.create({
    data: {
      title: "Gothem",
      body: "Batman is manace",
      author: {
        connect: {
          id: 1,
        },
      },
    },
  });

    const articles = await prisma.article.findMany();

  // Create user and article ans associate them
  const user = await prisma.user.create({
    data: {
      name: "Sara",
      email: "sara@mail.com",
      articles: {
        create: [
          {
            title: "Sara article",
            body: "Content",
          },
        ],
      },
    },
  });

  const articleTwo = await prisma.article.create({
    data: {
      title: "Sample",
      body: "this is a sample",
      author: {
        connect: {
          id: 2,
        },
      },
    },
  });

  //loop over Saras artiles

  users.forEach((user) => {
    console.log(`User: ${user.name}, email: ${user.email}`);

    user.articles.forEach((article) => {
      console.log(`Title:${article.title}, Body: ${article.body}`);
    });
    console.log('\n')
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
