"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Check if current user has an active subscription
export async function checkActiveSubscription() {
  try {
    const subscriptions = await auth.api.listActiveSubscriptions({
      headers: await headers(),
    });
    return (
      subscriptions?.find(
        (sub) => sub.status === "active" || sub.status === "trialing",
      ) !== undefined
    );
  } catch (error) {
    return false;
  }
}
