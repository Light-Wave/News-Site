"use client";

import { useState } from "react";
import PricingCard from "@/components/subscription/PricingCard";
import PricingToggle from "@/components/subscription/PricingToggle";
import FAQ from "@/components/subscription/FAQ";

export default function SubscribePage() {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f1ea] px-4 py-16 overflow-x-hidden">
      <h1 className="text-center text-6xl md:text-4xl font-bold">
        Choose Your Plan
      </h1>
      <p className="text-gray-600 text-center">
        Select the perfect plan for your needs. Cancel anytime.
      </p>

      {/* Controlled toggle */}
      <PricingToggle yearly={yearly} onChange={setYearly} />

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <PricingCard
          title="Basic"
          priceMonthly={0}
          priceYearly={0}
          yearly={yearly}
          features={[
            "Essential Features",
            "5 Projects",
            "Standard support",
            "Limited Access",
          ]}
        />

        <PricingCard
          title="Pro"
          priceMonthly={9}
          priceYearly={86} // 20% off example
          yearly={yearly}
          features={[
            "Everything in Basic",
            "20 Projects",
            "Priority support",
            "Early access to stories",
          ]}
        />

        <PricingCard
          title="Premium"
          priceMonthly={19}
          priceYearly={182}
          yearly={yearly}
          features={[
            "Everything in Pro",
            "Unlimited Projects",
            "24/7 Support",
            "Direct editor access",
          ]}
        />
      </div>

      <FAQ />
    </div>
  );
}
