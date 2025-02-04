/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `employee` DROP FOREIGN KEY `Employee_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `employee` DROP FOREIGN KEY `Employee_echelonId_fkey`;

-- DropForeignKey
ALTER TABLE `employee` DROP FOREIGN KEY `Employee_functionId_fkey`;

-- DropForeignKey
ALTER TABLE `employee` DROP FOREIGN KEY `Employee_gradeId_fkey`;

-- AlterTable
ALTER TABLE `employee` MODIFY `functionId` VARCHAR(191) NULL,
    MODIFY `gradeId` VARCHAR(191) NULL,
    MODIFY `echelonId` VARCHAR(191) NULL,
    MODIFY `categoryId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Employee_userId_key` ON `Employee`(`userId`);

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_functionId_fkey` FOREIGN KEY (`functionId`) REFERENCES `Function`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_gradeId_fkey` FOREIGN KEY (`gradeId`) REFERENCES `Grade`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_echelonId_fkey` FOREIGN KEY (`echelonId`) REFERENCES `Echelon`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
