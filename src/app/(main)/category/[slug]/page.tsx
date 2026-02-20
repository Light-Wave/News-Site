import ArticleCard from "@/components/layout/articleCard";
import SmallArticleCard from "@/components/layout/smallArticleCard";
import UtilitySideBar from "@/components/layout/utility-sidebar/utilitySideBar";
import OsrsItemContainer from "@/components/layout/osrs/osrsItemContainer";
import WeatherContainer from "@/components/layout/weather/weatherContainer";
import { UtilitySideBarTitle } from "@/components/layout/utility-sidebar/utilitySideBarTitle";
import SubscriptionBox from "@/components/layout/SubscriptionBox";
import { getCategoryArticles, getCategoryBySlug } from "@/types/categories";
import Link from "next/link";
import { ArticleExpended } from "@/types/article";

const PAGE_SIZE = 5;

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams.page) || 1;

  // Get category
  const category = await getCategoryBySlug(resolvedParams.slug);

  if (!category) {
    return <div className="p-10">Category not found</div>;
  }

  const articles = await getCategoryArticles({
    slug: resolvedParams.slug,
    page: page,
  });

  return (
    <div className="">
      <div className="grid grid-cols-7 m-auto ">
        <section
          id="main content"
          className="col-span-7 sm:col-span-5 sm:col-start-2 sm:mx-4 order-1"
        >
          {articles.length === 0 ? (
            <div className="parchment-card text-center py-20 mb-8 flex flex-col items-center justify-center">
              <div className="text-6xl mb-6 filter drop-shadow-md">📜</div>
              <p className="text-2xl font-cinzel text-primary font-bold">The archives for this chamber are currently empty.</p>
              <p className="text-primary/70 mt-3 font-serif italic italic text-lg max-w-md mx-auto">Waiting for the scribes to unearth new scrolls and inscribe them into the chronicles.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {/* Featured article in category */}
              <ArticleCard article={articles[0] as unknown as ArticleExpended} />

              {/* Other articles in category */}
              {articles.slice(1).length > 0 && (
                <div className="flex flex-col gap-4">
                  {articles.slice(1).map((article) => (
                    <SmallArticleCard key={article.id} article={article as unknown as ArticleExpended} />
                  ))}
                </div>
              )}
            </div>
          )}

          {articles.length === PAGE_SIZE && (
            <div className="mt-16 text-center mb-12">
              <Link
                href={`/category/${resolvedParams.slug}?page=${page + 1}`}
                className="magic-button font-cinzel px-8 py-4 text-xl text-primary-foreground rounded-lg transition-all hover:scale-105 active:scale-95 inline-block"
              >
                Summon More Scrolls
              </Link>
            </div>
          )}
        </section>

        <section id="sidebar" className="col-span-7 sm:col-span-1 order-2">
          <UtilitySideBar>
            <UtilitySideBarTitle title="Osrs Item Prices">
              <OsrsItemContainer />
            </UtilitySideBarTitle>

            <UtilitySideBarTitle title="Weather">
              <WeatherContainer />
            </UtilitySideBarTitle>
          </UtilitySideBar>
        </section>

        {/* Newsletter subscription section */}
        <section className="col-span-7 order-3">
          <SubscriptionBox />
        </section>
      </div>
    </div>
  );
}
