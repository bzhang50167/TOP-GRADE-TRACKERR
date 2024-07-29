/*
  Warnings:

  - You are about to drop the `Warrenty` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Warrenty" DROP CONSTRAINT "Warrenty_jobId_fkey";

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "warrenty" INTEGER;

-- DropTable
DROP TABLE "Warrenty";
