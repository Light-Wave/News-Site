import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import type { Article } from "@/generated/prisma/client";
import SpellIcon from "./spellIcon";

interface ArticleCardProps {
  article?: Article & { user?: { name?: string | null } };
  authorName?: string;
}

/* Article Card shows a summarized version of an article. The card includes three "share" buttons and a "read scroll" button to view the full article */

export default function ArticleCard({ article, authorName }: ArticleCardProps) {
  const imageUrl = article?.image || "/placeholder-dragon.png";
  const title = article?.headline || "A Dragon Spotted Over the High Peaks";
  const summary =
    article?.summary ||
    "Villagers in the northern reaches report a massive gold-scaled beast circling the mountain tops. Scholars from the capital have been dispatched to investigate if this marks the return of the ancient protectors.";
  const author = authorName || article?.user?.name || "Ancient Scribe";
  const date = article?.createdAt
    ? new Date(article.createdAt).toLocaleDateString()
    : "Sun's Height, Third Era";

  return (
    <Card className="parchment-card gap-0 py-2 rounded-none sm:max-w-[1024px] m-auto">
      <div className="relative w-full aspect-square sm:aspect-[4/3]">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
      <div className="flex p-4 pb-3 justify-center items-center gap-3 text-xs italic text-primary uppercase tracking-widest">
        <span>{author}</span>
        <span>•</span>
        <span>{date}</span>
        <span>•</span>
        <span>5 min read</span>
      </div>
      <CardContent className="space-y-4">
        <h2 className="text-2xl font-bold text-center leading-tight">
          {title}
        </h2>
        <p className="text-card-foreground leading-relaxed first-letter:text-4xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:mt-1">
          {summary}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-primary/10 py-8 px-8">
        <div className="flex flex-col items-center sm:items-start gap-4">
          <p className="text-sm italic opacity-70 text-center sm:text-left max-w-[250px] sm:max-w-none">
            Cast a sharing spell to show support for free wizard press!
          </p>
          <div className="flex gap-4">
            <SpellIcon color="blue" tooltip="Share via Telepathy Scroll">
              📜
            </SpellIcon>
            <SpellIcon color="amber" tooltip="Inscribe in the Chronicles">
              🖌️
            </SpellIcon>
            <SpellIcon color="purple" tooltip="Infuse with Arcane Favor">
              ✨
            </SpellIcon>
          </div>
        </div>
        <Button
          type="button"
          className="w-full sm:w-auto min-w-[180px] bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_6px_0_0_rgba(0,0,0,0.3)] border-b border-primary/50 active:translate-y-[2px] active:shadow-none transition-all font-cinzel px-8 h-14 text-xl"
        >
          Read Scroll
        </Button>
      </CardFooter>
    </Card>
  );
}
