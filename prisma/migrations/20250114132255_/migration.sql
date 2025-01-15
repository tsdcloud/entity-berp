/*
  Warnings:

  - You are about to drop the `client` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `entityId` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `clientbankaccount` DROP FOREIGN KEY `ClientBankAccount_clientId_fkey`;

-- AlterTable
ALTER TABLE `supplier` ADD COLUMN `entityId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `client`;

-- CreateTable
CREATE TABLE `Customer` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdBy` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Supplier` ADD CONSTRAINT `Supplier_entityId_fkey` FOREIGN KEY (`entityId`) REFERENCES `Entity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClientBankAccount` ADD CONSTRAINT `ClientBankAccount_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
