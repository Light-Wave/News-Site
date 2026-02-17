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
import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useSubscription } from "@/hooks/use-subscription";
import { isSubscriber } from "../lib/utils";

// Sub-component for Category Links
const CategoryLinks = ({
  categories,
  isMobile = false,
  closeMenu,
}: {
  categories: any[];
  isMobile?: boolean;
  closeMenu: () => void;
}) => (
  <>
    {categories.map((category) => (
      <Link
        key={category.id}
        href={`/category/${category.name.toLowerCase()}`}
        className={cn(
          "hover:text-amber-700 transition-colors duration-300 text-base",
          isMobile && "border-b border-amber-800/10 pb-2",
        )}
        onClick={isMobile ? closeMenu : undefined}
      >
        {category.name}
      </Link>
    ))}
  </>
);

// Sub-component for Auth & Subscribe Buttons
const ActionButtons = ({
  session,
  hasSubscription,
  isLoading,
  isMobile = false,
  handleSignOut,
  closeMenu,
}: {
  session: any;
  hasSubscription: boolean | null;
  isLoading: boolean;
  isMobile?: boolean;
  handleSignOut: () => void;
  closeMenu: () => void;
}) => (
  <div
    className={cn(
      "flex items-center",
      isMobile ? "flex-col gap-3 mt-4" : "gap-6",
    )}
  >
    {hasSubscription === false && !isLoading && (
      <Button
        asChild
        className={cn(
          "magic-button-gold font-bold transition-all duration-300",
          isMobile ? "w-full h-12" : "h-9 text-sm px-4",
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
          isMobile ? "w-full h-12" : "h-9 text-sm px-4",
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
          isMobile ? "w-full h-12" : "h-9 text-sm px-4",
        )}
      >
        <Link href="/sign-in" onClick={isMobile ? closeMenu : undefined}>
          Sign In
        </Link>
      </Button>
    )}
  </div>
);

export default function Header({
  categories,
}: {
  categories: Awaited<ReturnType<typeof getAllCategories>>;
}) {
  const [show, setShow] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const cooldownRef = useRef(false);
  const { data: session } = authClient.useSession();
  const { hasSubscription, isLoading } = useSubscription();
  const router = useRouter();

  // Scroll handler with cooldown to prevent Chromium jitter.
  // After a state change, we ignore scroll events for a short period
  // so the layout-shift-induced scroll event doesn't flip the state back.
  const controlNavbar = useCallback(() => {
    if (cooldownRef.current) return;

    const currentScrollY = window.scrollY;
    const diff = Math.abs(currentScrollY - lastScrollY.current);

    if (diff > 5) {
      const scrollingDown = currentScrollY > lastScrollY.current;
      const pastThreshold = currentScrollY > 80;

      if (scrollingDown && pastThreshold && show) {
        setShow(false);
        // Cooldown: ignore scroll events briefly after state change
        cooldownRef.current = true;
        setTimeout(() => {
          cooldownRef.current = false;
        }, 200);
      } else if (!scrollingDown && !show) {
        setShow(true);
        cooldownRef.current = true;
        setTimeout(() => {
          cooldownRef.current = false;
        }, 200);
      }

      lastScrollY.current = currentScrollY;
    }
  }, [show]);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar, { passive: true });
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [controlNavbar]);

  const closeMenu = () => setIsMenuOpen(false);

  const handleSignOut = async () => {
    await authClient.signOut();
    closeMenu();
    router.refresh();
  };

  // Drag-to-scroll for categories
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDown(false);
  const handleMouseUp = () => setIsDown(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <header
      className={cn(
        "border-b sticky top-0 w-full z-50 bg-background parchment-card !overflow-hidden transition-[height] duration-300 ease-in-out",
        /* Mobile: always h-16 (categories row is hidden). Desktop: 6.5rem when expanded, 4rem when collapsed. */
        "h-16",
        show ? "md:h-[6.5rem]" : "md:h-16",
      )}
    >
      {/* Main bar — always h-16, never changes height */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 h-16">
        {/* LEFT: Logo Column (Medallion Effect) */}
        <div className="flex-shrink-0 flex items-center relative z-[70] w-16 md:w-32 h-full">
          <Link
            href="/"
            className={cn(
              "group absolute top-0 left-0 md:left-1/2 md:-translate-x-1/2 transition-all duration-500",
              show
                ? "h-[64px] w-[64px] md:h-[100px] md:w-[100px]"
                : "h-[48px] w-[48px]",
            )}
          >
            <Image
              src="/biblo-logo_v4.svg"
              alt="The Bibliomancer's Brief Logo"
              width={100}
              height={100}
              className="w-full h-full object-contain transition-all duration-500 drop-shadow-[0_0_12px_rgba(251,191,36,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(251,191,36,0.5)]"
            />
          </Link>
        </div>

        {/* MIDDLE: Site Name Area */}
        <div className="flex-grow flex items-center ml-2 md:ml-12 min-w-0">
          <Link href="/" className="group">
            <span
              className={cn(
                "font-cinzel font-bold text-amber-800 tracking-tighter transition-all duration-300 whitespace-nowrap",
                show ? "text-lg sm:text-xl" : "text-base sm:text-lg",
              )}
            >
              The Bibliomancer&apos;s Brief
            </span>
          </Link>
        </div>

        {/* RIGHT: Buttons (Desktop) + Mobile Menu Trigger */}
        <div className="flex items-center gap-2 sm:gap-6">
          <div className="hidden md:block">
            <ActionButtons
              session={session}
              hasSubscription={hasSubscription}
              isLoading={isLoading}
              handleSignOut={handleSignOut}
              closeMenu={closeMenu}
            />
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

            <SheetContent
              side="right"
              className="w-full sm:w-80 px-6 parchment-card border-l-amber-800/20"
            >
              <SheetHeader>
                <SheetTitle className="text-xl font-cinzel text-amber-950 text-left">
                  Arcane Menu
                </SheetTitle>
              </SheetHeader>

              <nav className="mt-8 flex flex-col gap-5 text-lg font-cinzel">
                <CategoryLinks
                  categories={categories}
                  isMobile
                  closeMenu={closeMenu}
                />
                <ActionButtons
                  session={session}
                  hasSubscription={hasSubscription}
                  isLoading={isLoading}
                  isMobile
                  handleSignOut={handleSignOut}
                  closeMenu={closeMenu}
                />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* DESKTOP CATEGORY NAV — uses transform for zero-layout-cost animation */}
      <nav
        className="hidden md:flex w-full h-10"
        style={{
          transform: show ? "translateY(0)" : "translateY(-100%)",
          opacity: show ? 1 : 0,
          transition: "transform 0.3s ease, opacity 0.3s ease",
          pointerEvents: show ? "auto" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto w-full px-4 md:pl-36 flex items-center h-full">
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={cn(
              "flex-grow min-w-0 overflow-x-auto no-scrollbar flex items-center select-none",
              isDown ? "cursor-grabbing" : "cursor-grab",
            )}
          >
            <div className="flex-grow" />
            <div className="flex-shrink-0 w-max flex gap-x-5 lg:gap-x-8 font-cinzel items-center h-full whitespace-nowrap py-1">
              <CategoryLinks categories={categories} closeMenu={closeMenu} />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
