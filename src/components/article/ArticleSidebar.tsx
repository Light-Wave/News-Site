import Image from "next/image";
import Link from "next/link";

export default function Sidebar({
  articles,
  categories,
}: {
  articles: { id: string; headline: string; image: string }[];
  categories: { id: string; name: string }[];
}) {
  return (
    <aside className="space-y-6">
      <h1 className="text-sm font-semibold uppercase tracking-wide">
        Latest in {categories.map((cat) => cat.name).join(", ")}
      </h1>

      {articles.map((article) => (
        <Link
          href={`/article/${article.id}`}
          key={article.id}
          className="flex flex-col"
        >
          <div className="relative max-w-100 max-h-100 w-full aspect-square">
            <Image
              src={article.image}
              alt={article.headline}
              fill
              className="object-cover"
            />
          </div>
          <p className="max-w-100">{article.headline}</p>
        </Link>
      ))}
    </aside>
  );
}
