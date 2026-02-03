"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const createCategorySchema = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name can be at most 50 characters"),
});

export async function createCategory(
  input: z.infer<typeof createCategorySchema>,
) {
  const { success } = await auth.api.userHasPermission({
    headers: await headers(),
    body: {
      permissions: {
        category: ["create"],
      },
    },
  });

  if (!success) {
    return { success: false };
  }

  const parsed = createCategorySchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, errors: parsed.error };
  }

  try {
    await prisma.category.create({
      data: parsed.data,
    });

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { success: false, message };
  }
}

// Update Category

const updateCategorySchema = createCategorySchema.extend({
  id: z.string().min(1),
});

export async function updateCategory(
  input: z.infer<typeof updateCategorySchema>,
) {
  const { success } = await auth.api.userHasPermission({
    headers: await headers(),
    body: {
      permissions: { category: ["update"] },
    },
  });

  if (!success) {
    return { success: false, message: "Unauthorized" };
  }

  const parsed = updateCategorySchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, errors: parsed.error };
  }

  const { id, ...data } = parsed.data;

  try {
    const category = await prisma.category.update({
      where: { id },
      data,
    });

    return { success: true, category };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Delete Category

const deleteCategorySchema = z.object({
  id: z.string().min(1),
});

export async function deleteCategory(
  input: z.infer<typeof deleteCategorySchema>,
) {
  const { success } = await auth.api.userHasPermission({
    headers: await headers(),
    body: {
      permissions: { category: ["delete"] },
    },
  });

  if (!success) {
    return { success: false, message: "Unauthorized" };
  }

  const parsed = deleteCategorySchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, errors: parsed.error };
  }

  try {
    await prisma.category.delete({
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

export async function getCategoryIdByName(
  name: string,
): Promise<{ id: string } | null> {
  const trimmedName = name.trim();
  if (!trimmedName) {
    return null;
  }
  return await prisma.category.findUnique({
    where: {
      name: trimmedName,
    },
    select: {
      id: true,
    },
  });
}

export async function getCategoryIdsByNames(names: string[]): Promise<{
  found: { id: string; name: string }[];
  notFound: string[];
}> {
  const trimmed = names.map((n) => n.trim()).filter(Boolean);

  if (!trimmed.length) {
    return { found: [], notFound: [] };
  }

  const categories = await prisma.category.findMany({
    where: {
      name: { in: trimmed },
    },
    select: {
      id: true,
      name: true,
    },
  });

  const foundNames = new Set(categories.map((c) => c.name));

  return {
    found: categories,
    notFound: trimmed.filter((n) => !foundNames.has(n)),
  };
}
