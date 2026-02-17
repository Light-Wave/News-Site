import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";

import { admin as adminPlugin } from "better-auth/plugins";
import { sendMail } from "./mail";
import { ac, admin, editor, user, writer } from "@/lib/permissions";
import { stripe } from "@better-auth/stripe";
import Stripe from "stripe";

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-11-17.clover", // Latest API version as of Stripe SDK v20.0.0
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      void sendMail(
        user.email,
        "Reset your password",
        `Click the link to reset your password: ${url}`,
      );
    },
    onPasswordReset: async ({ user }, request) => {
      // your logic here
      console.log(`Password for user ${user.email} has been reset.`);
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendMail(
        user.email,
        "Verify your email address",
        `Click the link to verify your email: ${url}`,
      );
    },
  },
  plugins: [
    adminPlugin({
      ac,
      roles: { admin, user, writer, editor },
    }),
    stripe({
      stripeClient,
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
      createCustomerOnSignUp: true,
      subscription: {
        enabled: true,
        plans: [
          {
            name: "basic", // the name of the plan, it'll be automatically lower cased when stored in the database
            priceId: "price_1SzdZAKen9F2FPENwZAxr94I", // the price ID from stripe
            annualDiscountPriceId: "price_1Szda2Ken9F2FPENoosHSpIr", // (optional) the price ID for annual billing with a discount
          },
        ],
      },
    }),
  ],
});
