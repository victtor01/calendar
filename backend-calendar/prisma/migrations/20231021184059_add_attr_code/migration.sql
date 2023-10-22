/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `events` will be added. If there are existing duplicate values, this will fail.
  - The required column `code` was added to the `events` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "events" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "events_code_key" ON "events"("code");
