/*
  Warnings:

  - Added the required column `plan` to the `subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referenceId` to the `subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subscription" ADD COLUMN     "cancelAt" TIMESTAMP(3),
ADD COLUMN     "cancelAtPeriodEnd" BOOLEAN DEFAULT false,
ADD COLUMN     "canceledAt" TIMESTAMP(3),
ADD COLUMN     "endedAt" TIMESTAMP(3),
ADD COLUMN     "periodEnd" TIMESTAMP(3),
ADD COLUMN     "periodStart" TIMESTAMP(3),
ADD COLUMN     "plan" TEXT NOT NULL,
ADD COLUMN     "referenceId" TEXT NOT NULL,
ADD COLUMN     "seats" INTEGER,
ADD COLUMN     "status" TEXT DEFAULT 'incomplete',
ADD COLUMN     "stripeCustomerId" TEXT,
ADD COLUMN     "stripeSubscriptionId" TEXT,
ADD COLUMN     "trialEnd" TIMESTAMP(3),
ADD COLUMN     "trialStart" TIMESTAMP(3);
