/*
  Warnings:

  - You are about to drop the column `fromLocation` on the `LocationLog` table. All the data in the column will be lost.
  - You are about to drop the column `toLocation` on the `LocationLog` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Warranty` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,userId]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromLocationId` to the `LocationLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toLocationId` to the `LocationLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `Warranty` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Warranty` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Location_name_key";

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "LocationLog" DROP COLUMN "fromLocation",
DROP COLUMN "toLocation",
ADD COLUMN     "fromLocationId" TEXT NOT NULL,
ADD COLUMN     "toLocationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Warranty" DROP COLUMN "location",
ADD COLUMN     "locationId" TEXT NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Location_name_userId_key" ON "Location"("name", "userId");

-- AddForeignKey
ALTER TABLE "Warranty" ADD CONSTRAINT "Warranty_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationLog" ADD CONSTRAINT "LocationLog_fromLocationId_fkey" FOREIGN KEY ("fromLocationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationLog" ADD CONSTRAINT "LocationLog_toLocationId_fkey" FOREIGN KEY ("toLocationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
