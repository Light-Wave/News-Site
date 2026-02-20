"use client";

import { useState, useTransition } from "react";
import { createEditorsChoice } from "@/actions/editorsChoice";
import { useRouter } from "next/navigation";
import { EditorsChoice, Prisma } from "@/generated/prisma/client";
import { toast } from "sonner";

type ArticleWithUser = Prisma.ArticleGetPayload<{ include: { user: true } }>;
export default function EditorsChoiceForm({
  articles,
  currentEditorsChoice,
}: {
  articles: ArticleWithUser[];
  currentEditorsChoice: EditorsChoice | null;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [expandedArticles, setExpandedArticles] = useState<string[]>([]);

  function toggleExpand(articleId: string) {
    setExpandedArticles((prev) =>
      prev.includes(articleId)
        ? prev.filter((id) => id !== articleId)
        : [...prev, articleId],
    );
  }

  function handleSelect(articleId: string) {
    startTransition(async () => {
      const result = await createEditorsChoice({ articleId });

      if (result.errors) {
        toast.error(result.errors.message ?? "Failed to set editor's choice");
        return;
      }
      toast.success("Editor's choice updated successfully");
      router.refresh();
    });
  }

  return (
    <div className="space-y-4">
      {articles.length === 0 ? (
        <p className="text-sm text-gray-500">No articles available.</p>
      ) : (
        articles.map((article) => {
          const isSelected = currentEditorsChoice?.articleId === article.id;
          const isExpanded = expandedArticles.includes(article.id);
          return (
            <div
              key={article.id}
              className={`p-4 border rounded transition ${
                isSelected ? "border-green-500 bg-green-50" : "border-gray-200"
              }`}
            >
              <div
                className="cursor-pointer"
                onClick={() => toggleExpand(article.id)}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
              >
                <h2 className="font-semibold">{article.headline}</h2>
                <p className="text-sm text-gray-500">By {article.user.name}</p>
              </div>
              {isExpanded && (
                <div
                  className="mt-2 prose max-w-full"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              )}
              <div className="mt-2 flex justify-end">
                <button
                  onClick={() => handleSelect(article.id)}
                  disabled={isPending || isSelected}
                  className={`px-4 py-2 rounded text-white ${
                    isSelected ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isSelected ? "Current Choice" : "Make Editors Choice"}
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
