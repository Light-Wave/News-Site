import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Lipsum from "node-lipsum";
import {
  clickbaitPrefixes,
  clickbaitSuffixes,
  premadeCategories,
  testUserData,
} from "./seed_data";

const lipsum = new Lipsum();

async function generateUsers() {
  console.log("\n📝 Generating test users...");

  const users = await prisma.user.findMany({
    where: { email: { endsWith: "@testing.com" } },
  });
  let createdCount = 0;
  for (const user of testUserData) {
    const userExists = users.find((u) => u.email === user.email);
    if (!userExists) {
      console.log(`  Creating user: ${user.email}`);
      if (!user.password) {
        throw new Error(
          `No password provided for user: ${user.email}\nSet TESTING_PASSWORD environment variable.`,
        );
      }
      await auth.api.createUser({
        body: {
          email: user.email,
          password: user.password,
          name: user.name,
          role: user.role,
        },
      });
      await prisma.user
        .updateMany({
          where: { email: user.email },
          data: { emailVerified: true },
        })
        .catch((e) => {
          console.error("Failed to verify email for user: ", user.email, e);
        });
      createdCount++;
    }
  }
  console.log(
    `✅ Users complete (${createdCount} created, ${users.length} already existed)`,
  );
}

async function generateCategories() {
  console.log("\n📂 Generating categories...");

  const existingCategories = await prisma.category.findMany({
    select: { name: true },
  });
  let createdCount = 0;
  for (const category of premadeCategories) {
    const categoryExists = existingCategories.find((c) => c.name === category);
    if (!categoryExists) {
      console.log(`  Creating category: ${category}`);
      await prisma.category.create({
        data: { name: category },
      });
      createdCount++;
    }
  }
  console.log(
    `✅ Categories complete (${createdCount} created, ${existingCategories.length} already existed)`,
  );
}

async function generateArticles() {
  console.log("\n📰 Generating articles...");
  const articleCount = await prisma.article.count();
  if (articleCount > 0) {
    console.log(
      `Articles already exist (${articleCount}), removing old test articles.`,
    );
    await prisma.article.deleteMany({
      where: { user: { email: { endsWith: "@testing.com" } } },
    });
  }
  const targetArticleCount = 20;
  console.log(
    `  Current articles: ${articleCount}, Target: ${targetArticleCount}`,
  );
  let writerEmail =
    (await prisma.user.count({
      where: { email: "writer@testing.com" },
    })) > 0
      ? "writer@testing.com"
      : (await prisma.user.findFirst())?.email;
  if (!writerEmail) {
    throw new Error("No users found for article writers.");
  }
  for (let i = articleCount; i < targetArticleCount; i++) {
    console.log(`  Creating article ${i + 1}/${targetArticleCount}...`);
    const summary = await lipsum.getText({
      amount: Math.floor(Math.random() * 2) + 1,
      what: "sentences",
    });
    let content = summary + "\n\n";
    for (let j = 0; j < i % 10; j++) {
      content += await lipsum.getText({
        amount: Math.floor(Math.random() * 3) + 1,
        what: "paragraphs",
      });
      content += "\n\n";
    }
    let headline = await lipsum.getText({
      amount: Math.floor(Math.random() * 3) + 2,
      what: "words",
    });
    switch (i % 4) {
      case 0:
        headline =
          clickbaitPrefixes[
            Math.floor(Math.random() * clickbaitPrefixes.length)
          ] + headline;
        break;
      case 1:
        headline =
          headline +
          clickbaitSuffixes[
            Math.floor(Math.random() * clickbaitSuffixes.length)
          ];
        break;
      default:
        break;
    }
    const newCategories = new Set([
      premadeCategories[i % premadeCategories.length],
    ]);
    const extraCategoryCount = Math.floor(Math.random() * 2);
    for (let k = 0; k < extraCategoryCount; k++) {
      const extraCategory =
        premadeCategories[Math.floor(Math.random() * premadeCategories.length)];
      newCategories.add(extraCategory);
    }
    await prisma.article.create({
      data: {
        headline,
        content,
        summary,
        image: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/200/300`,
        user: { connect: { email: writerEmail } },
        views: i,
        categories: {
          connect: Array.from(newCategories).map((name) => ({ name })),
        },
      },
    });
  }
  console.log(
    `✅ Articles complete (${targetArticleCount - articleCount} created)`,
  );
}

async function main() {
  // If we are in production, remove all test users instead
  if (process.env.NODE_ENV === "production") {
    await prisma.user.deleteMany({
      where: { email: { endsWith: "@testing.com" } },
    });
    console.log("✅ Cleaned up test users in production");
    return;
  }
  if (!process.env.TESTING_PASSWORD) {
    throw new Error("TESTING_PASSWORD environment variable not set.");
  }
  console.log("🌱 Starting database seeding...");
  console.log("================================");

  try {
    await generateUsers();
  } catch (e) {
    console.error("❌ User generation failed, continuing: ", e);
    // As long as we have any users, we can continue
  }
  if ((await prisma.user.count()) === 0) {
    throw new Error(
      "Unable to generate users, and no preexisting users found.",
    );
  }
  await generateCategories();
  await generateArticles();

  // TODO: Subscribe users

  console.log("\n================================");
  console.log("✅ Database seeding completed!");
}

main()
  .catch((e) => {
    console.error("Seed failed: ", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
