"use client";

import { useTransition } from "react";
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

        return (
          <div
            key={article.id}
            className={`p-4 border rounded flex justify-between items-center transition ${
              isSelected ? "border-green-500 bg-green-50" : "border-gray-200"
            }`}
          >
            <div>
              <h2 className="font-semibold">{article.headline}</h2>
              <p className="text-sm text-gray-500">By {article.user.name}</p>
            </div>

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
        );
      })}
    </div>
  );
}
