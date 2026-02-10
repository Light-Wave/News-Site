"use client";
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
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Header({
  categories,
}: {
  categories: Awaited<ReturnType<typeof getAllCategories>>;
}) {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        // Scrolling down - hide navbar
        setShow(false);
      } else {
        // Scrolling up - show navbar
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // Cleanup listener
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <header
      className={cn(
        "border-b fixed top-0 left-0 w-full z-50 h-16 bg-[#f8f4ee] transition-transform duration-300 parchment-card",
        !true && "-translate-y-full", // Hides when state is false
      )}
    >
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

        {/* RIGHT */}
        <Link
          href="/subscribe"
          className="hidden md:block text-base font-semibold hover:underline"
        >
          Subscribe
        </Link>
      </div>
      {/* DESKTOP NAV */}
      <nav
        className={cn(
          "hidden md:flex w-full justify-center gap-8 text-lg font-serif bg-[#f8f4ee] items-center",
          !show && "-translate-y-full", // Hides when state is false
        )}
      >
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
    </header>
  );
}
