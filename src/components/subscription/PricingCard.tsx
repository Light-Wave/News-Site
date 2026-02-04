import { Check } from "lucide-react";

export default function PricingCard({
  title,
  price,
  features,
}: {
  title: string;
  price: string;
  features: string[];
}) {
  return (
    <div className="flex flex-col rounded-xl border bg-white p-6">
      <h1 className="text-xl font-semibold mb-4">{title}</h1>

      <div className="mb-6">
        <span className="text-4xl font-bold">${price}</span>
        <span className="text-gray-500"> / month</span>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm">
            <Check className="h-4 w-4 text-green-600" />
            {item}
          </li>
        ))}
      </ul>

      <button
        className="
          mt-6
          w-full
          rounded-lg
          border
          py-3
          text-sm
          font-medium
         bg-yellow-500
          transition-colors
         hover:bg-orange-600
        "
      >
        Choose Plan
      </button>
    </div>
  );
}
