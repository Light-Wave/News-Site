import PricingToggle from "@/components/subscription/PricingToggle";
import PricingCard from "@/components/subscription/PricingCard";
import FAQ from "@/components/subscription/FAQ";

export default function SubscribePage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#f6efe7] to-[#fdfbf7]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold mb-3">
            Choose Your Plan
          </h1>
        </div>

        {/* Toggle */}
        <PricingToggle />

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
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
    </div>
  );
}
