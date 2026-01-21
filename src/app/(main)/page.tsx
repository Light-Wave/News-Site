import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <main className="">
        {/* breaking news ticker section*/}
        <section>
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
            <div className="m-auto grid grid-cols-3">
              <p className="">Author |</p>
              <p className="">posted |</p>
              <p className="">read time</p>
            </div>
            <h2 className="text-xl font-bold text-center">Article Title</h2>
            <p className="text-gray-600">
              Article short version goes here. Lorem ipsum dolor, sit amet
              consectetur adipisicing elit. Laborum vero quis asperiores labore
              impedit, tempore, voluptates, ipsam accusantium consequuntur
              facere beatae neque sapiente officia aliquid.
            </p>
            <CardFooter>
              <p className="">social links ❌👍🔗</p>
              <Button>Full article</Button>
            </CardFooter>
          </Card>
        </section>
        {/* Trending articles section (most popular? recommended to user?) */}
        <section>
          <h2 className="font-bold gap-0 text-center">Hot and trending</h2>
          <div>
            <h2 className="font-bold gap-0">Article Title</h2>
            <p className="text-gray-600">
              Article super short version goes here. Lorem ipsum dolor, sit amet
              consectetur
            </p>
            <div className="w-full flex justify-end">
              <Button className="p-2">Full article</Button>
            </div>
          </div>
          <div>
            <h2 className="font-bold gap-0">Article Title</h2>
            <p className="text-gray-600">
              Article super short version goes here. Lorem ipsum dolor, sit amet
              consectetur
            </p>
            <div className="w-full flex justify-end">
              <Button className="p-2">Full article</Button>
            </div>
          </div>
          <div>
            <h2 className="font-bold gap-0">Article Title</h2>
            <p className="text-gray-600">
              Article super short version goes here. Lorem ipsum dolor, sit amet
              consectetur
            </p>
            <div className="w-full flex justify-end">
              <Button className="p-2">Full article</Button>
            </div>
          </div>
        </section>
        <section>
          <Card>
            <div className="bg-gray-200 h-50">
              <p>image here</p>
            </div>
            <div className="m-auto grid grid-cols-3">
              <p className="">Author |</p>
              <p className="">posted |</p>
              <p className="">read time</p>
            </div>
            <h2 className="text-xl font-bold text-center">Article Title</h2>
            <p className="text-gray-600">
              Article short version goes here. Lorem ipsum dolor, sit amet
              consectetur adipisicing elit. Laborum vero quis asperiores labore
              impedit, tempore, voluptates, ipsam accusantium consequuntur
              facere beatae neque sapiente officia aliquid.
            </p>
            <CardFooter>
              <p className="">social links ❌👍🔗</p>
              <Button>Full article</Button>
            </CardFooter>
          </Card>
          <Card>
            <div className="bg-gray-200 h-50">
              <p>image here</p>
            </div>
            <div className="m-auto grid grid-cols-3">
              <p className="">Author |</p>
              <p className="">posted |</p>
              <p className="">read time</p>
            </div>
            <h2 className="text-xl font-bold text-center">Article Title</h2>
            <p className="text-gray-600">
              Article short version goes here. Lorem ipsum dolor, sit amet
              consectetur adipisicing elit. Laborum vero quis asperiores labore
              impedit, tempore, voluptates, ipsam accusantium consequuntur
              facere beatae neque sapiente officia aliquid.
            </p>
            <CardFooter>
              <p className="">social links ❌👍🔗</p>
              <Button>Full article</Button>
            </CardFooter>
          </Card>
          <Card>
            <div className="bg-gray-200 h-50">
              <p>image here</p>
            </div>
            <div className="m-auto grid grid-cols-3">
              <p className="">Author |</p>
              <p className="">posted |</p>
              <p className="">read time</p>
            </div>
            <h2 className="text-xl font-bold text-center">Article Title</h2>
            <p className="text-gray-600">
              Article short version goes here. Lorem ipsum dolor, sit amet
              consectetur adipisicing elit. Laborum vero quis asperiores labore
              impedit, tempore, voluptates, ipsam accusantium consequuntur
              facere beatae neque sapiente officia aliquid.
            </p>
            <CardFooter>
              <p className="">social links ❌👍🔗</p>
              <Button>Full article</Button>
            </CardFooter>
          </Card>
        </section>
      </main>
    </div>
  );
}
