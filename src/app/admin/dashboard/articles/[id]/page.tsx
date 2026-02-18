import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditArticleForm from "../edit-articles-form";
import { getAllCategories } from "@/actions/category";
import { redirectControl } from "@/actions/utils";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await redirectControl(["admin", "writer", "editor"], "/admin/dashboard");
  const { id } = await params;

  const article = await prisma.article.findUnique({
    where: { id },
    include: {
      categories: true,
    },
  });

  if (!article) return notFound();

  const categories = await getAllCategories();

  return <EditArticleForm article={article} categories={categories} />;
}
