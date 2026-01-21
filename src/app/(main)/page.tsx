import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

/* NOTE - all sections should be lifted out of page and into seperate components*/
export default function Home() {
  return (
    <div className="">
      <main className="">
        {/* breaking news ticker section*/}
        <p className="text-center">fake header</p>
        <section className="">
          <p className="bg-black text-white text-center">
            Breaking news: <br />
            Stupid people still being stupid
          </p>
        </section>
        {/* Main article section (editors choice? most popular? most recent?) */}
        <section>
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
        </section>
        {/* Trending articles section (most popular? recommended to user?) */}
        <section>
          <h2 className="font-bold gap-0 text-center">Hot and trending</h2>
          <div className="p-2">
            <h2 className="font-bold ">Article Title</h2>
            <p className="text-gray-600">
              Article super short version goes here. Lorem ipsum dolor, sit amet
            </p>
            <div className="w-full flex justify-end">
              <Button className="p-2">Full article</Button>
            </div>
          </div>
          <div className="p-2">
            <h2 className="font-bold ">Article Title</h2>
            <p className="text-gray-600">
              Article super short version goes here. Lorem ipsum dolor, sit amet
            </p>
            <div className="w-full flex justify-end">
              <Button className="p-2">Full article</Button>
            </div>
          </div>
          <div className="p-2">
            <h2 className="font-bold ">Article Title</h2>
            <p className="text-gray-600">
              Article super short version goes here. Lorem ipsum dolor, sit amet
            </p>
            <div className="w-full flex justify-end">
              <Button className="p-2">Full article</Button>
            </div>
          </div>
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
        <p className="text-center">fake footer</p>
      </main>
    </div>
  );
}
