DROP TABLE IF EXISTS `houses`;

CREATE TABLE `houses`
(
  `id` INT AUTO_INCREMENT,
  `link` varchar(255) NOT NULL UNIQUE,
  `location_country` varchar(50) NOT NULL,
  `location_city` varchar(50) NOT NULL,
   `size_rooms` int NOT NULL,
  `price_value` float NOT NULL,
  `price_currency` varchar(3) NOT NULL,
  PRIMARY KEY(`id`)
);