import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import ArticleCard from "@/components/layout/articleCard";
import SmallArticleCard from "@/components/layout/smallArticleCard";
import type { Article } from "@/generated/prisma/client";


const exampleArticle: Article = {
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
};
/* NOTE - all sections should be lifted out of page and into seperate components*/
export default function Home() {
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
          <ArticleCard article={exampleArticle} />
        </section>
        {/* Trending articles section (most popular? recommended to user?) */}
        <section>
          <h2 className="font-bold gap-0 text-center">Articles from the Arcane Network</h2>
          <SmallArticleCard article={exampleArticle} />
          <SmallArticleCard />
          <SmallArticleCard />
        </section>
        {/* Additional articles section - to be fetched from database depending on... soemthing... recommendations? date published? */}
        <section>
          <h2 className="font-bold gap-0 text-center">Recommended for you</h2>
          <Card>
            <div className="bg-gray-200 h-50">
              <p>image here</p>
            </div>
            <div className="flex p-2 justify-between items-center gap-4 text-sm text-gray-600">
              <span>Author</span>
              <span>•</span>
              <span>Posted date</span>
              <span>•</span>
              <span>5 min read</span>
            </div>
            <CardContent>
              <h2 className="text-xl font-bold text-center">Article Title</h2>
              <p className="text-gray-600">
                Article short version goes here. Lorem ipsum dolor, sit amet
                consectetur adipisicing elit. Laborum vero quis asperiores
                labore impedit, tempore, voluptates, ipsam accusantium
                consequuntur facere beatae neque sapiente officia aliquid.
              </p>
            </CardContent>
            <CardFooter>
              <p className="">social links ❌👍🔗</p>
              <Button>Full article</Button>
            </CardFooter>
          </Card>
          <Card>
            <div className="bg-gray-200 h-50">
              <p>image here</p>
            </div>
            <div className="flex p-2 justify-between items-center gap-4 text-sm text-gray-600">
              <span>Author</span>
              <span>•</span>
              <span>Posted date</span>
              <span>•</span>
              <span>5 min read</span>
            </div>
            <CardContent>
              <h2 className="text-xl font-bold text-center">Article Title</h2>
              <p className="text-gray-600">
                Article short version goes here. Lorem ipsum dolor, sit amet
                consectetur adipisicing elit. Laborum vero quis asperiores
                labore impedit, tempore, voluptates, ipsam accusantium
                consequuntur facere beatae neque sapiente officia aliquid.
              </p>
            </CardContent>
            <CardFooter>
              <p className="">social links ❌👍🔗</p>
              <Button>Full article</Button>
            </CardFooter>
          </Card>
          <Card>
            <div className="bg-gray-200 h-50">
              <p>image here</p>
            </div>
            <div className="flex p-2 sm:justify-between items-center gap-4 text-sm text-gray-600">
              <span>Author</span>
              <span>•</span>
              <span>Posted date</span>
              <span>•</span>
              <span>5 min read</span>
            </div>
            <CardContent>
              <h2 className="text-xl font-bold text-center">Article Title</h2>
              <p className="text-gray-600">
                Article short version goes here. Lorem ipsum dolor, sit amet
                consectetur adipisicing elit. Laborum vero quis asperiores
                labore impedit, tempore, voluptates, ipsam accusantium
                consequuntur facere beatae neque sapiente officia aliquid.
              </p>
            </CardContent>
            <CardFooter>
              <p className="">social links ❌👍🔗</p>
              <Button>Full article</Button>
            </CardFooter>
          </Card>
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
