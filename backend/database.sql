-- phpMyAdmin SQL Dump
-- version 5.3.0-dev
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 08, 2023 at 10:11 AM
-- Server version: 10.5.18-MariaDB-0+deb11u1
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `katasr`
--

-- --------------------------------------------------------

--
-- Table structure for table `katas`
--

CREATE TABLE `katas` (
  `id` int(11) NOT NULL,
  `title` varchar(25) NOT NULL,
  `description` text NOT NULL,
  `rules` varchar(255) NOT NULL,
  `limit_char` int(11) NOT NULL,
  `data1` varchar(255) DEFAULT NULL,
  `result1` varchar(255) NOT NULL,
  `data2` varchar(255) DEFAULT NULL,
  `result2` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `katas`
--

INSERT INTO `katas` (`id`, `title`, `description`, `rules`, `limit_char`, `data1`, `result1`, `data2`, `result2`) VALUES
(1, 'Kata qui retourne !', 'Ce kata est le premier créé lors de ce projet, il est si simple.\n', 'La function doit retourné (en string) :', 0, ' ######  ########  \n##    ## ##     ## \n## KATA  ## -SR ## \n ######  ########  \n      ## ##   ##   \n##    ## ##    ##  \n ######  ##     ## ', 'KATA-SR', 'KATA-SR', 'KATA-SR'),
(2, 'C\'est court !', 'La fonction doit retourner 50 si data est null ou undefined, sinon elle doit retourner la valeur de data.', 'Vous n\'avez que 100 charactères disponible.', 100, NULL, '50', '15', '15'),
(3, 'A l\'envers !', 'La fonction doit retourner le string data à l\'envers en minuscule.', 'Vous avez que 100 characteres disponible.\n', 100, 'WildCodeSchool', 'loohcsedocdliw', 'AbcdEfg', 'gfedcba'),
(4, 'Comme la Nintendo 64 x 2!', 'Grace à la fonction nous devons retrouver le nom de domaine cacher dans la data.', 'Vous avez que 100 characteres disponible.', 100, 'WVdOMGRTMXNZVzR1WTI5dA==', 'actu-lan.com', 'WVhOemJ5MXlaWE53WVhkdUxtWnk=', 'asso-respawn.fr'),
(8, 'Kata qui retourne !', 'Ce kata est le premier créé lors de ce projet, il est si simple.\n', 'A partir de data la function doit retourné en seulement 34 :', 34, ' ######  ########  \n##    ## ##     ## \n## KATA  ## -SR ## \n ######  ########  \n      ## ##   ##   \n##    ## ##    ##  \n ######  ##     ## ', 'KATA-SR', ' ######  ########  \n##    ## ##     ## \n## KATA  ## -SR ## \n ######  ########  \n      ## ##   ##   \n##    ## ##    ##  \n ######  ##     ## ', 'KATA-SR'),
(9, 'C\'est court !', 'La fonction doit retourner 50 si ma data est null ou undefined, sinon elle doit retourner la valeur de data.', 'Vous n\'avez que 16 charactères disponible.', 16, NULL, '50', '15', '15'),
(10, 'A l\'envers !', 'La fonction doit retourner le string data à l\'envers en minuscule.', 'Vous avez que 49 characteres disponible.', 49, 'WildCodeSchool', 'loohcsedocdliw', 'AbcdEfg', 'gfedcba'),
(11, 'Comme la Nintendo !', 'Grace à la fonction nous devons retrouver le nom de domaine cacher dans la data.', 'Vous avez que 23 characteres disponible.', 23, 'WVdOMGRTMXNZVzR1WTI5dA==', 'actu-lan.com', 'WVhOemJ5MXlaWE53WVhkdUxtWnk=', 'asso-respawn.fr');

-- --------------------------------------------------------

--
-- Table structure for table `scores`
--

CREATE TABLE `scores` (
  `id` int(11) NOT NULL,
  `id_try` int(11) DEFAULT NULL,
  `id_users` int(11) DEFAULT NULL,
  `id_speedruns` int(11) DEFAULT NULL,
  `id_katas` int(11) DEFAULT NULL,
  `solution` text DEFAULT NULL,
  `brain_time` time DEFAULT NULL,
  `exec_time` time(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `scores`
--

INSERT INTO `scores` (`id`, `id_try`, `id_users`, `id_speedruns`, `id_katas`, `solution`, `brain_time`, `exec_time`) VALUES
(1, 1, 10, 1, 1, 'return \"KATA-SR\"', '00:00:07', '00:00:00.1000'),
(3, NULL, 10, NULL, NULL, NULL, NULL, NULL),
(4, NULL, 10, NULL, NULL, NULL, NULL, NULL),
(5, 5, 10, 1, 1, 'return \"KATA-SR\"', '00:00:07', '00:00:00.0000'),
(7, NULL, 10, NULL, NULL, NULL, NULL, NULL),
(8, NULL, 10, NULL, NULL, NULL, NULL, NULL),
(9, NULL, 10, NULL, NULL, NULL, NULL, NULL),
(10, 10, 10, 1, 1, 'return \"KATA-SR\"', '00:00:09', '00:00:00.1000'),
(11, 11, 10, 1, 1, 'return \"KATA-SR\"', '00:00:08', '00:00:00.0000'),
(12, 12, 10, 1, 1, 'return \"KATA-SR\"', '00:00:07', '00:00:00.0999'),
(13, 13, 10, 1, 1, 'return \"KATA-SR\"', '00:00:08', '00:00:00.0000'),
(14, NULL, 10, NULL, NULL, NULL, NULL, NULL),
(15, NULL, 10, NULL, NULL, NULL, NULL, NULL),
(16, NULL, 10, NULL, NULL, NULL, NULL, NULL),
(17, NULL, 10, NULL, NULL, NULL, NULL, NULL),
(18, NULL, 10, NULL, NULL, NULL, NULL, NULL),
(19, 19, 10, 1, 1, 'return \"KATA-SR\"', '00:02:26', '00:00:00.0000'),
(20, 20, 10, 1, 1, 'return \"KATA-SR\"', '00:00:06', '00:00:00.0000'),
(21, 21, 10, 1, 1, 'return \"KATA-SR\"', '00:00:07', '00:00:00.0000'),
(22, 22, 10, 1, 1, 'return \"KATA-SR\"', '00:00:07', '00:00:00.0000'),
(23, 22, 10, 1, 2, 'return data??=50', '00:00:23', '00:00:00.0999'),
(24, 24, 10, 1, 1, 'return \"KATA-SR\"', '00:00:07', '00:00:00.0000'),
(25, 24, 10, 1, 2, 'return data??=50', '00:01:31', '00:00:00.0000'),
(26, 24, 10, 1, 3, 'return data.split(\"\").reverse().join(\"\").toLowerCase()', '00:01:39', '00:00:00.0000'),
(27, 27, 10, 1, 1, 'return \"KATA-SR\"', '00:00:07', '00:00:00.0000'),
(28, 27, 10, 1, 2, 'return data??=50', '00:00:20', '00:00:00.0999'),
(29, 27, 10, 1, 3, 'return data.split(\"\").reverse().join(\"\").toLowerCase()', '00:00:52', '00:00:00.1000'),
(30, 27, 10, 1, 4, 'return decodeURIComponent(escape(window.atob(decodeURIComponent(escape(window.atob(data))))))', '00:00:10', '00:00:00.2000'),
(31, 31, 10, 1, 1, 'return \"KATA-SR\"', '00:00:40', '00:00:00.0999'),
(32, NULL, 10, NULL, NULL, NULL, NULL, NULL),
(33, NULL, 10, NULL, NULL, NULL, NULL, NULL),
(34, NULL, 10, NULL, NULL, NULL, NULL, NULL),
(35, NULL, 10, NULL, NULL, NULL, NULL, NULL),
(36, NULL, 10, NULL, NULL, NULL, NULL, NULL),
(37, NULL, 10, NULL, NULL, NULL, NULL, NULL),
(38, 38, 10, 1, 1, 'return \"KATA-SR\"', '00:00:07', '00:00:00.0999'),
(39, 38, 10, 1, 2, 'return data??=50', '00:00:10', '00:00:00.1000'),
(40, 40, 10, 1, 1, 'return \"KATA-SR\"', '00:00:09', '00:00:00.0000'),
(41, 40, 10, 1, 2, 'return data??=50', '00:00:30', '00:00:00.0999'),
(42, 40, 10, 1, 3, 'return data.split(\"\").reverse().join(\"\").toLowerCase()', '00:01:13', '00:00:00.0000'),
(43, 40, 10, 1, 4, 'let x=(y)=>decodeURI(atob(y));return x(x(data))', '00:00:39', '00:00:00.1999'),
(44, 44, 10, 1, 1, 'return \"KATA-SR\"', '00:00:06', '00:00:00.0999'),
(45, 44, 10, 1, 2, 'return data??=50', '00:00:17', '00:00:00.1000'),
(46, 46, 10, 1, 1, 'return \"KATA-SR\"', '00:00:07', '00:00:00.1999'),
(47, 46, 10, 1, 2, 'return data??=50', '00:00:10', '00:00:00.0999'),
(48, 46, 10, 1, 3, 'return [...data].reverse().join(\"\").toLowerCase()', '00:04:04', '00:00:00.0999'),
(49, 49, 10, 2, 8, 'return \"KATA-SR\"', '00:00:15', '00:00:00.0999'),
(50, NULL, 10, NULL, NULL, NULL, NULL, NULL),
(51, NULL, 10, NULL, NULL, NULL, NULL, NULL),
(52, NULL, 10, NULL, NULL, NULL, NULL, NULL),
(53, 53, 12, 1, 1, 'return \"KATA-SR\"', '00:00:33', '00:00:00.1000'),
(54, 53, 12, 1, 2, 'return !data ? 50 : data', '00:01:55', '00:00:00.0000'),
(55, 53, 12, 1, 3, 'return data.split(\"\").reverse().join(\"\").toLowerCase()', '00:02:58', '00:00:00.1000'),
(56, 53, 12, 1, 4, 'return atob(atob(data))', '00:01:04', '00:00:00.1999'),
(57, NULL, 12, NULL, NULL, NULL, NULL, NULL),
(58, 58, 12, 1, 1, 'return \"KATA-SR\"', '00:02:24', '00:00:00.0999'),
(59, 58, 12, 1, 2, 'return data === null ? 50 : data', '00:01:14', '00:00:00.1000'),
(60, 60, 12, 1, 1, 'return \"KATA-SR\"', '00:00:13', '00:00:00.0000'),
(61, 61, 13, 1, 1, 'return \"KATA-SR\"', '00:01:23', '00:00:00.1000'),
(62, 61, 13, 1, 2, 'return data ? data : 50', '00:00:59', '00:00:00.0999'),
(63, 61, 13, 1, 3, 'return data.split(\"\").reverse().join(\"\").toLowerCase()', '00:01:47', '00:00:00.1000'),
(64, 61, 13, 1, 4, 'const n = atob(data); return atob(n)', '00:04:12', '00:00:00.1000'),
(65, NULL, 13, NULL, NULL, NULL, NULL, NULL),
(66, NULL, 13, NULL, NULL, NULL, NULL, NULL),
(67, NULL, 13, NULL, NULL, NULL, NULL, NULL),
(68, 68, 10, 1, 1, 'return \"KATA-SR\"', '00:00:30', '00:00:00.1000'),
(69, 68, 10, 1, 2, 'return data ? data : 50', '00:00:33', '00:00:00.1000'),
(70, 68, 10, 1, 3, 'return data.split(\"\").reverse().join(\"\").toLowerCase()', '00:00:47', '00:00:00.0000'),
(71, 68, 10, 1, 4, 'return atob(atob(data))', '00:00:56', '00:00:00.1000'),
(72, 72, 10, 2, 8, 'return \"KATA-SR\"', '00:00:08', '00:00:00.1000'),
(73, 73, 10, 2, 8, 'return \"KATA-SR\"', '00:01:01', '00:00:00.1000'),
(74, 73, 10, 2, 9, 'return data??=50', '00:00:42', '00:00:00.0999'),
(75, 73, 10, 2, 10, 'return [...data].reverse().join(\"\").toLowerCase()', '00:04:39', '00:00:00.0000'),
(76, 73, 10, 2, 11, 'return atob(atob(data))', '00:01:46', '00:00:00.0000');

-- --------------------------------------------------------

--
-- Table structure for table `speedruns`
--

CREATE TABLE `speedruns` (
  `id` int(11) NOT NULL,
  `title` varchar(25) NOT NULL,
  `difficulty` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `speedruns`
--

INSERT INTO `speedruns` (`id`, `title`, `difficulty`) VALUES
(1, 'Premier SpeedRun (Facile)', 1),
(2, 'Premier SpeedRun (Hard)', 5);

-- --------------------------------------------------------

--
-- Table structure for table `speedruns_katas`
--

CREATE TABLE `speedruns_katas` (
  `id_speedruns` int(11) NOT NULL,
  `id_katas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `speedruns_katas`
--

INSERT INTO `speedruns_katas` (`id_speedruns`, `id_katas`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 8),
(2, 9),
(2, 10),
(2, 11);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `firstname` varchar(45) NOT NULL,
  `email` varchar(254) NOT NULL,
  `password` varchar(255) NOT NULL,
  `admin` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci COMMENT='Table utilisateurs';

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `lastname`, `firstname`, `email`, `password`, `admin`) VALUES
(10, 'Boudjelal', 'Yannick', 'ndjbouman@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$QPk8kIHHcrBw9X/jebUElw$QkSO4zIUhaFpFUli/s4TXujGA01LCgIMOuH0vhqrTA0', 1),
(11, 'Freyssier', 'Joor', 'joor@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$5sbMCApFwUw8831yyUcgeg$yjlEWsLcuPQSCC1GxsXcMnXlCTRLVdptCQb4aH1GlHs', 0),
(12, 'Timmer', 'Romain', 'timmer@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$C32mg/93s8UVmWu1KY6UGw$ckk+RHbAqpqI1pPCzBlenPSWd7nTRe6RH3zFcU0qdb8', 0),
(13, 'lolo', 'lolo', 'duclos.laurent@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$CsGH7MjTc3ZwEGxriBV+UA$pilLVeQxTBOsr/0ZWXFC7iIpTqA3gPihOut2JJzWtI0', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `katas`
--
ALTER TABLE `katas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_scores` (`id_users`),
  ADD KEY `fk_katas_scores` (`id_katas`),
  ADD KEY `fk_speedruns_runs` (`id_speedruns`);

--
-- Indexes for table `speedruns`
--
ALTER TABLE `speedruns`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `speedruns_katas`
--
ALTER TABLE `speedruns_katas`
  ADD KEY `fk_speedruns_katas` (`id_speedruns`),
  ADD KEY `fk_katas_speedruns` (`id_katas`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `katas`
--
ALTER TABLE `katas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `scores`
--
ALTER TABLE `scores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `speedruns`
--
ALTER TABLE `speedruns`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `scores`
--
ALTER TABLE `scores`
  ADD CONSTRAINT `fk_katas_scores` FOREIGN KEY (`id_katas`) REFERENCES `katas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_speedruns_runs` FOREIGN KEY (`id_speedruns`) REFERENCES `speedruns` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_scores` FOREIGN KEY (`id_users`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `speedruns_katas`
--
ALTER TABLE `speedruns_katas`
  ADD CONSTRAINT `fk_katas_speedruns` FOREIGN KEY (`id_katas`) REFERENCES `katas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_speedruns_katas` FOREIGN KEY (`id_speedruns`) REFERENCES `speedruns` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
