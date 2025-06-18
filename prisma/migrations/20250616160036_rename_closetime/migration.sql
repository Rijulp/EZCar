/*
  Warnings:

  - You are about to drop the column `CloseTime` on the `WorkingHour` table. All the data in the column will be lost.
  - Added the required column `closeTime` to the `WorkingHour` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkingHour" DROP COLUMN "CloseTime",
ADD COLUMN     "closeTime" TEXT NOT NULL;
