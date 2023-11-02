-- CreateEnum
CREATE TYPE "EventsStatus" AS ENUM ('ACTIVATED', 'CONCLUDED', 'FILED');

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "status" "EventsStatus" NOT NULL DEFAULT 'ACTIVATED';
