import prisma from "@/lib/prisma";

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findFirst({
    where: {
      name: {
        equals: slug,
        mode: "insensitive",
      },
    },
  });
}

export async function getAllCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
  });
}
