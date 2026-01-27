import { ArticleModel } from "@/generated/prisma/models";

export type ArticleExpended = ArticleModel & {
  user: { name: string };
};
