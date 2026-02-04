import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { getAllCategories } from "@/types/categories";

export default async function Header() {
  const categories = await getAllCategories();

  return (
    <header className="border-b bg-[#f8f4ee]">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
        {/* LEFT: Mobile menu + Logo */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-3/4 px-6">
              <SheetHeader>
                <SheetTitle className="text-lg">Menu</SheetTitle>
              </SheetHeader>

              {/* MOBILE NAV */}
              <nav className="mt-6 flex flex-col gap-4 text-lg font-serif">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.name.toLowerCase()}`}
                    className="hover:text-red-600"
                  >
                    {category.name}
                  </Link>
                ))}

                <hr className="my-4" />

                <Link href="/subscribe" className="font-semibold text-red-600">
                  Subscribe
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="text-lg font-serif font-bold text-red-600">
            The Bibliomancer’s Brief
          </Link>
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-8 text-lg font-serif">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.name.toLowerCase()}`}
              className="hover:text-red-600 transition"
            >
              {category.name}
            </Link>
          ))}
        </nav>

        {/* RIGHT */}
        <Link
          href="/subscribe"
          className="hidden md:block text-base font-semibold hover:underline"
        >
          Subscribe
        </Link>
      </div>
    </header>
  );
}
