import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function BreakingBanner() {
  const article = await prisma.article.findFirst({
    where: { isBreaking: true, isActive: true },
    select: { id: true, headline: true },
  });

  if (!article) return null;

  return (
    <div className="bg-red-600 text-white py-2 overflow-hidden">
      <div className="container mx-auto px-4 flex items-center">
        <span className="font-black uppercase bg-white text-red-600 px-2 py-0.5 text-xs mr-4 animate-pulse">
          Breaking
        </span>
        <Link
          href={`/articles/${article.id}`}
          className="hover:underline font-bold truncate"
        >
          {article.headline}
        </Link>
      </div>
    </div>
  );
}
