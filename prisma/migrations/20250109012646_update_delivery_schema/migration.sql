/*
  Warnings:

  - You are about to drop the column `date_completed` on the `delivery` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `client_address` DROP FOREIGN KEY `client_address_address_id_fkey`;

-- DropForeignKey
ALTER TABLE `client_address` DROP FOREIGN KEY `client_address_client_id_fkey`;

-- AlterTable
ALTER TABLE `delivery` DROP COLUMN `date_completed`;

-- AlterTable
ALTER TABLE `delivery_status` MODIFY `createAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `updateAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- CreateTable
CREATE TABLE `view_order` (
    `id` VARCHAR(191) NOT NULL,
    `name_user` VARCHAR(45) NULL,
    `date` DATETIME(3) NULL,
    `client_name` VARCHAR(45) NULL,
    `place` VARCHAR(45) NULL,
    `number` INTEGER NULL,
    `neighborhood` VARCHAR(45) NULL,
    `city` VARCHAR(45) NULL,
    `uf` VARCHAR(45) NULL,
    `name_order` VARCHAR(45) NULL,
    `value` DECIMAL(10, 2) NULL,
    `obs` VARCHAR(45) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `delivery_status` ADD CONSTRAINT `delivery_status_delivery_id_fkey` FOREIGN KEY (`delivery_id`) REFERENCES `delivery`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `delivery_status` ADD CONSTRAINT `delivery_status_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `status`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
