import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";

export function NotFoundContent() {
  return (
    <div className="flex items-center justify-center py-12 px-4">
      <div className="parchment-card max-w-2xl w-full p-8 md:p-12 text-center rounded-none shadow-2xl relative border-amber-900/20 border-8">
        {/* Decorative flourish */}
        <div className="absolute top-4 left-4 text-amber-900/10 pointer-events-none">
          <SearchIcon size={64} />
        </div>

        <div className="relative z-10">
          <h1 className="text-8xl md:text-9xl font-cinzel text-magic-glint mb-2 leading-none">
            404
          </h1>

          <h2 className="text-2xl md:text-4xl font-cinzel text-amber-950 mb-6 uppercase tracking-widest">
            Lost in the Archives
          </h2>

          <div className="w-24 h-1 bg-amber-900/30 mx-auto mb-8" />

          <p className="text-lg md:text-xl text-amber-950/90 mb-10 leading-relaxed font-body max-w-md mx-auto italic">
            "It seems this scroll has been misplaced or never existed.
            Even the most skilled bibliomancers cannot find what you seek within these halls."
          </p>

          <Button
            asChild
            className="magic-button-gold text-lg px-10 py-7 h-auto rounded-none border-amber-900/50"
          >
            <Link href="/">
              Return to Library
            </Link>
          </Button>
        </div>

        {/* Bottom decorative flourish */}
        <div className="absolute bottom-4 right-4 text-amber-900/10 rotate-180 pointer-events-none">
          <SearchIcon size={64} />
        </div>
      </div>
    </div>
  );
}
