import ArticleCard from "@/components/layout/articleCard";
import SmallArticleCard from "@/components/layout/smallArticleCard";
import { getLatestArticles, getRandomArticles } from "@/actions/article";
import { exampleArticle } from "@/components/layout/tempPlaceholderArticle";
import BreakingNewsScroll from "@/components/layout/BreakingNewsScroll";
import SubscriptionBox from "@/components/layout/SubscriptionBox";
import UtilitySideBar from "@/components/layout/utility-sidebar/utilitySideBar";
import OsrsItemContainer from "@/components/layout/osrs/osrsItemContainer";
import WeatherContainer from "@/components/layout/weather/weatherContainer";
import { UtilitySideBarTitle } from "@/components/layout/utility-sidebar/utilitySideBarTitle";

/*  NOTE - all sections should be lifted out of page and into separate components
    NOTE2 - Right now the main article shows a fixed example article from tempPlaceholderArticle.tsx
    NOTE3 - Right now the Arcane Network section shows the latest active articles from the database (ordered by createdAt desc)
    NOTE4 - Right now the Recommended for you section shows random active articles from the database via getRandomArticles
    TODO: Decide on what mainArticle should be (set by admin? just latest article? most popular?)
    TODO: Make a more intelligent choice of articles for Arcane Network section
    TODO: Make a more intelligent choice of articles for Recommended for you section
    TODO: Decide where to get breaking news from (admin? latest article?)
*/

export default async function Home() {
  const [latestArticlesData, randomArticlesData] = await Promise.all([
    getLatestArticles({ limit: 3 }),
    getRandomArticles({ limit: 3 }),
  ]);
  const tempLatestArticles = latestArticlesData.success
    ? latestArticlesData.articles
    : [];
  const randomForYouArticles = randomArticlesData.success
    ? randomArticlesData.articles
    : [];
  const breakingNews =
    "Witches call for cauldron regulations after coven turned into swans due to faulty cauldron";
  const mainArticle = exampleArticle[0];

  return (
    <div>
      <div className="">
        {/* breaking news ticker section*/}
        <section className="bg-transparent pb-0">
          <BreakingNewsScroll text={breakingNews} />
        </section>
        <div className="grid grid-cols-7 m-auto ">
          <section
            id="main-content"
            className="col-span-7 sm:col-span-5 sm:col-start-2 sm:mx-4 order-1"
          >
            {/* Main article section (editors choice? most popular? most recent?) */}
            <section>
              <ArticleCard article={mainArticle} />
            </section>

            {/* Trending articles section (most popular? recommended to user?) */}
            <section>
              <h2 className="metal-plate font-bold gap-0 text-center text-3xl py-4 w-fit mx-auto px-12 my-8 rounded-none sm:rounded-lg">
                <span className="text-magic-glint">
                  Articles from the Arcane Network
                </span>
              </h2>
              <div className="flex flex-col gap-4">
                {tempLatestArticles?.map((article) => (
                  <SmallArticleCard key={article.id} article={article} />
                ))}
                {(!tempLatestArticles || tempLatestArticles.length === 0) && (
                  <p className="text-center text-foreground">
                    No articles found in the arcane network.
                  </p>
                )}
              </div>
            </section>

            {/* Additional articles section - to be fetched from database depending on... something... recommendations? date published? */}
            <section>
              <h2 className="metal-plate  font-bold gap-0 text-center text-3xl py-4 w-fit mx-auto px-12 my-8 rounded-none sm:rounded-lg">
                <span className="text-magic-glint">Recommended for you</span>
              </h2>
              {randomForYouArticles?.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  authorName="Unknown author"
                />
              ))}
              {(!randomForYouArticles || randomForYouArticles.length === 0) && (
                <p className="text-center text-foreground">
                  No recommended articles found.
                </p>
              )}
            </section>
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
    </div>
  );
}
