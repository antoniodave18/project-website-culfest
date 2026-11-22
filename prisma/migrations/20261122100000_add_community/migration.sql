-- CreateTable
CREATE TABLE `Community` (
    `id` CHAR(36) NOT NULL,
    `slug` VARCHAR(100) NOT NULL,
    `name` VARCHAR(160) NOT NULL,
    `summary` VARCHAR(500) NOT NULL,
    `description` TEXT NOT NULL,
    `logoUrl` VARCHAR(512) NULL,
    `established` VARCHAR(100) NULL,
    `locationUrl` VARCHAR(2048) NULL,
    `instagramUrl` VARCHAR(2048) NULL,
    `websiteUrl` VARCHAR(2048) NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 1000,
    `slugLocked` BOOLEAN NOT NULL DEFAULT false,
    `publicationStatus` ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `claimStatus` ENUM('UNCLAIMED', 'PENDING', 'CLAIMED', 'REJECTED') NOT NULL DEFAULT 'UNCLAIMED',
    `verificationStatus` ENUM('UNVERIFIED', 'PENDING', 'VERIFIED', 'REJECTED') NOT NULL DEFAULT 'UNVERIFIED',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Community_slug_key`(`slug`),
    INDEX `Community_publicationStatus_sortOrder_slug_idx`(`publicationStatus`, `sortOrder`, `slug`),
    INDEX `Community_updatedAt_id_idx`(`updatedAt`, `id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

