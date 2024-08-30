/*
  Warnings:

  - You are about to drop the column `inrWalletId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `solWalletId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `InrWalet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InrWalet" DROP CONSTRAINT "InrWalet_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "inrWalletId",
DROP COLUMN "solWalletId",
ADD COLUMN     "SolWalletId" TEXT;

-- DropTable
DROP TABLE "InrWalet";
