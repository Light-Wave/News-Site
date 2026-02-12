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
import type { getAllCategories } from "@/types/categories";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const { data: session } = authClient.useSession();
  const { hasSubscription, isLoading } = useSubscription();
  const router = useRouter();

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY.current && window.scrollY > 100) {
          setShow(false);
        } else {
          setShow(true);
        }
        lastScrollY.current = window.scrollY;
      }
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const handleSignOut = async () => {
    await authClient.signOut();
    closeMenu();
    router.refresh();
  };

  // Sub-component for Category Links
  const CategoryLinks = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/category/${category.name.toLowerCase()}`}
          className={cn(
            "hover:text-amber-700 transition-all duration-300",
            isMobile
              ? "border-b border-amber-800/10 pb-2"
              : (show ? "text-lg" : "text-base")
          )}
          onClick={isMobile ? closeMenu : undefined}
        >
          {category.name}
        </Link>
      ))}
    </>
  );

  // Sub-component for Auth & Subscribe Buttons
  const ActionButtons = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className={cn("flex items-center", isMobile ? "flex-col gap-3 mt-4" : "gap-6")}>
      {hasSubscription === false && !isLoading && (
        <Button
          asChild
          className={cn(
            "magic-button-gold font-bold transition-all duration-300",
            isMobile ? "w-full h-12" : (show ? "h-9 text-sm px-4" : "h-8 text-xs px-3")
          )}
        >
          <Link href="/subscribe" onClick={isMobile ? closeMenu : undefined}>
            Subscribe
          </Link>
        </Button>
      )}

      {session ? (
        <Button
          className={cn(
            "magic-button text-amber-100 font-bold transition-all duration-300",
            isMobile ? "w-full h-12" : (show ? "h-9 text-sm px-4" : "h-8 text-xs px-3")
          )}
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      ) : (
        <Button
          asChild
          className={cn(
            "magic-button text-amber-100 font-bold transition-all duration-300",
            isMobile ? "w-full h-12" : (show ? "h-9 text-sm px-4" : "h-8 text-xs px-3")
          )}
        >
          <Link href="/sign-in" onClick={isMobile ? closeMenu : undefined}>
            Sign In
          </Link>
        </Button>
      )}
    </div>
  );

  return (
    <header
      className={cn(
        "border-b fixed top-0 left-0 w-full z-50 h-auto bg-background transition-all duration-300 parchment-card !overflow-visible",
      )}
    >
      <div
        className={cn(
          "max-w-7xl mx-auto flex items-center justify-between px-4 transition-all duration-300",
          show ? "h-16" : "h-12"
        )}
      >
        {/* LEFT: Logo Column (Medallion Effect) */}
        <div className="flex-shrink-0 flex items-center relative z-[70] w-16 md:w-32 h-full">
          <Link
            href="/"
            className={cn(
              "group absolute top-0 left-0 md:left-1/2 md:-translate-x-1/2 transition-all duration-500",
              show ? "h-[64px] w-[64px] md:h-[100px] md:w-[100px]" : "h-[48px] w-[48px]"
            )}
          >
            <Image
              src="/biblo-logo_v4.svg"
              alt="The Bibliomancer's Brief Logo"
              width={100}
              height={100}
              className={cn(
                "w-full h-full object-contain transition-all duration-500 drop-shadow-[0_0_12px_rgba(251,191,36,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(251,191,36,0.5)]",
              )}
            />
          </Link>
        </div>

        {/* MIDDLE: Site Name Area */}
        <div className="flex-grow flex items-center ml-2 md:ml-12 min-w-0">
          <Link href="/" className="group">
            <span
              className={cn(
                "font-cinzel font-bold text-amber-800 tracking-tighter transition-all duration-300 whitespace-nowrap",
                show ? "text-lg sm:text-xl" : "text-base sm:text-lg"
              )}
            >
              The Bibliomancer's Brief
            </span>
          </Link>
        </div>

        {/* RIGHT: Buttons (Desktop) + Mobile Menu Trigger */}
        <div className="flex items-center gap-2 sm:gap-6">
          <div className="hidden md:block">
            <ActionButtons />
          </div>

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-9 w-9 p-0 text-amber-900"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-full sm:w-80 px-6 parchment-card border-l-amber-800/20">
              <SheetHeader>
                <SheetTitle className="text-xl font-cinzel text-amber-950 text-left">Arcane Menu</SheetTitle>
              </SheetHeader>

              <nav className="mt-8 flex flex-col gap-5 text-lg font-cinzel">
                <CategoryLinks isMobile />
                <ActionButtons isMobile />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* DESKTOP CATEGORY NAV */}
      <nav
        className={cn(
          "hidden md:flex w-full transition-all duration-300 overflow-hidden",
          show ? "h-9 opacity-100" : "h-0 opacity-0 pointer-events-none",
        )}
      >
        <div className="max-w-7xl mx-auto w-full px-4 flex justify-end gap-8 font-cinzel items-center h-full">
          <CategoryLinks />
        </div>
      </nav>
    </header>
  );
}
