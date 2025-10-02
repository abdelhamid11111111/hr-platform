/*
  Warnings:

  - Added the required column `dateOfBirth` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Employee` ADD COLUMN `dateOfBirth` VARCHAR(191) NOT NULL;
