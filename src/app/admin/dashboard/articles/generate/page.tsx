import { getAllCategories } from "@/actions/category";
import GenerateArticleForm from "./generate-article-form";
import { getAllAiWriters } from "@/actions/user";


export default async function Page() {
  const categories = await getAllCategories();
  const aiWriters = await getAllAiWriters();

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-semibold">Generate AI Article</h1>
        <p className="text-sm text-gray-500">
          Generate an article using AI and automatically publish it.
        </p>
      </div>

      <GenerateArticleForm categories={categories} aiWriters={aiWriters} />
    </div>
  );
}
