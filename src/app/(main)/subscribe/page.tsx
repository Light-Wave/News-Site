"use client";

import { useState } from "react";
import PricingCard from "@/components/subscription/PricingCard";
import PricingToggle from "@/components/subscription/PricingToggle";
import FAQ from "@/components/subscription/FAQ";
import { authClient } from "@/lib/auth-client";

export default function SubscribePage() {
  const [yearly, setYearly] = useState(false);
  async function subscribe() {
    await authClient.subscription.upgrade({
      plan: "basic",
      successUrl: "http://localhost:3000",
      cancelUrl: "http://localhost:3000",
      disableRedirect: false,
    });
  }
  async function unsubscribe() {
    await authClient.subscription.cancel({
      returnUrl: "http://localhost:3000",
      disableRedirect: false,
    });
  }

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

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
        <PricingCard
          title="Free"
          monthlyPrice={0}
          yearly={yearly}
          features={[
            "Essential Features",
            "5 Projects",
            "Standard support",
            "Limited Access",
          ]}
        />

        <PricingCard
          title="Basic"
          monthlyPrice={9}
          yearly={yearly}
          features={[
            "Everything in Free",
            "20 Projects",
            "Priority support",
            "Early access to stories",
          ]}
        />
      </div>

      <FAQ />
    </div>
  );
}
