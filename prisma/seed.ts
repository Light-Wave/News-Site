import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Lipsum from "node-lipsum";
import { testUserData } from "./seed_data";

const lipsum = new Lipsum();

async function generateUsers() {
  // If we are in production, remove all test users instead
  if (process.env.NODE_ENV === "production") {
    await prisma.user.deleteMany({
      where: { email: { endsWith: "@testing.com" } },
    });
    return;
  }

  const users = await prisma.user.findMany({
    where: { email: { endsWith: "@testing.com" } },
  });
  for (const user of testUserData) {
    const userExists = users.find((u) => u.email === user.email);
    if (!userExists) {
      await auth.api.createUser({
        body: user,
      });
      prisma.user
        .updateMany({
          where: { email: user.email },
          data: { emailVerified: true },
        })
        .catch((e) => {
          console.error("Failed to verify email for user: ", user.email, e);
        });
    }
  }
}

async function generatePosts() {
  const postCount = await prisma.post.count();
  for (let i = postCount; i < 20; i++) {
    await prisma.post.create({
      data: {
        title: lipsum.getText({
          amount: Math.floor(Math.random() * 10) + 1,
          what: "words",
        }),
        content: `This is the content for sample post ${i + 1}.`,
        published: true,
      },
    });
  }
}

async function main() {
  await generateUsers();
  await generatePosts();
}

main()
  .catch((e) => {
    console.error("Seed failed: ", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
