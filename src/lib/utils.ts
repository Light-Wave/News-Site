import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { headers } from "next/headers";
import { auth } from "./auth";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function isSubscriber() {
  const subscriptions = await auth.api.listActiveSubscriptions({
    headers: await headers(),
  });
  return (
    subscriptions?.find(
      (sub) => sub.status === "active" || sub.status === "trialing",
    ) !== undefined
  );
}
