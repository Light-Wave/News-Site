"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

async function ensureAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized: Only admins can perform this action");
  }
}

export async function toggleUserBan(
  userId: string,
  isCurrentlyBanned: boolean,
) {
  try {
    await ensureAdmin();

    if (isCurrentlyBanned) {
      await auth.api.unbanUser({
        headers: await headers(),
        body: { userId },
      });
    } else {
      await auth.api.banUser({
        headers: await headers(),
        body: {
          userId,
          banReason: "Unknown reason",
          banExpiresIn: 60 * 60 * 24 * 7,
        },
      });

      await auth.api.revokeUserSessions({
        headers: await headers(),
        body: { userId },
      });
    }

    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Ban Error:", error);
    return { success: false, message: "Failed to update ban status" };
  }
}

export async function updateUserRole(userId: string, newRole: string) {
  try {
    await ensureAdmin();

    await auth.api.adminUpdateUser({
      headers: await headers(),
      body: {
        userId: userId,
        data: {
          role: newRole,
        },
      },
    });

    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Update Role Error:", error);
    return { success: false, message: "Failed to update user role" };
  }
}
