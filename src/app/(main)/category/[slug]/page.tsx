import CategoryArticleCard from "@/components/category/CategoryArticleCard";
import { getCategoryArticles, getCategoryBySlug } from "@/types/categories";
import page from "../../page";
import Link from "next/link";

const PAGE_SIZE = 5;

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams.page) || 1;

  // // Get category
  const category = await getCategoryBySlug(resolvedParams.slug);

  if (!category) {
    return <div className="p-10">Category not found</div>;
  }

  const articles = await getCategoryArticles({
    slug: resolvedParams.slug,
    page: page,
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-serif font-bold mb-12">
        {category.name} News
      </h1>

      {articles.length === 0 ? (
        <p className="text-gray-500">No articles published yet.</p>
      ) : (
        <div className="space-y-14">
          {articles.map((article) => (
            <CategoryArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}

      {articles.length === PAGE_SIZE && (
        <div className="mt-16 text-center">
          <Link
            href={`/category/${resolvedParams.slug}?page=${page + 1}`}
            className="inline-block border px-6 py-3 text-sm font-medium hover:bg-black hover:text-white transition"
          >
            Load More
          </Link>
        </div>
      )}
    </div>
  );
}
