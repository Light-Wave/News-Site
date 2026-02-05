-- DropForeignKey
ALTER TABLE "aiwriter" DROP CONSTRAINT "aiwriter_userId_fkey";

-- AddForeignKey
ALTER TABLE "aiwriter" ADD CONSTRAINT "aiwriter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
