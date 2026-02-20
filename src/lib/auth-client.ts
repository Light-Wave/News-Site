import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import { ac, admin, editor, user, writer } from "@/lib/permissions";
import { stripeClient } from "@better-auth/stripe/client";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
  plugins: [
    adminClient({
      ac,
      roles: {
        admin,
        user,
        editor,
        writer,
      },
    }),
    stripeClient({
      subscription: true, //if you want to enable subscription management
    }),
  ],
});
