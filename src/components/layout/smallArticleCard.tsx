import { Button } from "@/components/ui/button";
import type { Article } from "@/generated/prisma/client";
import { Card } from "../ui/card";

interface SmallArticleCardProps {
  article?: Article;
}

export default function SmallArticleCard({ article }: SmallArticleCardProps) {
  const title = article?.headline || "Small Article Card";
  const summary = article?.summary || "Article super short version goes here. Lorem ipsum dolor, sit amet";

  return (
    <Card className="parchment-card max-w-[1024px] m-auto p-4 border-b border-primary/10 hover:shadow-lg transition-all group">
      <h2 className="font-bold text-lg group-hover:text-primary transition-colors">{title}</h2>
      <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
        {summary}
      </p>
      <div className="w-full flex justify-end mt-2">
        <Button variant="ghost" size="sm" className="text-xs font-cinzel hover:bg-primary/5">
          Read Scroll
        </Button>
      </div>
    </Card>
  );
}
