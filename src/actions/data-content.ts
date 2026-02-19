"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Fetch Articles
export async function getContentPerformance() {
  const articles = await prisma.article.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      headline: true,
      views: true,
      isActive: true,
      categories: {
        select: { name: true },
      },
    },
  });

  return articles;
}

//  Toggle Status
export async function updateArticleStatus(id: string, isActive: boolean) {
  await prisma.article.update({
    where: { id },
    data: { isActive },
  });

  revalidatePath("/admin/dashboard");
}

//  Type (auto inferred)
export type ContentArticle = Awaited<
  ReturnType<typeof getContentPerformance>
>[number];
