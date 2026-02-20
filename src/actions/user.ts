"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import z from "zod";
import { getCategoryIdsByNames } from "./category";

const createAiWriterSchema = z.object({
  email: z.string().email(),
  aiInstructions: z
    .string()
    .trim()
    .min(10, "Instructions must be at least 10 characters")
    .max(5000, "Instructions too long"),
  preferredCategoryName: z
    .array(z.string().trim().min(1))
    .min(1, "At least one category is required"),
});

export async function createAiWriter(
  email: string,
  aiInstructions: string,
  preferredCategoryName: string[],
) {
  // TODO: Need to implement once testing is done
  //   const { success } = await auth.api.userHasPermission({
  //     headers: await headers(),
  //     body: {
  //       permissions: {
  //         user: ["update"],
  //       },
  //     },
  //   });
  //   if (!success) {
  //     return { success: false, message: "Unauthorized" };
  //   }
  const parsed = createAiWriterSchema.safeParse({
    email,
    aiInstructions,
    preferredCategoryName,
  });

  if (!parsed.success) {
    return { success: false, errors: parsed.error };
  }

  const {
    email: safeEmail,
    aiInstructions: safeInstructions,
    preferredCategoryName: safeCategories,
  } = parsed.data;

  const user = await prisma.user.findUnique({
    where: { email: safeEmail },
    select: { id: true },
  });

  if (!user) {
    return { success: false, message: "Couldn't find user" };
  }

  const { found, notFound } = await getCategoryIdsByNames(safeCategories);

  if (notFound.length) {
    return {
      success: false,
      message: `Unknown categories: ${notFound.join(", ")}`,
    };
  }

  try {
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { role: "writer" },
      }),
      prisma.aiWriter.create({
        data: {
          userId: user.id,
          aiInstructions: safeInstructions,
          preferredCategories: {
            connect: found.map((c) => ({ id: c.id })),
          },
        },
      }),
    ]);

    return { success: true };
  } catch (error) {
    console.error("Failed to create AI writer", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create AI writer",
    };
  }
}

export async function createTestUser() {
  await auth.api.signUpEmail({
    body: {
      email: "test@hotmail.com",
      name: "Test User",
      password: "test1234",
    },
  });
}

// Read functions

export async function getUserIdByEmail(
  email: string,
): Promise<{ id: string } | null> {
  try {
    return await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
  } catch (error) {
    console.error("Failed to get User Id by Email", error);
    return null;
  }
}

export async function getAiInstructionsByUserId(
  userId: string,
): Promise<{ aiInstructions: string } | null> {
  try {
    return await prisma.aiWriter.findUnique({
      where: { userId },
      select: { aiInstructions: true },
    });
  } catch (error) {
    console.error("Failed to get AI instructions by userId", error);
    return null;
  }
}

export async function getAllAiWriters() {
  try {
    const writers = await prisma.user.findMany({
      where: {
        aiWriter: {
          isNot: null, // Only users that have AiWriter record
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        aiWriter: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return writers;
  } catch (error) {
    console.error("Failed to fetch AI writers:", error);
    return [];
  }
}
