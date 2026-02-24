"use client";

import PricingCard from "@/components/subscription/PricingCard";
import FAQ from "@/components/subscription/FAQ";
import { authClient } from "@/lib/auth-client";

const noiseSvg = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E`;

export default function SubscribePage() {
  async function subscribeMonthly() {
    await authClient.subscription.upgrade({
      plan: "basic",
      successUrl: "http://localhost:3000/subscribe/success",
      cancelUrl: "http://localhost:3000/subscribe/error",
      disableRedirect: false,
      annual: false,
    });
  }
  async function subscribeYearly() {
    await authClient.subscription.upgrade({
      plan: "basic",
      successUrl: "http://localhost:3000/subscribe/success",
      cancelUrl: "http://localhost:3000/subscribe/error",
      disableRedirect: false,
      annual: true,
    });
  }
  async function unsubscribe() {
    await authClient.subscription.cancel({
      returnUrl: "http://localhost:3000/subscribe/unsubscribed",
      disableRedirect: false,
    });
  }

  return (
    <div className="min-h-screen bg-[#f5eccb] px-4 py-16 overflow-x-hidden relative">
      {/* Subtle radial gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(139,90,43,0.05)_100%)] pointer-events-none" />

      {/* Parchment texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage: `url("${noiseSvg}")` }}
      />

      <div className="relative z-10">
        {/* Section header matching landing page style */}
        <h1 className="metal-plate font-bold text-center text-3xl sm:text-4xl py-4 w-fit mx-auto px-12 mb-4 rounded-none sm:rounded-lg">
          <span className="text-magic-glint">Choose Your Path</span>
        </h1>
        <p className="text-amber-900/80 text-center text-lg max-w-xl mx-auto leading-relaxed">
          Every great adventurer needs the right provisions. Select the scroll
          that best suits your journey through the realm.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <PricingCard
            title="Wanderer"
            monthlyPrice={0}
            yearly={false}
            onClick={unsubscribe}
            features={[
              "Access to the Town Crier",
              "5 Scrolls per Moon",
              "Community Tavern Access",
              "Standard Raven Delivery",
            ]}
          />

          <PricingCard
            title="Apprentice"
            monthlyPrice={99}
            yearly={false}
            onClick={subscribeMonthly}
            features={[
              "Everything in Wanderer",
              "20 Scrolls per Moon",
              "Priority Raven Delivery",
              "Early Access to Chronicles",
            ]}
            highlighted
          />
          <PricingCard
            title="Archmage"
            monthlyPrice={99}
            yearly={true}
            features={[
              "Everything in Wanderer",
              "20 Scrolls per Moon",
              "Priority Raven Delivery",
              "Early Access to Chronicles",
            ]}
            onClick={subscribeYearly}
          />
        </div>

        <FAQ />
      </div>
    </div>
  );
}
