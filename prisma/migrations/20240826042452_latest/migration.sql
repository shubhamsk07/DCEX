/*
  Warnings:

  - You are about to drop the column `SolWalletId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_id_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "SolWalletId",
ADD COLUMN     "inrWalletId" TEXT,
ADD COLUMN     "solWalletId" TEXT,
ALTER COLUMN "sub" SET DEFAULT '';

-- CreateTable
CREATE TABLE "InrWalet" (
    "id" TEXT NOT NULL,
    "balance" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "InrWalet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InrWalet_userId_key" ON "InrWalet"("userId");

-- AddForeignKey
ALTER TABLE "InrWalet" ADD CONSTRAINT "InrWalet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
