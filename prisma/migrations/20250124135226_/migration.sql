/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `employee` ADD COLUMN `name` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Employee_name_key` ON `Employee`(`name`);
