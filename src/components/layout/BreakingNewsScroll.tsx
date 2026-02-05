import { cn } from "@/lib/utils";

interface BreakingNewsScrollProps {
  className?: string;
  text: string;
}
/**
 * BreakingNewsScroll Component
 * 
 * This component creates a breaking news ticker with a fantasy flair, designed to resemble
 * text moving across a scroll of paper.
 * 
 * The component accepts:
 * - `text`: A string to be displayed in the marquee.
 * - `className`: An optional string for styling overrides to ensure reusability.
 * 
 * TODO: Decide on where to set the actual breaking news text - admin or from the latest article? 
 */

export default function BreakingNewsScroll({
  className,
  text,
}: BreakingNewsScrollProps) {
  return (
    <div className={cn("relative w-full overflow-hidden py-2", className)}>
      <div className="mx-auto flex w-full max-w-[1024px] items-center justify-center">
        {/* The left handle of the scroll */}
        <div className="relative z-20 h-10 w-6 sm:h-16 sm:w-8 shrink-0 rounded-l-sm border-r-2 border-[#5c4033] bg-[#8b5a2b] shadow-xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,200,100,0.4)]">
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
          <div className="absolute top-0 bottom-0 right-1 w-[1px] bg-[#5c4033]/50" />
          <div className="absolute -left-1 -top-1 sm:-top-2 h-12 sm:h-20 w-2 sm:w-3 rounded-full bg-[#3e2723] shadow-md" />
        </div>
        {/* The "paper" and text of the scroll */}
        <div className="relative z-10 flex h-10 sm:h-14 flex-1 min-w-0 items-center overflow-hidden bg-[#f4e4bc] shadow-lg" style={{ boxShadow: 'inset 0 4px 8px -2px rgba(0,0,0,0.15), inset 0 -4px 8px -2px rgba(0,0,0,0.15), 0 10px 15px -3px rgba(0,0,0,0.1)' }}>
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E\")",
            }}
          />
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#d7c49e]" />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#d7c49e]" />

          <div className="absolute inset-0 flex items-center w-full overflow-hidden whitespace-nowrap">
            <div className="animate-marquee inline-block py-1 sm:py-2 pl-[100%]">
              <span className="mx-2 sm:mx-4 text-sm sm:text-xl font-bold text-[#4a3728] font-cinzel tracking-widest uppercase drop-shadow-[0_1px_1px_rgba(255,245,220,0.8)]">
                BREAKING NEWS: {text}
              </span>
            </div>
          </div>
        </div>
        {/* The right handle of the scroll */}
        <div className="relative z-20 h-10 w-6 sm:h-16 sm:w-8 shrink-0 rounded-r-sm border-l-2 border-[#5c4033] bg-[#8b5a2b] shadow-xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,200,100,0.4)]">
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
          <div className="absolute top-0 bottom-0 left-1 w-[1px] bg-[#5c4033]/50" />
          <div className="absolute -right-1 -top-1 sm:-top-2 h-12 sm:h-20 w-2 sm:w-3 rounded-full bg-[#3e2723] shadow-md" />
        </div>
      </div>
    </div>
  );
}
