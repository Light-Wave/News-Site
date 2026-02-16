import { getAllArticles } from "@/actions/article";
import Link from "next/link";

export default async function Page() {
  const result = await getAllArticles();

  const articles = Array.isArray(result) ? result : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-semibold">Articles</h1>

        <div className="flex gap-3">
          <Link
            href="/admin/dashboard/articles/create"
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Create Article
          </Link>

          <Link
            href="/admin/dashboard/articles/generate"
            className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            Generate AI Article
          </Link>
        </div>
      </div>

      <div className="space-y-3">
        {articles.length === 0 ? (
          <p className="text-gray-500">No articles found.</p>
        ) : (
          articles.map((article) => (
            <Link
              key={article.id}
              href={`/admin/dashboard/articles/${article.id}`}
              className="block p-4 border rounded-md hover:bg-gray-50 transition"
            >
              <h2 className="font-medium">{article.headline}</h2>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
