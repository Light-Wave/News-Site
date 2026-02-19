"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

/* Ensure requester is admin */
async function checkAdminStatus() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  return session;
}

type AllowedRole = "user" | "writer" | "editor" | "admin";

const allowedRoles: AllowedRole[] = ["user", "writer", "editor", "admin"];

export async function updateUserRole(userId: string, newRole: string) {
  try {
    const session = await checkAdminStatus();

    // Validate role input strictly
    if (!allowedRoles.includes(newRole as AllowedRole)) {
      return { success: false, message: "Invalid role provided" };
    }

    const validatedRole = newRole as AllowedRole;

    // Prevent changing your own role
    if (session.user.id === userId) {
      return {
        success: false,
        message: "You cannot change your own role",
      };
    }

    // // Fetch target user to check current role
    // const targetUser = await prisma.user.findUnique({
    //   where: { id: userId },
    //   select: { role: true },
    // });

    // if (!targetUser) {
    //   return { success: false, message: "User not found" };
    // }

    // // Prevent modifying existing admins
    // if (targetUser.role === "admin") {
    //   return {
    //     success: false,
    //     message: "Admin role cannot be modified",
    //   };
    // }

    // // Prevent assigning admin role
    // if (validatedRole === "admin") {
    //   return {
    //     success: false,
    //     message: "Admin role cannot be assigned",
    //   };
    // }

    // Update role
    await auth.api.setRole({
      body: {
        userId,
        role: validatedRole,
      },
      headers: await headers(),
    });

    revalidatePath("/admin/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Update Role Error:", error);
    return { success: false, message: "Failed to update user role" };
  }
}

export async function toggleUserBan(
  userId: string,
  isCurrentlyBanned: boolean,
) {
  try {
    const session = await checkAdminStatus();

    // Prevent banning yourself
    if (session.user.id === userId) {
      return { success: false, message: "You cannot ban yourself" };
    }

    if (isCurrentlyBanned) {
      // Unban
      await auth.api.unbanUser({
        body: { userId },
        headers: await headers(),
      });
    } else {
      // Ban
      await auth.api.banUser({
        body: {
          userId,
          banReason: "Account under review",
          banExpiresIn: 60 * 60 * 24 * 7,
        },
        headers: await headers(),
      });

      // Revoke active sessions
      try {
        await auth.api.revokeUserSessions({
          body: { userId },
          headers: await headers(),
        });
      } catch {
        console.log("No active sessions to revoke");
      }
    }

    revalidatePath("/admin/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Ban Error:", error);
    return { success: false, message: "Failed to update ban status" };
  }
}
