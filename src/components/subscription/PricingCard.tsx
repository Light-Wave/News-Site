import { Check } from "lucide-react";
import { Button } from "../ui/button";

export default function PricingCard({
  title,
  monthlyPrice,
  yearly,
  features,
  onClick,
  highlighted,
}: {
  title: string;
  monthlyPrice: number;
  yearly: boolean;
  features: string[];
  onClick?: () => void;
  highlighted?: boolean;
}) {
  const price = yearly ? calculateYearlyPrice(monthlyPrice) : monthlyPrice;

  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-lg border-2 p-6 transition-all duration-300 hover:-translate-y-1 ${
        highlighted
          ? "border-amber-600/80 shadow-[0_0_25px_rgba(184,134,11,0.3)]"
          : "border-amber-800/40"
      }`}
      style={{
        background:
          "linear-gradient(135deg, #f4e4bc 0%, #f8f0dc 50%, #e8d5a3 100%)",
      }}
    >
      {/* Decorative inset border */}
      <div className="absolute inset-3 border border-amber-700/15 rounded pointer-events-none" />

      {/* Highlighted badge */}
      {highlighted && (
        <div className="absolute -top-px left-1/2 -translate-x-1/2">
          <div className="magic-button-gold px-4 py-1 rounded-b-md text-xs font-bold tracking-wider uppercase">
            Most Popular
          </div>
        </div>
      )}

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-amber-700/40" />
      <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-amber-700/40" />
      <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-amber-700/40" />
      <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-amber-700/40" />

      <div className="relative z-10">
        <h2 className="text-xl font-bold mb-4 text-amber-900/90">{title}</h2>

        <div className="mb-6">
          <span className="text-4xl font-bold text-amber-900">{price} sek</span>
          <span className="text-amber-800/60 ml-1">
            / {yearly ? "year" : "month"}
          </span>
          {yearly && (
            <span className="block text-sm text-amber-700/70 mt-1 italic">
              Save 20% with yearly billing
            </span>
          )}
        </div>

        {/* Decorative divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-amber-700/30 to-transparent mb-6" />

        <ul className="space-y-3 mb-8">
          {features.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-sm text-amber-900/80"
            >
              <Check className="h-4 w-4 text-amber-700 shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        {onClick === undefined ? (
          <Button
            className="magic-button mt-auto w-full rounded-md py-3 text-sm font-bold transition-all duration-300 opacity-60 cursor-not-allowed"
            disabled={true}
          >
            Current Quest
          </Button>
        ) : (
          <Button
            className="magic-button-gold mt-auto w-full rounded-md py-3 text-sm font-bold transition-all duration-300 hover:scale-[1.02]"
            onClick={onClick}
            type="button"
          >
            {price === 0 ? "Abandon your quest" : "Begin Your Quest"}
          </Button>
        )}
      </div>
    </div>
  );
}

function calculateYearlyPrice(monthlyPrice: number) {
  return Math.floor(monthlyPrice * 12 * 0.8); // 20% discount
}
