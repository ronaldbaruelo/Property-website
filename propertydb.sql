-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 18, 2025 at 09:35 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `propertydb`
--

-- --------------------------------------------------------

--
-- Table structure for table `con message`
--

CREATE TABLE `con message` (
  `id` int(57) NOT NULL,
  `fullname` varchar(47) NOT NULL,
  `email` varchar(256) NOT NULL,
  `phone` varchar(256) NOT NULL,
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `listing`
--

CREATE TABLE `listing` (
  `id` int(11) NOT NULL,
  `address` varchar(256) NOT NULL,
  `City` varchar(256) NOT NULL,
  `price` double NOT NULL,
  `bedroom` int(11) NOT NULL,
  `bathroom` int(11) NOT NULL,
  `garage` int(11) NOT NULL,
  `square_feet` double NOT NULL,
  `lot` double NOT NULL,
  `listing_date` date NOT NULL,
  `realtor` varchar(256) NOT NULL,
  `description` text NOT NULL,
  `pathname` varchar(10000) NOT NULL,
  `side1` text NOT NULL,
  `side2` text NOT NULL,
  `side3` text NOT NULL,
  `side4` text NOT NULL,
  `side5` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `listing`
--

INSERT INTO `listing` (`id`, `address`, `City`, `price`, `bedroom`, `bathroom`, `garage`, `square_feet`, `lot`, `listing_date`, `realtor`, `description`, `pathname`, `side1`, `side2`, `side3`, `side4`, `side5`) VALUES
(1, '23 Jameson Avenue', 'Rotorua', 490000, 3, 3, 3, 3200, 2.5, '2025-01-01', 'Kyle Brown', 'Modern Family Home\r\n\"A spacious 4-bedroom home with sleek, modern finishes. Featuring an open-plan kitchen, a cozy living room with large windows for natural light, and a private backyard perfect for entertaining.\"', 'public/images/homes/home-1.jpg', 'public/images/homes/home-inside-1.jpg', 'public/images/homes/home-inside-2.jpg', 'public/images/homes/home-inside-3.jpg', 'public/images/homes/home-inside-4.jpg', 'public/images/homes/home-inside-5.jpg'),
(2, '3 Lloyd Crescent Pukehangi', ' Rotorua', 500000, 3, 3, 3, 3200, 2.4, '2025-01-01', 'Rose Dan', 'Charming Bungalow\r\n\"Step into this delightful 3-bedroom bungalow, offering a warm and inviting atmosphere. Complete with a large front porch, hardwood floors, and a beautifully landscaped garden.\"\r\n', 'public/images/homes/home-2.jpg', 'public/images/homes/home-inside-6.jpg', 'public/images/homes/home-inside-5.jpg', 'public/images/homes/home-inside-4.jpg', 'public/images/homes/home-inside-3.jpg', 'public/images/homes/home-inside-2.jpg'),
(5, '24 Manuka , Botany', 'Auckland', 650000, 4, 3, 1, 3200, 2.4, '2025-01-22', 'Rose Dan', 'Luxury Villa\r\n\"Experience the pinnacle of luxury in this 5-bedroom villa. Featuring a stunning infinity pool, panoramic views, and high-end finishes throughout, this property is ideal for those who demand the best.\"', 'public/images/homes/home-4.jpg', 'public/images/homes/home-inside-1.jpg', 'public/images/homes/home-inside-2.jpg', 'public/images/homes/home-inside-3.jpg', 'public/images/homes/home-inside-4.jpg', 'public/images/homes/home-inside-5.jpg'),
(6, '265 WestRoad, North Shore', 'Auckland', 750000, 5, 2, 2, 3500, 5.5, '2025-01-30', 'Ross Dan', 'Modern Apartment\r\n\"Stylish 2-bedroom apartment in the heart of the city. With a sleek design, updated appliances, and a private balcony, this is urban living at its finest.\"', 'public/images/homes/home-5.jpg', 'public/images/homes/home-5.jpg', 'public/images/homes/home-inside-5.jpg', 'public/images/homes/home-inside-4.jpg', 'public/images/homes/home-inside-3.jpg', 'public/images/homes/home-inside-2.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` int(255) NOT NULL,
  `name` varchar(256) NOT NULL,
  `phone` varchar(256) NOT NULL,
  `email` varchar(100) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `text_message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `name`, `phone`, `email`, `subject`, `text_message`) VALUES
(1, 'Ronald Cabiles Baruelo', '0275625535', 'rcbaruelo1029@gmail.com', 'complaint', 'test'),
(2, 'Ryan Domingo', '0275625535', 'rcdomingo@gmail.com', 'Test', 'test server');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(5) NOT NULL,
  `username` varchar(56) NOT NULL,
  `password` varchar(256) NOT NULL,
  `email` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`) VALUES
(1001, 'Ronald Baruelo', '1234', 'rcbaruelo1029@gmail.com'),
(1002, 'rosevi Baruelo', '1029', 'baruelorosevi1@gmail.com'),
(1003, 'rafael Baruelo', '$2b$10$sQ1XZc7pF9rUGXiqLHO94On69mgvDHjxwzl1rSEU/6YHwRwB19N5q', 'rafael@gmail.com'),
(1004, 'Kyle Baruelo', '$2b$10$TBEmcZrCdZ2TqsEFnAujHuO2VGqYdXYJVASynd/ewHJ4zAR.8lcvS', 'kyle@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `con message`
--
ALTER TABLE `con message`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `listing`
--
ALTER TABLE `listing`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `con message`
--
ALTER TABLE `con message`
  MODIFY `id` int(57) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `listing`
--
ALTER TABLE `listing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1005;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
