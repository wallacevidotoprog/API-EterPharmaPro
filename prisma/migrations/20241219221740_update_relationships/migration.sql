/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `client` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[rg]` on the table `client` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[client_id,address_id]` on the table `client_address` will be added. If there are existing duplicate values, this will fail.
  - Made the column `client_id` on table `client_address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address_id` on table `client_address` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `client_address` MODIFY `client_id` VARCHAR(191) NOT NULL,
    MODIFY `address_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `stats` BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX `client_cpf_key` ON `client`(`cpf`);

-- CreateIndex
CREATE UNIQUE INDEX `client_rg_key` ON `client`(`rg`);

-- CreateIndex
CREATE UNIQUE INDEX `unique_client_address` ON `client_address`(`client_id`, `address_id`);

-- AddForeignKey
ALTER TABLE `client_address` ADD CONSTRAINT `client_address_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `client_address` ADD CONSTRAINT `client_address_address_id_fkey` FOREIGN KEY (`address_id`) REFERENCES `address`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
