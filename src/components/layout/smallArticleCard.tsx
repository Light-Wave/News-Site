import type { Article, Category } from "@/generated/prisma/client";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface SmallArticleCardProps {
  article?: Article & { categories?: Category[] };
}

export default function SmallArticleCard({ article }: SmallArticleCardProps) {
  const title = article?.headline || "Small Article Card";
  const summary = article?.summary || "Article super short version goes here. Lorem ipsum dolor, sit amet";

  return (
    <Card className="parchment-card max-w-[1024px] rounded-none m-auto p-0 border-b border-primary/10 hover:shadow-lg transition-all group">
      <Link href={`/article/${article?.id}`} className="grid grid-cols-5">
        <div className="col-span-1 relative min-h-[150px]">
          <Image
            src={article?.image || '/placeholder-dragon.png'}
            alt={title}
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 640px) 25vw, 40vw"
            className="object-cover"
          />
        </div>
        <div className="col-span-4 p-4 flex flex-col justify-between">
          <div>
            {article?.categories && article.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-1">
                {article.categories.map((cat) => (
                  <span key={cat.id} className="text-[11px] font-bold text-primary/70 uppercase tracking-tighter border border-primary/20 px-2 py-0.5 bg-primary/5 inline-block">
                    {cat.name}
                  </span>
                ))}
              </div>
            )}
            <h2 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-2 leading-tight">{title}</h2>
            <p className="text-muted-foreground text-sm line-clamp-2 mt-2">
              {summary}
            </p>
          </div>
          <div className="w-full flex justify-end mt-2">
            <div className="text-xs font-cinzel text-primary/60 group-hover:text-primary transition-colors px-2 py-1">
              Read Scroll ›
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}
