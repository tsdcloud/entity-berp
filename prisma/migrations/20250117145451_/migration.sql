/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Bank` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Country` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,countryId]` on the table `District` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Echelon` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Entity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Function` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Grade` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Shift` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[startTime,endTime]` on the table `Shift` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,entityId]` on the table `Site` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Supplier` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,districtId]` on the table `Town` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `shift` MODIFY `endTime` VARCHAR(191) NOT NULL,
    MODIFY `startTime` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Bank_name_key` ON `Bank`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Category_name_key` ON `Category`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Country_name_key` ON `Country`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Customer_name_key` ON `Customer`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `District_name_countryId_key` ON `District`(`name`, `countryId`);

-- CreateIndex
CREATE UNIQUE INDEX `Echelon_name_key` ON `Echelon`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Employee_email_key` ON `Employee`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `Employee_phone_key` ON `Employee`(`phone`);

-- CreateIndex
CREATE UNIQUE INDEX `Entity_name_key` ON `Entity`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Function_name_key` ON `Function`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Grade_name_key` ON `Grade`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Shift_name_key` ON `Shift`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Shift_startTime_endTime_key` ON `Shift`(`startTime`, `endTime`);

-- CreateIndex
CREATE UNIQUE INDEX `Site_name_entityId_key` ON `Site`(`name`, `entityId`);

-- CreateIndex
CREATE UNIQUE INDEX `Supplier_name_key` ON `Supplier`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Town_name_districtId_key` ON `Town`(`name`, `districtId`);
