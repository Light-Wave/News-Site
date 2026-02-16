import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditArticleForm from "../edit-articles-form";
import { getAllCategories } from "@/actions/category";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) return notFound();

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
