"use client";
import Link from "next/link";
import Image from "next/image";
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
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useSubscription } from "@/hooks/use-subscription";

export default function Header({
  categories,
}: {
  categories: Awaited<ReturnType<typeof getAllCategories>>;
}) {
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);
  const { data: session, isPending } = authClient.useSession();
  const { hasSubscription } = useSubscription();
  const router = useRouter();

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY.current && window.scrollY > 100) {
          // Scrolling down - hide navbar
          setShow(false);
        } else {
          // Scrolling up - show navbar
          setShow(true);
        }
        lastScrollY.current = window.scrollY;
      }
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, []);

  return (
    <header
      className={cn(
        "border-b fixed top-0 left-0 w-full z-50 h-auto bg-background transition-all duration-300 parchment-card",
      )}
    >
      <div
        className={cn(
          "max-w-7xl mx-auto flex items-center justify-between px-4 transition-all duration-300",
          show ? "h-16" : "h-12"
        )}
      >
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
              <nav className="mt-6 flex flex-col gap-4 text-lg font-cinzel">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.name.toLowerCase()}`}
                    className="hover:text-amber-600"
                  >
                    {category.name}
                  </Link>
                ))}

                <hr className="my-4" />

                <div className="mt-2 flex flex-col gap-2">
                  {!hasSubscription && (
                    <Link href="/subscribe">
                      <Button className="magic-button-gold w-full text-amber-950 font-bold">
                        Subscribe
                      </Button>
                    </Link>
                  )}

                  {session ? (
                    <Button
                      className="magic-button w-full text-amber-100 font-bold"
                      onClick={async () => {
                        await authClient.signOut();
                        router.refresh();
                      }}
                    >
                      Sign Out
                    </Button>
                  ) : (
                    <Link href="/sign-in">
                      <Button className="magic-button w-full text-amber-100 font-bold">
                        Sign In
                      </Button>
                    </Link>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <Image
              src="/biblo-logo_v4.svg"
              alt="The Bibliomancer's Brief Logo"
              width={40}
              height={40}
              className={cn(
                "transition-all duration-300",
                show ? "h-10 w-10" : "h-8 w-8" // Logo shrinks slightly on scroll
              )}
            />
            <span
              className={cn(
                "font-cinzel font-bold text-amber-800 tracking-tighter transition-all duration-300",
                show ? "text-xl" : "text-lg" // Logo text shrinks on scroll
              )}
            >
              The Bibliomancer's Brief
            </span>
          </Link>
        </div>

        {/* RIGHT */}
        <div className="hidden md:flex items-center gap-6">
          {!hasSubscription && (
            <Link href="/subscribe">
              <Button
                className={cn(
                  "magic-button-gold px-4 text-amber-950 font-bold transition-all duration-300",
                  show ? "h-9 text-sm" : "h-8 text-xs px-3"
                )}
              >
                Subscribe
              </Button>
            </Link>
          )}

          {session ? (
            <Button
              className={cn(
                "magic-button px-4 text-amber-100 font-bold transition-all duration-300",
                show ? "h-9 text-sm" : "h-8 text-xs px-3"
              )}
              onClick={async () => {
                await authClient.signOut();
                router.refresh();
              }}
            >
              Sign Out
            </Button>
          ) : (
            <Link href="/sign-in">
              <Button
                className={cn(
                  "magic-button px-4 text-amber-100 font-bold transition-all duration-300",
                  show ? "h-9 text-sm" : "h-8 text-xs px-3"
                )}
              >
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </div>
      {/* DESKTOP NAV */}
      <nav
        className={cn(
          "hidden md:flex w-full justify-center gap-8 font-cinzel bg-transparent items-center transition-all duration-300 overflow-hidden",
          show ? "max-h-12 pb-2 opacity-100" : "max-h-0 pb-0 opacity-0 pointer-events-none", // Collapse and fade categories
        )}
      >
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.name.toLowerCase()}`}
            className={cn(
              "hover:text-amber-700 transition-all duration-300",
              show ? "text-lg" : "text-base"
            )}
          >
            {category.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
