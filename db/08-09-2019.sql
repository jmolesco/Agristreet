ALTER TABLE `booking` ADD `attendance_notified` BOOLEAN NOT NULL DEFAULT FALSE AFTER `language`;
ALTER TABLE `booking` ADD `confirmAt` DATETIME NULL AFTER `status`;
UPDATE `batch_schedule` SET `schedule` = '* 14-21 * * *' WHERE `batch_schedule`.`name` = 'AttendanceConfirmation';