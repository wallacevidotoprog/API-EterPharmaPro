-- AlterTable
ALTER TABLE `order_delivery` ADD COLUMN `obs` VARCHAR(191) NULL,
    MODIFY `user_id` VARCHAR(191) NULL,
    MODIFY `client_id` VARCHAR(191) NULL,
    MODIFY `address_id` VARCHAR(191) NULL,
    MODIFY `type_order_id` VARCHAR(191) NULL;
