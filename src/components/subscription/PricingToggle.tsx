"use client";

import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function PricingToggle() {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <span className={!yearly ? "font-semibold" : "text-gray-600"}>
        Monthly
      </span>

      <Switch checked={yearly} onCheckedChange={setYearly} />

      <span className={yearly ? "font-semibold" : "text-gray-600"}>
        Yearly <span className="text-green-500">(Save 20%)</span>
      </span>
    </div>
  );
}
