import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Lipsum from "node-lipsum";
import {
  clickbait_prefixes,
  clickbait_suffixes,
  premade_categories,
  testUserData,
} from "./seed_data";

const lipsum = new Lipsum();

async function generateUsers() {
  console.log("\n📝 Generating test users...");
  // If we are in production, remove all test users instead
  if (process.env.NODE_ENV === "production") {
    await prisma.user.deleteMany({
      where: { email: { endsWith: "@testing.com" } },
    });
    console.log("✅ Cleaned up test users in production");
    return;
  }

  const users = await prisma.user.findMany({
    where: { email: { endsWith: "@testing.com" } },
  });
  let createdCount = 0;
  for (const user of testUserData) {
    const userExists = users.find((u) => u.email === user.email);
    if (!userExists) {
      console.log(`  Creating user: ${user.email}`);
      await auth.api.createUser({
        body: {
          email: user.email,
          password: user.password,
          name: user.name,
          // TODO: role: user.role
        },
      });
      prisma.user
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
  // Local, Sweden, World, Weather, Economy,

  const existingCategories = await prisma.category.findMany({
    select: { name: true },
  });
  let createdCount = 0;
  for (const category of premade_categories) {
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

async function generatePosts() {
  console.log("\n📰 Generating articles...");
  const postCount = await prisma.article.count();
  const target = 20;
  console.log(`  Current articles: ${postCount}, Target: ${target}`);
  for (let i = postCount; i < 20; i++) {
    console.log(`  Creating article ${i + 1}/${target}...`);
    const summary = await lipsum.getText({
      amount: Math.floor(Math.random() * 2) + 1,
      what: "sentences",
    });
    let content = summary + "\n\n";
    for (let j = 0; j < i % 10; j++) {
      content += await lipsum.getText({
        amount: Math.floor(Math.random() * 5) + 3,
        what: "paragraphs",
      });
      content += "\n\n";
    }
    let headline = await lipsum.getText({
      amount: Math.floor(Math.random() * 10) + 1,
      what: "words",
    });
    switch (i % 4) {
      case 0:
        headline =
          clickbait_prefixes[
            Math.floor(Math.random() * clickbait_prefixes.length)
          ] + headline;
        break;
      case 1:
        headline =
          headline +
          clickbait_suffixes[
            Math.floor(Math.random() * clickbait_suffixes.length)
          ];
        break;
      default:
        break;
    }
    let writerEmail =
      (await prisma.user.count({
        where: { email: "writer@testing.com" },
      })) > 0
        ? "writer@testing.com"
        : (await prisma.user.findFirst())?.email;
    if (!writerEmail) {
      throw new Error("No users found for article writers.");
    }

    await prisma.article.create({
      data: {
        headline,
        content,
        summary,
        image: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/200/300`,
        user: { connect: { email: writerEmail } },
        category: {
          connect: { name: premade_categories[i % premade_categories.length] },
        },
      },
    });
  }
  console.log(`✅ Articles complete (${20 - postCount} created)`);
}

async function main() {
  console.log("🌱 Starting database seeding...");
  console.log("================================");

  try {
    await generateUsers();
  } catch (e) {
    console.error("❌ User generation failed: ", e);
  }

  await generateCategories();
  await generatePosts();

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
