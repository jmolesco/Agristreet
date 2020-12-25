-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 25, 2020 at 06:44 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `agristreet`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetProductList` (IN `farmerid` INT, IN `status` INT)  NO SQL
BEGIN
SELECT 
`product`.`id`,
`product`.`farmerid`,
`product`.`productname`,
`product`.`brand`,
`product`.`description`,
`product`.`price`,
`measurement`.`type`,
`product`.`measurementid`,
`product`.`status`,
`product`.`intime`,
`product`.`uptime`,
CASE
              WHEN `product`.uptime is null
              THEN `product`.intime
              WHEN `product`.uptime > `product`.intime
              THEN `product`.uptime ELSE `product`.intime END AS OrderDateTime
 FROM 
`product`
INNER JOIN `measurement` ON `measurement`.`id` = `product`.`measurementid`
INNER JOIN `farmers` ON `farmers`.`id` = `product`.`farmerid` 
WHERE `product`.`farmerid` = farmerid AND `product`.`status` = status;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `testProc` (IN `p_ratingid` INT, IN `p_orderid` INT)  NO SQL
BEGIN
SELECT * FROM farmerratingdetail where ratingid = p_ratingid
and orderid = p_orderid
;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateFarmerRating` (IN `p_ratingid` INT, IN `p_consumerid` INT, IN `p_orderid` INT, IN `p_rate` DECIMAL)  MODIFIES SQL DATA
BEGIN
    /**
    ratingid should be farmer id in the future
    **/
	DECLARE errno INT;
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
    GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
    SELECT errno AS MYSQL_ERROR;
    ROLLBACK;
    END;
	START TRANSACTION;
    
    INSERT INTO farmerratingdetail (
    	ratingid,
        consumerid,
        orderid,
        rate
    )
    VALUES(
        p_ratingid,
        p_consumerid,
        p_orderid,
        p_rate
    );
    
    	UPDATE farmerrating
   		SET totalrating = (SELECT 
					CAST(SUM(rate)/COUNT(id) AS DECIMAL(10,2)) AS Rating
                    from farmerratingdetail 
                    WHERE ratingid = p_ratingid)
    	WHERE farmerrating.id = p_ratingid;
	COMMIT;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `username` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `intime` datetime NOT NULL DEFAULT current_timestamp(),
  `uptime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `username`, `password`, `status`, `intime`, `uptime`) VALUES
(1, 'markolesco', 'markolesco', 0, '2020-12-19 23:13:08', '2020-12-19 23:18:22'),
(2, 'jmolesco', 'jmolesco', 1, '2020-12-19 23:20:09', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `addressbook`
--

CREATE TABLE `addressbook` (
  `id` int(11) NOT NULL,
  `housenumber` varchar(128) NOT NULL COMMENT 'order, requestfororder',
  `cityormunicipality` varchar(128) NOT NULL,
  `brgy` varchar(128) NOT NULL,
  `deliverto` int(11) NOT NULL COMMENT 'office or house',
  `isshippingadd` bit(1) DEFAULT NULL COMMENT 'yes or no',
  `isbillingadd` bit(1) DEFAULT NULL COMMENT 'yes or no',
  `mobile` varchar(11) NOT NULL,
  `contactperson` text NOT NULL,
  `remarks` text NOT NULL,
  `consumerid` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `intime` datetime NOT NULL DEFAULT current_timestamp(),
  `utptime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `description` varchar(128) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `intime` datetime NOT NULL DEFAULT current_timestamp(),
  `uptime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `description`, `status`, `intime`, `uptime`) VALUES
(1, 'Livestocks', '', 0, '2020-12-19 21:39:21', '0000-00-00 00:00:00'),
(2, 'Petstocks', 'For animals', 1, '2020-12-19 22:21:04', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `consumer`
--

CREATE TABLE `consumer` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `consumerrating`
--

CREATE TABLE `consumerrating` (
  `id` int(11) NOT NULL,
  `consumerid` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `intime` datetime NOT NULL DEFAULT current_timestamp(),
  `uptime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `consumerratingdetail`
--

CREATE TABLE `consumerratingdetail` (
  `id` int(11) NOT NULL,
  `ratingid` int(11) NOT NULL,
  `orderid` int(11) NOT NULL,
  `farmerid` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `intime` datetime NOT NULL DEFAULT current_timestamp(),
  `uptime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `farmerbanner`
--

CREATE TABLE `farmerbanner` (
  `id` int(11) NOT NULL,
  `farmerid` int(11) NOT NULL,
  `image` varchar(128) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `intime` datetime NOT NULL DEFAULT current_timestamp(),
  `uptime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `farmerbanner`
--

INSERT INTO `farmerbanner` (`id`, `farmerid`, `image`, `status`, `intime`, `uptime`) VALUES
(2, 41, '1608911353537_banner', 0, '2020-12-25 23:49:13', '0000-00-00 00:00:00'),
(3, 41, '1608911465535_banner', 1, '2020-12-25 23:51:05', '0000-00-00 00:00:00'),
(4, 41, '1608911737593_banner', 1, '2020-12-25 23:55:37', '0000-00-00 00:00:00'),
(5, 42, '1608911820203_banner', 1, '2020-12-25 23:57:00', '0000-00-00 00:00:00'),
(6, 42, '1608912134452_banner', 1, '2020-12-26 00:02:14', '0000-00-00 00:00:00'),
(7, 38, '1608912145661_banner', 1, '2020-12-26 00:02:25', '0000-00-00 00:00:00'),
(8, 38, '1608912198033_banner', 1, '2020-12-26 00:03:18', '0000-00-00 00:00:00'),
(9, 38, '1608912216185_banner', 1, '2020-12-26 00:03:36', '0000-00-00 00:00:00'),
(10, 38, '1608912276687_banner', 1, '2020-12-26 00:04:36', '0000-00-00 00:00:00'),
(11, 38, '1608912328500_banner.undefined', 1, '2020-12-26 00:05:28', '0000-00-00 00:00:00'),
(13, 38, '1608912400635_banner.undefined', 1, '2020-12-26 00:06:40', '0000-00-00 00:00:00'),
(15, 38, '1608912575434_banner..png', 1, '2020-12-26 00:09:35', '0000-00-00 00:00:00'),
(16, 38, '1608913115762_banner.png', 1, '2020-12-26 00:10:22', '2020-12-26 00:18:35');

-- --------------------------------------------------------

--
-- Table structure for table `farmerrating`
--

CREATE TABLE `farmerrating` (
  `id` int(11) NOT NULL,
  `farmerid` int(11) NOT NULL,
  `totalrating` decimal(10,2) NOT NULL DEFAULT 5.00,
  `status` int(11) NOT NULL DEFAULT 1,
  `intime` datetime NOT NULL DEFAULT current_timestamp(),
  `uptime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `farmerrating`
--

INSERT INTO `farmerrating` (`id`, `farmerid`, `totalrating`, `status`, `intime`, `uptime`) VALUES
(1, 24, '3.25', 1, '2020-12-20 02:33:23', '0000-00-00 00:00:00'),
(2, 25, '5.00', 1, '2020-12-20 02:43:52', '0000-00-00 00:00:00'),
(3, 26, '5.00', 1, '2020-12-20 02:44:29', '0000-00-00 00:00:00'),
(4, 27, '5.00', 1, '2020-12-20 02:44:30', '0000-00-00 00:00:00'),
(5, 28, '5.00', 1, '2020-12-20 02:44:30', '0000-00-00 00:00:00'),
(6, 29, '5.00', 1, '2020-12-20 02:44:30', '0000-00-00 00:00:00'),
(7, 30, '5.00', 1, '2020-12-20 02:44:30', '0000-00-00 00:00:00'),
(8, 31, '5.00', 1, '2020-12-20 02:44:30', '0000-00-00 00:00:00'),
(9, 32, '5.00', 1, '2020-12-20 02:44:31', '0000-00-00 00:00:00'),
(10, 33, '5.00', 1, '2020-12-20 02:44:31', '0000-00-00 00:00:00'),
(11, 34, '5.00', 1, '2020-12-25 22:18:11', '0000-00-00 00:00:00'),
(13, 35, '5.00', 1, '2020-12-25 22:49:56', '0000-00-00 00:00:00'),
(14, 37, '5.00', 1, '2020-12-25 22:51:42', '0000-00-00 00:00:00'),
(15, 38, '5.00', 1, '2020-12-25 22:58:41', '0000-00-00 00:00:00'),
(16, 39, '5.00', 1, '2020-12-25 22:59:10', '0000-00-00 00:00:00'),
(17, 40, '5.00', 1, '2020-12-25 23:01:42', '0000-00-00 00:00:00'),
(18, 41, '5.00', 1, '2020-12-26 00:10:36', '0000-00-00 00:00:00'),
(19, 42, '5.00', 1, '2020-12-26 00:11:02', '0000-00-00 00:00:00'),
(20, 43, '5.00', 1, '2020-12-26 00:11:26', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `farmerratingdetail`
--

CREATE TABLE `farmerratingdetail` (
  `id` int(11) NOT NULL,
  `ratingid` int(11) NOT NULL,
  `consumerid` int(11) NOT NULL,
  `orderid` int(11) NOT NULL,
  `rate` decimal(10,2) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `intime` datetime NOT NULL DEFAULT current_timestamp(),
  `uptime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `farmerratingdetail`
--

INSERT INTO `farmerratingdetail` (`id`, `ratingid`, `consumerid`, `orderid`, `rate`, `status`, `intime`, `uptime`) VALUES
(1, 1, 1, 1, '2.00', 1, '2020-12-20 18:47:54', '0000-00-00 00:00:00'),
(5, 1, 1, 2, '3.00', 1, '2020-12-20 19:16:37', '0000-00-00 00:00:00'),
(6, 1, 1, 3, '4.00', 1, '2020-12-20 19:19:34', '0000-00-00 00:00:00'),
(7, 1, 1, 1, '2.00', 1, '2020-12-20 19:30:51', '0000-00-00 00:00:00'),
(8, 1, 1, 5, '3.00', 1, '2020-12-20 19:31:26', '0000-00-00 00:00:00'),
(9, 1, 1, 6, '5.00', 1, '2020-12-20 19:33:10', '0000-00-00 00:00:00'),
(10, 1, 1, 7, '5.00', 1, '2020-12-20 19:35:16', '0000-00-00 00:00:00'),
(12, 1, 1, 1, '2.00', 1, '2020-12-20 19:55:10', '0000-00-00 00:00:00'),
(13, 1, 1, 1, '1.00', 1, '2020-12-20 19:57:13', '0000-00-00 00:00:00'),
(14, 1, 1, 1, '5.00', 1, '2020-12-20 20:01:34', '0000-00-00 00:00:00'),
(15, 1, 1, 10, '2.00', 1, '2020-12-20 22:09:33', '0000-00-00 00:00:00'),
(16, 1, 1, 10, '5.00', 1, '2020-12-20 22:10:31', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `farmers`
--

CREATE TABLE `farmers` (
  `id` int(11) NOT NULL,
  `imagephoto` varchar(128) NOT NULL,
  `farmerid` varchar(128) NOT NULL DEFAULT 'GENERATED ALWAYS AS (CONCAT(fname,'' '',lname)',
  `fname` varchar(128) NOT NULL,
  `mname` varchar(128) NOT NULL,
  `lname` varchar(128) NOT NULL,
  `dob` date NOT NULL,
  `emailaddress` varchar(128) NOT NULL,
  `mobile` varchar(11) NOT NULL,
  `gender` int(11) NOT NULL,
  `accountid` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `intime` datetime NOT NULL DEFAULT current_timestamp(),
  `uptime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `farmers`
--

INSERT INTO `farmers` (`id`, `imagephoto`, `farmerid`, `fname`, `mname`, `lname`, `dob`, `emailaddress`, `mobile`, `gender`, `accountid`, `status`, `intime`, `uptime`) VALUES
(26, 'default_photo.png', 'F-26-20201220024352', 'JOSE', 'OLFINDO', 'OLESCO', '2020-12-10', 'jmolesco@yahoo.com', '', 0, 0, 1, '2020-12-20 02:43:52', '2020-12-20 02:44:20'),
(27, 'default_photo.png', 'F-27-20201220024429', 'JOHN MARK', 'OLFINDO', 'OLESCO', '0000-00-00', 'jmolesco@yahoo.com', '', 0, 0, 1, '2020-12-20 02:44:29', '0000-00-00 00:00:00'),
(28, 'default_photo.png', 'F-28-20201220024430', 'JOHN MARK', 'OLFINDO', 'OLESCO', '0000-00-00', 'jmolesco@yahoo.com', '', 0, 0, 1, '2020-12-20 02:44:30', '0000-00-00 00:00:00'),
(29, 'default_photo.png', 'F-29-20201220024430', 'JOHN MARK', 'OLFINDO', 'OLESCO', '0000-00-00', 'jmolesco@yahoo.com', '', 0, 0, 1, '2020-12-20 02:44:30', '0000-00-00 00:00:00'),
(30, 'default_photo.png', 'F-30-20201220024430', 'JOHN MARK', 'OLFINDO', 'OLESCO', '0000-00-00', 'jmolesco@yahoo.com', '', 0, 0, 1, '2020-12-20 02:44:30', '0000-00-00 00:00:00'),
(31, 'default_photo.png', 'F-31-20201220024430', 'JOHN MARK', 'OLFINDO', 'OLESCO', '0000-00-00', 'jmolesco@yahoo.com', '', 0, 0, 1, '2020-12-20 02:44:30', '0000-00-00 00:00:00'),
(32, 'default_photo.png', 'F-32-20201220024430', 'JOHN MARK', 'OLFINDO', 'OLESCO', '0000-00-00', 'jmolesco@yahoo.com', '', 0, 0, 1, '2020-12-20 02:44:30', '0000-00-00 00:00:00'),
(33, 'default_photo.png', 'F-33-20201220024431', 'JOHN MARK', 'OLFINDO', 'OLESCO', '0000-00-00', 'jmolesco@yahoo.com', '', 0, 0, 1, '2020-12-20 02:44:31', '0000-00-00 00:00:00'),
(34, 'default_photo.png', 'F-34-20201220024431', 'JOHN MARK', 'OLFINDO', 'OLESCO', '0000-00-00', 'jmolesco@yahoo.com', '', 0, 0, 1, '2020-12-20 02:44:31', '0000-00-00 00:00:00'),
(35, '1608905891445_d0d36770-d4df-4ce5-91b6-3c3121.png', 'F-35-20201225221811', 'JOHN MARK', 'OLFINDO', 'OLESCO', '0000-00-00', 'jmolesco@yahoo.com', '', 0, 0, 1, '2020-12-25 22:18:11', '0000-00-00 00:00:00'),
(37, '1608907796644_profile', 'F-36-20201225224956', 'JOHN MARK', 'OLFINDO', 'OLESCO', '0000-00-00', 'jmolesco@yahoo.com', '', 0, 0, 1, '2020-12-25 22:49:56', '0000-00-00 00:00:00'),
(38, '1608907902277_profile', 'F-38-20201225225142', 'JOHN MARK', 'OLFINDO', 'OLESCO', '0000-00-00', 'jmolesco@yahoo.com', '', 0, 0, 1, '2020-12-25 22:51:42', '0000-00-00 00:00:00'),
(39, '1608908321026_profile', 'F-39-20201225225841', 'JOHN MARK', 'OLFINDO', 'OLESCO', '0000-00-00', 'jmolesco@yahoo.com', '', 0, 0, 1, '2020-12-25 22:58:41', '0000-00-00 00:00:00'),
(40, '1608908350609_profile', 'F-40-20201225225910', 'JOHN MARK', 'OLFINDO', 'OLESCO', '0000-00-00', 'jmolesco@yahoo.com', '', 0, 0, 1, '2020-12-25 22:59:10', '0000-00-00 00:00:00'),
(41, '1608908502595_profile', 'F-41-20201225230142', 'JOHN MARK', 'OLFINDO', 'OLESCO', '0000-00-00', 'jmolesco@yahoo.com', '', 0, 0, 1, '2020-12-25 23:01:42', '0000-00-00 00:00:00'),
(42, '1608912636416_profil0..png', 'F-42-20201226001036', 'JOHN MARK', 'OLFINDO', 'OLESCO', '0000-00-00', 'jmolesco@yahoo.com', '', 0, 0, 1, '2020-12-26 00:10:36', '0000-00-00 00:00:00'),
(43, '1608912662587_profil0..png', 'F-43-20201226001102', 'JOHN MARK', 'OLFINDO', 'OLESCO', '0000-00-00', 'jmolesco@yahoo.com', '', 0, 0, 1, '2020-12-26 00:11:02', '0000-00-00 00:00:00'),
(44, '1608912686011_profile.png', 'F-44-20201226001126', 'JOHN MARK', 'OLFINDO', 'OLESCO', '0000-00-00', 'jmolesco@yahoo.com', '', 0, 0, 1, '2020-12-26 00:11:26', '0000-00-00 00:00:00');

--
-- Triggers `farmers`
--
DELIMITER $$
CREATE TRIGGER `InsertFarmerRating` BEFORE INSERT ON `farmers` FOR EACH ROW INSERT INTO farmerrating(
farmerrating.farmerid,
farmerrating.totalrating
)
VALUES(
(SELECT MAX(id) from farmers),
 5   
)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `UpdateFarmerID` BEFORE INSERT ON `farmers` FOR EACH ROW SET new.farmerid = 
CONCAT(
    	"F-", 
    	(SELECT MAX(id)+1 FROM farmers),
    	"-",
    	(SELECT	   	             REPLACE(FORMAT(NOW(),'yyyyMMddHHmmss'), ",","") 
        )
      
      )
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `id` int(11) NOT NULL,
  `productid` int(11) NOT NULL,
  `farmerid` int(11) NOT NULL,
  `quantity` decimal(10,2) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `intime` datetime NOT NULL DEFAULT current_timestamp(),
  `uptime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`id`, `productid`, `farmerid`, `quantity`, `status`, `intime`, `uptime`) VALUES
(1, 16, 27, '10.00', 1, '2020-12-21 22:16:04', '2020-12-21 23:37:20');

-- --------------------------------------------------------

--
-- Table structure for table `inventorytrail`
--

CREATE TABLE `inventorytrail` (
  `id` int(11) NOT NULL,
  `inventoryid` int(11) NOT NULL,
  `quantity` decimal(10,2) NOT NULL,
  `type` int(11) NOT NULL COMMENT 'IN = 1\r\nOUT = 2\r\nREFUND = 3',
  `status` int(11) NOT NULL DEFAULT 1,
  `intime` datetime NOT NULL DEFAULT current_timestamp(),
  `uptime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `inventorytrail`
--

INSERT INTO `inventorytrail` (`id`, `inventoryid`, `quantity`, `type`, `status`, `intime`, `uptime`) VALUES
(1, 1, '11.00', 1, 1, '2020-12-21 23:34:53', '0000-00-00 00:00:00'),
(2, 1, '10.00', 1, 1, '2020-12-21 23:37:21', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `measurement`
--

CREATE TABLE `measurement` (
  `id` int(11) NOT NULL,
  `type` varchar(128) NOT NULL,
  `description` varchar(128) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `intime` datetime NOT NULL,
  `uptime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `measurement`
--

INSERT INTO `measurement` (`id`, `type`, `description`, `status`, `intime`, `uptime`) VALUES
(1, 'kilo', 'kilo', 1, '2020-12-21 17:54:21', '0000-00-00 00:00:00'),
(2, 'gallon', 'gallon', 1, '2020-12-21 17:54:40', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `sender` varchar(128) NOT NULL,
  `receiver` varchar(128) NOT NULL,
  `type` int(11) NOT NULL COMMENT 'order, requestfororder',
  `details` text NOT NULL,
  `remarks` text NOT NULL,
  `hasread` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `intime` datetime NOT NULL,
  `uptime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orderdetail`
--

CREATE TABLE `orderdetail` (
  `id` int(11) NOT NULL,
  `orderid` int(11) NOT NULL,
  `productid` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `intime` datetime NOT NULL DEFAULT current_timestamp(),
  `uptime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orderreview`
--

CREATE TABLE `orderreview` (
  `id` int(11) NOT NULL,
  `orderid` int(11) NOT NULL,
  `ratings` int(11) NOT NULL COMMENT '1-5',
  `details` text NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `intime` datetime NOT NULL DEFAULT current_timestamp(),
  `uptime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orderreviewphoto`
--

CREATE TABLE `orderreviewphoto` (
  `id` int(11) NOT NULL,
  `reviewid` int(11) NOT NULL,
  `images` varchar(128) NOT NULL,
  `description` text NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `intime` datetime NOT NULL DEFAULT current_timestamp(),
  `uptime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderid` int(11) NOT NULL,
  `consumerid` int(11) NOT NULL,
  `farmerid` int(11) NOT NULL,
  `totalquantity` int(11) NOT NULL,
  `totalprice` decimal(10,2) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `intime` datetime NOT NULL,
  `uptime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` int(11) NOT NULL,
  `orderid` int(11) NOT NULL,
  `totalpayment` decimal(10,2) NOT NULL,
  `ispaid` int(11) NOT NULL,
  `paymenttype` int(11) NOT NULL,
  `remarks` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `intime` datetime NOT NULL DEFAULT current_timestamp(),
  `uptime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `farmerid` int(11) NOT NULL,
  `categoryid` int(11) NOT NULL,
  `productname` varchar(128) NOT NULL,
  `brand` varchar(128) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `measurementid` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `intime` datetime NOT NULL DEFAULT current_timestamp(),
  `uptime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `farmerid`, `categoryid`, `productname`, `brand`, `description`, `price`, `measurementid`, `status`, `intime`, `uptime`) VALUES
(1, 26, 1, 'Rice', 'Sinandomeng', 'JM olesco', '2500.00', 1, 1, '2020-12-20 23:39:09', '2020-12-21 00:00:08'),
(2, 26, 1, 'Rice', 'Sinandomeng', 'This is Rice', '2500.00', 1, 0, '2020-12-20 23:39:43', '2020-12-21 00:21:40'),
(3, 26, 1, 'Rice', 'Sinandomeng', 'This is Rice', '2500.00', 1, 1, '2020-12-20 23:41:16', '0000-00-00 00:00:00'),
(4, 26, 1, 'Rice', 'Sinandomeng', 'This is Rice', '2500.00', 1, 1, '2020-12-20 23:43:21', '0000-00-00 00:00:00'),
(5, 26, 1, 'Rice', 'Sinandomeng', 'This is Rice', '2500.00', 1, 1, '2020-12-20 23:44:47', '0000-00-00 00:00:00'),
(6, 26, 1, 'Rice', 'Sinandomeng', 'This is Rice', '2500.00', 1, 1, '2020-12-20 23:46:13', '0000-00-00 00:00:00'),
(7, 26, 1, 'Rice', 'Sinandomeng', 'This is Rice', '3500.00', 1, 1, '2020-12-20 23:46:40', '0000-00-00 00:00:00'),
(8, 26, 1, 'Rice', 'Sinandomeng', 'This is Rice', '3500.00', 1, 1, '2020-12-20 23:57:05', '0000-00-00 00:00:00'),
(9, 26, 1, 'Oil', 'Virgin Oil', 'Oil', '1700.00', 2, 1, '2020-12-21 00:01:13', '2020-12-21 00:09:59'),
(10, 26, 1, 'Oil', 'Virgin Oil', 'Oil', '1600.00', 2, 1, '2020-12-21 00:09:12', '2020-12-21 00:11:28'),
(11, 25, 1, 'Oil', 'Virgin Oil', 'Oil', '1700.00', 1, 0, '2020-12-21 00:34:27', '2020-12-21 00:36:37'),
(12, 26, 1, 'Oil', 'Virgin Oil', 'Oil', '1600.00', 2, 0, '2020-12-21 00:35:50', '2020-12-21 00:37:02'),
(13, 26, 2, 'Oil', 'Virgin Oil', 'Oil', '1600.00', 2, 1, '2020-12-21 21:52:52', '2020-12-21 21:53:20'),
(14, 27, 2, 'Oil', 'Virgin Oil', 'Oil', '1700.00', 1, 1, '2020-12-21 21:53:01', '0000-00-00 00:00:00'),
(15, 27, 2, 'Oil', 'Virgin Oil', 'Oil', '1700.00', 1, 1, '2020-12-21 21:55:10', '0000-00-00 00:00:00'),
(16, 27, 1, 'Kamatis', 'Kamatis', 'Kamatis', '100.00', 1, 1, '2020-12-21 22:16:04', '0000-00-00 00:00:00');

--
-- Triggers `product`
--
DELIMITER $$
CREATE TRIGGER `InsertInventory` AFTER INSERT ON `product` FOR EACH ROW INSERT INTO 
inventory (
	productid,
    quantity,
    farmerid
)
VALUES(
    new.id,
    0,
    new.farmerid
)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `InsertProductPrice` AFTER INSERT ON `product` FOR EACH ROW INSERT INTO productprice(
    productid,
    amount     
    )
VALUES(
   NEW.id,
   NEW.price
)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `UpdateProductPrice` AFTER UPDATE ON `product` FOR EACH ROW IF (new.status = 1)	THEN
		INSERT INTO productprice(
    	productid,
    	amount     
    	)
		VALUES(
   		old.id,
   		NEW.price
		);
END IF
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `UpdateProductPriceStatus` BEFORE UPDATE ON `product` FOR EACH ROW UPDATE productprice
SET status = 0,
uptime = NOW()
WHERE id = (SELECT MAX(id) 
FROM productprice where  productid = old.id)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `productimage`
--

CREATE TABLE `productimage` (
  `id` int(11) NOT NULL,
  `farmerid` int(11) NOT NULL,
  `productid` int(11) NOT NULL,
  `image` varchar(128) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `intime` datetime NOT NULL DEFAULT current_timestamp(),
  `uptime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `productimage`
--

INSERT INTO `productimage` (`id`, `farmerid`, `productid`, `image`, `status`, `intime`, `uptime`) VALUES
(2, 38, 16, '1608918007914_product.png', 1, '2020-12-26 01:30:27', '2020-12-26 01:40:07'),
(3, 38, 16, '1608917488903_product.png', 1, '2020-12-26 01:31:28', '0000-00-00 00:00:00'),
(4, 38, 16, '1608917516122_product.png', 1, '2020-12-26 01:31:56', '0000-00-00 00:00:00'),
(5, 38, 16, '1608917591974_product.png', 1, '2020-12-26 01:33:11', '0000-00-00 00:00:00'),
(6, 38, 16, '1608917689637_product.png', 1, '2020-12-26 01:34:49', '0000-00-00 00:00:00'),
(7, 38, 16, '1608917737346_product.png', 1, '2020-12-26 01:35:37', '0000-00-00 00:00:00'),
(10, 38, 16, '1608917822270_product.png', 1, '2020-12-26 01:37:02', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `productprice`
--

CREATE TABLE `productprice` (
  `id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `productid` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `intime` datetime NOT NULL DEFAULT current_timestamp(),
  `uptime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `productprice`
--

INSERT INTO `productprice` (`id`, `amount`, `productid`, `status`, `intime`, `uptime`) VALUES
(15, '3500.00', 9, 0, '2020-12-21 00:01:13', '0000-00-00 00:00:00'),
(16, '2500.00', 9, 0, '2020-12-21 00:01:58', '0000-00-00 00:00:00'),
(17, '2500.00', 9, 0, '2020-12-21 00:07:49', '2020-12-21 21:48:06'),
(18, '1500.00', 10, 0, '2020-12-21 00:09:12', '0000-00-00 00:00:00'),
(20, '1700.00', 10, 0, '2020-12-21 00:10:39', '2020-12-21 00:11:28'),
(21, '1600.00', 10, 0, '2020-12-21 00:11:28', '2020-12-21 21:48:06'),
(22, '2500.00', 2, 0, '2020-12-21 00:20:49', '2020-12-21 00:21:40'),
(23, '2500.00', 2, 0, '2020-12-21 00:21:40', '2020-12-21 21:48:06'),
(24, '1700.00', 11, 0, '2020-12-21 00:34:27', '2020-12-21 21:48:06'),
(25, '1700.00', 12, 0, '2020-12-21 00:35:50', '2020-12-21 00:36:12'),
(26, '1600.00', 12, 0, '2020-12-21 00:36:12', '2020-12-21 21:48:06'),
(27, '2500.00', 1, 1, '2020-12-21 21:48:06', '0000-00-00 00:00:00'),
(28, '2500.00', 3, 1, '2020-12-21 21:48:06', '0000-00-00 00:00:00'),
(29, '2500.00', 4, 1, '2020-12-21 21:48:06', '0000-00-00 00:00:00'),
(30, '2500.00', 5, 1, '2020-12-21 21:48:06', '0000-00-00 00:00:00'),
(31, '2500.00', 6, 1, '2020-12-21 21:48:06', '0000-00-00 00:00:00'),
(32, '3500.00', 7, 1, '2020-12-21 21:48:06', '0000-00-00 00:00:00'),
(33, '3500.00', 8, 1, '2020-12-21 21:48:06', '0000-00-00 00:00:00'),
(34, '1700.00', 9, 1, '2020-12-21 21:48:06', '0000-00-00 00:00:00'),
(35, '1600.00', 10, 1, '2020-12-21 21:48:06', '0000-00-00 00:00:00'),
(36, '1700.00', 13, 0, '2020-12-21 21:52:52', '2020-12-21 21:53:20'),
(37, '1700.00', 14, 1, '2020-12-21 21:53:01', '0000-00-00 00:00:00'),
(38, '1600.00', 13, 1, '2020-12-21 21:53:20', '0000-00-00 00:00:00'),
(39, '1700.00', 15, 1, '2020-12-21 21:55:10', '0000-00-00 00:00:00'),
(40, '100.00', 16, 1, '2020-12-21 22:16:04', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `addressbook`
--
ALTER TABLE `addressbook`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `consumer`
--
ALTER TABLE `consumer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `consumerrating`
--
ALTER TABLE `consumerrating`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `consumerratingdetail`
--
ALTER TABLE `consumerratingdetail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `farmerbanner`
--
ALTER TABLE `farmerbanner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `farmerrating`
--
ALTER TABLE `farmerrating`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `farmerratingdetail`
--
ALTER TABLE `farmerratingdetail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `farmers`
--
ALTER TABLE `farmers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventorytrail`
--
ALTER TABLE `inventorytrail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `measurement`
--
ALTER TABLE `measurement`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderreviewphoto`
--
ALTER TABLE `orderreviewphoto`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderid`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `productimage`
--
ALTER TABLE `productimage`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `productprice`
--
ALTER TABLE `productprice`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `addressbook`
--
ALTER TABLE `addressbook`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `consumer`
--
ALTER TABLE `consumer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `consumerrating`
--
ALTER TABLE `consumerrating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `consumerratingdetail`
--
ALTER TABLE `consumerratingdetail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `farmerbanner`
--
ALTER TABLE `farmerbanner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `farmerrating`
--
ALTER TABLE `farmerrating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `farmerratingdetail`
--
ALTER TABLE `farmerratingdetail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `farmers`
--
ALTER TABLE `farmers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `inventorytrail`
--
ALTER TABLE `inventorytrail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `measurement`
--
ALTER TABLE `measurement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orderreviewphoto`
--
ALTER TABLE `orderreviewphoto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `productimage`
--
ALTER TABLE `productimage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `productprice`
--
ALTER TABLE `productprice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
