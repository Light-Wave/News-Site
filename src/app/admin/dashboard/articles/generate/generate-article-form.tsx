"use client";

import { generateArticle } from "@/actions/ai";
import { useState, useTransition } from "react";

type Category = {
  id: string;
  name: string;
};

type AiWriter = {
  id: string;
  email: string;
};

interface Props {
  categories: Category[];
  aiWriters: AiWriter[];
}

export default function GenerateArticleForm({
  categories,
  aiWriters,
}: Props) {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    setMessage(null);

    const prompt = formData.get("prompt") as string;
    const selectedCategoryIds = formData.getAll("categories") as string[];
    const email = formData.get("email") as string;

    // Convert category IDs to names (since your action expects names)
    const selectedCategories = categories
      .filter((c) => selectedCategoryIds.includes(c.id))
      .map((c) => c.name);

    startTransition(async () => {
      const result = await generateArticle(
        prompt,
        selectedCategories,
        email
      );

      if (!result.success) {
        setMessage(result.message ?? "Something went wrong.");
      } else {
        setMessage("✅ Article successfully generated!");
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-6 max-w-2xl">
      {/* Prompt */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Article Prompt
        </label>
        <textarea
          name="prompt"
          required
          rows={4}
          className="w-full border rounded-md p-3"
          placeholder="Write a dramatic article about magical inflation..."
        />
      </div>

      {/* Categories Dropdown (Multi Select) */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Categories
        </label>
        <select
          name="categories"
          multiple
          required
          className="w-full border rounded-md p-3"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500">
          Hold Ctrl (Windows) or Cmd (Mac) to select multiple.
        </p>
      </div>

      {/* AI Writer Dropdown */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          AI Writer
        </label>
        <select
          name="email"
          required
          className="w-full border rounded-md p-3"
        >
          <option value="">Select AI Writer</option>
          {aiWriters.map((writer) => (
            <option key={writer.id} value={writer.email}>
              {writer.email}
            </option>
          ))}
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
      >
        {isPending ? "Generating..." : "Generate Article"}
      </button>

      {message && (
        <div className="text-sm font-medium">
          {message}
        </div>
      )}
    </form>
  );
}
