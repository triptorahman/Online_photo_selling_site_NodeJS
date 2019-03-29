-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 12, 2019 at 05:33 AM
-- Server version: 10.1.31-MariaDB
-- PHP Version: 5.6.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `photodata`
--

-- --------------------------------------------------------

--
-- Table structure for table `creditrequest`
--

CREATE TABLE `creditrequest` (
  `uid` int(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `credit` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `creditrequest`
--

INSERT INTO `creditrequest` (`uid`, `email`, `credit`) VALUES
(6, 'tripto4747@gmail.com', 1000);

-- --------------------------------------------------------

--
-- Table structure for table `infotable`
--

CREATE TABLE `infotable` (
  `uid` int(100) NOT NULL,
  `username` varchar(200) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `balance` int(100) NOT NULL,
  `type` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `infotable`
--

INSERT INTO `infotable` (`uid`, `username`, `password`, `email`, `phone`, `balance`, `type`) VALUES
(1, 'tripto', '123456789', 'triptorahman@gmail.com', '01521302122', 0, '3'),
(3, 'tonmoy', '123456789', 'tonmoy@gmail.com', '01758037522', 200, '1'),
(4, 'samiur', '12345678', 'samiur@gmail.com', '01758037522', 5000, '1'),
(5, 'tripto47', '123456789', 'tripto47@gmail.com', '01758037522', 1300, '2'),
(6, 'tripto', '123456789', 'tripto4747@gmail.com', '01521302122', 0, '2');

-- --------------------------------------------------------

--
-- Table structure for table `phototable`
--

CREATE TABLE `phototable` (
  `pid` int(100) NOT NULL,
  `photoName` varchar(100) NOT NULL,
  `photoType` varchar(100) NOT NULL,
  `photoDescription` varchar(200) NOT NULL,
  `price` int(100) NOT NULL,
  `photo` varchar(200) NOT NULL,
  `uid` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `phototable`
--

INSERT INTO `phototable` (`pid`, `photoName`, `photoType`, `photoDescription`, `price`, `photo`, `uid`) VALUES
(1, 'saintmartin', 'sea', 'beautiful', 1000, 'saintmartin.jpg', 4),
(2, 'sajekvalley', 'hill', 'Beautiful place', 5000, 'sajek.jpg', 4),
(3, 'seabeach', 'sea', 'Beautiful and nice', 200, 'Sea1.jpg', 3);

-- --------------------------------------------------------

--
-- Table structure for table `tempupload`
--

CREATE TABLE `tempupload` (
  `pid` int(100) NOT NULL,
  `photoName` varchar(100) NOT NULL,
  `photoType` varchar(100) NOT NULL,
  `photoDescription` varchar(200) NOT NULL,
  `askingPrice` int(100) NOT NULL,
  `photo` varchar(500) NOT NULL,
  `uid` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tempupload`
--

INSERT INTO `tempupload` (`pid`, `photoName`, `photoType`, `photoDescription`, `askingPrice`, `photo`, `uid`) VALUES
(7, 'hello', 'hi', 'how r u', 100, 'display.jpg', 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `infotable`
--
ALTER TABLE `infotable`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `tempupload`
--
ALTER TABLE `tempupload`
  ADD PRIMARY KEY (`pid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `infotable`
--
ALTER TABLE `infotable`
  MODIFY `uid` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tempupload`
--
ALTER TABLE `tempupload`
  MODIFY `pid` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
