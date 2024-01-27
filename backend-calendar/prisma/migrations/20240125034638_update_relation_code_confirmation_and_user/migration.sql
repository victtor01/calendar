-- DropForeignKey
ALTER TABLE "codes_confirmation" DROP CONSTRAINT "codes_confirmation_userId_fkey";

-- AddForeignKey
ALTER TABLE "codes_confirmation" ADD CONSTRAINT "codes_confirmation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
