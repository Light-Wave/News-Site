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
      categories: true,
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
      categories: {
        some: {
          name: {
            in: article.categories.map((cat) => cat.name),
            mode: "insensitive",
          },
        },
      },
    },
    select: { id: true, headline: true, image: true },
    orderBy: { createdAt: "desc" },
    take: 8,
  });
  return (
    <div className="w-full px-4 py-6 lg:max-w-7xl lg:mx-auto lg:px-6 lg:py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        {" › "}
        {article.categories
          .map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.name.toLowerCase()}`}
              className="hover:underline"
            >
              {cat.name}
            </Link>
          ))
          .reduce<React.ReactNode[]>((acc, link, index) => {
            if (index > 0) {
              acc.push(
                <span key={`sep-${index}`} className="px-1">
                  /
                </span>,
              );
            }
            acc.push(link);
            return acc;
          }, [])}
        {" › "}
        <span className="text-gray-900">{article.headline}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <ArticleMain article={article} relatedArticles={latestArticles} />
        </div>

        <ArticleSidebar
          articles={latestArticles}
          categories={article.categories}
        />
      </div>
    </div>
  );
}
