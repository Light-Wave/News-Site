"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

/**
 * SubscriptionBox Component
 * TODO - Implemnent an actual check for user subscription status
 * TODO - Add an actual function to the submit button other then spitting out a console.log
 */


const noiseSvg = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E`;

interface SubscriptionBoxProps {
  className?: string;
}

export default function SubscriptionBox({ className }: SubscriptionBoxProps) {
  const [email, setEmail] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual subscription logic
    console.log("Subscribing:", email);
  };

  return (
    <div className={cn("relative w-full max-w-[1024px] mx-auto py-8 px-4", className)}>
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Corner highlights*/}
        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-amber-700/60 rounded-tl-sm" />
        <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-amber-700/60 rounded-tr-sm" />
        <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-amber-700/60 rounded-bl-sm" />
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-amber-700/60 rounded-br-sm" />

        {/* Main container */}
        <div className="relative overflow-hidden rounded-lg border-2 border-amber-800/40 bg-gradient-to-br from-[#f4e4bc] via-[#f8f0dc] to-[#e8d5a3] p-6 sm:p-8 shadow-2xl">
          {/* Parchment texture overlay - Re-using the same noise svg as the breaking news ticker */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{ backgroundImage: `url("${noiseSvg}")` }}
          />

          {/* Aged paper edge effect */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-amber-900/10 via-transparent to-amber-900/10" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-amber-900/5 via-transparent to-amber-900/10" />

          {/* Decorative inset border */}
          <div className="absolute inset-3 border border-amber-700/20 rounded pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold">
              <span className="text-magic-glint">
                Join the Arcane Circle
              </span>
            </h2>
            <p className="text-amber-900/90 max-w-md text-base sm:text-lg leading-relaxed">
              Receive whispers from beyond the veil! Our enchanted ravens deliver
              the latest arcane discoveries directly to your crystal ball.
            </p>
            <p className="text-amber-800/70 text-sm italic max-w-sm">
              By the decree of the Grand Wizard Council, subscription is
              &quot;strongly encouraged&quot; for all inhabitants of the realm.
              Non-compliance may result in mild inconvenience.
            </p>

            {/* Subscription form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row sm:items-center gap-3 w-full max-w-md mt-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.name@enchanted-mail.realm"
                className="subscription-input flex-1 px-4 py-3 rounded-md border-2 border-amber-700/30 bg-[#faf6ed]/80 text-amber-900 placeholder:text-amber-700/50 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/30 transition-all duration-300"
                required
                suppressHydrationWarning
              />
              <Button
                type="submit"
                className="subscription-button h-auto px-6 py-3 rounded-md font-bold text-amber-100 transition-all duration-300 hover:scale-105"
              >
                Subscribe
              </Button>
            </form>
            <p className="text-amber-800/60 text-xs mt-2">
              🔮 No hexes • 📿 Easily unsubscribe • 🧙 Wizard-approved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
