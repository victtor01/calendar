/*
  Warnings:

  - The `birth` column on the `clients` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "birth",
ADD COLUMN     "birth" TIMESTAMP(3);
