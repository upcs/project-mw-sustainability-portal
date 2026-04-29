-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 22, 2026 at 04:52 PM
-- Server version: 10.3.39-MariaDB
-- PHP Version: 7.3.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs341s26mwsus`
--
CREATE DATABASE IF NOT EXISTS `cs341s26mwsus` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `cs341s26mwsus`;

-- --------------------------------------------------------

--
-- Table structure for table `directory`
--

DROP TABLE IF EXISTS `directory`;
CREATE TABLE IF NOT EXISTS `directory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(300) NOT NULL,
  `image_route` varchar(500) NOT NULL,
  `bio` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
CREATE TABLE IF NOT EXISTS `login` (
  `user` varchar(50) NOT NULL,
  `pass` varchar(50) NOT NULL,
  PRIMARY KEY (`user`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`user`, `pass`) VALUES
('admin', 'laptop');

-- --------------------------------------------------------

--
-- Table structure for table `projects_list`
--

DROP TABLE IF EXISTS `projects_list`;
CREATE TABLE IF NOT EXISTS `projects_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `team` varchar(5000) DEFAULT NULL,
  `image_route` varchar(500) NOT NULL,
  `html_generated` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=146 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `projects_list`
--

INSERT INTO `projects_list` (`id`, `name`, `team`, `image_route`, `html_generated`) VALUES
(18, 'Manure Production', 'Team 1', '/images/manure_production/banner.jpeg', 0),
(19, 'Agriculture', 'Team 2', '/images/agriculture/banner.jpeg', 0),
(145, 'Recycling', 'Team 3', '/images/recycling/banner.jpeg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `project_assets`
--

DROP TABLE IF EXISTS `project_assets`;
CREATE TABLE IF NOT EXISTS `project_assets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_id` int(11) NOT NULL,
  `asset_route` varchar(500) NOT NULL,
  `is_video` tinyint(1) NOT NULL DEFAULT 0,
  `is_image` tinyint(1) NOT NULL DEFAULT 0,
  `is_text` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `project_id` (`project_id`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `project_assets`
--

INSERT INTO `project_assets` (`id`, `project_id`, `asset_route`, `is_video`, `is_image`, `is_text`) VALUES
(56, 19, '/images/agriculture/banner.jpeg', 0, 1, 0),
(57, 18, '/images/manure_production/banner.jpeg', 0, 1, 0),
(58, 145, '/images/recycling/banner.jpeg', 0, 1, 0),
(59, 18, '/assets/manure_production/description.txt', 0, 0, 1),
(60, 19, '/assets/agriculture/description.txt', 0, 0, 1),
(61, 145, '/assets/recycling/description.txt', 0, 0, 1),
(62, 19, '/images/agriculture/img1.jpeg', 0, 1, 0),
(63, 18, '/images/manure_production/img1.jpeg', 0, 1, 0),
(64, 145, '/images/recycling/img1.jpeg', 0, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `test`
--

DROP TABLE IF EXISTS `test`;
CREATE TABLE IF NOT EXISTS `test` (
  `test_id` int(11) NOT NULL AUTO_INCREMENT,
  `message` varchar(300) NOT NULL,
  PRIMARY KEY (`test_id`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `project_assets`
--
ALTER TABLE `project_assets`
  ADD CONSTRAINT `project_assets_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects_list` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
