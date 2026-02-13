"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function updateUserRole(userId: string, newRole: string) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (session?.user.id === userId) {
      return { success: false, message: "You cannot change your own role" };
    }
    if (newRole.toLowerCase() === "admin") {
      return { success: false, message: "Admin cannot be change" };
    }

    if (!session || session.user.role !== "admin") {
      // Force check: If not admin, stop immediately
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
    if (session?.user.id === userId) {
      return { success: false, message: "You cannot ban yourself" };
    }

    // Security check
    if (!session || session.user.role !== "admin") {
      return { success: false, message: "Unauthorized" };
    }

    if (isCurrentlyBanned) {
      await auth.api.unbanUser({
        body: {
          userId,
        },
        // This endpoint requires session cookies.
        headers: await headers(),
      });
    } else {
      await auth.api.banUser({
        body: {
          userId,
          banReason: "Account under review",
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
