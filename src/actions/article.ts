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
    .max(500, "Content can be at most 500 characters"),
  summary: z
    .string()
    .min(10, "Summary must be at least 10 characters")
    .max(100, "Summary can be at most 100 characters"),
  image: z.string().min(1, "Image url must be at least 1 character"),
  categoryId: z.string().min(1, "Article needs a category"),
  userId: z.string().min(1, "Article needs a writer"),
});

export default async function createArticle(
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
    return { success: false };
  }
  const parsedInput = createArticleSchema.parse(input);
  try {
    await prisma.article.create({
      data: parsedInput,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { success: false, message };
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

  const parsed = updateArticleSchema.parse(input);
  if (!success) {
    return { success: false };
  }

  const { id, ...data } = parsed;

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
      permissions: { article: ["update"] },
    },
  });

  if (!success) {
    return { success: false, message: "Unauthorized" };
  }

  const parsed = updateArticleSchema.parse(input);
  if (!success) {
    return { success: false };
  }

  try {
    await prisma.article.delete({
      where: { id: parsed.id },
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
