import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

export default function ArticleCard() {
  return (
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
          consectetur adipisicing elit. Laborum vero quis asperiores labore
          impedit, tempore, voluptates, ipsam accusantium consequuntur facere
          beatae neque sapiente officia aliquid.
        </p>
      </CardContent>
      <CardFooter>
        <p className="">social links ❌👍🔗</p>
        <Button>Full article</Button>
      </CardFooter>
    </Card>
  );
}
