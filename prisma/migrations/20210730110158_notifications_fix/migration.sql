/*
  Warnings:

  - You are about to drop the column `isNotified` on the `Notification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "isNotified",
ADD COLUMN     "isSeen" BOOLEAN NOT NULL DEFAULT false;
