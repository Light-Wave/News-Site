import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import ArticleCard from "@/components/layout/articleCard";
import SmallArticleCard from "@/components/layout/smallArticleCard";
import type { Article } from "@/generated/prisma/client";
import { getArticleById } from "@/actions/article";


const exampleArticle: Article[] = [{
  id: "1",
  headline: "Let sleeping dragons snooze",
  content: "",
  views: 0,
  summary:
    "Druids against the mistreatment of dragons report a rise in adventurer hunting parties disturbing the sleep of our reptilian friends. A spokesperson for the druids said 'The additional food supply is welcome, but the dragons need sleep too!'",
  image: "/placeholder-dragon.png",
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: "1",
  isActive: true,
  categoryId: "fish",
},
{
  id: "2",
  headline: "Price of daggers rising",
  content: "",
  views: 13,
  summary: "A recent upswing in the rogue guild's activity has led to a shortage of daggers across the realm. Prices have risen by as much as 50% in some areas.",
  image: "/dragonplaceholder.png",
  createdAt: new Date(),
  updatedAt: new Date(),
  userId: "1",
  isActive: true,
  categoryId: "fish",
}];
/* NOTE - all sections should be lifted out of page and into seperate components*/
export default async function Home() {
  const fetchedArticle = await getArticleById("apa123");
  return (
    <div className="">
      <main className="">
        {/* breaking news ticker section*/}
        <section className="">
          <p className="bg-black text-white text-center">
            Breaking news: <br />
            Wizard council warns of dragon season approaching.
          </p>
        </section>
        {/* Main article section (editors choice? most popular? most recent?) */}
        <section>
          <ArticleCard article={exampleArticle[0]} />
        </section>
        {/* Trending articles section (most popular? recommended to user?) */}
        <section>
          <h2 className="metal-plate font-bold gap-0 text-center text-3xl py-4 w-fit mx-auto px-12 my-8">
            <span className="text-magic-glint">
              Articles from the Arcane Network
            </span>
          </h2>
          <SmallArticleCard article={exampleArticle[1]} />
          <SmallArticleCard article={exampleArticle[0]} />
          <SmallArticleCard article={fetchedArticle?.article ?? undefined} />
        </section>
        {/* Additional articles section - to be fetched from database depending on... soemthing... recommendations? date published? */}
        <section>
          <h2 className="metal-plate font-bold gap-0 text-center text-3xl py-4 w-fit mx-auto px-12 my-8">
            <span className="text-magic-glint">Recommended for you</span>
          </h2>
          <ArticleCard article={exampleArticle[0]} />
          <ArticleCard article={exampleArticle[1]} />
          <ArticleCard article={exampleArticle[2]} />
        </section>
        {/* Newsletter subscription section */}
        <section className="flex flex-col items-center gap-2 bg-black text-white p-2">
          <h2 className="font-bold gap-0 text-center">SUBSCRIBE!</h2>
          <p>
            Stay updated with the latest articles and news. Subscribe to our
            newsletter!
          </p>
          <p className="italic">
            this action is mandatory under world law enforcement. Sign up now or
            else face the consequences.
          </p>
          <input
            className="border p-2"
            id="subMail"
            type="email"
            placeholder="Enter your email"
          />
          <Button className="p-2 bg-blue-500 text-white">Subscribe</Button>
        </section>
      </main>
    </div>
  );
}
