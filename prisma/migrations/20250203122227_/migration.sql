-- AlterTable
ALTER TABLE `district` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `town` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true;
