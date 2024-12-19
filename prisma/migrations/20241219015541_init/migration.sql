-- CreateTable
CREATE TABLE `address` (
    `id` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(45) NULL,
    `place` VARCHAR(45) NOT NULL,
    `number` VARCHAR(45) NOT NULL,
    `neighborhood` VARCHAR(45) NOT NULL,
    `city` VARCHAR(45) NOT NULL,
    `uf` VARCHAR(2) NOT NULL,
    `createAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updateAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `client` (
    `id` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(45) NULL,
    `rg` VARCHAR(45) NULL,
    `name` VARCHAR(45) NOT NULL,
    `phone` VARCHAR(45) NOT NULL,
    `createAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updateAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `client_address` (
    `id` VARCHAR(191) NOT NULL,
    `client_id` INTEGER NULL,
    `address_id` INTEGER NULL,
    `createAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updateAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `client_address_addrees_fk_idx`(`address_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `delivery` (
    `id` VARCHAR(191) NOT NULL,
    `order_delivery_id` INTEGER NULL,
    `user_id` INTEGER NULL,
    `date` DATETIME(0) NOT NULL,
    `motor_kilometers` INTEGER NOT NULL,
    `date_completed` DATETIME(0) NULL,
    `createAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updateAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `delivery_order_delivery_id_fk_idx`(`order_delivery_id`),
    INDEX `delivery_userid_fk,_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `delivery_status` (
    `id` VARCHAR(191) NOT NULL,
    `delivery_id` INTEGER NULL,
    `status_id` INTEGER NULL,
    `createAt` DATETIME(0) NOT NULL,
    `updateAt` DATETIME(0) NOT NULL,

    INDEX `delivery_status_delivery_fk_idx`(`delivery_id`),
    INDEX `delivery_status_status_id_fk_idx`(`status_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `maintenance_motor` (
    `id` VARCHAR(191) NOT NULL,
    `type_maintenance_id` INTEGER NULL,
    `motorcycle_id` INTEGER NULL,
    `date` DATETIME(0) NOT NULL,
    `value` DECIMAL(10, 2) NOT NULL,
    `location` VARCHAR(45) NULL,
    `photo_receipt` VARCHAR(45) NULL,
    `createAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updateAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `maintenance_motor_motorcycle_fk_idx`(`motorcycle_id`),
    INDEX `maintenance_motor_type_maintenance_fk_idx`(`type_maintenance_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `motorcycle` (
    `id` VARCHAR(191) NOT NULL,
    `store_id` INTEGER NULL,
    `model` VARCHAR(45) NOT NULL,
    `year` INTEGER NOT NULL,
    `createAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updateAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `motorcycle_store_id_fk_idx`(`store_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_delivery` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NULL,
    `date` DATETIME(0) NOT NULL,
    `client_id` INTEGER NULL,
    `address_id` INTEGER NULL,
    `type_order_id` INTEGER NULL,
    `value` DECIMAL(10, 2) NOT NULL,
    `createAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updateAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `order_delivery_address_fk_idx`(`address_id`),
    INDEX `order_delivery_client_fk_idx`(`client_id`),
    INDEX `order_delivery_type_order_fk_idx`(`type_order_id`),
    INDEX `order_delivery_user_fk_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissions` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `createAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updateAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `position` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `createAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updateAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `position_permissions` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NULL,
    `permissions_id` INTEGER NULL,
    `createAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updateAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `position_permissions_permissions_id_fk_idx`(`permissions_id`),
    INDEX `position_permissions_user_id_fk_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `status` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `createAt` DATETIME(0) NOT NULL,
    `updateAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `store` (
    `id` VARCHAR(191) NOT NULL,
    `filial` VARCHAR(10) NOT NULL,
    `cnpj` VARCHAR(20) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `address_id` INTEGER NULL,
    `phone` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `createAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updateAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `store_address_fk_idx`(`address_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `type_maintenance` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `createAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updateAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `type_order` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `createAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updateAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `store_id` INTEGER NULL,
    `email` VARCHAR(45) NOT NULL,
    `phone` VARCHAR(45) NOT NULL,
    `pass` VARCHAR(60) NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `position_id` INTEGER NULL,
    `stats` TINYINT NOT NULL,
    `createAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updateAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `email_UNIQUE`(`email`),
    INDEX `user_store_id_fk_idx`(`store_id`),
    INDEX `users_position_id_fk_idx`(`position_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
