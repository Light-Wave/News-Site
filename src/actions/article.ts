"use server";

import { Article, Prisma } from "@/generated/prisma/client";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { checkActiveSubscription } from "./subscription";
import { ArticleExpended } from "@/types/article";
import DOMPurify from "isomorphic-dompurify";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

// Create Article

const createArticleSchema = z.object({
  headline: z
    .string()
    .min(2, "Headline must be at least 2 characters")
    .max(200, "Headline can be at most 200 characters"),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters")
    .max(10000, "Content can be at most 10000 characters"),
  summary: z
    .string()
    .min(10, "Summary must be at least 10 characters")
    .max(800, "Summary can be at most 800 characters"),
  image: z.string().min(1, "Image url must be at least 1 character"),
  categoryIds: z.array(z.string()).min(1, "Article needs a category"),
});

export async function createArticle(
  input: z.infer<typeof createArticleSchema>,
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session)
    return {
      success: false,
      message: "Invalid session",
    };

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
    const { categoryIds, content, ...data } = parsed.data;

    const safeHtml = DOMPurify.sanitize(content, {
      USE_PROFILES: { html: true },
    });

    await prisma.article.create({
      data: {
        ...data,
        content: safeHtml,
        user: {
          connect: { id: session.user.id },
        },
        categories: {
          connect: categoryIds.map((id) => ({ id })),
        },
      },
    });
    revalidatePath("/");
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

  const { id, categoryIds, content, ...data } = parsed.data;

  const updateData: any = {
    ...data,
  };

  if (content !== undefined) {
    updateData.content = DOMPurify.sanitize(content, {
      USE_PROFILES: { html: true },
    });
  }

  if (categoryIds) {
    updateData.categories = {
      set: categoryIds.map((categoryId) => ({ id: categoryId })),
    };
  }

  try {
    const article = await prisma.article.update({
      where: { id },
      data: updateData,
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
    const article = await prisma.article.findFirst({
      where: { id: parsed.data.id, isActive: true },
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
      include: { categories: true },
    });
    return { success: true, articles };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Get Random Articles. grabs a random selection equal to the set limit (default 3)
// it then returns an array of the grabbed articles.
// NOTE: Not sure this has any real use in the finished product, but it's here for now for when we need completely random articles
// NOTE2: This solution with queryRaw was suggested by copilot, but I'm pretty sure it's not the best way to do it.
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
    // 1. Get all active article IDs
    const allIds = await prisma.article.findMany({
      where: { isActive: true },
      select: { id: true },
    });

    // 2. Pick random IDs based on the limit
    const randomIds = allIds
      .sort(() => Math.random() - 0.5)
      .slice(0, parsed.data.limit)
      .map((a) => a.id);

    // 3. Fetch the full articles with categories included
    const articles = await prisma.article.findMany({
      where: { id: { in: randomIds } },
      include: { categories: true },
    });

    // 4. Return in random order (Prisma's 'in' might return them in DB order)
    return {
      success: true,
      articles: articles.sort(() => Math.random() - 0.5),
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

type ArticleWithUser = Prisma.ArticleGetPayload<{
  include: {
    user: true;
  };
}>;

type GetAllArticlesResult =
  | { success: true; articles: ArticleWithUser[] }
  | { success: false; message: string };

export async function getAllArticles(): Promise<GetAllArticlesResult> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { success: false, message: "Invalid session" };
  }

  const { success } = await auth.api.userHasPermission({
    headers: await headers(),
    body: {
      permissions: {
        article: ["read"],
      },
    },
  });

  if (!success) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const articles = await prisma.article.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, articles };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

const getArticleForViewingSchema = z.object({
  id: z.string().min(1, "Article ID is required"),
});

// Get Article For Viewing - checks subscription and restricts content if necessary
export async function getArticleForViewing(id: string): Promise<{
  success: boolean;
  article?: ArticleExpended;
  isRestricted?: boolean;
  message?: string;
  errors?: z.ZodError;
}> {
  const parsed = getArticleForViewingSchema.safeParse({ id });
  if (!parsed.success) {
    return { success: false, errors: parsed.error };
  }

  try {
    const article = await prisma.article.findUnique({
      where: { id: parsed.data.id, isActive: true },
      include: {
        categories: true,
        user: { select: { name: true } },
      },
    });

    if (!article) {
      return { success: false, message: "Article not found" };
    }

    // Increment view count (simple placeholder system)
    await prisma.article.update({
      where: { id: parsed.data.id },
      data: { views: { increment: 1 } },
    });

    const { hasActiveSubscription } = await checkActiveSubscription();

    if (!hasActiveSubscription) {
      // If not subscribed, replace content with summary for security
      return {
        success: true,
        article: {
          ...article,
          content: article.summary, // Send summary instead of content
        },
        isRestricted: true,
      };
    }

    return {
      success: true,
      article,
      isRestricted: false,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
