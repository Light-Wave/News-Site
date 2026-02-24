/*
  Warnings:

  - You are about to drop the column `createdAt` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionTypeId` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the `subscriptiontype` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "subscription" DROP CONSTRAINT "subscription_subscriptionTypeId_fkey";

-- DropForeignKey
ALTER TABLE "subscription" DROP CONSTRAINT "subscription_userId_fkey";

-- AlterTable
ALTER TABLE "subscription" DROP COLUMN "createdAt",
DROP COLUMN "expiresAt",
DROP COLUMN "subscriptionTypeId",
DROP COLUMN "userId";

-- DropTable
DROP TABLE "subscriptiontype";
