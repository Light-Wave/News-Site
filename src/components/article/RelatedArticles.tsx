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
    <section className="mt-8">
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="w-full relative px-4 sm:px-0"
      >
        <CarouselContent>
          {articles.map((article) => (
            <CarouselItem
              key={article.id}
              className="basis-full sm:basis-1/2 lg:basis-1/3"
            >
              <Link href={`/article/${article.id}`} className="block group">
                <div className="relative h-44 w-full overflow-hidden rounded-lg shadow-md border border-primary/10">
                  <Image
                    src={article.image}
                    alt={article.headline}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <p className="mt-4 text-base font-serif font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {article.headline}
                </p>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Arrow controls - Thematic styling */}
        <div className="hidden lg:flex">
          <CarouselPrevious className="
            -left-12 size-11 rounded-full border-2 border-amber-900/40 
            bg-gradient-to-br from-[#4a3728] to-[#261810] 
            text-[#d4af37] shadow-[0_0_15px_rgba(0,0,0,0.5)]
            hover:scale-110 hover:border-amber-600 hover:text-amber-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]
            active:scale-95 transition-all duration-300 
            disabled:opacity-20 disabled:hover:scale-100 disabled:shadow-none border-none sm:border-2
          " />
          <CarouselNext className="
            -right-12 size-11 rounded-full border-2 border-amber-900/40 
            bg-gradient-to-br from-[#4a3728] to-[#261810] 
            text-[#d4af37] shadow-[0_0_15px_rgba(0,0,0,0.5)]
            hover:scale-110 hover:border-amber-600 hover:text-amber-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]
            active:scale-95 transition-all duration-300 
            disabled:opacity-20 disabled:hover:scale-100 disabled:shadow-none border-none sm:border-2
          " />
        </div>
      </Carousel>
    </section>
  );
}
