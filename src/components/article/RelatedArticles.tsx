"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function RelatedArticles({
  articles,
}: {
  articles: { id: string; headline: string; image: string }[];
}) {
  if (!articles.length) return null;

  return (
    <section className="mt-16">
      <h2 className="text-lg font-semibold mb-6">Related Articles</h2>

      <Carousel
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {articles.map((article) => (
            <CarouselItem
              key={article.id}
              className="basis-full sm:basis-1/2 lg:basis-1/3"
            >
              <Link href={`/article/${article.id}`} className="block group">
                <div className="relative h-44 w-full overflow-hidden rounded-lg">
                  <Image
                    src={article.image}
                    alt={article.headline}
                    fill
                    className="object-cover group-hover:scale-105 transition"
                  />
                </div>

                <p className="mt-3 text-sm font-medium leading-snug group-hover:underline">
                  {article.headline}
                </p>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Arrow controls */}
        <div className="hidden md:flex">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </section>
  );
}
