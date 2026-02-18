// A spot to add util functions that might be used in more than your current working file. Feel free to add as many functions as you want
// (doesn't matter if the function only gets used once)

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export function isNumericString(value: string): value is `${number}` {
  return /^\d+$/.test(value);
}

export function degreesToDirection(deg: number): string {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const normalizedDeg = ((deg % 360) + 360) % 360;
  const index = Math.floor((normalizedDeg + 22.5) / 45) % 8;
  return directions[index];
}

export async function redirectControl(
  allowedRoles: string[],
  redirectTo: string,
  missingRoleRedirectTo?: string,
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  // Unauthenticated user: redirect to the primary target.
  if (!session) {
    redirect(redirectTo);
  }
  const userRole = session.user?.role;
  // Authenticated but no role assigned: allow a distinct redirect target,
  // defaulting to the primary redirect to preserve existing behavior.
  if (!userRole) {
    redirect(missingRoleRedirectTo ?? redirectTo);
  }
  // Authenticated with a role that is not allowed: redirect to the primary target.
  if (!allowedRoles.includes(userRole)) {
    redirect(redirectTo);
  }
}
