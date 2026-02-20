import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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
