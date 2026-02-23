import prisma from "@/lib/prisma";

export const PAGE_SIZE = 5;
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

// Get Articles

export async function getCategoryArticles({
  slug,
  page,
}: {
  slug: string;
  page: number;
}) {
  return prisma.article.findMany({
    where: {
      isActive: true,
      categories: {
        some: {
          name: {
            equals: slug,
            mode: "insensitive",
          },
        },
      },
    },
    include: {
      user: {
        select: { name: true },
      },
      categories: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });
}
