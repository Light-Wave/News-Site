"use client";

import { useState, useTransition } from "react";
import { createEditorsChoice } from "@/actions/editorsChoice";
import { useRouter } from "next/navigation";

export default function EditorsChoiceForm({
  articles,
  currentEditorsChoice,
}: {
  articles: any[];
  currentEditorsChoice: any;
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

      if (!result.success) {
        alert(result.message);
        return;
      }

      router.refresh();
    });
  }

  return (
    <div className="space-y-4">
      {articles.map((article) => {
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
                disabled={isPending}
                className={`px-4 py-2 rounded text-white ${
                  isSelected ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isSelected ? "Current Choice" : "Make Editors Choice"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
