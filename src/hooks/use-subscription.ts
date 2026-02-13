"use client";

import { useState, useEffect } from "react";
import { checkActiveSubscription } from "@/actions/subscription";
import { authClient } from "@/lib/auth-client";

/* Checks if the logged in user has an active subscription */

export function useSubscription() {
  const { data: session } = authClient.useSession();
  const [hasSubscription, setHasSubscription] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkStatus() {
      if (!session) {
        setHasSubscription(false);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const result = await checkActiveSubscription();
      setHasSubscription(result.hasActiveSubscription);
      setIsLoading(false);
    }

    checkStatus();
  }, [session]);

  return { hasSubscription, isLoading };
}
