/*
  Warnings:

  - You are about to drop the column `countryId` on the `town` table. All the data in the column will be lost.
  - Added the required column `districtId` to the `Town` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `town` DROP FOREIGN KEY `Town_countryId_fkey`;

-- AlterTable
ALTER TABLE `town` DROP COLUMN `countryId`,
    ADD COLUMN `districtId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `District` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `countryId` VARCHAR(191) NOT NULL,
    `createdBy` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Town` ADD CONSTRAINT `Town_districtId_fkey` FOREIGN KEY (`districtId`) REFERENCES `District`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `District` ADD CONSTRAINT `District_countryId_fkey` FOREIGN KEY (`countryId`) REFERENCES `Country`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
