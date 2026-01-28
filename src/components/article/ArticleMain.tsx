import { ArticleExpended } from "@/types/article";
import Image from "next/image";

export default function ArticleMain({ article }: { article: ArticleExpended }) {
  return (
    <article>
      {/* Headline */}
      <h1 className="text-5xl font-serif font-bold leading-tight mb-4">
        {article.headline} {/* FIX */}
      </h1>

      {/* Sub heading */}
      <p className="text-xl text-gray-600 mb-6">{article.summary}</p>

      {/* Main Image */}
      <div className="relative w-full h-105 mb-6">
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
      <div className="space-y-6 text-lg leading-8">
        {article.content
          .split("\n")
          .filter((para: string) => para.trim() !== "")
          .map((para: string, i: number) => (
            <p key={i}>{para}</p>
          ))}
      </div>
    </article>
  );
}
