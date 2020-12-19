ALTER TABLE `booking` ADD `workshop_attended` TINYINT(1) NOT NULL DEFAULT '0' AFTER `attendance_verified`;
ALTER TABLE `user` ADD `last_cinema_attendance` DATETIME NULL AFTER `status`;
CREATE TABLE `cinema_schedule` (
 `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
 `event_id` bigint(20) unsigned NOT NULL,
 `time_from` time NOT NULL,
 `time_to` time NOT NULL,
 `attendees` int(11) NOT NULL,
 `status` tinyint(1) NOT NULL DEFAULT '1',
 `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 `updatedAt` timestamp NULL DEFAULT NULL,
 UNIQUE KEY `id` (`id`),
 KEY `fkey_cinema_schedule_event_id` (`event_id`),
 CONSTRAINT `fkey_cinema_schedule_event_id` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
); 

DELIMITER $$
CREATE PROCEDURE `createUpdate_range_cinema_schedule`(
	IN date_from Date,
    IN date_to Date,
    IN time_from Time,
    IN time_to Time,
    IN delStatus Boolean,
    IN old_time_from TIME,
    IN old_time_to TIME
)
BEGIN	
	DECLARE eventId BIGINT;
    DECLARE dateCounter DATE;
    SET dateCounter = date_from;   
        
    IF old_time_from IS NULL OR old_time_to IS NULL
    
    THEN
    
 	WHILE dateCounter <= date_to DO    	
        INSERT INTO event(campaign_id,schedule_date,status)
        	VALUES(1, dateCounter, delStatus)
            ON DUPLICATE KEY UPDATE
               id=LAST_INSERT_ID(id),
               schedule_date = VALUES(schedule_date),
               status = VALUES(status),
               updatedAt = CURRENT_TIMESTAMP();
               
        SET dateCounter = date_add(dateCounter, INTERVAL 1 DAY);

    END WHILE;   

    
        INSERT INTO cinema_schedule(event_id,time_from,time_to,status)
                SELECT id, time_from, time_to, delStatus
                FROM event
                ON DUPLICATE KEY UPDATE
                   time_from = VALUES(time_from),
                   time_to = VALUES(time_to),
                   status = VALUES(status),
                   updatedAt = CURRENT_TIMESTAMP();
    ELSE 
    	UPDATE cinema_schedule
 			INNER JOIN event on cinema_schedule.event_id = event.id
			SET cinema_schedule.time_from = time_from,
            	cinema_schedule.time_to = time_to,
                cinema_schedule.status = delStatus,
                cinema_schedule.updatedAt = CURRENT_TIMESTAMP()
			WHERE event.schedule_date >= date_from AND
            	  event.schedule_date <= date_to AND
            	  cinema_schedule.time_from = old_time_from AND 
                  cinema_schedule.time_to = old_time_to;
           
            	
    END IF;

END$$
DELIMITER ;