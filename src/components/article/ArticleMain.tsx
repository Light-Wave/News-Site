import { ArticleExpended } from "@/types/article";
import Image from "next/image";
import RelatedArticles from "@/components/article/RelatedArticles";

export default function ArticleMain({
  article,
  relatedArticles,
}: {
  article: ArticleExpended;
  relatedArticles: { id: string; headline: string; image: string }[];
}) {
  return (
    <div className="">
      <article>
        {/* Headline */}
        <h1
          className="font-cinzel font-bold leading-tight mb-6
               text-[2.5rem] sm:text-48px lg:text-64px text-inlaid-gold drop-shadow-sm"
        >
          {article.headline}
        </h1>

        {/* Summary 
        <p className="text-lg sm:text-xl lg:text-2xl font-serif italic text-foreground/70 mb-8 border-l-4 border-primary/20 pl-6 py-2">
          {article.summary}
        </p>
        */}
        {/* Main Image */}
        <div className="relative w-full aspect-video mb-6">
          <Image
            src={article.image}
            alt={article.headline}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs font-cinzel text-primary/60 mb-10 border-y border-primary/5 py-3 uppercase tracking-widest">
          <span>By {article.user.name}</span>
          <span className="opacity-30">•</span>
          <span>{new Date(article.createdAt).toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          <span className="opacity-30">•</span>
          <span>{article.views.toLocaleString()} Scrolls Read</span>
        </div>

        {/* Content */}
        <div className="space-y-6 text-[1.1rem] sm:text-18px lg:text-20px leading-relaxed font-serif text-foreground/90 first-letter:text-5xl first-letter:font-cinzel first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-primary">
          {article.content
            .split("\n")
            .filter((para) => para.trim() !== "")
            .map((para, i) => (
              <p key={i} className="mb-4">{para}</p>
            ))}
        </div>

        <div className="mt-16 pt-10 border-t-2 border-primary/10">
          <h2 className="metal-plate font-bold text-center text-2xl py-3 w-fit mx-auto px-10 mb-10 rounded-lg">
            <span className="text-inlaid-gold">Further Arcane Readings</span>
          </h2>
          <RelatedArticles articles={relatedArticles} />
        </div>
      </article>
    </div>
  );
}
