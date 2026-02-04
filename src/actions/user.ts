"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

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
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "Couldn't find user",
    };
  }

  const userId = user.id;
  try {
    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { role: "writer" },
      }),
      prisma.aiWriter.create({
        data: {
          userId,
          aiInstructions,
          preferredCategories: {
            connect: preferredCategoryName.map((name) => ({ name })),
          },
        },
      }),
    ]);
    return {
      success: true,
    };
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
  return await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });
}

export async function getAiInstructions(
  writerId: string,
): Promise<{ aiInstructions: string } | null> {
  return await prisma.aiWriter.findUnique({
    where: {
      id: writerId,
    },
    select: {
      aiInstructions: true,
    },
  });
}
