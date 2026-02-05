/*
  Warnings:

  - You are about to drop the column `categoryId` on the `article` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "article" DROP CONSTRAINT "article_categoryId_fkey";

-- DropIndex
DROP INDEX "article_categoryId_idx";

-- AlterTable
ALTER TABLE "article" DROP COLUMN "categoryId";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT;

-- CreateTable
CREATE TABLE "aiwriter" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "aiInstructions" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "aiwriter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ArticleToCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ArticleToCategory_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_AiWriterToCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AiWriterToCategory_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "aiwriter_userId_key" ON "aiwriter"("userId");

-- CreateIndex
CREATE INDEX "_ArticleToCategory_B_index" ON "_ArticleToCategory"("B");

-- CreateIndex
CREATE INDEX "_AiWriterToCategory_B_index" ON "_AiWriterToCategory"("B");

-- AddForeignKey
ALTER TABLE "aiwriter" ADD CONSTRAINT "aiwriter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToCategory" ADD CONSTRAINT "_ArticleToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToCategory" ADD CONSTRAINT "_ArticleToCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AiWriterToCategory" ADD CONSTRAINT "_AiWriterToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "aiwriter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AiWriterToCategory" ADD CONSTRAINT "_AiWriterToCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
