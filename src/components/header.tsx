import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { categories } from "@/types/categories";

export default function Header() {
  return (
    <header className="border-b bg-gray-100">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left: Menu + Logo */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button className="md:hidden text-2xl" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-full sm:w-[320px] px-6">
              <SheetHeader className="py-2 px-0">
                <SheetTitle className="text-left text-xl">Menu</SheetTitle>
                <div className="pt-1">
                  <hr />
                </div>
              </SheetHeader>

              <nav className=" flex flex-col gap-3">
                {categories.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-semibold"
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="pt-2">
                  <hr />
                </div>

                <Link
                  href="/subscribe"
                  className="text-lg font-semibold text-red-600 py-2"
                >
                  Subscribe
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-red-500"
          >
            NewsSite
          </Link>
        </div>

        {/* Desktop Categories */}
        <nav className="max-w-7xl mx-auto px-6 py-4 flex gap-6">
          {categories.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium hover:text-blue-600"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        {/* Right */}
        <Link
          href="/subscribe"
          className="text-base font-semibold hover:underline"
        >
          Subscribe
        </Link>
      </div>
    </header>
  );
}
