import { ArticleExpended } from "@/types/article";
import Image from "next/image";
import Link from "next/link";

export default function CategoryArticleCard({
  article,
}: {
  article: ArticleExpended;
}) {
  return (
    <article className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-b">
      {/* Image */}
      <Link href={`/article/${article.id}`} className="md:col-span-1">
        <div className="relative h-48 w-full overflow-hidden rounded-lg">
          <Image
            src={article.image}
            alt={article.headline}
            fill
            className="object-cover"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="md:col-span-2">
        <Link href={`/article/${article.id}`}>
          <h1 className="text-2xl font-serif font-semibold leading-tight hover:underline">
            {article.headline}
          </h1>
        </Link>

        <p className="mt-3 text-gray-600">{article.summary}</p>

        {/* AUTHOR + DATE (dynamic per article) */}
        <p className="mt-4 text-sm text-gray-500">
          {article.user?.name ?? "Staff"} ·{" "}
          {new Date(article.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </article>
  );
}
