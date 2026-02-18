import { ArticleModel, CategoryModel } from "@/generated/prisma/models";

export type ArticleExpended = ArticleModel & {
  user: { name: string };
  categories: CategoryModel[];
};
