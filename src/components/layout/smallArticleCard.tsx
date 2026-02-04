import { Button } from "@/components/ui/button";
import type { Article } from "@/generated/prisma/client";
import { Card } from "../ui/card";
import Image from "next/image";

interface SmallArticleCardProps {
  article?: Article;
}

export default function SmallArticleCard({ article }: SmallArticleCardProps) {
  const title = article?.headline || "Small Article Card";
  const summary = article?.summary || "Article super short version goes here. Lorem ipsum dolor, sit amet";

  return (
    <Card className="parchment-card max-w-[1024px] rounded-none m-auto p-0 border-b border-primary/10 hover:shadow-lg transition-all group">
      <div className="grid grid-cols-5">
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
            <h2 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-2 leading-tight">{title}</h2>
            <p className="text-muted-foreground text-sm line-clamp-2 mt-2">
              {summary}
            </p>
          </div>
          <div className="w-full flex justify-end mt-2">
            <Button variant="ghost" size="sm" className="text-xs font-cinzel hover:bg-primary/5">
              Read Scroll
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
