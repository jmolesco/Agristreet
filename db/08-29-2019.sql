DROP PROCEDURE `createUpdate_range_event_schedule`;
DROP PROCEDURE `createUpdate_range_cinema_schedule`;
DROP PROCEDURE `createUpdate_range_workshop_schedule`;



DELIMITER $$
CREATE  PROCEDURE `createUpdate_range_event_schedule`(
	IN date_from Date,
    IN date_to Date,
    IN time_from Time,
    IN time_to Time,
    IN capacity INT,
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

    
        INSERT INTO event_schedule(event_id,time_from,time_to,capacity,status)
                SELECT id, time_from, time_to, capacity, delStatus
                FROM event
                WHERE event.schedule_date >= date_from AND event.schedule_date <= date_to
                ON DUPLICATE KEY UPDATE
                   time_from = VALUES(time_from),
                   time_to = VALUES(time_to),
                   capacity = VALUES(capacity),
                   status = VALUES(status),
                   updatedAt = CURRENT_TIMESTAMP();
    ELSE 
    	UPDATE event_schedule
 			INNER JOIN event on event_schedule.event_id = event.id
			SET event_schedule.time_from = time_from,
            	event_schedule.time_to = time_to,
                event_schedule.capacity = capacity,
                event_schedule.status = delStatus,
                event_schedule.updatedAt = CURRENT_TIMESTAMP()
			WHERE event.schedule_date >= date_from AND
            	  event.schedule_date <= date_to AND
            	  event_schedule.time_from = old_time_from AND 
                  event_schedule.time_to = old_time_to;
           
            	
    END IF;

END$$
DELIMITER ;

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
                WHERE event.schedule_date >= date_from AND event.schedule_date <= date_to
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

DELIMITER $$
CREATE PROCEDURE `createUpdate_range_workshop_schedule`(IN `date_from` DATE, IN `date_to` DATE, IN `time_from` TIME, IN `time_to` TIME, IN `workshop_id` BIGINT, IN `workshop_capacity` INT, IN `delStatus` BOOLEAN, IN `old_time_from` TIME, IN `old_time_to` TIME)
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

    
        INSERT INTO workshop_schedule(event_id, workshop_id, time_from,time_to,workshop_capacity,status)
                SELECT id, workshop_id, time_from, time_to, workshop_capacity, delStatus
                FROM event 
                WHERE event.schedule_date >= date_from AND
            	  event.schedule_date <= date_to 
                ON DUPLICATE KEY UPDATE
                   time_from = VALUES(time_from),
                   time_to = VALUES(time_to),
                   workshop_capacity = VALUES(workshop_capacity),
                   workshop_id= VALUES(workshop_id),
                   status = VALUES(status),
                   updatedAt = CURRENT_TIMESTAMP();
    ELSE 
    	UPDATE workshop_schedule
 			INNER JOIN event on workshop_schedule.event_id = event.id
			SET workshop_schedule.time_from = time_from,
            	workshop_schedule.time_to = time_to,
                workshop_schedule.workshop_capacity = workshop_capacity,
                workshop_schedule.workshop_id = workshop_id,
                workshop_schedule.status = delStatus,
                workshop_schedule.updatedAt = CURRENT_TIMESTAMP()
			WHERE event.schedule_date >= date_from AND
            	  event.schedule_date <= date_to AND
            	  workshop_schedule.time_from = old_time_from AND 
                  workshop_schedule.time_to = old_time_to;
           
            	
    END IF;

END$$
DELIMITER ;

UPDATE batch_schedule set batch_schedule.schedule = '* 14-23 * * *' WHERE  batch_schedule.name = 'AttendanceConfirmation';