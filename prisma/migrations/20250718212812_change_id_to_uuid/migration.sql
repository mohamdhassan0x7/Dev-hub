/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `_UserTeams` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `id` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_UserTeams` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_UserTeams" DROP CONSTRAINT "_UserTeams_B_fkey";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_UserTeams" DROP CONSTRAINT "_UserTeams_AB_pkey",
DROP COLUMN "B",
ADD COLUMN     "B" UUID NOT NULL,
ADD CONSTRAINT "_UserTeams_AB_pkey" PRIMARY KEY ("A", "B");

-- CreateIndex
CREATE INDEX "_UserTeams_B_index" ON "_UserTeams"("B");

-- AddForeignKey
ALTER TABLE "_UserTeams" ADD CONSTRAINT "_UserTeams_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
