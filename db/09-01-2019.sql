CREATE TABLE `notification_log` (
 `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
 `send_to` varchar(100) NOT NULL,
 `subject` varchar(100) NOT NULL,
 `body` varchar(1000) NOT NULL,
 `type` tinyint(1) NOT NULL,
 `status` tinyint(1) NOT NULL,
 `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`)
);
