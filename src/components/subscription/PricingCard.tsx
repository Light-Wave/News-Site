import { cn } from "@/lib/utils";

export default function PricingCard({
  title,
  price,
  features,
  highlighted = false,
}: {
  title: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-8 bg-white text-left",
        highlighted && "border-black shadow-lg scale-[1.03]",
      )}
    >
      <h1 className="text-xl font-semibold mb-2">{title}</h1>

      <p className="text-4xl font-bold mb-6">
        ${price}
        <span className="text-base font-normal text-gray-500"> / month</span>
      </p>

      <ul className="space-y-3 mb-8">
        {features.map((feature) => (
          <li key={feature} className="text-gray-700">
            • {feature}
          </li>
        ))}
      </ul>

      <button
        className={cn(
          "w-full py-3 rounded font-medium",
          highlighted
            ? "bg-black text-white"
            : "border border-black hover:bg-black hover:text-white",
        )}
      >
        Subscribe
      </button>
    </div>
  );
}
