-- AlterTable
ALTER TABLE `client_address` MODIFY `client_id` VARCHAR(191) NULL,
    MODIFY `address_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `delivery` MODIFY `order_delivery_id` VARCHAR(191) NULL,
    MODIFY `user_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `delivery_status` MODIFY `delivery_id` VARCHAR(191) NULL,
    MODIFY `status_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `maintenance_motor` MODIFY `type_maintenance_id` VARCHAR(191) NULL,
    MODIFY `motorcycle_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `motorcycle` MODIFY `store_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `position_permissions` MODIFY `user_id` VARCHAR(191) NULL,
    MODIFY `permissions_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `store` MODIFY `address_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `store_id` VARCHAR(191) NULL,
    MODIFY `position_id` VARCHAR(191) NULL;
