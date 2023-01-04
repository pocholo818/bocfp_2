-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 04, 2023 at 02:24 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bocfp`
--

-- --------------------------------------------------------

--
-- Table structure for table `child`
--

CREATE TABLE `child` (
  `id` int(11) NOT NULL,
  `fname` varchar(48) NOT NULL,
  `lname` varchar(48) NOT NULL,
  `bdate` varchar(10) NOT NULL,
  `sex` varchar(6) NOT NULL,
  `soft_delete` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `child`
--

INSERT INTO `child` (`id`, `fname`, `lname`, `bdate`, `sex`, `soft_delete`) VALUES
(2, 'Rebecca', 'Lee', '2014-04-10', 'F', 0),
(3, 'John', 'Doe', '', 'M', 1),
(6, 'name', 'lname', '2020-05-28', 'M', 1),
(7, 'Pocholo', 'Gopez', '2000-07-05', 'M', 0),
(8, 'Roy', 'Gopez', '2001-04-21', 'M', 0),
(9, 'Amir El', 'Amari', '2010-02-06', 'M', 0);

-- --------------------------------------------------------

--
-- Table structure for table `guardian`
--

CREATE TABLE `guardian` (
  `guardian_id` int(11) NOT NULL,
  `fname` varchar(48) NOT NULL,
  `lname` varchar(48) NOT NULL,
  `contact` varchar(11) NOT NULL,
  `address` varchar(128) NOT NULL,
  `soft_delete` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `guardian`
--

INSERT INTO `guardian` (`guardian_id`, `fname`, `lname`, `contact`, `address`, `soft_delete`) VALUES
(1, 'Pocholo', 'Gopez', '09454123288', '2075th Narra Lane Old Cabalan, Olongapo City Zambales', 0),
(2, 'Test', 'Name', '09999999999', 'address', 1),
(3, 'Amir', 'Amari', '21321313213', 'asdasd', 1),
(4, 'John', 'Doe', '09999999999', 'address', 1),
(5, 'Jane', 'Doe', '09777777777', 'test address', 0);

-- --------------------------------------------------------

--
-- Table structure for table `link`
--

CREATE TABLE `link` (
  `link_id` int(11) NOT NULL,
  `id` varchar(11) NOT NULL,
  `relationship` varchar(15) NOT NULL,
  `guardian_id` varchar(11) NOT NULL,
  `soft_delete` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `link`
--

INSERT INTO `link` (`link_id`, `id`, `relationship`, `guardian_id`, `soft_delete`) VALUES
(1, '2', 'Father', '1', 0);

-- --------------------------------------------------------

--
-- Table structure for table `record`
--

CREATE TABLE `record` (
  `record_id` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `weight` int(11) NOT NULL,
  `remark` varchar(15) NOT NULL,
  `output` double NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `soft_delete` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `record`
--

INSERT INTO `record` (`record_id`, `id`, `height`, `weight`, `remark`, `output`, `date`, `soft_delete`) VALUES
(1, 2, 172, 49, 'Underweight', 16.563007030827475, '2022-12-28 15:07:36', 0),
(4, 2, 175, 56, 'Underweight', 0, '2022-12-30 09:42:36', 1),
(5, 2, 175, 56, 'Underweight', 18.285714285714285, '2022-12-28 15:16:31', 0),
(6, 7, 169, 52, 'Underweight', 18.206645425580337, '2022-12-30 09:49:28', 0),
(7, 7, 172, 59, 'Normal', 19.943212547322876, '2022-12-30 09:49:41', 0),
(8, 8, 164, 69, 'Overweight', 25.654372397382513, '2022-12-30 10:57:53', 1),
(9, 8, 169, 69, 'Normal', 24.158817968558527, '2022-12-30 10:57:44', 0),
(10, 8, 169, 44, 'Underweight', 15.405623052414132, '2022-12-30 10:58:11', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(48) NOT NULL,
  `purok` int(2) NOT NULL,
  `contact_number` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `purok`, `contact_number`) VALUES
(1, 'Pocholo Gopez', 11, '09454123288');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `child`
--
ALTER TABLE `child`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `guardian`
--
ALTER TABLE `guardian`
  ADD PRIMARY KEY (`guardian_id`);

--
-- Indexes for table `link`
--
ALTER TABLE `link`
  ADD PRIMARY KEY (`link_id`);

--
-- Indexes for table `record`
--
ALTER TABLE `record`
  ADD PRIMARY KEY (`record_id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `child`
--
ALTER TABLE `child`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `guardian`
--
ALTER TABLE `guardian`
  MODIFY `guardian_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `link`
--
ALTER TABLE `link`
  MODIFY `link_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `record`
--
ALTER TABLE `record`
  MODIFY `record_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
