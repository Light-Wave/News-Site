import type { Article, Category } from "@/generated/prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar({
  articles,
}: {
  articles: (Article & { categories?: Category[] })[];
}) {
  return (
    <div className="flex flex-col gap-6 p-2">
      {articles.map((article) => (
        <Link
          key={article.id}
          href={`/article/${article.id}`}
          className="group flex flex-col gap-2 transition-all duration-300"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-primary/10 shadow-sm grayscale-[0.8] transition-all duration-500 group-hover:grayscale-0 group-hover:shadow-md">
            <Image
              src={article.image}
              alt={article.headline}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Dark overlay for text readability if needed, but here we want the "manuscript" look */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </div>
          <div className="flex flex-col gap-1">
            {article.categories && article.categories.length > 0 && (
              <span className="text-[10px] font-cinzel text-primary/60 uppercase tracking-widest">
                {article.categories[0].name}
              </span>
            )}
            <h3 className="text-xs font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {article.headline}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}
