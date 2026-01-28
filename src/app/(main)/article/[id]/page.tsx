import ArticleMain from "@/components/article/ArticleMain";
import ArticleSidebar from "@/components/article/ArticleSidebar";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const article = await prisma.article.findUnique({
    where: { id: id },
    include: {
      category: true,
      user: { select: { name: true } },
    },
  });

  if (!article) {
    return <div>Article not found</div>;
  }

  const latestArticles = await prisma.article.findMany({
    where: {
      isActive: true,
      NOT: { id },
      category: {
        name: article.category.name, // SAME CATEGORY
      },
    },
    select: {
      id: true,
      headline: true,
      image: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        {" › "}
        <Link
          href={`/category/${article.category.name.toLowerCase()}`}
          className="hover:underline"
        >
          {article.category.name}
        </Link>
        {" › "}
        <span className="text-gray-900">{article.headline}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <ArticleMain article={article} />
        </div>

        <ArticleSidebar
          articles={latestArticles}
          category={article.category.name}
        />
      </div>
    </div>
  );
}
