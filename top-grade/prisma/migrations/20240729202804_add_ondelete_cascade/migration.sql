-- DropForeignKey
ALTER TABLE "Warrenty" DROP CONSTRAINT "Warrenty_jobId_fkey";

-- AddForeignKey
ALTER TABLE "Warrenty" ADD CONSTRAINT "Warrenty_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;
