"use server";

import { headers } from "next/headers";
import { auth } from "./auth";

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
