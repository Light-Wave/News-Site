"use client";

import { Switch } from "@/components/ui/switch";

export default function PricingToggle({
  yearly,
  onChange,
}: {
  yearly: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="mt-6 flex items-center justify-center gap-4">
      <span className={!yearly ? "font-semibold" : "text-gray-600"}>
        Monthly
      </span>

      <Switch
        checked={yearly}
        onCheckedChange={onChange}
        aria-label="Toggle between monthly and yearly billing"
      />

      <span className={yearly ? "font-semibold" : "text-gray-600"}>
        Yearly <span className="text-green-600">(Save 20%)</span>
      </span>
    </div>
  );
}
