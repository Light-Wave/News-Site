import { getAllArticles } from "@/actions/article";
import { redirectControl } from "@/actions/server-utils";
import Link from "next/link";

export default async function Page() {
  await redirectControl(["admin", "writer", "editor"], "/admin/dashboard");
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
              <div className="mt-1 text-sm text-gray-500 flex flex-wrap gap-x-3 gap-y-1">
                {article.user.name && <span>By {article.user.name}</span>}
                {article.createdAt && (
                  <span>
                    {new Date(article.createdAt as any).toLocaleDateString()}
                  </span>
                )}
                {Array.isArray((article as any).categories) &&
                  (article as any).categories.length > 0 && (
                    <span>
                      {(article as any).categories.length}{" "}
                      {(article as any).categories.length === 1
                        ? "category"
                        : "categories"}
                    </span>
                  )}
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
