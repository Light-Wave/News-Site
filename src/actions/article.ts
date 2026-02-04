"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import z from "zod";

// Create Article

const createArticleSchema = z.object({
  headline: z
    .string()
    .min(2, "Headline must be at least 2 characters")
    .max(100, "Headline can be at most 100 characters"),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters")
    .max(10000, "Content can be at most 10000 characters"),
  summary: z
    .string()
    .min(10, "Summary must be at least 10 characters")
    .max(100, "Summary can be at most 100 characters"),
  image: z.string().min(1, "Image url must be at least 1 character"),
  categoryId: z.string().min(1, "Article needs a category"),
  userId: z.string().min(1, "Article needs a writer"),
});

export async function createArticle(
  input: z.infer<typeof createArticleSchema>,
) {
  const { success } = await auth.api.userHasPermission({
    headers: await headers(),
    body: {
      permissions: {
        article: ["create"],
      },
    },
  });
  if (!success) {
    return { success: false, message: "Unauthorized" };
  }
  const parsed = createArticleSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, errors: parsed.error };
  }
  try {
    await prisma.article.create({
      data: parsed.data,
    });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : String(error),
    };
  }
}

// Update Article

const updateArticleSchema = createArticleSchema.partial().extend({
  id: z.string().min(1),
});

export async function updateArticle(
  input: z.infer<typeof updateArticleSchema>,
) {
  const { success } = await auth.api.userHasPermission({
    headers: await headers(),
    body: {
      permissions: { article: ["update"] },
    },
  });

  if (!success) {
    return { success: false, message: "Unauthorized" };
  }

  const parsed = updateArticleSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, errors: parsed.error };
  }

  const { id, ...data } = parsed.data;

  try {
    const article = await prisma.article.update({
      where: { id },
      data,
    });

    return { success: true, article };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Delete Article

const deleteArticleSchema = z.object({
  id: z.string().min(1),
});

export async function deleteArticle(
  input: z.infer<typeof deleteArticleSchema>,
) {
  const { success } = await auth.api.userHasPermission({
    headers: await headers(),
    body: {
      permissions: { article: ["delete"] },
    },
  });

  if (!success) {
    return { success: false, message: "Unauthorized" };
  }

  const parsed = deleteArticleSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, errors: parsed.error };
  }

  try {
    await prisma.article.delete({
      where: { id: parsed.data.id },
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Get Article by ID - should be ready for subscription check in the future
// NOTE: Currently unused

const getArticleByIdSchema = z.object({
  id: z.string().min(1),
});

export async function getArticleById(
  input: z.infer<typeof getArticleByIdSchema>,
) {
  const parsed = getArticleByIdSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, errors: parsed.error };
  }

  try {
    const article = await prisma.article.findUnique({
      where: {
        id: parsed.data.id,
        isActive: true,
      },
    });
    return { success: true, article };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Get Latest Articles (Defaults to 3)

const getLatestArticlesSchema = z.object({
  limit: z.number().int().min(1).max(20).default(3),
});

export async function getLatestArticles(
  input: z.input<typeof getLatestArticlesSchema> = {},
) {
  const parsed = getLatestArticlesSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, errors: parsed.error };
  }

  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
      take: parsed.data.limit,
      where: { isActive: true },
    });
    return { success: true, articles };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Get Random Articles. runs through the database to grab all id-s, then pick out a random selection equal to the set limit (default 3)
// it then returns an array of the grabbed articles. 
// NOTE: Not sure this has any real use in the finished product, but it's here for now for when we need completely random articles

const getRandomArticlesSchema = z.object({
  limit: z.number().int().min(1).max(20).default(3),
});

export async function getRandomArticles(
  input: z.input<typeof getRandomArticlesSchema> = {},
) {
  const parsed = getRandomArticlesSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, errors: parsed.error };
  }

  try {
    const articles = await prisma.$queryRaw<any[]>`
      SELECT *
      FROM "Article"
      WHERE "isActive" = true
      ORDER BY random()
      LIMIT ${parsed.data.limit};
    `;
    return { success: true, articles };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

