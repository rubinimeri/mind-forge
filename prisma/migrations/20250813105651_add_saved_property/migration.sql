-- DropForeignKey
ALTER TABLE "public"."Task" DROP CONSTRAINT "Task_AIResponseId_fkey";

-- AlterTable
ALTER TABLE "public"."AIResponse" ADD COLUMN     "saved" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."Task" ALTER COLUMN "AIResponseId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_AIResponseId_fkey" FOREIGN KEY ("AIResponseId") REFERENCES "public"."AIResponse"("id") ON DELETE SET NULL ON UPDATE CASCADE;
