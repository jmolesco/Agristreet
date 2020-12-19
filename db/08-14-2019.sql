CREATE TABLE `link_click` (
 `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
 `name` varchar(100) NOT NULL,
 `count` int(4) NOT NULL,
 `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 `updatedAt` timestamp NULL DEFAULT NULL,
 PRIMARY KEY (`id`)
);

INSERT INTO `link_click` (`id`, `name`, `count`, `createdAt`, `updatedAt`) VALUES (NULL, 'download_booking', '0', CURRENT_TIMESTAMP, NULL);

ALTER TABLE `booking` ADD `cinema_attended` BOOLEAN NOT NULL DEFAULT FALSE AFTER `workshop_attended`;