/*
  Warnings:

  - You are about to drop the column `code` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `events` table. All the data in the column will be lost.
  - You are about to drop the `_eventsToservices` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `end` to the `events` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `name` on the `events` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_eventsToservices" DROP CONSTRAINT "_eventsToservices_A_fkey";

-- DropForeignKey
ALTER TABLE "_eventsToservices" DROP CONSTRAINT "_eventsToservices_B_fkey";

-- DropIndex
DROP INDEX "events_code_key";

-- AlterTable
ALTER TABLE "events" DROP COLUMN "code",
DROP COLUMN "date",
ADD COLUMN     "color" TEXT,
ADD COLUMN     "end" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "name",
ADD COLUMN     "name" INTEGER NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- DropTable
DROP TABLE "_eventsToservices";

-- CreateTable
CREATE TABLE "eventsTemplates" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "color" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "eventsTemplates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventsComments" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "eventsComments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "eventsTemplates_code_key" ON "eventsTemplates"("code");

-- AddForeignKey
ALTER TABLE "eventsTemplates" ADD CONSTRAINT "eventsTemplates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventsComments" ADD CONSTRAINT "eventsComments_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;
