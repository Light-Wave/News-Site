"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { z } from "zod";

export const createSubscriptionTypeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  price: z.number().int().min(0),
});

// Create Subscription Type

export async function createSubscriptionType(
  input: z.infer<typeof createSubscriptionTypeSchema>,
) {
  const { success } = await auth.api.userHasPermission({
    headers: await headers(),
    body: {
      permissions: { subscriptionType: ["create"] },
    },
  });

  if (!success) {
    return { success: false };
  }

  const parsedInput = createSubscriptionTypeSchema.parse(input);

  try {
    await prisma.subscriptionType.create({
      data: parsedInput,
    });

    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { success: false, message };
  }
}

// Update Subscription Type

export const updateSubscriptionTypeSchema = createSubscriptionTypeSchema.extend(
  {
    id: z.string().min(1),
  },
);

export async function updateSubscriptionType(
  input: z.infer<typeof updateSubscriptionTypeSchema>,
) {
  const { success } = await auth.api.userHasPermission({
    headers: await headers(),
    body: {
      permissions: { subscriptionType: ["update"] },
    },
  });

  if (!success) {
    return { success: false, message: "Unauthorized" };
  }

  const parsed = updateSubscriptionTypeSchema.parse(input);
  const { id, ...data } = parsed;

  try {
    const subscriptionType = await prisma.subscriptionType.update({
      where: { id },
      data,
    });

    return { success: true, subscriptionType };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Delete Subscription Type

export const deleteSubscriptionTypeSchema = z.object({
  id: z.string().min(1),
});

export async function deleteSubscriptionType(
  input: z.infer<typeof deleteSubscriptionTypeSchema>,
) {
  const { success } = await auth.api.userHasPermission({
    headers: await headers(),
    body: {
      permissions: { subscriptionType: ["delete"] },
    },
  });

  if (!success) {
    return { success: false, message: "Unauthorized" };
  }

  const parsed = deleteSubscriptionTypeSchema.parse(input);

  try {
    await prisma.subscriptionType.delete({
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
