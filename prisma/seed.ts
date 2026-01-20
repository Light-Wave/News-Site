import prisma from "@/lib/prisma";

async function generateUsers() {}

async function generatePosts() {}

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
