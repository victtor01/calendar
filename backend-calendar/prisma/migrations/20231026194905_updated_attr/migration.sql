/*
  Warnings:

  - You are about to drop the column `createAt` on the `eventsTemplates` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `eventsTemplates` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "eventsTemplates" DROP COLUMN "createAt",
DROP COLUMN "updateAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
