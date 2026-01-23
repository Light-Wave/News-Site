"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { z } from "zod";

// Create Editors Choice

const createEditorsChoiceSchema = z.object({
  articleId: z.string().min(1, "Article is required"),
  editorId: z.string().min(1, "Editor is required"),
});

export async function createEditorsChoice(
  input: z.infer<typeof createEditorsChoiceSchema>,
) {
  const { success } = await auth.api.userHasPermission({
    headers: await headers(),
    body: {
      permissions: { editorsChoice: ["create"] },
    },
  });

  if (!success) {
    return { success: false, message: "Unauthorized" };
  }

  const parsed = createEditorsChoiceSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, errors: parsed.error };
  }
  try {
    await prisma.editorsChoice.create({
      data: parsed.data,
    });

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { success: false, message };
  }
}

// Update Editors Choice

const updateEditorsChoiceSchema = z.object({
  id: z.string().min(1),
});

export async function updateEditorsChoice(
  input: z.infer<typeof updateEditorsChoiceSchema>,
) {
  const { success } = await auth.api.userHasPermission({
    headers: await headers(),
    body: {
      permissions: { editorsChoice: ["update"] },
    },
  });

  if (!success) {
    return { success: false, message: "Unauthorized" };
  }

  const parsed = updateEditorsChoiceSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, errors: parsed.error };
  }

  try {
    const editorsChoice = await prisma.editorsChoice.update({
      where: { id: parsed.data.id },
      data: parsed.data,
    });

    return { success: true, editorsChoice };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Delete Editors Choice

const deleteEditorsChoiceSchema = z.object({
  id: z.string().min(1),
});

export async function deleteEditorsChoice(
  input: z.infer<typeof deleteEditorsChoiceSchema>,
) {
  const { success } = await auth.api.userHasPermission({
    headers: await headers(),
    body: {
      permissions: { editorsChoice: ["delete"] },
    },
  });

  if (!success) {
    return { success: false, message: "Unauthorized" };
  }

  const parsed = deleteEditorsChoiceSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, errors: parsed.error };
  }

  try {
    await prisma.editorsChoice.delete({
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
