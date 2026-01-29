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
    <article className="w-full max-w-none lg:max-w-3xl">
      {/* Headline */}
      <h1
        className="font-serif font-bold leading-tight mb-4 
               text-[2rem] sm:text-40px lg:text-52px"
      >
        {article.headline}
      </h1>

      {/* Summary */}
      <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6">
        {article.summary}
      </p>

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
      <p className="text-sm text-gray-500 mb-8">
        {article.user.name} · {new Date(article.createdAt).toDateString()} ·{" "}
        {article.views} views
      </p>

      {/* Content */}
      <div className="space-y-5 text-[1rem] sm:text-16px lg:text-18px leading-relaxed">
        {article.content
          .split("\n")
          .filter((para) => para.trim() !== "")
          .map((para, i) => (
            <p key={i}>{para}</p>
          ))}
      </div>

      {/* Related Articles */}
      <RelatedArticles articles={relatedArticles} />
    </article>
  );
}
