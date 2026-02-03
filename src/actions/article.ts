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
    .max(500, "Summary can be at most 500 characters"),
  image: z.string().min(1, "Image url must be at least 1 character"),
  categoryIds: z.array(z.string()).min(1, "Article needs a category"),
  userId: z.string().min(1, "Article needs a writer"),
});

export async function createArticle(
  input: z.infer<typeof createArticleSchema>,
) {
  // TODO: Need to implement once testing is done
  // const { success } = await auth.api.userHasPermission({
  //   headers: await headers(),
  //   body: {
  //     permissions: {
  //       article: ["create"],
  //     },
  //   },
  // });
  // if (!success) {
  //   return { success: false, message: "Unauthorized" };
  // }
  const parsed = createArticleSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, errors: parsed.error };
  }
  try {
    const { categoryIds, userId, ...data } = parsed.data;
    await prisma.article.create({
      data: {
        ...data,
        user: {
          connect: { id: userId },
        },
        categories: {
          connect: categoryIds.map((id) => ({
            id,
          })),
        },
      },
    });
    return { success: true };
  } catch (error) {
    console.error("PRISMA ERROR:", error);
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
