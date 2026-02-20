import { getAllCategories } from "@/actions/category";
import { getAllAiWriters } from "@/actions/user";
import { redirectControl } from "@/actions/server-utils";
import GenerateArticleForm from "./generate-article-form";

export default async function Page() {
  const categories = await getAllCategories();
  const aiWriters = await getAllAiWriters();
  await redirectControl(["admin", "writer"], "/admin/dashboard");

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
