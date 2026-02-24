-- DropForeignKey
ALTER TABLE "subscription" DROP CONSTRAINT "subscription_subscriptionTypeId_fkey";

-- AlterTable
ALTER TABLE "subscription" ALTER COLUMN "expiresAt" DROP NOT NULL,
ALTER COLUMN "subscriptionTypeId" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "subscription" ADD CONSTRAINT "subscription_subscriptionTypeId_fkey" FOREIGN KEY ("subscriptionTypeId") REFERENCES "subscriptiontype"("id") ON DELETE SET NULL ON UPDATE CASCADE;
