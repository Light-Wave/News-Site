"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleUserBan(
  userId: string,
  isCurrentlyBanned: boolean,
) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      banned: !isCurrentlyBanned,
      banReason: !isCurrentlyBanned ? "Admin Action" : null,
    },
  });
  revalidatePath("/admin/dashboard");
}

export async function toggleArticleStatus(
  articleId: string,
  currentStatus: boolean,
) {
  await prisma.article.update({
    where: { id: articleId },
    data: { isActive: !currentStatus },
  });
  revalidatePath("/admin/dashboard");
}

export async function updateUserRole(userId: string, newRole: string) {
  await prisma.user.update({
    where: { id: userId },
    data: { role: newRole as string },
  });
  revalidatePath("/admin/dashboard");
}
