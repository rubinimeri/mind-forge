-- DropForeignKey
ALTER TABLE "public"."Task" DROP CONSTRAINT "Task_columnId_fkey";

-- AlterTable
ALTER TABLE "public"."Task" ALTER COLUMN "theme" DROP NOT NULL,
ALTER COLUMN "columnId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "public"."Column"("id") ON DELETE SET NULL ON UPDATE CASCADE;
