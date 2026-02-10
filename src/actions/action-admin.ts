"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

async function ensureAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Check if user is logged in and if their role is 'admin'

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
      // If they are already banned,unban them
      await auth.api.unbanUser({
        headers: await headers(),
        body: { userId },
      });
    } else {
      // If they aren't banned, ban them
      await auth.api.banUser({
        headers: await headers(),
        body: {
          userId,
          banReason: "Violating community guidelines",
          banExpiresIn: 60 * 60 * 24 * 7, // ban expires in 7 days
        },
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

    // Use Better Auth's internal admin API to update the user
    // This automatically handles the database update for the role
    await auth.api.adminUpdateUser({
      headers: await headers(),
      body: {
        userId: "userId", // Use the dynamic ID passed to the function
        data: {
          role: newRole, // Use the dynamic role passed to the function
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
