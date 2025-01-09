-- AddForeignKey
ALTER TABLE `delivery` ADD CONSTRAINT `delivery_order_delivery_id_fkey` FOREIGN KEY (`order_delivery_id`) REFERENCES `order_delivery`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
