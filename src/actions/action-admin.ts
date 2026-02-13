"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function updateUserRole(userId: string, newRole: string) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    // Force check: If not admin, stop immediately
    if (!session || session.user.role !== "admin") {
      return { success: false, message: "Unauthorized" };
    }

    const data = await auth.api.setRole({
      body: {
        userId: userId,
        role: newRole as any,
      },
      // This endpoint requires session cookies.
      headers: await headers(),
    });

    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Action Error:", error);
    return { success: false, message: "Failed to update database" };
  }
}

export async function toggleUserBan(
  userId: string,
  isCurrentlyBanned: boolean,
) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    // Security check
    if (!session || session.user.role !== "admin") {
      return { success: false, message: "Unauthorized" };
    }

    if (isCurrentlyBanned) {
      await auth.api.unbanUser({
        body: {
          userId: "user-id", // required
        },
        // This endpoint requires session cookies.
        headers: await headers(),
      });
    } else {
      await auth.api.banUser({
        body: {
          userId: "user-id", // required
          banReason: "Spamming",
          banExpiresIn: 60 * 60 * 24 * 7,
        },
        // This endpoint requires session cookies.
        headers: await headers(),
      });
    }

    try {
      await auth.api.revokeUserSessions({
        headers: await headers(),
        body: { userId },
      });
    } catch (e) {
      console.log("No active sessions to revoke");
    }

    revalidatePath("/admin/dashboard");
    return { success: true }; // This triggers the success toast
  } catch (error) {
    console.error("Ban Error:", error);
    return { success: false, message: "Failed to update ban status" };
  }
}
