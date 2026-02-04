import PricingCard from "@/components/subscription/PricingCard";
import PricingToggle from "@/components/subscription/PricingToggle";
import FAQ from "@/components/subscription/FAQ";

export default function SubscribePage() {
  return (
    <div className="min-h-screen bg-[#f5f1ea] px-4 py-16 overflow-x-hidden">
      {/* Title */}
      <h1 className="text-center text-3xl md:text-4xl font-serif font-bold">
        Choose Your Plan
      </h1>

      {/* Monthly / Yearly toggle */}
      <PricingToggle />

      {/* Pricing grid */}
      <div
        className="
          mt-12
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-6
          max-w-7xl
          mx-auto
        "
      >
        <PricingCard
          title="Basic"
          price="Free"
          features={[
            "Unlimited articles",
            "Daily newsletter",
            "Standard support",
          ]}
        />

        <PricingCard
          title="Pro"
          price="9"
          features={[
            "Everything in Basic",
            "Ad-free experience",
            "Early access to stories",
          ]}
        />

        <PricingCard
          title="Premium"
          price="19"
          features={[
            "Everything in Pro",
            "Exclusive investigations",
            "Direct editor access",
          ]}
        />
      </div>

      {/* FAQ */}
      <FAQ />
    </div>
  );
}
