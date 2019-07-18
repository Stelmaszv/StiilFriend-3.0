-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 03 Lip 2018, 16:59
-- Wersja serwera: 10.1.31-MariaDB
-- Wersja PHP: 7.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `stilfriend 3.0`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `conversation`
--

CREATE TABLE `conversation` (
  `IdConversation` int(11) NOT NULL,
  `LastMessId` int(11) NOT NULL,
  `UsersInConversation` text COLLATE utf8_polish_ci NOT NULL,
  `UsersInConversationJason` text COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `conversation`
--

INSERT INTO `conversation` (`IdConversation`, `LastMessId`, `UsersInConversation`, `UsersInConversationJason`) VALUES
(1, 0, '1 5 ', '[{\"UserID\":1,\"login\":\"Stelmaszv\",\"avatar\":\"user/photo/1/201221.jpg\",\"email\":\"stelmaszv@gmail.com\",\"password\":\"$2b$10$ZMVmIM4XqZ5JctIEe.MwTemiGJxL1yiD2TFuaCS/RTxfAdXCh6sH6\",\"ban\":0,\"active\":0,\"configure\":0,\"sex\":\"M\",\"dateregister\":\"2018-05-23T11:31:40.000Z\",\"lostlogin\":\"2018-06-19T10:29:57.000Z\"},{\"UserID\":5,\"login\":\"nowy user\",\"avatar\":\"\",\"email\":\"user@gmail.pl\",\"password\":\"$2b$10$mN3Y5tJXKKzFj2HBHKpQMu3pDS6fZxLPRA16E6/UZLxj02ViWgfSe\",\"ban\":0,\"active\":0,\"configure\":0,\"sex\":\"F\",\"dateregister\":\"2018-06-08T09:48:58.000Z\",\"lostlogin\":\"2018-06-21T10:38:44.000Z\",\"CountNotReeded\":0}]'),
(2, 0, '1 2 3 4 ', '[{\"UserID\":1,\"login\":\"Stelmaszv\",\"avatar\":\"user/photo/1/201221.jpg\",\"email\":\"stelmaszv@gmail.com\",\"password\":\"$2b$10$ZMVmIM4XqZ5JctIEe.MwTemiGJxL1yiD2TFuaCS/RTxfAdXCh6sH6\",\"ban\":0,\"active\":0,\"configure\":0,\"sex\":\"M\",\"dateregister\":\"2018-05-23T11:31:40.000Z\",\"lostlogin\":\"2018-06-19T10:29:57.000Z\"},{\"UserID\":2,\"login\":\"Kotek\",\"avatar\":\"user/photo/2/kotek.jpg\",\"email\":\"kotek@kotek.pl\",\"password\":\"$2b$10$ux5ykO7NbsNYlGtvsf9/SOatrlFtKrM6ZG0wTbALfBe4Ax8tUI7Ze\",\"ban\":0,\"active\":1,\"configure\":0,\"sex\":\"M\",\"dateregister\":\"2018-05-23T11:32:56.000Z\",\"lostlogin\":\"2018-06-28T12:19:55.000Z\",\"CountNotReeded\":0},{\"UserID\":3,\"login\":\"grwehehgqgqrgqrgqrgrqg\",\"avatar\":\"\",\"email\":\"heth@qeqwe.pl\",\"password\":\"$2b$10$R8d3vF5QdMQJwZ0gUIeWnu9LjjsuEX/w9nCQ6hTQX7Rhq8HGjDP2u\",\"ban\":0,\"active\":1,\"configure\":0,\"sex\":\"M\",\"dateregister\":\"2018-05-24T11:12:35.000Z\",\"lostlogin\":\"2018-05-27T10:03:35.000Z\",\"CountNotReeded\":0},{\"UserID\":4,\"login\":\"qfeqf\",\"avatar\":\"\",\"email\":\"dqdwdS@fwfwef.pl\",\"password\":\"$2b$10$eEQ4P4v4Pe9tyQ6KDJ4Sme6ifOl0CfZQMobE1Vfnk1/eASye/L5Ba\",\"ban\":0,\"active\":0,\"configure\":0,\"sex\":\"F\",\"dateregister\":\"2018-05-24T12:09:22.000Z\",\"lostlogin\":\"2018-05-24T12:09:22.000Z\",\"CountNotReeded\":0}]'),
(3, 0, '1 2 3 4 ', '[{\"UserID\":1,\"login\":\"Stelmaszv\",\"avatar\":\"user/photo/1/201221.jpg\",\"email\":\"stelmaszv@gmail.com\",\"password\":\"$2b$10$ZMVmIM4XqZ5JctIEe.MwTemiGJxL1yiD2TFuaCS/RTxfAdXCh6sH6\",\"ban\":0,\"active\":0,\"configure\":0,\"sex\":\"M\",\"dateregister\":\"2018-05-23T11:31:40.000Z\",\"lostlogin\":\"2018-06-19T10:29:57.000Z\"},{\"UserID\":2,\"login\":\"Kotek\",\"avatar\":\"user/photo/2/kotek.jpg\",\"email\":\"kotek@kotek.pl\",\"password\":\"$2b$10$ux5ykO7NbsNYlGtvsf9/SOatrlFtKrM6ZG0wTbALfBe4Ax8tUI7Ze\",\"ban\":0,\"active\":1,\"configure\":0,\"sex\":\"M\",\"dateregister\":\"2018-05-23T11:32:56.000Z\",\"lostlogin\":\"2018-06-28T12:19:55.000Z\",\"CountNotReeded\":0},{\"UserID\":3,\"login\":\"grwehehgqgqrgqrgqrgrqg\",\"avatar\":\"\",\"email\":\"heth@qeqwe.pl\",\"password\":\"$2b$10$R8d3vF5QdMQJwZ0gUIeWnu9LjjsuEX/w9nCQ6hTQX7Rhq8HGjDP2u\",\"ban\":0,\"active\":1,\"configure\":0,\"sex\":\"M\",\"dateregister\":\"2018-05-24T11:12:35.000Z\",\"lostlogin\":\"2018-05-27T10:03:35.000Z\",\"CountNotReeded\":0},{\"UserID\":4,\"login\":\"qfeqf\",\"avatar\":\"\",\"email\":\"dqdwdS@fwfwef.pl\",\"password\":\"$2b$10$eEQ4P4v4Pe9tyQ6KDJ4Sme6ifOl0CfZQMobE1Vfnk1/eASye/L5Ba\",\"ban\":0,\"active\":0,\"configure\":0,\"sex\":\"F\",\"dateregister\":\"2018-05-24T12:09:22.000Z\",\"lostlogin\":\"2018-05-24T12:09:22.000Z\",\"CountNotReeded\":0}]'),
(4, 86, '1 2 ', '[{\"UserID\":1,\"login\":\"Stelmaszv\",\"avatar\":\"user/photo/1/201221.jpg\",\"email\":\"stelmaszv@gmail.com\",\"password\":\"$2b$10$ZMVmIM4XqZ5JctIEe.MwTemiGJxL1yiD2TFuaCS/RTxfAdXCh6sH6\",\"ban\":0,\"active\":0,\"configure\":0,\"sex\":\"M\",\"dateregister\":\"2018-05-23T11:31:40.000Z\",\"lostlogin\":\"2018-06-19T10:29:57.000Z\"},{\"UserID\":2,\"login\":\"Kotek\",\"avatar\":\"user/photo/2/kotek.jpg\",\"email\":\"kotek@kotek.pl\",\"password\":\"$2b$10$ux5ykO7NbsNYlGtvsf9/SOatrlFtKrM6ZG0wTbALfBe4Ax8tUI7Ze\",\"ban\":0,\"active\":1,\"configure\":0,\"sex\":\"M\",\"dateregister\":\"2018-05-23T11:32:56.000Z\",\"lostlogin\":\"2018-06-28T12:19:55.000Z\",\"CountNotReeded\":0}]'),
(5, 0, '1 4 ', '[{\"UserID\":1,\"login\":\"Stelmaszv\",\"avatar\":\"user/photo/1/201221.jpg\",\"email\":\"stelmaszv@gmail.com\",\"password\":\"$2b$10$ZMVmIM4XqZ5JctIEe.MwTemiGJxL1yiD2TFuaCS/RTxfAdXCh6sH6\",\"ban\":0,\"active\":1,\"configure\":0,\"sex\":\"M\",\"dateregister\":\"2018-05-23T11:31:40.000Z\",\"lostlogin\":\"2018-06-29T14:13:07.000Z\"},{\"UserID\":4,\"login\":\"qfeqf\",\"avatar\":\"\",\"email\":\"dqdwdS@fwfwef.pl\",\"password\":\"$2b$10$eEQ4P4v4Pe9tyQ6KDJ4Sme6ifOl0CfZQMobE1Vfnk1/eASye/L5Ba\",\"ban\":0,\"active\":0,\"configure\":0,\"sex\":\"F\",\"dateregister\":\"2018-05-24T12:09:22.000Z\",\"lostlogin\":\"2018-05-24T12:09:22.000Z\",\"CountNotReeded\":0}]'),
(6, 0, '2 3 ', '[{\"UserID\":2,\"login\":\"Kotek\",\"avatar\":\"user/photo/2/kotek.jpg\",\"email\":\"kotek@kotek.pl\",\"password\":\"$2b$10$ux5ykO7NbsNYlGtvsf9/SOatrlFtKrM6ZG0wTbALfBe4Ax8tUI7Ze\",\"ban\":0,\"active\":1,\"configure\":0,\"sex\":\"M\",\"dateregister\":\"2018-05-23T11:32:56.000Z\",\"lostlogin\":\"2018-06-28T12:19:55.000Z\"},{\"UserID\":3,\"login\":\"grwehehgqgqrgqrgqrgrqg\",\"avatar\":\"\",\"email\":\"heth@qeqwe.pl\",\"password\":\"$2b$10$R8d3vF5QdMQJwZ0gUIeWnu9LjjsuEX/w9nCQ6hTQX7Rhq8HGjDP2u\",\"ban\":0,\"active\":1,\"configure\":0,\"sex\":\"M\",\"dateregister\":\"2018-05-24T11:12:35.000Z\",\"lostlogin\":\"2018-05-27T10:03:35.000Z\",\"CountNotReeded\":0}]'),
(7, 0, '2 4 ', '[{\"UserID\":2,\"login\":\"Kotek\",\"avatar\":\"user/photo/2/kotek.jpg\",\"email\":\"kotek@kotek.pl\",\"password\":\"$2b$10$ux5ykO7NbsNYlGtvsf9/SOatrlFtKrM6ZG0wTbALfBe4Ax8tUI7Ze\",\"ban\":0,\"active\":1,\"configure\":0,\"sex\":\"M\",\"dateregister\":\"2018-05-23T11:32:56.000Z\",\"lostlogin\":\"2018-05-30T14:56:10.000Z\"},{\"UserID\":4,\"login\":\"qfeqf\",\"avatar\":\"\",\"email\":\"dqdwdS@fwfwef.pl\",\"password\":\"$2b$10$eEQ4P4v4Pe9tyQ6KDJ4Sme6ifOl0CfZQMobE1Vfnk1/eASye/L5Ba\",\"ban\":0,\"active\":0,\"configure\":0,\"sex\":\"F\",\"dateregister\":\"2018-05-24T12:09:22.000Z\",\"lostlogin\":\"2018-05-24T12:09:22.000Z\",\"CountNotReeded\":0}]');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `conversationmessages`
--

CREATE TABLE `conversationmessages` (
  `IdMes` int(11) NOT NULL,
  `ConversationidMesages` int(11) NOT NULL,
  `Content` text COLLATE utf8_polish_ci NOT NULL,
  `Time` datetime NOT NULL,
  `IdSend` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `conversationmessages`
--

INSERT INTO `conversationmessages` (`IdMes`, `ConversationidMesages`, `Content`, `Time`, `IdSend`) VALUES
(1, 4, 'hethteh', '2018-07-02 12:29:11', 1),
(2, 4, 'klyliylyilyilyil', '2018-07-02 16:00:49', 2),
(3, 4, 'ktuktuktuk', '2018-07-02 16:00:58', 1),
(4, 4, 'ktuktuktuktuk', '2018-07-02 16:01:01', 2),
(5, 4, 'ktuktuktuk', '2018-07-02 16:01:03', 1),
(6, 4, 'jryjryjyrj', '2018-07-02 16:01:05', 1),
(7, 4, 'rjryjryjyrj', '2018-07-02 16:01:07', 1),
(8, 4, 'jryjryjryj', '2018-07-02 16:01:14', 2),
(9, 4, 'rjryryjryj', '2018-07-02 16:01:16', 2),
(10, 4, 'tjtyjtyjytj', '2018-07-02 16:01:18', 2),
(11, 4, 'jrjryj', '2018-07-02 16:02:58', 1),
(12, 4, 'fufufkuf', '2018-07-02 16:17:39', 1),
(13, 4, 'kyukuyky', '2018-07-02 16:17:54', 2),
(14, 4, 'gwrgwrgwg', '2018-07-03 13:23:01', 1),
(15, 4, 'nfnfngfn', '2018-07-03 13:40:52', 1),
(16, 4, 'kutktuk', '2018-07-03 13:44:57', 1),
(17, 4, 'jtkutkutkutkutk', '2018-07-03 13:47:49', 1),
(18, 4, 'hethet', '2018-07-03 13:48:50', 1),
(19, 4, 'hetheth', '2018-07-03 13:53:17', 1),
(20, 4, 'gwrgwrgwrgrg', '2018-07-03 13:53:55', 1),
(21, 4, 'grwgrwgrwgwrg', '2018-07-03 13:54:02', 1),
(22, 4, 'fqefqefqefqefqef]', '2018-07-03 13:54:27', 1),
(23, 4, 'hhpuioh', '2018-07-03 13:54:41', 1),
(24, 4, 'yt8t8t8t7t', '2018-07-03 13:54:44', 1),
(25, 4, 'gfg88tg8', '2018-07-03 13:54:47', 1),
(26, 4, 'hh9898h908hhph98', '2018-07-03 13:54:50', 1),
(27, 4, 'gh87g87g87g', '2018-07-03 13:55:03', 1),
(28, 4, 'joijoij', '2018-07-03 13:55:10', 1),
(29, 4, '9h9h9h89', '2018-07-03 13:55:22', 1),
(30, 4, 'hy9ih98h', '2018-07-03 13:55:30', 1),
(31, 4, 'h9h98h98h98h', '2018-07-03 13:55:32', 1),
(32, 4, 'ihihiouh', '2018-07-03 13:55:42', 1),
(33, 4, 'hrthrthtr', '2018-07-03 13:59:10', 1),
(34, 4, 'hetetheth', '2018-07-03 13:59:13', 1),
(35, 4, 'ktuktukut', '2018-07-03 13:59:27', 1),
(36, 4, 'lylilyil', '2018-07-03 13:59:49', 1),
(37, 4, 'jryjryjyrj', '2018-07-03 13:59:55', 1),
(38, 4, 'ktukutkt', '2018-07-03 14:00:01', 1),
(39, 4, 'ktukutkutkutk', '2018-07-03 14:00:54', 1),
(40, 4, 'jryjryjyrj', '2018-07-03 14:01:07', 1),
(41, 4, 'lyiliyliyl', '2018-07-03 14:01:16', 1),
(42, 4, 'hrthrthmrtohm', '2018-07-03 14:01:25', 1),
(43, 4, 'hrtehoitrh', '2018-07-03 14:01:26', 1),
(44, 4, 'hjrtiphjrtiojh', '2018-07-03 14:01:27', 1),
(45, 4, 'hjrtpihjtriojh', '2018-07-03 14:01:27', 1),
(46, 4, 'jryjyrj', '2018-07-03 14:01:32', 1),
(47, 4, 'jryjryj', '2018-07-03 14:06:07', 1),
(48, 4, 'hetheth', '2018-07-03 14:06:44', 1),
(49, 4, 'lyiliylyil', '2018-07-03 14:07:37', 1),
(50, 4, 'lyilyilyil', '2018-07-03 14:07:47', 1),
(51, 4, 'hethte', '2018-07-03 14:10:43', 1),
(52, 4, 'jryyjryj', '2018-07-03 14:10:54', 1),
(53, 4, 'htrhrh', '2018-07-03 14:10:56', 1),
(54, 4, 'hethetheth', '2018-07-03 14:14:52', 1),
(55, 4, 'kuykyk', '2018-07-03 14:14:59', 1),
(56, 4, 'ethethteh', '2018-07-03 14:15:14', 1),
(57, 4, 'jyjytrjytrj', '2018-07-03 14:28:13', 1),
(58, 4, 'hetheth', '2018-07-03 14:33:06', 1),
(59, 4, 'jryjryjryjryj', '2018-07-03 14:33:56', 1),
(60, 4, 'gwgwrgrw', '2018-07-03 14:34:08', 1),
(61, 4, 'gwgrwgrwg', '2018-07-03 14:35:35', 1),
(62, 4, ' jm,ykl,yuk', '2018-07-03 14:35:52', 1),
(63, 4, 'gwrgrwgw', '2018-07-03 14:36:53', 1),
(64, 4, ']vjvjjhv', '2018-07-03 14:41:10', 1),
(65, 4, 'nnoinninoin', '2018-07-03 14:41:26', 1),
(66, 4, 'nljknlon', '2018-07-03 14:41:35', 1),
(67, 4, 'bkbkb', '2018-07-03 14:41:52', 1),
(68, 4, 'hrhrth', '2018-07-03 14:42:11', 1),
(69, 4, 'hrhrthrth', '2018-07-03 14:42:20', 1),
(70, 4, 'hoihohi', '2018-07-03 14:43:02', 1),
(71, 4, 'kbkbkjjkb', '2018-07-03 14:43:19', 1),
(72, 4, 'giugiug', '2018-07-03 14:44:30', 1),
(73, 4, 'ffuffg', '2018-07-03 14:44:43', 1),
(74, 4, 'cccnv', '2018-07-03 14:45:10', 1),
(75, 4, 'gigiugiug', '2018-07-03 14:45:37', 1),
(76, 4, 'hethethteh', '2018-07-03 14:46:24', 1),
(77, 4, 'jryjyrj', '2018-07-03 14:46:31', 1),
(78, 4, 'jryjryjryjryjryj', '2018-07-03 14:46:47', 1),
(79, 4, 'hrthrthtrh', '2018-07-03 14:46:55', 1),
(80, 4, 'hprtjhptrojht', '2018-07-03 14:46:59', 1),
(81, 4, 'ngfnrt', '2018-07-03 14:49:33', 1),
(82, 4, 'fqefqefqef', '2018-07-03 14:57:37', 1),
(83, 4, 'fwfwef\\', '2018-07-03 16:54:54', 1),
(84, 4, 'hrthrthrthrth', '2018-07-03 16:54:59', 1),
(85, 4, 'fqefqefqefeqfq', '2018-07-03 16:55:10', 1),
(86, 4, 'fgqeiofgeqiu iqehr uiqehuqh fiuqeh fiuqeh iuqh riueqriu gqeiucdquirfh r yqir qieudbiqg riqer piqerypqer ypqery hqpery qeupryh q', '2018-07-03 16:55:19', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `messagedetails`
--

CREATE TABLE `messagedetails` (
  `MesDetId` int(11) NOT NULL,
  `ConversationId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `Reed` tinyint(1) NOT NULL,
  `Deleted` tinyint(1) NOT NULL,
  `ReedTime` datetime NOT NULL,
  `DeletedTime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `messagedetails`
--

INSERT INTO `messagedetails` (`MesDetId`, `ConversationId`, `UserId`, `Reed`, `Deleted`, `ReedTime`, `DeletedTime`) VALUES
(1, 1, 1, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 1, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 2, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 2, 1, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 3, 1, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 3, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 4, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 4, 1, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(9, 5, 1, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(10, 5, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(11, 6, 1, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(12, 6, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(13, 7, 1, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(14, 7, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(15, 8, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(16, 8, 1, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(17, 9, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(18, 9, 1, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(19, 10, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(20, 10, 1, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(21, 11, 1, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(22, 11, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(23, 12, 1, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(24, 12, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(25, 13, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(26, 13, 1, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(27, 14, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(28, 14, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(29, 15, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(30, 15, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(31, 16, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(32, 16, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(33, 17, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(34, 17, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(35, 18, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(36, 18, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(37, 19, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(38, 19, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(39, 20, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(40, 20, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(41, 21, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(42, 21, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(43, 22, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(44, 22, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(45, 23, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(46, 23, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(47, 24, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(48, 24, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(49, 25, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(50, 25, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(51, 26, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(52, 26, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(53, 27, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(54, 27, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(55, 28, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(56, 28, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(57, 29, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(58, 29, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(59, 30, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(60, 30, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(61, 31, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(62, 31, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(63, 32, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(64, 32, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(65, 33, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(66, 33, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(67, 34, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(68, 34, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(69, 35, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(70, 35, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(71, 36, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(72, 36, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(73, 37, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(74, 37, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(75, 38, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(76, 38, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(77, 39, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(78, 39, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(79, 40, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(80, 40, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(81, 41, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(82, 41, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(83, 42, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(84, 42, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(85, 43, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(86, 43, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(87, 44, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(88, 44, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(89, 45, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(90, 45, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(91, 46, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(92, 46, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(93, 47, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(94, 47, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(95, 48, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(96, 48, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(97, 49, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(98, 49, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(99, 50, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(100, 50, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(101, 51, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(102, 51, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(103, 52, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(104, 52, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(105, 53, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(106, 53, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(107, 54, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(108, 54, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(109, 55, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(110, 55, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(111, 56, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(112, 56, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(113, 57, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(114, 57, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(115, 58, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(116, 58, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(117, 59, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(118, 59, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(119, 60, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(120, 60, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(121, 61, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(122, 61, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(123, 62, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(124, 62, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(125, 63, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(126, 63, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(127, 64, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(128, 64, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(129, 65, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(130, 65, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(131, 66, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(132, 66, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(133, 67, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(134, 67, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(135, 68, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(136, 68, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(137, 69, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(138, 69, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(139, 70, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(140, 70, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(141, 71, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(142, 71, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(143, 72, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(144, 72, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(145, 73, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(146, 73, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(147, 74, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(148, 74, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(149, 75, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(150, 75, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(151, 76, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(152, 76, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(153, 77, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(154, 77, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(155, 78, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(156, 78, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(157, 79, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(158, 79, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(159, 80, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(160, 80, 2, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(161, 81, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(162, 81, 2, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(163, 82, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(164, 82, 2, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(165, 83, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(166, 83, 2, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(167, 84, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(168, 84, 2, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(169, 85, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(170, 85, 2, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(171, 86, 1, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(172, 86, 2, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `messages`
--

CREATE TABLE `messages` (
  `idMessageStan` int(11) NOT NULL,
  `Contnet` text COLLATE utf8_polish_ci,
  `date` datetime DEFAULT NULL,
  `sendID` int(11) DEFAULT NULL,
  `MemberInCoversation` text COLLATE utf8_polish_ci,
  `MemberInCoversationnormal` text COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `messages`
--

INSERT INTO `messages` (`idMessageStan`, `Contnet`, `date`, `sendID`, `MemberInCoversation`, `MemberInCoversationnormal`) VALUES
(1, 'ktktuktk', '2018-06-11 16:30:53', 1, '[{\"UserID\":1,\"login\":\"Stelmaszv\",\"avatar\":\"user/photo/1/201221.jpg\",\"email\":\"stelmaszv@gmail.com\",\"password\":\"$2b$10$ZMVmIM4XqZ5JctIEe.MwTemiGJxL1yiD2TFuaCS/RTxfAdXCh6sH6\",\"ban\":0,\"active\":0,\"configure\":0,\"sex\":\"M\",\"dateregister\":\"2018-05-23T11:31:40.000Z\",\"lostlogin\":\"2018-05-30T08:43:33.000Z\"},{\"UserID\":2,\"login\":\"Kotek\",\"avatar\":\"user/photo/2/kotek.jpg\",\"email\":\"kotek@kotek.pl\",\"password\":\"$2b$10$ux5ykO7NbsNYlGtvsf9/SOatrlFtKrM6ZG0wTbALfBe4Ax8tUI7Ze\",\"ban\":0,\"active\":1,\"configure\":0,\"sex\":\"M\",\"dateregister\":\"2018-05-23T11:32:56.000Z\",\"lostlogin\":\"2018-06-11T14:30:35.000Z\",\"CountNotReeded\":0,\"AddressShow\":0,\"$$hashKey\":\"object:22\"}]', '1 2'),
(2, 'ktuktuk', '2018-06-11 16:30:57', 2, '[{\"UserID\":2,\"login\":\"Kotek\",\"avatar\":\"user/photo/2/kotek.jpg\",\"email\":\"kotek@kotek.pl\",\"password\":\"$2b$10$ux5ykO7NbsNYlGtvsf9/SOatrlFtKrM6ZG0wTbALfBe4Ax8tUI7Ze\",\"ban\":0,\"active\":1,\"configure\":0,\"sex\":\"M\",\"dateregister\":\"2018-05-23T11:32:56.000Z\",\"lostlogin\":\"2018-06-09T10:21:25.000Z\",\"AddressShow\":0},{\"UserID\":1,\"login\":\"Stelmaszv\",\"avatar\":\"user/photo/1/201221.jpg\",\"email\":\"stelmaszv@gmail.com\",\"password\":\"$2b$10$ZMVmIM4XqZ5JctIEe.MwTemiGJxL1yiD2TFuaCS/RTxfAdXCh6sH6\",\"ban\":0,\"active\":1,\"configure\":0,\"sex\":\"M\",\"dateregister\":\"2018-05-23T11:31:40.000Z\",\"lostlogin\":\"2018-06-11T14:30:47.000Z\",\"CountNotReeded\":1,\"AddressShow\":0,\"$$hashKey\":\"object:120\"}]', '2 1'),
(3, 'vgsvsdvsd', '2018-06-11 16:31:02', 1, '[{\"UserID\":2,\"login\":\"Kotek\",\"avatar\":\"user/photo/2/kotek.jpg\",\"email\":\"kotek@kotek.pl\",\"password\":\"$2b$10$ux5ykO7NbsNYlGtvsf9/SOatrlFtKrM6ZG0wTbALfBe4Ax8tUI7Ze\",\"ban\":0,\"active\":1,\"configure\":0,\"sex\":\"M\",\"dateregister\":\"2018-05-23T11:32:56.000Z\",\"lostlogin\":\"2018-06-09T10:21:25.000Z\",\"AddressShow\":0},{\"UserID\":1,\"login\":\"Stelmaszv\",\"avatar\":\"user/photo/1/201221.jpg\",\"email\":\"stelmaszv@gmail.com\",\"password\":\"$2b$10$ZMVmIM4XqZ5JctIEe.MwTemiGJxL1yiD2TFuaCS/RTxfAdXCh6sH6\",\"ban\":0,\"active\":1,\"configure\":0,\"sex\":\"M\",\"dateregister\":\"2018-05-23T11:31:40.000Z\",\"lostlogin\":\"2018-06-11T14:30:47.000Z\",\"CountNotReeded\":1,\"AddressShow\":0,\"$$hashKey\":\"object:120\"}]', '2 1'),
(4, 'hehetheth', '2018-06-11 16:31:44', 1, '[{\"UserID\":1,\"login\":\"Stelmaszv\",\"avatar\":\"user/photo/1/201221.jpg\",\"email\":\"stelmaszv@gmail.com\",\"password\":\"$2b$10$ZMVmIM4XqZ5JctIEe.MwTemiGJxL1yiD2TFuaCS/RTxfAdXCh6sH6\",\"ban\":0,\"active\":0,\"configure\":0,\"sex\":\"M\",\"dateregister\":\"2018-05-23T11:31:40.000Z\",\"lostlogin\":\"2018-05-30T08:43:33.000Z\"},{\"UserID\":2,\"login\":\"Kotek\",\"avatar\":\"user/photo/2/kotek.jpg\",\"email\":\"kotek@kotek.pl\",\"password\":\"$2b$10$ux5ykO7NbsNYlGtvsf9/SOatrlFtKrM6ZG0wTbALfBe4Ax8tUI7Ze\",\"ban\":0,\"active\":1,\"configure\":0,\"sex\":\"M\",\"dateregister\":\"2018-05-23T11:32:56.000Z\",\"lostlogin\":\"2018-06-11T14:30:35.000Z\",\"CountNotReeded\":0,\"AddressShow\":0,\"$$hashKey\":\"object:25\"}]', '1 2'),
(5, 'jtyjytj', '2018-06-11 16:35:56', 1, '[{\"UserID\":1,\"login\":\"Stelmaszv\",\"avatar\":\"user/photo/1/201221.jpg\",\"email\":\"stelmaszv@gmail.com\",\"password\":\"$2b$10$ZMVmIM4XqZ5JctIEe.MwTemiGJxL1yiD2TFuaCS/RTxfAdXCh6sH6\",\"ban\":0,\"active\":0,\"configure\":0,\"sex\":\"M\",\"dateregister\":\"2018-05-23T11:31:40.000Z\",\"lostlogin\":\"2018-05-30T08:43:33.000Z\"},{\"UserID\":2,\"login\":\"Kotek\",\"avatar\":\"user/photo/2/kotek.jpg\",\"email\":\"kotek@kotek.pl\",\"password\":\"$2b$10$ux5ykO7NbsNYlGtvsf9/SOatrlFtKrM6ZG0wTbALfBe4Ax8tUI7Ze\",\"ban\":0,\"active\":1,\"configure\":0,\"sex\":\"M\",\"dateregister\":\"2018-05-23T11:32:56.000Z\",\"lostlogin\":\"2018-06-11T14:30:35.000Z\",\"CountNotReeded\":0,\"AddressShow\":0,\"$$hashKey\":\"object:25\"}]', '1 2'),
(6, 'hetheth', '2018-06-11 16:41:20', 1, '[{\"UserID\":1,\"login\":\"Stelmaszv\",\"avatar\":\"user/photo/1/201221.jpg\",\"email\":\"stelmaszv@gmail.com\",\"password\":\"$2b$10$ZMVmIM4XqZ5JctIEe.MwTemiGJxL1yiD2TFuaCS/RTxfAdXCh6sH6\",\"ban\":0,\"active\":0,\"configure\":0,\"sex\":\"M\",\"dateregister\":\"2018-05-23T11:31:40.000Z\",\"lostlogin\":\"2018-05-30T08:43:33.000Z\"},{\"UserID\":2,\"login\":\"Kotek\",\"avatar\":\"user/photo/2/kotek.jpg\",\"email\":\"kotek@kotek.pl\",\"password\":\"$2b$10$ux5ykO7NbsNYlGtvsf9/SOatrlFtKrM6ZG0wTbALfBe4Ax8tUI7Ze\",\"ban\":0,\"active\":1,\"configure\":0,\"sex\":\"M\",\"dateregister\":\"2018-05-23T11:32:56.000Z\",\"lostlogin\":\"2018-06-11T14:30:35.000Z\",\"CountNotReeded\":0,\"AddressShow\":0,\"$$hashKey\":\"object:25\"}]', '1 2'),
(7, 'jryjyrj', '2018-06-11 16:41:43', 1, '[{\"UserID\":1,\"login\":\"Stelmaszv\",\"avatar\":\"user/photo/1/201221.jpg\",\"email\":\"stelmaszv@gmail.com\",\"password\":\"$2b$10$ZMVmIM4XqZ5JctIEe.MwTemiGJxL1yiD2TFuaCS/RTxfAdXCh6sH6\",\"ban\":0,\"active\":0,\"configure\":0,\"sex\":\"M\",\"dateregister\":\"2018-05-23T11:31:40.000Z\",\"lostlogin\":\"2018-05-30T08:43:33.000Z\"},{\"UserID\":2,\"login\":\"Kotek\",\"avatar\":\"user/photo/2/kotek.jpg\",\"email\":\"kotek@kotek.pl\",\"password\":\"$2b$10$ux5ykO7NbsNYlGtvsf9/SOatrlFtKrM6ZG0wTbALfBe4Ax8tUI7Ze\",\"ban\":0,\"active\":1,\"configure\":0,\"sex\":\"M\",\"dateregister\":\"2018-05-23T11:32:56.000Z\",\"lostlogin\":\"2018-06-11T14:30:35.000Z\",\"CountNotReeded\":0,\"AddressShow\":1,\"$$hashKey\":\"object:25\"}]', '1 2'),
(8, 'titiuy', '2018-06-12 13:07:31', 1, '[{\"UserID\":1,\"login\":\"Stelmaszv\",\"avatar\":\"user/photo/1/201221.jpg\",\"email\":\"stelmaszv@gmail.com\",\"password\":\"$2b$10$ZMVmIM4XqZ5JctIEe.MwTemiGJxL1yiD2TFuaCS/RTxfAdXCh6sH6\",\"ban\":0,\"active\":0,\"configure\":0,\"sex\":\"M\",\"dateregister\":\"2018-05-23T11:31:40.000Z\",\"lostlogin\":\"2018-05-30T08:43:33.000Z\"},{\"UserID\":2,\"login\":\"Kotek\",\"avatar\":\"user/photo/2/kotek.jpg\",\"email\":\"kotek@kotek.pl\",\"password\":\"$2b$10$ux5ykO7NbsNYlGtvsf9/SOatrlFtKrM6ZG0wTbALfBe4Ax8tUI7Ze\",\"ban\":0,\"active\":1,\"configure\":0,\"sex\":\"M\",\"dateregister\":\"2018-05-23T11:32:56.000Z\",\"lostlogin\":\"2018-06-12T11:07:21.000Z\",\"CountNotReeded\":0,\"AddressShow\":2,\"$$hashKey\":\"object:24\"}]', '1 2'),
(9, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam maiores ad odio, temporibus quo dolore nobis pariatur blanditiis nam eos maxime ratione at. A ratione magnam, voluptate, autem distinctio quia.', '2018-06-14 12:58:26', 1, '[{\"id\":1},{\"id\":2}]', 'undefined undefined'),
(10, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam maiores ad odio, temporibus quo dolore nobis pariatur blanditiis nam eos maxime ratione at. A ratione magnam, voluptate, autem distinctio quia.', '2018-06-14 13:24:51', 1, '[{\"id\":1},{\"id\":2}]', 'undefined undefined');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `messagessend`
--

CREATE TABLE `messagessend` (
  `idMessageSend` int(11) NOT NULL,
  `MessagesId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `Deleted` int(11) NOT NULL,
  `reeded` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `messagessend`
--

INSERT INTO `messagessend` (`idMessageSend`, `MessagesId`, `UserId`, `Deleted`, `reeded`) VALUES
(1, 1, 1, 1, 1),
(2, 1, 2, 0, 1),
(3, 2, 2, 0, 1),
(4, 2, 1, 1, 1),
(5, 3, 2, 0, 1),
(6, 3, 1, 1, 1),
(7, 4, 1, 1, 1),
(8, 4, 2, 0, 1),
(9, 5, 1, 1, 1),
(10, 5, 2, 0, 1),
(11, 6, 1, 1, 1),
(12, 6, 2, 0, 0),
(13, 7, 1, 1, 1),
(14, 7, 2, 0, 0),
(15, 8, 1, 1, 1),
(16, 8, 2, 0, 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `notifications`
--

CREATE TABLE `notifications` (
  `idNot` int(11) NOT NULL,
  `deliver` int(11) NOT NULL,
  `date` datetime DEFAULT NULL,
  `reeded` int(11) DEFAULT NULL,
  `contnet` text COLLATE utf8_polish_ci,
  `type` varchar(50) COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `notifications`
--

INSERT INTO `notifications` (`idNot`, `deliver`, `date`, `reeded`, `contnet`, `type`) VALUES
(5, 3, '2018-05-24 12:42:29', 1, '[{\"UserID\":1,\"login\":\"Stelmaszv\",\"email\":\"stelmaszv@gmail.com\",\"password\":\"$2b$10$ZMVmIM4XqZ5JctIEe.MwTemiGJxL1yiD2TFuaCS/RTxfAdXCh6sH6\",\"ban\":0,\"active\":0,\"configure\":0,\"sex\":\"M\",\"dateregister\":\"2018-05-23T11:31:40.000Z\",\"lostlogin\":null}]', 'UserLike'),
(6, 2, '2018-06-21 14:06:13', 1, '[{\"UserID\":1,\"login\":\"Stelmaszv\",\"avatar\":\"user/photo/1/201221.jpg\",\"email\":\"stelmaszv@gmail.com\",\"password\":\"$2b$10$ZMVmIM4XqZ5JctIEe.MwTemiGJxL1yiD2TFuaCS/RTxfAdXCh6sH6\",\"ban\":0,\"active\":0,\"configure\":0,\"sex\":\"M\",\"dateregister\":\"2018-05-23T11:31:40.000Z\",\"lostlogin\":\"2018-06-19T10:29:57.000Z\"}]', 'UserLike');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `login` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `avatar` varchar(100) COLLATE utf8_polish_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `ban` tinyint(1) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `configure` tinyint(1) NOT NULL,
  `sex` varchar(1) COLLATE utf8_polish_ci NOT NULL,
  `dateregister` datetime DEFAULT NULL,
  `lostlogin` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `users`
--

INSERT INTO `users` (`UserID`, `login`, `avatar`, `email`, `password`, `ban`, `active`, `configure`, `sex`, `dateregister`, `lostlogin`) VALUES
(1, 'Stelmaszv', 'user/photo/1/201221.jpg', 'stelmaszv@gmail.com', '$2b$10$ZMVmIM4XqZ5JctIEe.MwTemiGJxL1yiD2TFuaCS/RTxfAdXCh6sH6', 0, 1, 0, 'M', '2018-05-23 13:31:40', '2018-07-03 16:58:39'),
(2, 'Kotek', 'user/photo/2/kotek.jpg', 'kotek@kotek.pl', '$2b$10$ux5ykO7NbsNYlGtvsf9/SOatrlFtKrM6ZG0wTbALfBe4Ax8tUI7Ze', 0, 0, 0, 'M', '2018-05-23 13:32:56', '2018-07-03 16:56:00'),
(3, 'grwehehgqgqrgqrgqrgrqg', '', 'heth@qeqwe.pl', '$2b$10$R8d3vF5QdMQJwZ0gUIeWnu9LjjsuEX/w9nCQ6hTQX7Rhq8HGjDP2u', 0, 1, 0, 'M', '2018-05-24 13:12:35', '2018-05-27 12:03:35'),
(4, 'qfeqf', '', 'dqdwdS@fwfwef.pl', '$2b$10$eEQ4P4v4Pe9tyQ6KDJ4Sme6ifOl0CfZQMobE1Vfnk1/eASye/L5Ba', 0, 0, 0, 'F', '2018-05-24 14:09:22', '2018-05-24 14:09:22'),
(5, 'nowy user', '', 'user@gmail.pl', '$2b$10$mN3Y5tJXKKzFj2HBHKpQMu3pDS6fZxLPRA16E6/UZLxj02ViWgfSe', 0, 0, 0, 'F', '2018-06-08 11:48:58', '2018-06-21 12:38:44');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `conversation`
--
ALTER TABLE `conversation`
  ADD PRIMARY KEY (`IdConversation`);

--
-- Indeksy dla tabeli `conversationmessages`
--
ALTER TABLE `conversationmessages`
  ADD PRIMARY KEY (`IdMes`);

--
-- Indeksy dla tabeli `messagedetails`
--
ALTER TABLE `messagedetails`
  ADD PRIMARY KEY (`MesDetId`);

--
-- Indeksy dla tabeli `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`idMessageStan`);

--
-- Indeksy dla tabeli `messagessend`
--
ALTER TABLE `messagessend`
  ADD PRIMARY KEY (`idMessageSend`);

--
-- Indeksy dla tabeli `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`idNot`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `conversation`
--
ALTER TABLE `conversation`
  MODIFY `IdConversation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT dla tabeli `conversationmessages`
--
ALTER TABLE `conversationmessages`
  MODIFY `IdMes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT dla tabeli `messagedetails`
--
ALTER TABLE `messagedetails`
  MODIFY `MesDetId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=173;

--
-- AUTO_INCREMENT dla tabeli `messages`
--
ALTER TABLE `messages`
  MODIFY `idMessageStan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT dla tabeli `messagessend`
--
ALTER TABLE `messagessend`
  MODIFY `idMessageSend` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT dla tabeli `notifications`
--
ALTER TABLE `notifications`
  MODIFY `idNot` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
