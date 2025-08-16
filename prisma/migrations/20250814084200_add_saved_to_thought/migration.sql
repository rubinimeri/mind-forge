/*
  Warnings:

  - You are about to drop the column `saved` on the `AIResponse` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."AIResponse" DROP COLUMN "saved";

-- AlterTable
ALTER TABLE "public"."Thought" ADD COLUMN     "saved" BOOLEAN NOT NULL DEFAULT false;
