import ArticleMain from "@/components/article/ArticleMain";
import UtilitySideBar from "@/components/layout/utility-sidebar/utilitySideBar";
import { UtilitySideBarTitle } from "@/components/layout/utility-sidebar/utilitySideBarTitle";
import ArticleSidebar from "@/components/article/ArticleSidebar";
import { getLatestArticles, getArticleForViewing } from "@/actions/article";
import OsrsItemContainer from "@/components/layout/osrs/osrsItemContainer";
import WeatherContainer from "@/components/layout/weather/weatherContainer";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const result = await getArticleForViewing(id);

  if (!result.success || !result.article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h1 className="text-2xl font-bold font-cinzel mb-4">The Scroll Cannot Be Found</h1>
        <p className="text-muted-foreground mb-8">It appears this arcane knowledge is lost to time or hidden by powerful wards.</p>
        <Link href="/" className="magic-button px-6 py-2">Return Home</Link>
      </div>
    );
  }

  const { article, isRestricted } = result;

  const latestArticlesData = await getLatestArticles({ limit: 5 });
  const latestArticles =
    latestArticlesData.success && latestArticlesData.articles
      ? latestArticlesData.articles
      : [];
  return (
    <div className="max-w-7xl m-auto mb-4 px-4 sm:px-0">
      <div className="grid grid-cols-12 gap-0 sm:gap-6 lg:gap-8 m-auto">
        {/* Left Sidebar - Latest Scrolls */}
        <div className="col-span-12 lg:col-span-2 order-2 lg:order-1 mt-4 lg:mt-0">
          <UtilitySideBar>
            <UtilitySideBarTitle title="Latest Scrolls">
              <ArticleSidebar
                articles={latestArticles}
                categories={article.categories}
              />
            </UtilitySideBarTitle>
          </UtilitySideBar>
        </div>

        {/* Main Content */}
        <div className="col-span-12 lg:col-span-8 order-1 lg:order-2">
          <div className="parchment-card p-6 sm:p-8 md:p-10 shadow-xl min-h-screen">
            {/* Breadcrumb */}
            <nav className="text-sm font-cinzel text-primary/60 mb-8 border-b border-primary/10 pb-4">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              {" › "}
              {article.categories
                .map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/category/${cat.name.toLowerCase()}`}
                    className="hover:text-primary transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))
                .reduce<React.ReactNode[]>((acc, link, index) => {
                  if (index > 0) {
                    acc.push(
                      <span key={`sep-${index}`} className="px-1 opacity-50">
                        /
                      </span>,
                    );
                  }
                  acc.push(link);
                  return acc;
                }, [])}
              {" › "}
              <span className="text-foreground/80 truncate inline-block max-w-[200px] align-bottom">
                {article.headline}
              </span>
            </nav>

            <ArticleMain article={article} relatedArticles={latestArticles} isRestricted={isRestricted} />
          </div>
        </div>

        {/* Right Sidebar - Utility */}
        <div className="col-span-12 lg:col-span-2 order-3 mt-4 lg:mt-0">
          <UtilitySideBar>
            <UtilitySideBarTitle title="Item Prices">
              <OsrsItemContainer />
            </UtilitySideBarTitle>
            <UtilitySideBarTitle title="Weather">
              <WeatherContainer />
            </UtilitySideBarTitle>
          </UtilitySideBar>
        </div>
      </div>
    </div>
  );
}
