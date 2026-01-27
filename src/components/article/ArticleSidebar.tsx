import Image from "next/image";

export default function Sidebar({
  articles,
}: {
  articles: { id: string; headline: string; image: string }[];
}) {
  return (
    <aside className="space-y-6">
      <h1 className="text-sm font-semibold uppercase tracking-wide">
        Latest Europe
      </h1>

      {articles.map((article) => (
        <div key={article.headline} className="flex flex-col">
          <div className="relative max-w-100 max-h-100 w-full aspect-square">
            <Image
              src={article.image}
              alt={article.headline}
              fill
              className="object-cover"
            />
          </div>
          <p className="max-w-100">{article.headline}</p>
        </div>
      ))}
    </aside>
  );
}
