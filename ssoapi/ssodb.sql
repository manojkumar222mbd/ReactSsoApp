-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 09, 2020 at 11:18 AM
-- Server version: 5.7.28-0ubuntu0.16.04.2
-- PHP Version: 7.0.33-0ubuntu0.16.04.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ssodb`
--

-- --------------------------------------------------------

--
-- Table structure for table `applications`
--

CREATE TABLE `applications` (
  `id` int(11) NOT NULL,
  `tenant_id` int(11) NOT NULL,
  `application_type_id` int(11) NOT NULL,
  `application_category_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `icon` varchar(150) NOT NULL,
  `description` varchar(250) NOT NULL,
  `application_connector_id` int(11) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `created_datetime` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `modified_datetime` datetime DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `is_deleted` tinyint(4) NOT NULL DEFAULT '0',
  `deleted_datetime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `application_categories`
--

CREATE TABLE `application_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `application_connectors`
--

CREATE TABLE `application_connectors` (
  `id` int(11) NOT NULL,
  `tenant_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `login_url` varchar(400) NOT NULL,
  `connector_json` text NOT NULL,
  `preauth_script` text,
  `preauth_delay` int(11) DEFAULT NULL,
  `postauth_script` text,
  `postauth_delay` int(11) DEFAULT NULL,
  `created_datetime` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `modified_datetime` datetime DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `application_types`
--

CREATE TABLE `application_types` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `application_types`
--

INSERT INTO `application_types` (`id`, `name`) VALUES
(1, 'Browser Extension');

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `tenant_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_datetime` datetime NOT NULL,
  `created_by` int(11) NOT NULL,
  `modified_datetime` datetime DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `is_deleted` tinyint(4) NOT NULL DEFAULT '0',
  `deleted_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `tenant_id`, `name`, `created_datetime`, `created_by`, `modified_datetime`, `modified_by`, `is_deleted`, `deleted_by`) VALUES
(1, 2, 'group11', '2019-12-19 12:48:14', 2, '2019-12-19 02:22:29', 2, 0, NULL),
(5, 55, 'group22', '2019-12-19 01:09:20', 1, '2019-12-19 02:19:55', 1, 0, NULL),
(6, 2, 'group333', '2019-12-19 02:26:37', 2, '2019-12-20 01:22:15', 2, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `group_applications`
--

CREATE TABLE `group_applications` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `application_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `group_users`
--

CREATE TABLE `group_users` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_access_tokens`
--

CREATE TABLE `oauth_access_tokens` (
  `id` int(14) NOT NULL,
  `access_token` varchar(256) DEFAULT NULL,
  `expires` datetime DEFAULT NULL,
  `scope` varchar(255) DEFAULT NULL,
  `client_id` int(14) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `oauth_access_tokens`
--

INSERT INTO `oauth_access_tokens` (`id`, `access_token`, `expires`, `scope`, `client_id`, `user_id`) VALUES
(48, '03f311ca5d7eb12905143b28ee7c1da114ff677f', '2019-12-09 19:50:48', 'profile', 1, 1),
(49, 'b44d7b5b1fa18274d193d6689b814e10beacc328', '2019-12-09 19:51:39', 'profile', 1, 1),
(50, '0df6f74fd89090125fd155934473d80ff1a48ad4', '2019-12-09 19:52:15', 'profile', 1, 1),
(51, 'b11286e49de0749cfa1717690958bcd624f4dbbd', '2019-12-09 19:52:30', 'profile', 1, 1),
(52, 'd42438322d9b1f85696d779ef72c52ec51350a16', '2019-12-09 19:56:58', 'profile', 1, 1),
(53, 'c1446b07b689db05955986cd0420e514cb69cacd', '2019-12-09 20:09:20', 'profile', 1, 1),
(54, 'ea83568cab62d4ca69c7c357239816459a188e0f', '2019-12-09 20:10:33', 'profile', 1, 1),
(55, '241d546ec5f1fe9871a11fa51243dcc998b728cb', '2019-12-09 20:10:50', 'profile', 1, 1),
(56, 'a64c0c0c7052240a46a16f1eb0121b97c8673873', '2019-12-09 20:11:44', 'profile', 1, 1),
(57, 'e006297a4226b8e3653009d9b4c0ab4c5c2e15e5', '2019-12-10 13:38:44', 'profile', 1, 1),
(58, 'ec0456786a80ad2488587e8a74f61e98ee8d7689', '2019-12-10 13:39:31', 'profile', 1, 1),
(59, '85da5fe246f6cd147ab52e268c154abe0037e80c', '2019-12-10 13:40:30', 'profile', 1, 1),
(60, '56b7a19fa1f89d18a8c9aa693443c4336a9d8355', '2019-12-10 14:02:01', 'profile', 1, 1),
(61, '05480ba0f84e5eb813ce0404984c45f44f2ab66d', '2019-12-10 14:03:48', 'profile', 1, 1),
(62, '6103f2ca2459b756fd27ac627b37f49837b781fb', '2019-12-10 14:07:55', 'profile', 1, 1),
(63, '3a9c39b3aac990936401eae64936275c0b983540', '2019-12-10 14:17:59', 'profile', 1, 2),
(64, '361830aff4eeced028b882ed99d6c789fdaa0749', '2019-12-10 14:18:50', 'profile', 1, 2),
(65, '127ea6e086186269fe23cffa727a3dcf04f6603c', '2019-12-10 14:21:03', 'profile', 1, 2),
(66, '959893eaa169c11cbbc2d45adfb2bf4cfd334fce', '2019-12-10 14:25:07', 'profile', 1, 2),
(67, '6272bf14506574e78f8f7bfc657f3650f0e37d0e', '2019-12-10 14:27:44', 'profile', 1, 2),
(68, '9305401c73271441ab7c1288b93355d15dac97af', '2019-12-10 14:46:54', 'profile', 1, 2),
(69, '9eda3d59f1eaae3eb2e1d897e01a7e02e93dad2a', '2019-12-10 14:47:49', 'profile', 1, 2),
(70, '02d98bf85044961e8293871bde3aca4d3cf6dac7', '2019-12-10 14:49:15', 'profile', 1, 2),
(71, '389f419e61c73d3e3d4d4fceb3c51004995a19e0', '2019-12-10 14:50:31', 'profile', 1, 2),
(72, 'c61a7c992b2a0a4b0ee1aae7fbbeb98a590f0bac', '2019-12-10 14:51:17', 'profile', 1, 2),
(73, '7fbe818cfcae548b85bd865e36d7128a7939c6a0', '2019-12-10 14:52:23', 'profile', 1, 2),
(74, '5156cb05fdd8f76f20c9daf8ca96454f9a2bf683', '2019-12-10 14:54:39', 'profile', 1, 2),
(75, 'f43b207061d73acca13deac32b90fc45553f0586', '2019-12-10 14:59:46', 'tenant', 1, 2),
(76, '79db4dc786ccac34d9b31f28e1fd7e68b0836dee', '2019-12-10 15:00:10', 'tenant', 1, 2),
(77, '110bab490c4438cd77765dc19fe629a431e22a51', '2019-12-10 15:00:18', 'tenant', 1, 2),
(78, '5cceb13fd3a85691a393e0b95257f6b0e99e061d', '2019-12-10 15:05:16', 'tenant', 1, 2),
(79, '8a4ee51cc97feb425b864664d8a66154c3a1cdf1', '2019-12-10 15:05:42', 'tenant', 1, 2),
(80, '90fc77bf2d142c1b4fb4c43d3f661d060024b38a', '2019-12-10 15:07:18', 'profile', 1, 3),
(81, '344fe710ae99777af01e9d063a3b3dcbe3477b44', '2019-12-10 15:08:01', 'profile', 1, 3),
(82, 'ab82726f560a0e9b1a9da27483efcf52c87f4867', '2019-12-10 15:09:40', 'profile', 1, 3),
(83, 'ad9b537c835a78215d22450447f2e347cd0cc35c', '2019-12-10 15:12:55', 'profile', 1, 3),
(84, 'db435938fd2ae56e74ef04f92b7c2a30ac6900b6', '2019-12-10 15:13:47', 'tenant', 1, 2),
(85, 'd6f4aeab202e9636e1fcbd2d3b34d17f2fe97ea5', '2019-12-10 15:18:01', 'admin', 1, 1),
(86, '49b79f1b2a25f19cf6092cdef1d96d8137aacaa1', '2019-12-10 15:26:23', 'tenant', 1, 2),
(87, '5a18ebbe5ecc1bb9593558c8e1a81030527a6b1e', '2019-12-10 15:28:51', 'tenant', 1, 2),
(88, 'a4a81b8c746f3c2fa2154b1dea408d7d2f73de50', '2019-12-10 15:38:01', 'tenant', 1, 2),
(89, '4f54c4c4e03df3fbadeff63e49cd7f97c49cb5ef', '2019-12-10 15:38:48', 'tenant', 1, 2),
(90, 'fe1ba2df73fa497d7ebb16caf1693dc6401e95ae', '2019-12-10 15:39:31', 'tenant', 1, 2),
(91, '446cd132d1bbb62d83abb8a7357b708190480a74', '2019-12-10 15:42:12', 'admin', 1, 1),
(92, 'f0900c02c3fa6a7ac60a2f1b7e386e5f6330377e', '2019-12-10 15:42:32', 'admin', 1, 1),
(93, '9e7bb1188890cbec1c13a9236036d710e4c04a77', '2019-12-10 15:43:12', 'profile', 1, 3),
(94, '38e9d4e544f15ae2ea922c00a56a6aee12537da1', '2019-12-10 15:44:12', 'admin', 1, 1),
(95, 'd1abb401991f6847d04c96240e31bdb40796add5', '2019-12-10 15:48:50', 'admin', 1, 1),
(96, '0c4beb90600a1202b77b078c95f98ab4359e2923', '2019-12-10 15:53:53', 'admin', 1, 1),
(97, '9c4157da793dc6212dfbf622f6f0b4ba3a693c07', '2019-12-10 15:56:28', 'admin', 1, 1),
(98, 'dd487d255dd4877aeb17c9fba8cc0c311e4b3e90', '2019-12-10 15:59:20', 'admin', 1, 1),
(99, '864595497a3fa8f2ea6566de159eee2409842637', '2019-12-10 16:01:03', 'admin', 1, 1),
(100, 'c925fabbbe086495cea71c3ab5e0414e74d460a6', '2019-12-10 16:02:02', 'admin', 1, 1),
(101, '8d04393d111f425dcb91ecd22cf08ef9b9ec3a7f', '2019-12-10 16:03:32', 'admin', 1, 1),
(102, '4465a08327a2e6605034d9df9ffc8c6a431ab465', '2019-12-10 16:08:17', 'admin', 1, 1),
(103, '53c44cf73dc198ceaf02362f89675cc6de275c28', '2019-12-10 16:13:47', 'admin', 1, 1),
(104, '04c17475fb8283c249ee10f6ae14796eeb91019f', '2019-12-10 16:15:53', 'admin', 1, 1),
(105, 'bef648aaa180bd4de2b577599786d97be83110c8', '2019-12-10 16:28:02', 'admin', 1, 1),
(106, '5b635d8e3486e34b936971923301c84725a48d74', '2019-12-10 16:32:39', 'admin', 1, 1),
(107, '0458f61512208f23b0887294de95e6bd3dcac97d', '2019-12-10 16:35:21', 'admin', 1, 1),
(108, '5b187f21778a6e7c6b0ada8305faed441ed18654', '2019-12-10 16:45:08', 'admin', 1, 1),
(109, '9bf1c0de51290ed2e421e01d0e5a0343e08ac70d', '2019-12-10 16:52:57', 'admin', 1, 1),
(110, 'ffbe3bb71e8a9895976eed873cf40357604287e0', '2019-12-10 16:53:20', 'admin', 1, 1),
(111, '1253dc436ab57ee2467c888a51510f0fbad0eac7', '2019-12-10 16:54:21', 'admin', 1, 1),
(112, 'f8d1269143238cf9b5502fd5dc201b1350bf4f46', '2019-12-10 16:54:53', 'tenant', 1, 2),
(113, '766efd37d36365ad4dd83daec9f96c5cd9eed090', '2019-12-10 16:55:27', 'profile', 1, 3),
(114, '917f927c39022fdc26776c9d855b73822e045f4c', '2019-12-10 17:14:19', 'profile', 1, 3),
(115, '80d3fb9de0cc3c6c42760d47614a694303c065b1', '2019-12-10 17:19:52', 'profile', 1, 3),
(116, 'e333ae2d0c31b37513243562a64ffea4aec66677', '2019-12-10 17:23:01', 'profile', 1, 3),
(117, 'e50c31f153813020cf60a9030f7a152d1745ea95', '2019-12-10 17:23:06', 'profile', 1, 3),
(118, '8437ad632de8e581e0e36b25578df0508b889d5b', '2019-12-10 17:23:13', 'profile', 1, 3),
(119, '467029b179cacd72a06449944b0d8f2a2bc05f89', '2019-12-10 17:23:37', 'profile', 1, 3),
(120, '53de063050c6b845703bffafb929960aa994fba7', '2019-12-10 17:23:44', 'tenant', 1, 2),
(121, 'b8df045af28fd404e3ca83de5569a82447c28ca7', '2019-12-10 17:24:00', 'admin', 1, 1),
(122, '77e20aab6d1990d1279fb2f0fc368d8a51ced688', '2019-12-10 17:25:40', 'admin', 1, 1),
(123, '1bd616b07a427bb553ea488d1cc4c9d2fb11cf4f', '2019-12-10 18:04:24', 'admin', 1, 1),
(124, '1d7f9e5975c2c7c8819e3718bf73fbe917749145', '2019-12-10 18:19:37', 'admin', 1, 1),
(125, 'df8a9eefde5fe24cc9fdef147ea72e5c7e01e778', '2019-12-10 18:32:07', 'admin', 1, 1),
(126, '3360b14c0b9eca1656aa341bbef736dbbad83322', '2019-12-10 19:17:23', 'admin', 1, 1),
(127, '9d2e1230d85671f77757055cc3ac643567a6affd', '2019-12-10 19:27:28', 'admin', 1, 1),
(128, 'a935b9860593dfdd46bb976753cf0549859a4474', '2019-12-10 19:32:47', 'admin', 1, 1),
(129, '005350a9a2bdd6d20303f3d5f83673e00b897b90', '2019-12-10 19:43:23', 'admin', 1, 1),
(130, 'b803f96ed5c7266b4935d90c453772c3d984b97b', '2019-12-10 19:46:21', 'admin', 1, 1),
(131, 'd37854c49887c0fa4f2b13ed86174f7383f629d1', '2019-12-10 19:48:03', 'admin', 1, 1),
(132, 'f42dba765245fec37b5070c915fcb6b757622b4a', '2019-12-10 19:49:20', 'admin', 1, 1),
(133, '3cea34114a360bab8020a19178edf66484c7e5ed', '2019-12-10 19:53:34', 'admin', 1, 1),
(134, '0d16e480b754f8a69aaf049048b612d38a77a9fe', '2019-12-10 19:58:05', 'admin', 1, 1),
(135, '9f01cb12ce00dbd1b24521e45b66bad5979a4446', '2019-12-10 20:09:13', 'admin', 1, 1),
(136, 'da121e75bead19b63db1507878e51831b6fb8bef', '2019-12-10 20:11:05', 'admin', 1, 1),
(137, 'b225b85c051b119ae5d32b8e74dcbbc1ee8b46b0', '2019-12-11 11:31:59', 'admin', 1, 1),
(138, '2095beb15d8137c24df528e2919a4eebcbf7f6e3', '2019-12-11 13:28:31', 'admin', 1, 1),
(139, '0707f6f3b3538f80542fc709003a9cce3919cd3f', '2019-12-11 13:45:31', 'admin', 1, 1),
(140, 'ddf7a0219720ffe3ea5d7e8de70eb9df9ae89ccb', '2019-12-11 13:52:39', 'admin', 1, 1),
(141, '6f2f4fc5c8807b415e4e2947bd2aa00a8ce2a463', '2019-12-11 13:52:40', 'admin', 1, 1),
(142, 'a9a8fb943249156cb9f57dbeb4e362ebc802d408', '2019-12-11 14:10:03', 'admin', 1, 1),
(143, '3473aafd09d55ede601f311f946097f8926cdc62', '2019-12-11 14:34:11', 'admin', 1, 1),
(144, '69a4bf9b6642fb5238d2b0e085e77e00eb391d6d', '2019-12-11 15:19:51', 'admin', 1, 1),
(145, 'ad78b62b81570527e91fccc5cab7706ceff6510e', '2019-12-11 16:38:48', 'admin', 1, 1),
(146, 'a41cd9bf9e2a9bd78fb6b51003ddaf151f6a1f2b', '2019-12-11 19:27:36', 'admin', 1, 1),
(147, '38edb1a6a3edc67e7e15aa8be28e613521df8e26', '2019-12-11 19:31:55', 'admin', 1, 1),
(148, '3e555eb8ffc60c03e5504dd8a9992448342d315e', '2019-12-11 19:37:46', 'admin', 1, 1),
(149, 'a6eca69595b26f6a0fd1b944c839407441406406', '2019-12-11 19:39:06', 'admin', 1, 1),
(150, '12e3ca90b2bb2c987698dee3e0154068211cceef', '2019-12-11 19:43:59', 'admin', 1, 1),
(151, '426fe7011e7c7b9459fcfad81f71923e5a4d6593', '2019-12-11 19:50:51', 'tenant', 1, 2),
(152, '5e7f2fac6a699302139dcafda0c7655cccd02227', '2019-12-11 19:51:03', 'profile', 1, 3),
(153, '8dcba29ea1680b6c158cbe593756741784024fad', '2019-12-11 20:01:18', 'admin', 1, 1),
(154, 'ae7657184db97f80274b764f1cdad564c7665f39', '2019-12-11 20:03:06', 'profile', 1, 3),
(155, '6bc178a65d39d38091c979216fade58272b10d1d', '2019-12-12 11:37:49', 'admin', 1, 1),
(156, 'bd2823be877ef9178afb2a0613bd0f1a5ee52965', '2019-12-12 12:02:05', 'admin', 1, 1),
(157, '80dc30aee180bab331ed57b0daf4adf3a94e2cdb', '2019-12-12 13:10:34', 'admin', 1, 1),
(158, '882520bda07c81ccdb7d61dd59f73cd8c797332f', '2019-12-12 13:16:01', 'admin', 1, 1),
(159, '81d8eefd277314ba90d3b7fc0c2db6626c583f69', '2019-12-12 13:18:16', 'admin', 1, 1),
(160, '7131febb77d4b2c2085a0045714ffa18136d4d44', '2019-12-12 13:30:45', 'tenant', 1, 2),
(161, 'cd034153950a27a7bcc80ad4d151e5867be0ef8d', '2019-12-12 13:42:44', 'tenant', 1, 2),
(162, 'f745ee0eae88d3d010cc22af4ea7a3ba1dc81c4f', '2019-12-12 13:59:17', 'admin', 1, NULL),
(163, 'ce32f1d5ec09a0f93ee792028318c1558bedc2d7', '2019-12-12 14:09:01', 'admin', 1, 1),
(164, '5471e385f523e80376008c1b22a0b45347d6f350', '2019-12-12 14:29:47', 'admin', 1, 1),
(165, '8381239f08856e82ce9282700ac5231a5f2aa47c', '2019-12-12 15:13:16', 'admin', 1, 1),
(166, '7d4040dd8872c58719897ae3448814d8d87f8198', '2019-12-12 15:19:04', 'admin', 1, 1),
(167, '9b45c49df9b9bafb80759c5c37fa877d98d3cf64', '2019-12-12 15:33:02', 'admin', 1, 1),
(168, '9f3d34fbe47611f59cb53393febc55f923ab0ae3', '2019-12-12 15:33:02', 'admin', 1, 1),
(169, '30344c87daa4dd4d1b5c81334c9210e266a1c4ec', '2019-12-12 15:33:11', 'admin', 1, 1),
(170, '296bc378536eb6a29edf2d206db6ab1eba990160', '2019-12-12 15:37:07', 'admin', 1, 1),
(171, '1bcded740658abed2fdf1e2b14ad04c7b859b778', '2019-12-12 15:50:26', 'admin', 1, 1),
(172, 'bacaecb9da570a079ffa7239d670ac1e72896b17', '2019-12-12 15:51:14', 'admin', 1, 1),
(173, '0509d0c78d0df12430a52eae9012063d94f7a62b', '2019-12-12 15:51:31', 'admin', 1, 1),
(174, '6f16de04ff624cb99e7b48b98afbb45b0ef34490', '2019-12-12 15:52:12', 'admin', 1, 1),
(175, 'f93c3e3c1170221e861688abd761e121e9045eeb', '2019-12-12 15:53:09', 'admin', 1, 1),
(176, 'bd907442bede56a3857586162ce42473afc7c87e', '2019-12-12 15:53:32', 'admin', 1, 1),
(177, '1743035bc7d3fbf43a41677b1bd6b0ee74a1c640', '2019-12-12 15:54:23', 'admin', 1, 1),
(178, '9f9ec32241a5784635874c1ac04682ff6b4a514c', '2019-12-12 15:55:42', 'admin', 1, 1),
(179, '1920069405187b047181eb438817ff321c0c453d', '2019-12-12 15:55:48', 'admin', 1, 1),
(180, '5e9d35a56709d1ca05d0845fa27b70fb01f2cf9f', '2019-12-12 15:56:58', 'admin', 1, 1),
(181, 'fa5fc7c02be19b4becdd99426c9c992296d49266', '2019-12-12 15:57:03', 'admin', 1, 1),
(182, '752e49869ff07a49353aa50565615c2d9a72b3fb', '2019-12-12 15:57:38', 'admin', 1, 1),
(183, '9e2fe189949ac4d56423f986d9a6ceada01df0b5', '2019-12-12 15:58:46', 'admin', 1, 1),
(184, 'f2b630a8f0c49cafd554de4fba2c39538401be54', '2019-12-12 15:59:00', 'admin', 1, 1),
(185, '1032f09431cf2ac0ce6807cfd0c2ddc64480bef6', '2019-12-12 16:00:25', 'admin', 1, 1),
(186, '475517874749299e2c0a491655e73dbd81505b72', '2019-12-12 16:00:30', 'admin', 1, 1),
(187, '6c01115adbba7bff6258b7ef8038332372b8af59', '2019-12-12 16:00:41', 'admin', 1, 1),
(188, 'c63252c575e0a74c16b8a7de65caf03eb382fd86', '2019-12-12 16:01:36', 'admin', 1, 1),
(189, '44a9550cdd9aedce7429b3b96319239c676467dd', '2019-12-12 16:01:48', 'admin', 1, 1),
(190, 'add9ccc7e6cffbf04c8789e0c58fb8951db73025', '2019-12-12 16:02:33', 'admin', 1, 1),
(191, 'cac12ae9a44af36ec26a03dbc894425e8cfa8941', '2019-12-12 16:07:37', 'admin', 1, 1),
(192, 'a3b593e4abab13cc684ddd980d028300b2841837', '2019-12-12 16:09:35', 'admin', 1, 1),
(193, 'c75a637537ff3206417c283c66d3fb9f81b0e01e', '2019-12-12 16:09:53', 'admin', 1, 1),
(194, '93b00cab31487135a0edaa82b7603ff928f88cbd', '2019-12-12 16:11:53', 'admin', 1, 1),
(195, 'd2fff83533ca2b74f7baa4eba4e85382b02fc1d5', '2019-12-12 16:12:25', 'admin', 1, 1),
(196, 'dcb7c8c3e6262035d9796949b2f02a3e95250345', '2019-12-12 16:13:05', 'admin', 1, 1),
(197, 'a14b4ea0631d6a025021e179fa8e4d408899bf64', '2019-12-12 16:13:16', 'admin', 1, 1),
(198, 'f5955ed1a0b5377d70496f5d57f8e995a514a739', '2019-12-12 16:14:57', 'admin', 1, 1),
(199, '0a5d5f9f1c80e3d3aad7cc1ca5b0bdfee804ea2f', '2019-12-12 16:15:34', 'admin', 1, 1),
(200, '98cbf50b9de1c2cfb5a210602053f5fa7710645c', '2019-12-12 16:16:37', 'admin', 1, 1),
(201, '4096b02ba23664bbefd6e3643de4eac49ed45ed8', '2019-12-12 16:22:49', 'admin', 1, 1),
(202, 'aeda257f42ce1206914023d039d42c00ee6f071f', '2019-12-12 16:37:20', 'admin', 1, 1),
(203, '864f8bbd66e7818f218b1c6ee9d3be1a08f69978', '2019-12-12 16:48:44', 'admin', 1, 1),
(204, '575585d8cc631211c9f76a1b055913b2c04fe3ab', '2019-12-12 16:49:01', 'admin', 1, 1),
(205, '1cde26a50f5ea66d8b94e27e88ab1fda4c837b9a', '2019-12-12 16:49:30', 'admin', 1, 1),
(206, '5ab0937571033416b26a1e5f70160b3cd90dca2e', '2019-12-12 16:50:46', 'admin', 1, 1),
(207, '4a5b62503ffface14c1fddd1f9b51c659abb8be5', '2019-12-12 16:55:49', 'admin', 1, 1),
(208, 'acc9d14a4aa99d72cb1ea082e6d990db59faa035', '2019-12-12 16:57:27', 'admin', 1, 1),
(209, 'f5870b39cfa823ec28282ab06a47b602cd6e6e8f', '2019-12-12 17:12:12', 'admin', 1, 1),
(210, '2118f22f94dad4ff26d6f232c981f3ca9bf17aca', '2019-12-12 17:18:46', 'admin', 1, 1),
(211, 'a033a8af976df470ee0bfc0de9b07ba7e4f8873e', '2019-12-12 17:26:09', 'admin', 1, 1),
(212, '55961b23bf60b1205a1e3fbd749a476a88d55246', '2019-12-12 17:29:23', 'admin', 1, 1),
(213, '03767f2c0690dec84ac96c3e44af5a1094b68c7f', '2019-12-12 17:40:27', 'admin', 1, 1),
(214, '0f7e41af7bf0f3305accffcf61e50b46cedc3ef6', '2019-12-12 19:56:02', 'admin', 1, 1),
(215, 'df2c40d248d77ebb8baaddb14fca2b0527ceee89', '2019-12-13 11:31:51', 'admin', 1, 1),
(216, '6b7886ea0343064d325f672e57c32a1902383587', '2019-12-13 11:36:22', 'admin', 1, 1),
(217, '158c5711cc3053567b94339c281f3fe29cb3fff4', '2019-12-13 12:44:10', 'admin', 1, 1),
(218, '86c10673cdbd7240a4e80ed25fe031b359f3be44', '2019-12-13 14:12:14', 'admin', 1, 1),
(219, '1c26ab6edd80790e74a6a58b4e432e7661134904', '2019-12-13 14:13:57', 'admin', 1, 1),
(220, '299d3df0184772081ddc77c29b99e680779ca2c9', '2019-12-13 14:22:44', 'admin', 1, 1),
(221, '62d6a3983ab36735443b39177e29213f42ce6909', '2019-12-13 15:18:58', 'admin', 1, 1),
(222, '4b6a07d17f22d0040b615c9d8b07167fa8fe3359', '2019-12-13 15:49:18', 'admin', 1, 1),
(223, 'd4263c98fb71a704902afe31cd33b2ac3b3e0a8c', '2019-12-13 15:50:21', 'admin', 1, 1),
(224, '1f7ed6d21ef3aa7a7477ad2901b789d07c66754f', '2019-12-13 15:52:23', 'admin', 1, 1),
(225, '2bed660882e7922b3a7cb252710b85f47389d27b', '2019-12-13 15:55:30', 'admin', 1, 1),
(226, 'ae65a04cf717c35d147e605b96e2513345772458', '2019-12-13 16:00:49', 'admin', 1, 1),
(227, '24ff751db4046c19b6d7ba4e9ccc0e8044e4d63d', '2019-12-13 16:02:45', 'admin', 1, 1),
(228, 'd159a1addc850ec86795126ef3370337b6ccf919', '2019-12-13 16:05:01', 'admin', 1, 1),
(229, '870bbf89d37cd84e687ca9391ca6687a4fdc3059', '2019-12-13 16:06:10', 'admin', 1, 1),
(230, 'abf8b69d5cecc922d358309c6da5b217368ce8d7', '2019-12-13 16:07:31', 'admin', 1, 1),
(231, '53c007795da19ceb21b888ba941b920fddf61f4b', '2019-12-13 16:08:18', 'admin', 1, 1),
(232, '2b59d1bb24ec7f54b9c292019b688ca980117ed2', '2019-12-13 16:09:24', 'admin', 1, 1),
(233, '830bcda36b7d7c10f158b783c600ab68aa303194', '2019-12-13 16:09:59', 'admin', 1, 1),
(234, '0614aa8fc99000c1df2c54853fff3ca1b8d5b186', '2019-12-13 16:12:20', 'admin', 1, 1),
(235, '5fb35105cf5e87a0bc518a4615996e891f835204', '2019-12-13 16:26:47', 'admin', 1, 1),
(236, '72ba646614d01529a97bfdfc983b54eb26e7f0ad', '2019-12-13 16:37:11', 'admin', 1, 1),
(237, '0f404b9ff122039230bfde1b43b4eb5551d4a90a', '2019-12-13 16:46:13', 'admin', 1, 1),
(238, '36a70474d223443ed5f91cfebae939730f405859', '2019-12-13 16:46:25', 'admin', 1, 1),
(239, '7f07d43c94a71028b25539e31ac9eafc2d22850a', '2019-12-13 17:06:56', 'admin', 1, 1),
(240, '7bf4a9024b893234ea85c1d49400a9df3217f9f2', '2019-12-13 17:07:56', 'admin', 1, 1),
(241, 'f073fb79a80b7bae4503894c81491612981a6836', '2019-12-13 17:08:01', 'admin', 1, 1),
(242, 'e41055a6f95b2db99b5dba29a9812c1e8e7123c2', '2019-12-13 17:08:12', 'admin', 1, 1),
(243, '76629ea53e75dfa105f75576ec9e7e8b7d2103d1', '2019-12-13 17:08:28', 'admin', 1, 1),
(244, '6f6e740a90466f285e84d9bc71733d0b0e06357b', '2019-12-13 17:09:17', 'admin', 1, 1),
(245, '950868192e9efd0de3b68fb966b61c8a493f102d', '2019-12-13 17:45:51', 'admin', 1, 1),
(246, '0bd89f428ed61bde85b502423995752768741ff6', '2019-12-13 18:06:18', 'admin', 1, 1),
(247, '212a1663c78a492b702ca49d15fef2e5936144d9', '2019-12-13 18:59:48', 'admin', 1, 1),
(248, '408c1e1dbcff90b1450c88549caf0d011bc5c753', '2019-12-13 19:00:43', 'admin', 1, 1),
(249, '515c826d469665b9b28b9cf0ab514bb38bc93bae', '2019-12-13 19:01:46', 'admin', 1, 1),
(250, '0b1ec1ea0667f9f064ae6ac0dc8bd4a0b9cc968d', '2019-12-13 19:04:48', 'admin', 1, 1),
(251, 'b5f68b4b9f9546a17702ae1b5810d262e917e322', '2019-12-13 19:08:06', 'admin', 1, 1),
(252, '230197e40ce9931d4a13b74428015186215d2d18', '2019-12-13 19:09:08', 'admin', 1, 1),
(253, 'bfe171aec5c062a603c1504c6351ff124c17c307', '2019-12-13 19:11:22', 'admin', 1, 1),
(254, '77e6bb6d0ac73d2bfdf3e7bf8e1fe25cdc14dcb5', '2019-12-13 19:11:57', 'admin', 1, 1),
(255, 'a066ac385570e69c0fc8df8632e7d8fb17369afe', '2019-12-13 19:38:49', 'admin', 1, 1),
(256, 'ce28ae4fd807c05a802323d9964a9996a27a287c', '2019-12-13 19:39:43', 'admin', 1, 1),
(257, '07aef6d2560a3d266166098491c405ed1b42cf48', '2019-12-13 19:40:15', 'admin', 1, 1),
(258, '1b58c9364773e814c412cddcb26c48de89fc3713', '2019-12-13 19:41:39', 'admin', 1, 1),
(259, '978bf6bbd1c4af20494ca7001db4b87c792ab85a', '2019-12-13 19:43:18', 'admin', 1, 1),
(260, '474aed9e0c5553da0bb5f62eee69847fab886b8c', '2019-12-13 19:45:32', 'admin', 1, 1),
(261, '9a0fb966d1c2c8c16383e23f3fbea7f875f54ba4', '2019-12-13 19:46:52', 'admin', 1, 1),
(262, '231ed6057562a06486419c40031dea50d05308c4', '2019-12-13 19:48:07', 'admin', 1, 1),
(263, 'cba8774d4d6a05ac6651cce10af07df4226031d0', '2019-12-13 19:48:45', 'admin', 1, 1),
(264, '0e88c9ce7d1bda016ddcac2afad993817b23f4ce', '2019-12-13 19:49:02', 'admin', 1, 1),
(265, '5374593660747a6435eda0fb7ad851bdc0fe1e5a', '2019-12-13 19:52:02', 'admin', 1, 1),
(266, 'ede71f2565c5702c6f9352352d045c43e71e9882', '2019-12-13 19:53:56', 'admin', 1, 1),
(268, 'a34971ff857bb7f9796210b0598bdc5c638de78e', '2019-12-13 19:59:20', 'admin', 1, 1),
(269, '06709728a71c67201a7a75cfd98abbc99beb35a3', '2019-12-13 20:00:26', 'admin', 1, 1),
(270, '48a0a68a77a6aac42308c63b6a28574ac0f59a13', '2019-12-13 20:04:32', 'admin', 1, 1),
(271, '2ed4f16311a94a2998819d5c602d8e139741dce6', '2019-12-13 20:10:45', 'admin', 1, 1),
(272, 'f6133afa52d0e2378dbc261fe252613748436b21', '2019-12-13 20:25:44', 'admin', 1, 1),
(273, '09b131548b092e508646de8f1f8468b7c4b4e753', '2019-12-13 20:32:25', 'admin', 1, 1),
(275, '889ad48bfa642ce84e855fbc7de6cfcf7004928e', '2019-12-13 20:37:02', 'admin', 1, 1),
(276, '083ea7bfd6b1d973282d44e54aae9ea8c92a1a5e', '2019-12-13 20:38:24', 'admin', 1, 1),
(277, 'eb635aa71df59e829df913fb4b61cab4c463a2d2', '2019-12-13 20:41:49', 'admin', 1, 1),
(278, 'c4f8d17503b7f7de6d57df5188d740e4672320c7', '2019-12-13 20:42:35', 'admin', 1, 1),
(279, 'e9ade491d7b7ffd98905566c872df16c616bd848', '2019-12-13 20:43:30', 'admin', 1, 1),
(280, 'ad92d93019fe69477950e4e64dd167a54efc53b8', '2019-12-13 20:44:51', 'admin', 1, 1),
(281, '0852372145526a44bb811b04f86733a74ee7ed4f', '2019-12-13 20:49:05', 'admin', 1, 1),
(282, '71550558b53015fc3e62425da4b29bc073062e29', '2019-12-13 20:50:19', 'admin', 1, 1),
(283, '820ef811a95520ab7f17295912a76428916d61d8', '2019-12-13 20:52:41', 'admin', 1, 1),
(284, 'f780fd2d54763223d81b62bbc0ba4f34e6d1c42f', '2019-12-13 20:53:29', 'admin', 1, 1),
(285, '544e1ba6c9ea3ecf5330af2023d04422ffb6576c', '2019-12-13 20:54:49', 'admin', 1, 1),
(286, '368681a3bfdbdfdac41cc23600e2f6f0fd85ef9a', '2019-12-13 20:56:11', 'admin', 1, 1),
(287, '2cd40e774086dad8fb3081ab02c8638261f1f702', '2019-12-13 20:56:24', 'admin', 1, 1),
(288, 'a63c5bad93bdcd32054827b4baad33ab43138eea', '2019-12-16 12:28:25', 'admin', 1, 1),
(289, 'a24ba1c9b7f6c5a38f136bd43aa72f359acc51f7', '2019-12-16 13:42:34', 'admin', 1, 1),
(290, '7f2763a5082fb740eb74f10f9a4ce0565a437e65', '2019-12-16 13:54:03', 'tenant', 1, 2),
(291, '1aee9932f954146af367a68feeb5b35e68d54591', '2019-12-16 14:01:34', 'tenant', 1, 2),
(292, 'b301991630ea7ccfdbebde0db4997bbd514f90e0', '2019-12-16 14:03:27', 'tenant', 1, 2),
(293, '0569b0b5e81dbf4c8625d7f78515cac0aa9ccac6', '2019-12-16 14:03:46', 'tenant', 1, 2),
(294, '5e586e6ad5ea2140ff311861debeef36fa05828f', '2019-12-16 14:05:31', 'admin', 1, 1),
(295, '2240e5f71ef6b8dc06d3858823b644a60667e851', '2019-12-16 14:08:52', 'admin', 1, 1),
(296, '2855d26480205f6497d1c68dfaad4b644e2cc04a', '2019-12-16 14:09:13', 'tenant', 1, 2),
(297, '277efd22f8885e0875b87768c9a5c398d9a33925', '2019-12-16 14:10:38', 'tenant', 1, 2),
(299, '7758b30f3c0d2cf7b20381b07c5c3ccbffebbae4', '2019-12-16 14:13:52', 'tenant', 1, 2),
(300, '95559155f8675f6230ec29cbf3557359e171d11e', '2019-12-16 14:14:11', 'admin', 1, 1),
(303, '1866313e4dd8412a17c97d343a4e2e9b48939acd', '2019-12-16 14:17:07', 'tenant', 1, 2),
(305, '71a8fbfcec655f5664356649d1dbe8a7bfd52056', '2019-12-16 14:24:19', 'tenant', 1, 28),
(306, 'ef66260fa28e3039f9fc44bbdfae4926095b92ba', '2019-12-16 14:24:59', 'tenant', 1, 28),
(307, '28b258f873200309f487a3587b15e8a5bb515e71', '2019-12-16 14:25:15', 'tenant', 1, 28),
(308, 'd4c98864bb9a7e82365685cda1c0753dfa248613', '2019-12-16 14:40:24', 'admin', 1, 1),
(309, '77bdaef7658fae77ece2cf5c7bcac537e560c975', '2019-12-16 14:40:30', 'admin', 1, 1),
(316, 'a4547f6538d33332e365dddf9c8b6abbede38ebd', '2019-12-16 15:26:39', 'tenant', 1, 2),
(325, '4e7282d2fb21878891bb5c6213830a6e88799614', '2019-12-16 20:19:02', 'admin', 1, 1),
(329, '33a334f1ae5b951fbee40a1d645a3ca1f56db9ba', '2019-12-17 14:04:08', 'admin', 1, 1),
(331, 'ea454cecd4d2ebbda27cfc5b038609b56534f2d0', '2019-12-17 14:09:42', 'admin', 1, 1),
(332, '33f4ed60fc767f8fad85f60b31f10bad6aa713bc', '2019-12-17 14:09:58', 'admin', 1, 1),
(334, 'afc02e2696563b89a6605716eb407fb675731e7c', '2019-12-17 14:11:20', 'admin', 1, 1),
(335, '274b2a0fb62429183daf19db5f329f35aeb6c79c', '2019-12-17 14:11:29', 'admin', 1, 1),
(336, 'ed6dd7ed4c06b64e4898654db61a952c998cc1c1', '2019-12-17 14:11:31', 'admin', 1, 1),
(337, 'a0456be1f03537314e16fd6832cb292a7e1925e9', '2019-12-17 14:11:31', 'admin', 1, 1),
(338, '665b80968328c1bb5d7a7a080399c95c11557cee', '2019-12-17 14:11:32', 'admin', 1, 1),
(339, 'a8ac13f7781bbfa0c8041d6446c7e6e14a579a79', '2019-12-17 14:11:32', 'admin', 1, 1),
(340, '945b21ef5667f6cc76be46a7f0b263ad37cb4d04', '2019-12-17 14:11:33', 'admin', 1, 1),
(341, 'd6a9b00d52b6ef1774597f5fc8f42c5596df6c40', '2019-12-17 14:11:34', 'admin', 1, 1),
(342, '2461c139907c70cb6d00bea255f365c87852c9d4', '2019-12-17 14:11:36', 'admin', 1, 1),
(343, '0f67996feed7691247fe7886575fcf6299eb87db', '2019-12-17 14:11:37', 'admin', 1, 1),
(344, '6886c215bebf35b249b454979b822c790d3cf0fe', '2019-12-17 14:11:44', 'admin', 1, 1),
(345, '65ff166c91e6ad46f0ed52d673dbb65f4270b25a', '2019-12-17 14:11:44', 'admin', 1, 1),
(346, '68bb1c75ae71b171604a5515984b3573d3e6c21e', '2019-12-17 14:11:58', 'admin', 1, 1),
(347, '2c1df29ad4594870bf1de8dbbb729f5b97b7c020', '2019-12-17 14:12:04', 'admin', 1, 1),
(351, '762b7a6be3c1b62f6a842fee07f3f77e36d0ee88', '2019-12-17 14:12:50', 'admin', 1, 1),
(353, '02e72bf57dee0b21d901b97293d67d93fb6036b7', '2019-12-17 14:16:16', 'admin', 1, 1),
(356, 'ade74268a38401e43de25eb25515d3273f6b5990', '2019-12-17 14:17:05', 'admin', 1, 1),
(358, 'c46f33292ad4abf7192e7c39fb5fbb96870f85ed', '2019-12-17 14:20:32', 'admin', 1, 1),
(360, '2a9d8a1c7c0a1a81cf68bd8bda255377bea35f0e', '2019-12-17 14:23:51', 'admin', 1, 1),
(390, '397ee40b99ea268f4f111300d66dfbba7fdac149', '2019-12-17 17:48:14', 'admin', 1, 1),
(453, 'c2c0833753b5060993b2f6423bca722c1b3abf63', '2019-12-17 20:24:51', 'admin', 1, 1),
(454, '2c2d1d70d73dbe427111b7797772fbdb1542980d', '2019-12-17 20:24:53', 'admin', 1, 1),
(457, 'd6837c6e9156e3a29b65284506e389a3efa1ced4', '2019-12-17 20:25:51', 'admin', 1, 1),
(458, 'cb42348c6667d4ac242228b01103ecb109521774', '2019-12-17 20:25:53', 'admin', 1, 1),
(459, 'c7b8b8b827d787d59a138993316c8c203a54fdd1', '2019-12-17 20:25:53', 'admin', 1, 1),
(460, '77dde27bbe9599b99048197963806d189218e147', '2019-12-17 20:25:54', 'admin', 1, 1),
(461, 'aef5edd965a89908814a19ab3ffd2f1d4fb30b4b', '2019-12-17 20:25:58', 'admin', 1, 1),
(463, '80b2107dbcb8c89f7096824e7861ce5f78c31ad9', '2019-12-17 20:26:22', 'admin', 1, 1),
(465, '789968a05f3ed40a497926c756ad7cdde0c452a5', '2019-12-17 20:26:41', 'admin', 1, 1),
(466, '191bbc2f18649ba4de6cb6ce5f250c72e69d440f', '2019-12-17 20:26:52', 'admin', 1, 1),
(467, 'c69e7fdb62f454e3789eab419b9609e250075ed0', '2019-12-17 20:26:52', 'admin', 1, 1),
(468, '5c547f535b831909799b358d794e65f807898293', '2019-12-17 20:26:53', 'admin', 1, 1),
(469, 'a7b275f08fb9712b1e87d04cb360421ff2fdfef0', '2019-12-17 20:26:53', 'admin', 1, 1),
(470, 'a34b7d5324c67eadbc830a28dfda61eff9d9a01c', '2019-12-17 20:26:53', 'admin', 1, 1),
(471, '8caec6505c4f89e159dd0ff949b864a0c8697484', '2019-12-17 20:26:53', 'admin', 1, 1),
(472, '3262d1356f74b8a0e8b67976c0387445d7d1ea86', '2019-12-17 20:26:53', 'admin', 1, 1),
(473, '90dcf902b194f5b2c0457834e8199767b0d86f3d', '2019-12-17 20:28:20', 'admin', 1, 1),
(474, '18cc8acca7f693e3650807c8b0920e2adabf656f', '2019-12-17 20:29:07', 'admin', 1, 1),
(475, '6bf592a4d5ca18bf7c6447b1a6840122c94e0707', '2019-12-18 13:46:39', 'admin', 1, 1),
(477, '17020f326a39fa50327de0da9600b6f34a6b661d', '2019-12-18 14:23:24', 'admin', 1, 1),
(479, 'be752cf6a9983516528398e7530e069a00f642d2', '2019-12-18 14:23:55', 'admin', 1, 1),
(480, '2421a2483c7d7e8baf57e432365ce8f5d5cf817b', '2019-12-18 14:24:12', 'admin', 1, 1),
(482, 'd2c52a4fdf805d178db75a91fb4b2d22ec8a2ec9', '2019-12-18 15:17:24', 'admin', 1, 1),
(484, '8dc6659aeb7e103697cbfb9bb1336db96ee2e1a2', '2019-12-18 15:18:40', 'admin', 1, 1),
(496, 'b3acab97b18b45949eac766da43e2c301bd993e2', '2019-12-18 15:32:56', 'admin', 1, 1),
(499, 'e840c55334e66e7f85926f353fd9ab4023b4f79b', '2019-12-18 15:37:37', 'admin', 1, 1),
(505, '1a4e41f54b21da1b440816039a101e34d20680c4', '2019-12-18 15:57:10', 'admin', 1, 1),
(517, '7e6e7ded7de426ab8fe16b3b44cbc783829b0335', '2019-12-18 16:45:09', 'admin', 1, 1),
(530, 'c8a747d2d48fe38fe67c6a04064d4937fd0d283e', '2019-12-18 17:33:18', 'admin', 1, 1),
(532, '1cdecc45dd17f499c17886514040432641bc7bbe', '2019-12-18 17:34:38', 'admin', 1, 1),
(547, 'c0905ff990a796b692bbb2e838093cfb724fd472', '2019-12-18 17:48:45', 'admin', 1, 1),
(548, 'b24796b3d7eaab255ff936fa56cba21a1a9ea198', '2019-12-18 18:18:05', 'admin', 1, 1),
(549, 'dfada4b8db72b83b67024b939fd7351cfe53348d', '2019-12-18 18:18:06', 'admin', 1, 1),
(567, 'a945ff56fd2899dfa95939be2ea5be4f6f5b91e1', '2019-12-18 20:10:41', 'admin', 1, 1),
(568, '49446ce0194636faa5063c7017d4726879ccfa7a', '2019-12-19 13:11:52', 'admin', 1, 1),
(569, '35b479b9c5d7e374f9ab105ebee88e9d357bb517', '2019-12-19 13:28:06', 'admin', 1, 1),
(570, '5ad5432c14961c68fa19f5bce0c231c75d363df6', '2019-12-19 13:30:04', 'tenant', 1, 2),
(571, '5ed940afff4269c0778bb8c623e40c74b93c3b31', '2019-12-19 13:49:00', 'admin', 1, 1),
(572, '6e6122546e96e075e84f8f3cad28a01d362d620b', '2019-12-19 14:02:46', 'admin', 1, 1),
(578, 'fc6ecef49181e29821d5e2c63eff0283827e5b55', '2019-12-19 15:18:52', 'admin', 1, 1),
(579, 'c6d670a04bf443ab6d136fc1d27cf719180ef06b', '2019-12-19 15:21:51', 'tenant', 1, 2),
(581, 'e5f20a8b5a6198d669a2551be7f0f44c330e4784', '2019-12-19 15:30:15', 'admin', 1, 1),
(582, 'd84b13e5c0c3d1da607a9cf9342160a9aa795d3d', '2019-12-19 15:37:33', 'admin', 1, 1),
(583, '987d6f0a91b6284bc98c9b8a591e325b99ca704c', '2019-12-19 15:37:37', 'admin', 1, 1),
(584, '700e1c217530f6bea747e88064668e10508481c6', '2019-12-19 15:37:49', 'admin', 1, 1),
(585, '25e3cf462cb52da4eb808c92fc28d06b039ba35a', '2019-12-19 15:38:17', 'admin', 1, 1),
(586, '42147d46bb3cd898cf4ae4f4e6736ca6d817eb2d', '2019-12-19 15:39:35', 'admin', 1, 1),
(587, 'a8b8c4adaf0230d953f7cdabb45dee2c4090ab72', '2019-12-19 15:41:38', 'admin', 1, 1),
(588, 'dc6e6771d8756ca967f602a605f158ab10444560', '2019-12-19 15:42:18', 'admin', 1, 1),
(589, '00c74182d85c7eee343ed477133ad954f2d831ef', '2019-12-19 15:45:52', 'admin', 1, 1),
(590, '4f21e83711a4630dcc43c8430a2403d4cb590114', '2019-12-19 15:47:56', 'admin', 1, 1),
(591, '9e94eef62728e2f0339d93ee69afe9aca0616490', '2019-12-19 17:03:22', 'admin', 1, 1),
(592, 'e88f14102b5161e6f64fa7da83a35dcea0b41737', '2019-12-19 17:03:48', 'admin', 1, 1),
(593, 'e97d20966d9cd14ead0b94125525d278ac407ab3', '2019-12-19 17:07:16', 'admin', 1, 1),
(598, 'ccf241c3d894786d83e69cd0722152e850d9843a', '2019-12-17 17:45:33', 'admin', 1, 1),
(604, '942e990b37d754b8dad94fa7b1b8546bea47cee4', '2019-12-19 18:12:52', 'admin', 1, 1),
(605, 'bf2b4dd90df76643604e6dce047226bc5d51747e', '2019-12-19 18:15:41', 'admin', 1, 1),
(608, '8bbd5a3b43a07b1ab50870c595fd53d13fd07475', '2019-12-19 19:07:37', 'admin', 1, 1),
(609, '8a2f24721bf57b0751cf254289f35cd9156bd40a', '2019-12-19 19:17:10', 'admin', 1, 1),
(611, 'c5f7407d27d46a756fc558b7eb09ff27d462c8e5', '2019-12-20 11:33:27', 'admin', 1, 1),
(614, '6d3ee2392b0eb0e30f01c6791138b9eb140ff6df', '2019-12-20 12:04:09', 'tenant', 1, 2),
(615, 'db43141d725eb97f1ffa6bb3a53167c422dd776c', '2019-12-20 13:46:36', 'admin', 1, 1),
(616, 'be9b42699200ade5f00625d13b80e21bb7511d72', '2019-12-20 13:46:58', 'tenant', 1, 2),
(617, '7bc46b48e13799e2a533d40a628edf93bae47379', '2019-12-20 13:50:30', 'tenant', 1, 2),
(618, 'd349fa63287a58cc035ef3f496aea093421ffab9', '2019-12-20 13:52:16', 'admin', 1, 1),
(619, '29809a58e508e1d3f26b1121347207cd164c9721', '2019-12-20 14:09:33', 'admin', 1, 1),
(620, 'a3be7d1486820fe365a7c6073fc8f6f777e9abb7', '2019-12-20 15:58:04', 'tenant', 1, 2),
(621, '38a5222ec1c0b930f123d64b1da82579f9750188', '2019-12-20 16:06:47', 'tenant', 1, 2),
(622, '3226432773114210a828c69dcc7d5ea665130f7d', '2019-12-20 16:22:47', 'admin', 1, 1),
(624, 'a6419ebbbdaed3dc9febd4afff0120a49993cb35', '2019-11-20 16:28:27', 'admin', 1, 1),
(625, '9f547fb8b3a485597b8a556ff8125deec0e3c7c6', '2019-12-20 16:46:56', 'tenant', 1, 2),
(626, 'f6f6888995ab51b471b878214ee37c259dfc1994', '2019-12-20 17:25:56', 'tenant', 1, 2),
(629, '85e53f02d8fd2955ddb6088a60465fbee02f94ee', '2019-12-20 19:47:22', 'tenant', 1, 2),
(630, '74bcb7492ef4fb93a0f437c7c70a94240409eaf7', '2019-12-23 11:14:04', 'admin', 1, 1),
(631, '7b6a8c9de2a20587b30e019d1828ad7a6672b072', '2019-12-23 13:25:54', 'admin', 1, 1),
(632, 'a17decad0ff73cbcd79d8302fca812eb161a21f9', '2019-12-23 14:04:02', 'tenant', 1, 2),
(633, '3952a1114f063c8ea8093b8be37b9460a92a443d', '2019-12-23 15:49:56', 'tenant', 1, 2),
(634, 'a33557f71ea86da5fe1d8e1e1dc201ff383da2aa', '2019-12-23 16:50:30', 'tenant', 1, 2),
(635, 'ed480768a178fe9ad64442a487014482fe9d1c62', '2019-12-23 17:04:11', 'admin', 1, 1),
(636, '92f3bda68990c0719481d1649d2df97f0682d394', '2019-12-23 17:51:28', 'tenant', 1, 2),
(637, '539bbf9335826c3f625ec802f4cbcbeea52aad2d', '2019-12-23 18:52:39', 'tenant', 1, 2),
(638, '7218e6207fed9cb8ee86ad59d7de1012ae45cee9', '2019-12-23 19:17:41', 'admin', 1, 1),
(639, '92a7fa0eec25c465a50492f9fd3b4e5c1371ca8c', '2019-12-23 19:52:57', 'tenant', 1, 2),
(640, 'd5924e1b59279b89bd3212b344112d057075c49e', '2019-12-24 11:00:58', 'admin', 1, 1),
(641, 'edcdd9992ecdf18968c0910d024d223ea00a6188', '2019-12-24 11:11:13', 'tenant', 1, 2),
(643, 'c583c67cb673b520f7d5ba95e8eed5efbd9c5b4b', '2019-12-24 13:05:22', 'tenant', 1, 2),
(645, '61645a756b6cda67240f1efdb56e260df6902a52', '2019-12-24 17:22:13', 'tenant', 1, 2),
(646, 'a3052accb37da9dc6199a05be6b4f556da246284', '2020-01-07 20:55:38', 'admin', 1, 1),
(647, '288672f1f74dc772bee5bd3b02eeab52739b1f01', '2020-01-07 21:11:01', 'admin', 1, 1),
(648, '831f035a0ce85fdafe2c4e3376527385b326f7b0', '2020-01-08 12:51:25', 'admin', 1, 1),
(649, '5df0c37b10c2ee61ec88f9265ca33c7f7123e91c', '2020-01-08 12:54:33', 'admin', 1, 1),
(650, 'e48fb2b90a8d54eba0d2870530af25ea2b874e52', '2020-01-08 13:27:27', 'tenant', 1, 2),
(651, '4e958208e14ebad8125e189faaf59ab1f6a8f18a', '2020-01-08 13:56:47', 'tenant', 1, 2),
(652, '7c0f25d1e13b08ca4c8c309ad5c3586e74948622', '2020-01-08 13:57:26', 'tenant', 1, 2),
(653, '53a6cf5f56117de4af4166cda9dfabfe74e6952e', '2020-01-08 13:59:30', 'tenant', 1, 2),
(654, '361a636065f450f44911235f2d7a753198bc3b97', '2020-01-08 14:00:32', 'tenant', 1, 2),
(655, '53fb62312d95075c1969c4be5281655b5e285509', '2020-01-08 14:05:15', 'tenant', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `oauth_authorization_codes`
--

CREATE TABLE `oauth_authorization_codes` (
  `id` int(14) NOT NULL,
  `authorization_code` varchar(256) DEFAULT NULL,
  `expires` datetime DEFAULT NULL,
  `redirect_uri` varchar(2000) DEFAULT NULL,
  `scope` varchar(255) DEFAULT NULL,
  `client_id` int(14) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_clients`
--

CREATE TABLE `oauth_clients` (
  `id` int(14) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `client_id` varchar(80) DEFAULT NULL,
  `client_secret` varchar(80) DEFAULT NULL,
  `redirect_uri` varchar(2000) DEFAULT NULL,
  `grant_types` varchar(80) DEFAULT NULL,
  `scope` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `oauth_clients`
--

INSERT INTO `oauth_clients` (`id`, `name`, `client_id`, `client_secret`, `redirect_uri`, `grant_types`, `scope`, `user_id`) VALUES
(1, NULL, 'baf50a1c-1a7d-11ea-978f-2e728ce88125', '39862d146a3447a2b9b7cfb403ec6487', NULL, 'password refresh_token', 'admin tenant profile', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `oauth_refresh_tokens`
--

CREATE TABLE `oauth_refresh_tokens` (
  `id` int(14) NOT NULL,
  `refresh_token` varchar(256) DEFAULT NULL,
  `expires` datetime DEFAULT NULL,
  `scope` varchar(255) DEFAULT NULL,
  `client_id` int(14) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `oauth_refresh_tokens`
--

INSERT INTO `oauth_refresh_tokens` (`id`, `refresh_token`, `expires`, `scope`, `client_id`, `user_id`) VALUES
(48, '77454fbf22ee5df0939f71d434e36b6862a9bffd', '2019-12-23 18:50:48', 'profile', 1, 1),
(49, 'f7d2b19d9e77633063445946b36a60283598d8f2', '2019-12-23 18:51:39', 'profile', 1, 1),
(50, 'bfe15b7371f889192240b3a49878b42d012f7de1', '2019-12-23 18:52:15', 'profile', 1, 1),
(51, '7cad546d824330efd151fb872c54bded22cd7a77', '2019-12-23 18:52:30', 'profile', 1, 1),
(52, 'd36d4bcf3258b4fa28f68a7bdd8d7aa5b9025ba4', '2019-12-23 18:56:58', 'profile', 1, 1),
(53, '95b08cd32fa4a9915cc5cde4002f017896814c3c', '2019-12-23 19:09:20', 'profile', 1, 1),
(54, '7a7dfa1200347b8f319dee4d35c95024868affb0', '2019-12-23 19:10:33', 'profile', 1, 1),
(55, '55e1dfc418bbcad0cfbe4805e3bf40a285ae4a63', '2019-12-23 19:10:50', 'profile', 1, 1),
(56, '324d359f15aebbba7e78568b46bd7977e4393122', '2019-12-23 19:11:44', 'profile', 1, 1),
(57, 'b951846212f49e73e06ab015892884c1721d9ac3', '2019-12-24 12:38:44', 'profile', 1, 1),
(58, 'fdd0c0f27d1899bcd8187936ffb56ad3371dd5bd', '2019-12-24 12:39:31', 'profile', 1, 1),
(59, 'b2daa7fd20cac69a47fd21d97f2e88c79ed1bb69', '2019-12-24 12:40:30', 'profile', 1, 1),
(60, '7747413ea7138d0dd0e083031a604baa561b125f', '2019-12-24 13:02:01', 'profile', 1, 1),
(61, '6ea97db79199c97eb8c472835247ba796756c3b8', '2019-12-24 13:03:48', 'profile', 1, 1),
(62, '867f391f343ac350c8fd620310f3a235ff8bc697', '2019-12-24 13:07:55', 'profile', 1, 1),
(63, 'a521b9acd65e3f2c504792fe6e8dbf76f8f0e681', '2019-12-24 13:17:59', 'profile', 1, 2),
(64, 'b7e64828b9fdcb739c4aeaa39dceafd103106feb', '2019-12-24 13:18:50', 'profile', 1, 2),
(65, '0db411d3abd2488ff12a12106c6aed6a4c1837c9', '2019-12-24 13:21:03', 'profile', 1, 2),
(66, '895aa507a606db432c445721636086c765137af2', '2019-12-24 13:25:07', 'profile', 1, 2),
(67, '3c47e96290cd199ce1e5dee19ecc8aa6b91dd978', '2019-12-24 13:27:44', 'profile', 1, 2),
(68, '4e9d123a02a8ef4981bf4b0d0213907abe402319', '2019-12-24 13:46:54', 'profile', 1, 2),
(69, '92871818dfdf58f3b1f0c2eafc3a614f364f324d', '2019-12-24 13:47:49', 'profile', 1, 2),
(70, '5bd870f5341a1f321a5a4958a1db0a32acfd8917', '2019-12-24 13:49:15', 'profile', 1, 2),
(71, 'ed18f78ad7900d75fd9841665a9519ecbbeebe12', '2019-12-24 13:50:31', 'profile', 1, 2),
(72, '397a43c545cddc1e5d1d8422278ea26ff5c9d84a', '2019-12-24 13:51:17', 'profile', 1, 2),
(73, '8a3a6c9e91772b0d1ca61d3838e70d00c964792f', '2019-12-24 13:52:23', 'profile', 1, 2),
(74, 'c34d9e0dabf3ac3610047602019a6fa5c029a50d', '2019-12-24 13:54:39', 'profile', 1, 2),
(75, 'aae87ff076fcb051be6c4d04b281dc28835cb2e3', '2019-12-24 13:59:46', 'tenant', 1, 2),
(76, '4edad914e534d87e7dfe58a44a6516209fe219bf', '2019-12-24 14:00:10', 'tenant', 1, 2),
(77, '1bc51cfd0fc7bfe9b984e8f4243c02e2e5b863d5', '2019-12-24 14:00:18', 'tenant', 1, 2),
(78, 'ad2a1469a0befb22f4532ab07600c850d89709e7', '2019-12-24 14:05:16', 'tenant', 1, 2),
(79, '62526df0abb2a810b271eb8ee88edb8c8759eaf5', '2019-12-24 14:05:42', 'tenant', 1, 2),
(80, '5bd23e5f36be5ad655cd47c45ec49adafc5d23b9', '2019-12-24 14:07:18', 'profile', 1, 3),
(81, '19a6d0dc5ecc0ec64f139a79eb6f13de68765426', '2019-12-24 14:08:01', 'profile', 1, 3),
(82, '3e3bec9d9cd354e71cfa6ee526f0463543401bc5', '2019-12-24 14:09:40', 'profile', 1, 3),
(83, '9e429fc5deddac6ce3fdc155fe35ec3fc3e013e2', '2019-12-24 14:12:55', 'profile', 1, 3),
(84, '3a0e73fd09e6d78885e819422249175945471e6c', '2019-12-24 14:13:47', 'tenant', 1, 2),
(85, '5a1d21885d4d3b8a2e679889688d18af40a52ec0', '2019-12-24 14:18:01', 'admin', 1, 1),
(86, 'f79e7daf5c53c914328942ac6f9e136201fc3f11', '2019-12-24 14:26:23', 'tenant', 1, 2),
(87, 'b07ebe9bd031de5f8982af7f93e58efd09742b0b', '2019-12-24 14:28:51', 'tenant', 1, 2),
(88, '568f06fd68a1c7494cd84be3e4ac7f61932db444', '2019-12-24 14:38:01', 'tenant', 1, 2),
(89, 'bed01d8b35284d9ae8a39614284f0f40cf2de735', '2019-12-24 14:38:48', 'tenant', 1, 2),
(90, '90d55e79200074866137fba0fb229c317839866b', '2019-12-24 14:39:31', 'tenant', 1, 2),
(91, 'e1f5db839f4c192b352a3e96d64d8badea088917', '2019-12-24 14:42:12', 'admin', 1, 1),
(92, '0a9924aedcd584573eb253a4a65b26a6bbfd6f5e', '2019-12-24 14:42:32', 'admin', 1, 1),
(93, 'ee634959a4bfefb7ef60cf952b94938a8d84b8b0', '2019-12-24 14:43:12', 'profile', 1, 3),
(94, 'c53f35804c237a30171c9a4bbad02b65cbae2893', '2019-12-24 14:44:12', 'admin', 1, 1),
(95, '57842a4a5bca53eda7e0c97357465810a435c721', '2019-12-24 14:48:50', 'admin', 1, 1),
(96, '88131c6967a0ce8fd229d01117acecccbe2ea6ca', '2019-12-24 14:53:53', 'admin', 1, 1),
(97, '15c6ff5564577bfee95e9e288b51d7761ed19d4b', '2019-12-24 14:56:28', 'admin', 1, 1),
(98, '54d7313cf589dc8451b996ac87d83a460c24e832', '2019-12-24 14:59:20', 'admin', 1, 1),
(99, 'b23e1d938b36e074da6a8f0b4567dccad5a032cd', '2019-12-24 15:01:03', 'admin', 1, 1),
(100, '710327d220d7ae6213ef6a44678f18b60113aa5d', '2019-12-24 15:02:02', 'admin', 1, 1),
(101, '2eda0b2dc3f105729e040e1964de50f0d5a85da3', '2019-12-24 15:03:32', 'admin', 1, 1),
(102, '2ef5b8b61216d176fb2832acdf33dfec34e07395', '2019-12-24 15:08:17', 'admin', 1, 1),
(103, 'f16ceee515055f41ae003e623d5f212badbf8585', '2019-12-24 15:13:47', 'admin', 1, 1),
(104, '1d85390c3fac0d8ec2faaff58d2492ce83a33f6f', '2019-12-24 15:15:53', 'admin', 1, 1),
(105, '893c20b2b1d0e7f1e8e333c0a4031b74246539c7', '2019-12-24 15:28:02', 'admin', 1, 1),
(106, '77da59d2f1f3d4c921f31017edc917801caac8e1', '2019-12-24 15:32:39', 'admin', 1, 1),
(107, 'c301a9009d1d5572f395c69621640501d29375e1', '2019-12-24 15:35:21', 'admin', 1, 1),
(108, 'dcc2301c5b7b71ee865773cda72b5ebc9f721351', '2019-12-24 15:45:08', 'admin', 1, 1),
(109, '1239b9e89074efa4dbba5bf7836a3697335b6c0a', '2019-12-24 15:52:57', 'admin', 1, 1),
(110, 'abd27647a43e602e334aa6e8cb4b8c7f8f7c51a4', '2019-12-24 15:53:20', 'admin', 1, 1),
(111, 'eb8eb52ce468ecf77417a81b1bee8af2c4305b92', '2019-12-24 15:54:21', 'admin', 1, 1),
(112, '6cb70f12e7d1c3a142ff89c0c72caf46c3a01bb8', '2019-12-24 15:54:53', 'tenant', 1, 2),
(113, '37f3587043940dd3ecc8e1d25867b6c2094762ef', '2019-12-24 15:55:27', 'profile', 1, 3),
(114, 'c0fdb946ac8f4b9c4e83d92c8e4fd5b14c72c5e3', '2019-12-24 16:14:19', 'profile', 1, 3),
(115, '6eaac1831fc8d70a5b6414de7ee5a50821f05e79', '2019-12-24 16:19:52', 'profile', 1, 3),
(116, '0e5638b55ca2d62c6b7a091b60d9dd41f3342f2f', '2019-12-24 16:23:01', 'profile', 1, 3),
(117, '3eec4d7bc1aa4aa1fed5fbd33dead80fcca0c71e', '2019-12-24 16:23:06', 'profile', 1, 3),
(118, '488add3ac3351c37eb47f6d36b33b1efe545065f', '2019-12-24 16:23:13', 'profile', 1, 3),
(119, 'c9738e55d09fba76fa1c7f2f86605efa6e208438', '2019-12-24 16:23:37', 'profile', 1, 3),
(120, '8a8fec28b427be19ae9bcfe9abc57493c8ebf5d8', '2019-12-24 16:23:44', 'tenant', 1, 2),
(121, '2ea69fef246d185358b405519b93f8fcf24c13b6', '2019-12-24 16:24:00', 'admin', 1, 1),
(122, 'c44e8fa77290baa891cda9187abf549302d8782f', '2019-12-24 16:25:40', 'admin', 1, 1),
(123, '06d85ecbdd250a3fd5d9da26e2a719fad9e003ae', '2019-12-24 17:04:24', 'admin', 1, 1),
(124, '0753f6479419ed6870d7f61b3f192d3c540b8291', '2019-12-24 17:19:37', 'admin', 1, 1),
(125, 'e424331828c9f4b5ffff237e64b7b67151b272a1', '2019-12-24 17:32:07', 'admin', 1, 1),
(126, '9093ad1381938b06327354b2a4c6e5454a23be6c', '2019-12-24 18:17:23', 'admin', 1, 1),
(127, '62a65db62c8b081190e6a65a82e11f0106e1f7cb', '2019-12-24 18:27:28', 'admin', 1, 1),
(128, '7b35560c1fa708c5b0be9bb01d2662ff7cebe793', '2019-12-24 18:32:47', 'admin', 1, 1),
(129, '3c920595f622ce263a725890cdd0df3e844a71d4', '2019-12-24 18:43:23', 'admin', 1, 1),
(130, '5442807f10491fb9b42e0a32c8238665b8a4bfcd', '2019-12-24 18:46:21', 'admin', 1, 1),
(131, 'f8c588b846df2455de4f73c244aec14711ba7b05', '2019-12-24 18:48:03', 'admin', 1, 1),
(132, '21915e142179816d60efa980ce5fa45bc805e542', '2019-12-24 18:49:20', 'admin', 1, 1),
(133, 'c486d13fb77c4d4d894a29f2acbe425fa7ff0ee5', '2019-12-24 18:53:34', 'admin', 1, 1),
(134, 'e5bd3c47608145b40cc5d0097f767a79cf140647', '2019-12-24 18:58:05', 'admin', 1, 1),
(135, 'b383dbdb7e6ca60fa34515dd4e6fff8166c53bad', '2019-12-24 19:09:13', 'admin', 1, 1),
(136, '718b2b8e0c1bc5939dc56b206ba7ec1c560aaf00', '2019-12-24 19:11:05', 'admin', 1, 1),
(137, '27ab26c78ffab606e3bd64ac6ef9df3a7fadba96', '2019-12-25 10:31:59', 'admin', 1, 1),
(138, '500ab18c6c7bf086fb1ab7363437c0bd31e09be6', '2019-12-25 12:28:31', 'admin', 1, 1),
(139, 'dc78f0c0069547a20f92e77dad3b01e09f4a26b1', '2019-12-25 12:45:31', 'admin', 1, 1),
(140, 'c2d3d50fffe9132793f32add8ad94c8cb2b4d3ba', '2019-12-25 12:52:39', 'admin', 1, 1),
(141, 'c455d130bd05c176adf318633e4d39a9a7a47f16', '2019-12-25 12:52:40', 'admin', 1, 1),
(142, 'c4208bd732d1fec553e0bcdfbc18a008d932452d', '2019-12-25 13:10:03', 'admin', 1, 1),
(143, 'a073815cd8496774bc1ebadf53b1f1eb51654934', '2019-12-25 13:34:11', 'admin', 1, 1),
(144, 'e8b9de039262729aac4617dfc1466bbea86f3aa7', '2019-12-25 14:19:51', 'admin', 1, 1),
(145, '7a317ad2648b4496fcda0c67f92af7e73f076980', '2019-12-25 15:38:48', 'admin', 1, 1),
(146, '8cb6d4e265810b82b3cba13871fa2e98b0f14a0d', '2019-12-25 18:27:36', 'admin', 1, 1),
(147, 'e168bb254fc3dba535cb57221ee5e023fc82d80b', '2019-12-25 18:31:55', 'admin', 1, 1),
(148, '0c3c32f56b06c3497546c5858ff9dde22823676d', '2019-12-25 18:37:46', 'admin', 1, 1),
(149, 'f167d82cb45c0a85dd053a14ae6c72e587548ebe', '2019-12-25 18:39:06', 'admin', 1, 1),
(150, '8bf0b71c1cf394a59c03004289b3bf7afe436bbc', '2019-12-25 18:43:59', 'admin', 1, 1),
(151, '00a16144d490ffac04bb9f7002e2c21398adcd02', '2019-12-25 18:50:51', 'tenant', 1, 2),
(152, 'bfeb4c6bb24f020ddb6281c1659df0a1b62dfa63', '2019-12-25 18:51:03', 'profile', 1, 3),
(153, '3d996e3a6fffe18fc5872c6fd4dbdab36b4e2dc9', '2019-12-25 19:01:18', 'admin', 1, 1),
(154, '0f139140f0d5f5341fff181c7489f8c6f9ae3fd7', '2019-12-25 19:03:06', 'profile', 1, 3),
(155, 'e1fd267693058991bbda93a3c2b619de2c049a10', '2019-12-26 10:37:49', 'admin', 1, 1),
(156, '94f5edb2f1e53c39f0cb93d5705f839987133ea8', '2019-12-26 11:02:05', 'admin', 1, 1),
(157, 'e881c59b1c9e9469c9a3c3f926f029e81e2a3460', '2019-12-26 12:10:34', 'admin', 1, 1),
(158, '6c56bfca82ac3599614c416509c54412c56343e7', '2019-12-26 12:16:01', 'admin', 1, 1),
(159, '08c1a495640ba82ec8f42199f420f0614552d9c3', '2019-12-26 12:18:16', 'admin', 1, 1),
(160, '89fed2257ce2dbbb0cb2260aab032ce77f09f629', '2019-12-26 12:30:45', 'tenant', 1, 2),
(161, 'cffdec2540bfe9bb7f3e2d903f3f903b639dfd0b', '2019-12-26 12:42:44', 'tenant', 1, 2),
(162, '0ea1d794140d93b27505963ad4e0c40491f61f35', '2019-12-26 12:59:17', 'admin', 1, NULL),
(163, '2db51bb36fb5e32d41d0eecb26095457c2a45b70', '2019-12-26 13:09:01', 'admin', 1, 1),
(164, 'c993ebe80fde909cbfc0a7b872e62056a5236c7f', '2019-12-26 13:29:47', 'admin', 1, 1),
(165, '9aecf2e782b16d2613d04d59b12f0f81f734c918', '2019-12-26 14:13:16', 'admin', 1, 1),
(166, 'ceb216fe6c267798be117bed0e5af9dc79cfeb6f', '2019-12-26 14:19:04', 'admin', 1, 1),
(167, '8a56c9aa1e04b69ca952df91948ede63d7f60d07', '2019-12-26 14:33:02', 'admin', 1, 1),
(168, '52a63a8e6f883b1716ca57041956e91204103962', '2019-12-26 14:33:02', 'admin', 1, 1),
(169, '30a34784ba5c14c4a31fe0b2ab1304735f173b53', '2019-12-26 14:33:11', 'admin', 1, 1),
(170, '7891b5ff8f9627f12a9c883d91ed5cc49cacde94', '2019-12-26 14:37:07', 'admin', 1, 1),
(171, 'bb926c5694e0722169e7c4db1cb0e52cf821eaf1', '2019-12-26 14:50:26', 'admin', 1, 1),
(172, '5c79d0d4f88b46d4e8b986b1ad3ded8b8f3777f0', '2019-12-26 14:51:14', 'admin', 1, 1),
(173, '930c578c5df7e985a90286cef9be3d2b3864fd64', '2019-12-26 14:51:31', 'admin', 1, 1),
(174, 'f89e2afd00a73f51e0768202fb4e023fca1120f4', '2019-12-26 14:52:12', 'admin', 1, 1),
(175, '3f0863910214fdaa4f39e5d4d067703d349b8e48', '2019-12-26 14:53:09', 'admin', 1, 1),
(176, '7450e41c6ee2acd8be8a0e1c3f34d989d98cd84f', '2019-12-26 14:53:32', 'admin', 1, 1),
(177, '93c88f6c6fcb7bb9ab87d976fa0d56677661914e', '2019-12-26 14:54:23', 'admin', 1, 1),
(178, '4e9e04fef18e8966d11659a3a1ba47d60d60d41e', '2019-12-26 14:55:42', 'admin', 1, 1),
(179, '8c97afb665275b53486b39e0eb1ca08e037d01e0', '2019-12-26 14:55:48', 'admin', 1, 1),
(180, '4ce4146d0dc993b0c1f252508673d1073547dc25', '2019-12-26 14:56:58', 'admin', 1, 1),
(181, '9d6b0b6555cab0e67541a0dbc1fa9eed7d55e41e', '2019-12-26 14:57:03', 'admin', 1, 1),
(182, '818a0ffdc44c14c3de4931644f24c7c9d0172aae', '2019-12-26 14:57:38', 'admin', 1, 1),
(183, 'e1f269a0a6baffa2368fc35573f2085846150a23', '2019-12-26 14:58:46', 'admin', 1, 1),
(184, 'a99b7c69d6b6189823e16a2cdc1dd041b69a4348', '2019-12-26 14:59:00', 'admin', 1, 1),
(185, 'f8dd7cc4ddef8a7d9be91c073a36bbd350cb7fcf', '2019-12-26 15:00:25', 'admin', 1, 1),
(186, '400b41e2d265f8c8aed27d671b83f4e7136c211d', '2019-12-26 15:00:30', 'admin', 1, 1),
(187, '2a895613e22cc9b41fefdf9ea637d9257bfc042b', '2019-12-26 15:00:41', 'admin', 1, 1),
(188, 'd215fffdaf2627f20e5f2007cb6040810e509b13', '2019-12-26 15:01:36', 'admin', 1, 1),
(189, 'bbf02e6a728aba1caf4ab0ac019cb2421180b07e', '2019-12-26 15:01:48', 'admin', 1, 1),
(190, 'b56c707128d62e79f6d19fb3e1530a47db74ae6a', '2019-12-26 15:02:33', 'admin', 1, 1),
(191, '3b3439ca4cd51b1efa557bf2c6ad96456a7ac109', '2019-12-26 15:07:37', 'admin', 1, 1),
(192, 'b7f2589decec7377fefd327576c04fd2ad91f703', '2019-12-26 15:09:35', 'admin', 1, 1),
(193, '0aed98954f78e62ccf508b33b5bb072e898b9ed0', '2019-12-26 15:09:53', 'admin', 1, 1),
(194, 'd9bc239bc505fe2e00f2b0cc0f6c5f6987de958f', '2019-12-26 15:11:53', 'admin', 1, 1),
(195, 'da3abdd7b678ab908286fd20b26cb3b04097c29b', '2019-12-26 15:12:25', 'admin', 1, 1),
(196, '51fca11fe34f0384ee5b11e5c956111813538ce9', '2019-12-26 15:13:05', 'admin', 1, 1),
(197, 'c4e476df2a059ef013a6572dd675b1e633c9268d', '2019-12-26 15:13:16', 'admin', 1, 1),
(198, 'ee36c4353c5134c44b35adc7da21e5c92ac445b6', '2019-12-26 15:14:57', 'admin', 1, 1),
(199, '7c2d18d73e5d08109b574367d1f83dd84e91ff5c', '2019-12-26 15:15:34', 'admin', 1, 1),
(200, '5da35b4a94abe9bcc42e161bf1623bda0c1dc7b5', '2019-12-26 15:16:37', 'admin', 1, 1),
(201, 'c57fcb5ba4f03057ae217f9e39f2c5ed954dbfcc', '2019-12-26 15:22:49', 'admin', 1, 1),
(202, '1f505f3dec4087086265fcf68a183a4e9778ab98', '2019-12-26 15:37:20', 'admin', 1, 1),
(203, '55eb657475ba99edc5631951a65d7f6b68312ddc', '2019-12-26 15:48:44', 'admin', 1, 1),
(204, 'e64e92d9a678e28515cb1b083494f4386aa37a3c', '2019-12-26 15:49:01', 'admin', 1, 1),
(205, 'e79c94c6192b7bd5750ba3f4c496ac2780793207', '2019-12-26 15:49:30', 'admin', 1, 1),
(206, '282976c8070513403087ea397df69402363b8af0', '2019-12-26 15:50:46', 'admin', 1, 1),
(207, '8a9313f382dfdea1a16f78fe09831c1bfd497c0d', '2019-12-26 15:55:49', 'admin', 1, 1),
(208, 'f5ef9131f36bd65ffb82b5d0fb9794b6d95d42d8', '2019-12-26 15:57:27', 'admin', 1, 1),
(209, '49ae72897e54481a5b312907732e240c067ea5d7', '2019-12-26 16:12:12', 'admin', 1, 1),
(210, '8c785093ec0074c48b0cd98f29ab5d9d992fa2d4', '2019-12-26 16:18:46', 'admin', 1, 1),
(211, 'f5ce90e273315f7e4c4e5b37d1e588b7823dbc67', '2019-12-26 16:26:09', 'admin', 1, 1),
(212, '1a5a71ea9c6befb2a0a83c649a95f649a1693436', '2019-12-26 16:29:23', 'admin', 1, 1),
(213, '8ce93ffe55b17557238d67af9b84b295d1d20792', '2019-12-26 16:40:27', 'admin', 1, 1),
(214, '6d4c5732fd5295c7145700665a8d999f3795cfa8', '2019-12-26 18:56:02', 'admin', 1, 1),
(215, '70e5dc716baa2e87b966c0e4609a6e18c1153ba5', '2019-12-27 10:31:51', 'admin', 1, 1),
(216, 'bf4fa6599841a93865f2ff011c6b9921052ceab6', '2019-12-27 10:36:22', 'admin', 1, 1),
(217, '083b91027764d889ba1499bc8d74e44e6a059915', '2019-12-27 11:44:10', 'admin', 1, 1),
(218, 'd67c78a9bf32f80756cc188d3932a4198d8f7e41', '2019-12-27 13:12:14', 'admin', 1, 1),
(219, '7514be2270ad96df955714eed6536d264c6693c3', '2019-12-27 13:13:57', 'admin', 1, 1),
(220, '86fa5d9e14f6eca1d8a06f3c56cbcd6de4b7c51d', '2019-12-27 13:22:44', 'admin', 1, 1),
(221, '3272c23fa65dcc06c8ca36e24bd1e3a483a2e545', '2019-12-27 14:18:58', 'admin', 1, 1),
(222, '83602be229037321c65262b4950ab8031d11da63', '2019-12-27 14:49:18', 'admin', 1, 1),
(223, 'fc05537dcaea9e3d4c089e6ae4c02859b0c1c7ab', '2019-12-27 14:50:21', 'admin', 1, 1),
(224, '5734022d65a6272980740ebb556a8407afd6d662', '2019-12-27 14:52:23', 'admin', 1, 1),
(225, '52dc7d62aac02937a454420d9c65d5672386d92d', '2019-12-27 14:55:30', 'admin', 1, 1),
(226, 'f53b567ccc9c5fbc40188544188abc96115966d2', '2019-12-27 15:00:49', 'admin', 1, 1),
(227, 'cb53480c02f1cb47a9d43a85e7169594a024da37', '2019-12-27 15:02:45', 'admin', 1, 1),
(228, '54e43754e1e511972c8b798359659a7f48f3857f', '2019-12-27 15:05:01', 'admin', 1, 1),
(229, 'eb27803d934c88aca6768008fb75c35f9ba1c4c4', '2019-12-27 15:06:10', 'admin', 1, 1),
(230, '626147e77be5bd094c7822cda6d6938f1dbd7901', '2019-12-27 15:07:31', 'admin', 1, 1),
(231, '42c2f9868f5708744dc9eb5ad9bb76dd83112afd', '2019-12-27 15:08:18', 'admin', 1, 1),
(232, '56a31ae877d62109c193d53c2ef8fbb875f532fd', '2019-12-27 15:09:24', 'admin', 1, 1),
(233, '109567785e340eb6fd32109bdf851a41a1921822', '2019-12-27 15:09:59', 'admin', 1, 1),
(234, 'a2140d281a965bd4db15a22e4def00367d6b573d', '2019-12-27 15:12:20', 'admin', 1, 1),
(235, '425d80bf7d4972c8ed89b7fdb878745599553ee8', '2019-12-27 15:26:47', 'admin', 1, 1),
(236, '90bed29f8d4071ecb5877a5f4603a5c9d009a5f8', '2019-12-27 15:37:11', 'admin', 1, 1),
(237, '3875050740671da510d78bf550699cf7a2ed7369', '2019-12-27 15:46:13', 'admin', 1, 1),
(238, '0634e62859739206219f0aa5920b0668ff1e0e1c', '2019-12-27 15:46:25', 'admin', 1, 1),
(239, '8e3fac56fdf4ac7617184593d70c2282806d2563', '2019-12-27 16:06:56', 'admin', 1, 1),
(240, '0295fa3ef8e053dac1cf6ecabed88006feb95ca1', '2019-12-27 16:07:56', 'admin', 1, 1),
(241, '33b8c185113586b702d06d7bf8b382645667e2af', '2019-12-27 16:08:01', 'admin', 1, 1),
(242, '2fa1b17888467b7739145c5d485794d004f6d5d7', '2019-12-27 16:08:12', 'admin', 1, 1),
(243, '2bfea80e711bc8c8ce2cb5762e86ec1aa6f92539', '2019-12-27 16:08:28', 'admin', 1, 1),
(244, '8c86dee484450c15af90722ad9a1469a5db3da73', '2019-12-27 16:09:17', 'admin', 1, 1),
(245, 'f2f6c1883715a227423fd00a47ace05091464089', '2019-12-27 16:45:51', 'admin', 1, 1),
(246, '0eafd6cd03b334c056809c95853e80ce65064e18', '2019-12-27 17:06:18', 'admin', 1, 1),
(247, '38158840a260b48a034bd438a381d254fa0b059d', '2019-12-27 17:59:48', 'admin', 1, 1),
(248, 'e08d393d1e370eb64307d4a4429be6947464660c', '2019-12-27 18:00:43', 'admin', 1, 1),
(249, 'b3fc79b1cdaee7220e92d0f2c7658b359be6e254', '2019-12-27 18:01:46', 'admin', 1, 1),
(250, '88e6b44cea7e28f0d8f01fac1e71354a2cbef2a7', '2019-12-27 18:04:48', 'admin', 1, 1),
(251, '6a92a79c11fc343ceff6eaa1f503dd10e1a6b498', '2019-12-27 18:08:06', 'admin', 1, 1),
(252, '0a32172fdcba481c1acada86f3d3d59b07cc1c04', '2019-12-27 18:09:08', 'admin', 1, 1),
(253, '7e515f2caf845359ca024439ff862d9008e9ebbf', '2019-12-27 18:11:22', 'admin', 1, 1),
(254, '4dbdf71ca2a4a38965b26e2ae7fa6a53382b3e57', '2019-12-27 18:11:57', 'admin', 1, 1),
(255, 'ca993dd1ebd4a11a03f7761c52af9a861a328e95', '2019-12-27 18:38:49', 'admin', 1, 1),
(256, 'd8e67b2ae9cad2a25ea61cf021a1b9ef4aa0ae69', '2019-12-27 18:39:43', 'admin', 1, 1),
(257, 'c1adcc4fe540b8e5f22617dca44286d8ed733244', '2019-12-27 18:40:15', 'admin', 1, 1),
(258, '112156f5143e0b706073f0a460ae511623618373', '2019-12-27 18:41:39', 'admin', 1, 1),
(259, '8a68d96e59de58029ee13098cf6c6ef52c108089', '2019-12-27 18:43:18', 'admin', 1, 1),
(260, 'e3f8ee743714c8b0b841f8ad510f00a9bca25646', '2019-12-27 18:45:32', 'admin', 1, 1),
(261, 'f3d63d21af3f32fe7a83900c85ca5c1303e30090', '2019-12-27 18:46:52', 'admin', 1, 1),
(262, '15cf96c97aa76ea742418b1dc64d1cf48847c489', '2019-12-27 18:48:07', 'admin', 1, 1),
(263, '4083303926cf01e08c7413260d6efeebe6513913', '2019-12-27 18:48:45', 'admin', 1, 1),
(264, '962c8dea49dd0f9e8b9fb5b92a61b27c9d020dfd', '2019-12-27 18:49:02', 'admin', 1, 1),
(265, '91466b2945d2261f038f5ae5df93e83b8a4eda0c', '2019-12-27 18:52:02', 'admin', 1, 1),
(266, '8481ad912da6eb7a31651eb6f87d86951a9e2df7', '2019-12-27 18:53:56', 'admin', 1, 1),
(268, '6661db8971b7fdc20497d97be1776dbe39f97ba2', '2019-12-27 18:59:20', 'admin', 1, 1),
(269, '4c6dcd0abd38e2dc137fc8e86e31aaa40328342d', '2019-12-27 19:00:26', 'admin', 1, 1),
(270, 'eb73b7a100a36e477d7e2699034d6687a14cf581', '2019-12-27 19:04:32', 'admin', 1, 1),
(271, '9a2d136d16298e0302ad5ab9c25b056ad477a535', '2019-12-27 19:10:45', 'admin', 1, 1),
(272, 'a36b16a984be69ea7fabc2bfb0c8d737cab75975', '2019-12-27 19:25:44', 'admin', 1, 1),
(273, 'c2d35184af575ac60c05497b8ff2bfe7f9ec1194', '2019-12-27 19:32:25', 'admin', 1, 1),
(275, '2cb3bf49fd9c859179455ae18e4b59efd184901e', '2019-12-27 19:37:02', 'admin', 1, 1),
(276, '052433dc2d9fca2f601e87d0b6b6956951148cbe', '2019-12-27 19:38:24', 'admin', 1, 1),
(277, '04889e62591c666d7d8b2d36dc5f7dd203036239', '2019-12-27 19:41:49', 'admin', 1, 1),
(278, '029bc9cf48f886758bb0fcd97a112c6251662e22', '2019-12-27 19:42:35', 'admin', 1, 1),
(279, '675647af18b977b1e6aca1f42586856c872fec18', '2019-12-27 19:43:30', 'admin', 1, 1),
(280, 'da7de57b3b519f81792b9ff27387320212b4aa77', '2019-12-27 19:44:51', 'admin', 1, 1),
(281, '4d4570d4d81b4cb87914ca5bc145727e82b9780a', '2019-12-27 19:49:05', 'admin', 1, 1),
(282, 'cbc5cb7e3a448a2d7b2969463487efd9abe82e45', '2019-12-27 19:50:19', 'admin', 1, 1),
(283, '9214dda35c39d5ac93382efefc2991f1a2c276af', '2019-12-27 19:52:41', 'admin', 1, 1),
(284, '9c5a7393e89df7ded0274eb2c738cd6fd7d616e5', '2019-12-27 19:53:29', 'admin', 1, 1),
(285, '743e03fc680b0d598d513dce387d62b144f8d705', '2019-12-27 19:54:49', 'admin', 1, 1),
(286, 'c4151bffbbbfeff292e8e5762ca0d78735c5bfe6', '2019-12-27 19:56:11', 'admin', 1, 1),
(287, '967c8008ed1be6d46b3b179858ff94897cd133e5', '2019-12-27 19:56:24', 'admin', 1, 1),
(288, '58b303733550f5628a9ad3829174dd5d00f5f0a9', '2019-12-30 11:28:25', 'admin', 1, 1),
(289, '0d4a1f20e70231a83d302f383ff7accfd738fc3b', '2019-12-30 12:42:34', 'admin', 1, 1),
(290, 'a2e85e8bb68f593ac4069ed92541dafd0fd790d8', '2019-12-30 12:54:03', 'tenant', 1, 2),
(291, '1d2e49475d88487a203c21a40d0907f7cd4c9dd6', '2019-12-30 13:01:34', 'tenant', 1, 2),
(292, 'e02de5a7503070bd640be6fb17804ae2118f9009', '2019-12-30 13:03:27', 'tenant', 1, 2),
(293, '888f0d3e8e4c76290785b9dc1d77f3f526dcbdfa', '2019-12-30 13:03:46', 'tenant', 1, 2),
(294, '881abef4660c2076348601840693d0542fa0d9a4', '2019-12-30 13:05:31', 'admin', 1, 1),
(295, '58bbfc51f034f6b535b7a4b4ed26f56a0462587d', '2019-12-30 13:08:52', 'admin', 1, 1),
(296, '05651a37726fd1f8973f0af9cbe4389376ebe89a', '2019-12-30 13:09:13', 'tenant', 1, 2),
(297, 'b63d1bf767e902f39feca6c5af72dbe1482f4b27', '2019-12-30 13:10:38', 'tenant', 1, 2),
(299, '8c316279a25a0a759a1914ec5d35404a7a2a1abc', '2019-12-30 13:13:52', 'tenant', 1, 2),
(300, '0750e219902c2cb7ac05fc327cbacc23c13e00c4', '2019-12-30 13:14:11', 'admin', 1, 1),
(303, '7fc592d7a00cfb77dfdb361118f8cb1e1fda081c', '2019-12-30 13:17:07', 'tenant', 1, 2),
(305, '457e47510d70b441a9235c45bb3f967e9886d2e5', '2019-12-30 13:24:19', 'tenant', 1, 28),
(306, '6915de0fd3faf83540c72c8ef4fe4eb960951761', '2019-12-30 13:24:59', 'tenant', 1, 28),
(307, '9326b96c8783e798cb53c3520d3329715810e79b', '2019-12-30 13:25:15', 'tenant', 1, 28),
(308, 'e16d8099415c37fadb7215463083976443f29340', '2019-12-30 13:40:24', 'admin', 1, 1),
(309, '9cde40315d6be3d5ba6f173dc46d2eec5f8102e7', '2019-12-30 13:40:30', 'admin', 1, 1),
(316, 'cd3e016fdb3b1111bd9bc7a0fac9419607465c08', '2019-12-30 14:26:39', 'tenant', 1, 2),
(325, 'a4639fd69dbc80e1409146f720c3098722fec116', '2019-12-30 19:19:02', 'admin', 1, 1),
(329, 'be0db0e96cf7207da7b86617c0e515a841da13da', '2019-12-31 13:04:08', 'admin', 1, 1),
(331, '0cc849696cf076e18ca6904de9f08731319d91d5', '2019-12-31 13:09:42', 'admin', 1, 1),
(332, 'f5f70778064c9d25f87ef021a730145988acb274', '2019-12-31 13:09:58', 'admin', 1, 1),
(334, '606a79e459a946211a15e83fe585da9ee585ea90', '2019-12-31 13:11:20', 'admin', 1, 1),
(335, 'dfde99bc7d38f6eb47210517f801d7d2e2ed091d', '2019-12-31 13:11:29', 'admin', 1, 1),
(336, 'aeb04c826d32ab8e1ad20b6c72f0c5bd798c9c3a', '2019-12-31 13:11:31', 'admin', 1, 1),
(337, '00e68ab5c96944253b44a2e61803950d977174ad', '2019-12-31 13:11:31', 'admin', 1, 1),
(338, '8bbc45e188677245b77f1c5d6622e1189c89df1e', '2019-12-31 13:11:32', 'admin', 1, 1),
(339, 'cb77bfeed8238442643fdaf45c52315a524d90d4', '2019-12-31 13:11:32', 'admin', 1, 1),
(340, '8e45d1b977f0f03906fc1e3a4a0c4e1c1b8757ce', '2019-12-31 13:11:33', 'admin', 1, 1),
(341, '7a6915cb0dc2fb72aa97d41678d027189de60551', '2019-12-31 13:11:34', 'admin', 1, 1),
(342, '40e66241fbfeb2538b5bebb5258545d9dbd7b4a4', '2019-12-31 13:11:36', 'admin', 1, 1),
(343, '91969b72440971fc5d5a312f3ef8d1e054c9bf23', '2019-12-31 13:11:37', 'admin', 1, 1),
(344, 'e3fd8a68759379ca28776cff902e3f4a2721ddb6', '2019-12-31 13:11:44', 'admin', 1, 1),
(345, 'e31f4e2d1a43d0676203877a12228c2e63b27356', '2019-12-31 13:11:44', 'admin', 1, 1),
(346, 'f1820398e48476fc8bffe0a181a60d135a0be1d0', '2019-12-31 13:11:58', 'admin', 1, 1),
(347, '7e1c782e188ec9bfba1bc1e7a3f7f0d709a102f6', '2019-12-31 13:12:04', 'admin', 1, 1),
(351, '7c340d7b863321a5cb17a4a1a99e674bdad77e1f', '2019-12-31 13:12:50', 'admin', 1, 1),
(353, 'eaed6477402c3d78fad3fb38364a5e9f2a144d90', '2019-12-31 13:16:16', 'admin', 1, 1),
(356, 'a09e66f35b99e6b59543fa418bba58ef7a330aa2', '2019-12-31 13:17:05', 'admin', 1, 1),
(358, '0d3e4219b5d8942e3a4bc59c57f53de1802473b0', '2019-12-31 13:20:32', 'admin', 1, 1),
(360, 'e8855864287a761c10e9d99630a58288016e8fd3', '2019-12-31 13:23:51', 'admin', 1, 1),
(390, '89b74a7191b333e855c6c8775529b6032b1f72a0', '2019-12-31 16:48:14', 'admin', 1, 1),
(453, '3d9d7b21acb3f07a122ca9762e5805a116b814f1', '2019-12-31 19:24:51', 'admin', 1, 1),
(454, 'a42dffd92a93cd67e3c406734c424c7a171fff2a', '2019-12-31 19:24:53', 'admin', 1, 1),
(457, '7e31004baced3942a79fa6e75958cebea75c64c0', '2019-12-31 19:25:51', 'admin', 1, 1),
(458, '338f93d3bb854e078743408efad30ea7c1086875', '2019-12-31 19:25:53', 'admin', 1, 1),
(459, 'f335e39c5193d9fb5f5a482ad9a01ce850d1330d', '2019-12-31 19:25:53', 'admin', 1, 1),
(460, 'face33bf13ee2c4299df064d38c4ff409ae459d5', '2019-12-31 19:25:54', 'admin', 1, 1),
(461, '5b861715714493d6b45ddcc6a3e412d7bc7e796a', '2019-12-31 19:25:58', 'admin', 1, 1),
(463, 'd7c1a99344d25ec09e17035c0e1eaf9a69104bad', '2019-12-31 19:26:22', 'admin', 1, 1),
(465, '8c81e2504edf950cd2ce18d28cdc3a943a3d499a', '2019-12-31 19:26:41', 'admin', 1, 1),
(466, '4a8ab6b863aa67322d3586f8b5604aca33f14e39', '2019-12-31 19:26:52', 'admin', 1, 1),
(467, '4f8b54d11c34c8f949735a80940ffb52d4fee083', '2019-12-31 19:26:52', 'admin', 1, 1),
(468, 'a9e4e626e059354c3a8a20abab4eda510f36373a', '2019-12-31 19:26:53', 'admin', 1, 1),
(469, '5e7536db2f337604ac5510c89b52839154c9ed21', '2019-12-31 19:26:53', 'admin', 1, 1),
(470, '43b98a83d91c4ca353bdec42bdbfdf53509f21d5', '2019-12-31 19:26:53', 'admin', 1, 1),
(471, 'ffc58a44911ad4bdee2cb4df368d246c676103eb', '2019-12-31 19:26:53', 'admin', 1, 1),
(472, '247933903bf32e71a604ef4f3038c08c05704bd8', '2019-12-31 19:26:53', 'admin', 1, 1),
(473, 'eb5fcbb837fb7af8d446b5360bf12e1c1317f0ea', '2019-12-31 19:28:20', 'admin', 1, 1),
(474, 'cbda7991e5d264065d8f22f68ee17b18a7c4e640', '2019-12-31 19:29:07', 'admin', 1, 1),
(475, '0f09a5c637ab2eb78e02e70e34be1eedeb024af2', '2020-01-01 12:46:39', 'admin', 1, 1),
(477, 'c946379aa374b967f226941db0ceca75b37b7ae1', '2020-01-01 13:23:24', 'admin', 1, 1),
(479, '1177804ea1fc3e99f2229ab4e201435ea5493a2b', '2020-01-01 13:23:55', 'admin', 1, 1),
(480, 'f723d8fe309320c36f0e1ee0cac084debbf154cf', '2020-01-01 13:24:12', 'admin', 1, 1),
(482, 'bfdd300bb51e3bda1be724aeb592be0ebe704f90', '2020-01-01 14:17:24', 'admin', 1, 1),
(484, 'ccd6f141ff970c5324964a5a392952f43fd05e5d', '2020-01-01 14:18:40', 'admin', 1, 1),
(496, 'bcbf4999cee6b401a3146513268a3a45ce3d2b95', '2020-01-01 14:32:56', 'admin', 1, 1),
(499, 'efc7158d2b75588e2a5bcb5cca38a63b66cc5a2d', '2020-01-01 14:37:37', 'admin', 1, 1),
(505, 'c522f7b50bced760065a4c16ce57f3e47ee925e1', '2020-01-01 14:57:10', 'admin', 1, 1),
(517, 'afb4acf7f0118fd3af7df70daa998693a556010e', '2020-01-01 15:45:09', 'admin', 1, 1),
(530, 'df5336b1524292298f81253557e51c9b04680e92', '2020-01-01 16:33:18', 'admin', 1, 1),
(532, '7a0d091ab36fe5123313f79ff2a0ce365fa5368e', '2020-01-01 16:34:38', 'admin', 1, 1),
(547, '619f0852f15052927e114bb044e3c37891fe0668', '2020-01-01 16:48:45', 'admin', 1, 1),
(548, 'b63d30306779618fdb4815fa1596eef486b51929', '2020-01-01 17:18:05', 'admin', 1, 1),
(549, '9a3518146794c6f8a147ee3cd84da634ed6389bf', '2020-01-01 17:18:06', 'admin', 1, 1),
(567, '36b16bd1c86a2152f148052c0a070aa5b14e27c9', '2020-01-01 19:10:41', 'admin', 1, 1),
(568, '51ab6778d7d6b0a16cbc35ee7172c881afbd2243', '2020-01-02 12:11:52', 'admin', 1, 1),
(569, '3f50bfbf66b5dcbf8a84e26e4f9f7299386fbb09', '2020-01-02 12:28:06', 'admin', 1, 1),
(570, '8feb0ca6323df6396785d7e5cb0f0993d06827df', '2020-01-02 12:30:04', 'tenant', 1, 2),
(571, '0225233ce9e0f924d528984a562b9913b1dee635', '2020-01-02 12:49:00', 'admin', 1, 1),
(572, '662bebcbd4b557f6645c7e7f4883d13f43ba15f2', '2020-01-02 13:02:46', 'admin', 1, 1),
(578, 'b22824552d391fae01ab9b8ac769849e092ea13f', '2020-01-02 14:18:52', 'admin', 1, 1),
(579, '2b61fbf1386b7d3c66ffd2c0d72f89a8f9af50e8', '2020-01-02 14:21:51', 'tenant', 1, 2),
(581, 'fec1e41482f604dee9956dac19adb1f15289d06c', '2020-01-02 14:30:15', 'admin', 1, 1),
(582, '29ed26cbbd9a7279d8321952f1d1c6c350b8173d', '2020-01-02 14:37:33', 'admin', 1, 1),
(583, '4f0d1c7310d39bccff81929d03b575137187669a', '2020-01-02 14:37:37', 'admin', 1, 1),
(584, 'ba3de5d336792bb34846dbc647fbb9f0b8ef0da2', '2020-01-02 14:37:49', 'admin', 1, 1),
(585, 'a1c95f942bf1581b6ca71f32be76b357032acdeb', '2020-01-02 14:38:17', 'admin', 1, 1),
(586, '198b476f83637b1bdc2913024b2dce92a048af99', '2020-01-02 14:39:35', 'admin', 1, 1),
(587, '6b3b8b91dd99ef9830898b2bd021209241c28e14', '2020-01-02 14:41:38', 'admin', 1, 1),
(588, 'c9b60edb043d2908816289664a6decdd1f0329ce', '2020-01-02 14:42:18', 'admin', 1, 1),
(589, '7069d640b53dd439095d1911e3869668b87c00d9', '2020-01-02 14:45:52', 'admin', 1, 1),
(590, 'eaa4959a2b727f930991815c6b0de0b2b347cba8', '2020-01-02 14:47:56', 'admin', 1, 1),
(591, 'f26990c9f3d073d3895e497340b4de735db0cb46', '2020-01-02 16:03:22', 'admin', 1, 1),
(592, '93a2e66ca40ad26542af0fd1b2f673fd2f457901', '2020-01-02 16:03:48', 'admin', 1, 1),
(593, 'be4b05116fb92ff6a751bf48ec0af4cd1fff4be0', '2020-01-02 16:07:16', 'admin', 1, 1),
(598, '0458d992f6cc50aa713338f7ef1f625f68fe85ea', '2020-01-02 16:45:33', 'admin', 1, 1),
(604, '476238b724f10db67dff8259ac799b723a9ccb74', '2020-01-02 17:12:52', 'admin', 1, 1),
(605, '1299df113537727f852afc9b17134e4379e200ff', '2020-01-02 17:15:41', 'admin', 1, 1),
(608, 'ddc50d7ad421128cbb7329594243a119a013222f', '2020-01-02 18:07:37', 'admin', 1, 1),
(609, '82d876a548b23f3d64eebce1b09469cdd9bd9bab', '2020-01-02 18:17:10', 'admin', 1, 1),
(611, '93a85650c552b05fea23b490b554908d5677d54a', '2020-01-03 10:33:27', 'admin', 1, 1),
(614, '2b50cb1fdf1ecb161bdf3ce4df2771ca30c5f97b', '2020-01-03 11:04:09', 'tenant', 1, 2),
(615, '8e646b1ad32889d22495691aa3a481a8f443dce3', '2020-01-03 12:46:36', 'admin', 1, 1),
(616, 'ac82598da734247f3ff300d871a9d54b4fb39622', '2020-01-03 12:46:58', 'tenant', 1, 2),
(617, '01e3fd147aa3870c871dcdc17d8e9976323079a9', '2020-01-03 12:50:30', 'tenant', 1, 2),
(618, '246546cfce40f2099cb39be46bcb9047a7994b00', '2020-01-03 12:52:16', 'admin', 1, 1),
(619, '32a7c5a83b7a520a96964b473a5a475dd1677d70', '2020-01-03 13:09:33', 'admin', 1, 1),
(620, '172404e12ca9d034ffb4a846d1027ef8b441fdc5', '2020-01-03 14:58:04', 'tenant', 1, 2),
(621, 'e5ab96dbea5e9db61af128c5963b24b15f50c394', '2020-01-03 15:06:47', 'tenant', 1, 2),
(622, 'ec737cd26a54119c9631fb2c1cfd5ce8d51b7332', '2019-12-17 15:22:47', 'admin', 1, 1),
(624, '66f13fd03489f887ea66b34be9b61d54efc7ca0a', '2020-01-03 15:28:27', 'admin', 1, 1),
(625, '5cf11ce6a7fbc3f2c2cc731885a9e4712f2cf9e8', '2020-01-03 15:46:56', 'tenant', 1, 2),
(626, '8bfcb8532ab80ced6ac48d47623f09e47749fae8', '2020-01-03 16:25:56', 'tenant', 1, 2),
(629, '7893ae81e6f6c0182edd4f44d326c66c578df060', '2020-01-03 18:47:22', 'tenant', 1, 2),
(630, 'e9d5cee3c51140991f734bda98ae9b592b5f2773', '2020-01-06 10:14:04', 'admin', 1, 1),
(631, 'fa35b15f15f3b794d48208301af5690f085db6a9', '2020-01-06 12:25:54', 'admin', 1, 1),
(632, '169b7e1ef73297e6b57a64b025e5dccdb1639509', '2020-01-06 13:04:02', 'tenant', 1, 2),
(633, 'ce981a952941c4cdf40185cccff01ef068294739', '2020-01-06 14:49:56', 'tenant', 1, 2),
(634, '9cfae0bde1d85ff537d053bb59527017a3be6567', '2020-01-06 15:50:30', 'tenant', 1, 2),
(635, 'ef9078bd7e21496062221f5a07c182bf7514715e', '2020-01-06 16:04:11', 'admin', 1, 1),
(636, '83cc5b65080f80e784c8e792f6a6c44a39075126', '2020-01-06 16:51:28', 'tenant', 1, 2),
(637, '8fc8762d38c763c672861c36c9127f99ffb42b64', '2020-01-06 17:52:39', 'tenant', 1, 2),
(638, '52143fb1b0779c6e78567f1e00c88960941c05aa', '2020-01-06 18:17:41', 'admin', 1, 1),
(639, '8b7e98ea492caacdd24c82120d91906a2c94fdfd', '2020-01-06 18:52:57', 'tenant', 1, 2),
(640, '1aa2e503a1edd01dd557312f5d5428802aa77cf0', '2020-01-07 10:00:58', 'admin', 1, 1),
(641, '800f4277c215959ac50efa89b01f5992da0b3214', '2020-01-07 10:11:13', 'tenant', 1, 2),
(643, '8dd5c954fd6a8333f1a350214e97ecbd9d97831e', '2020-01-07 12:05:22', 'tenant', 1, 2),
(645, '4badd8e38b3ce10556eb88c204ae11a4d78f0192', '2020-01-07 16:22:13', 'tenant', 1, 2),
(646, '3c3adc71a5b6a99fa0fde33288234885c938718b', '2020-01-21 19:55:38', 'admin', 1, 1),
(647, '465ad484675a55559e181d39574e950dd8847218', '2020-01-21 20:11:01', 'admin', 1, 1),
(648, '33b691bbec6b997165fddb5bc7641ea3acdda748', '2020-01-22 11:51:25', 'admin', 1, 1),
(649, '909929ded91b41d3ad8fbc64d8c614215e22c025', '2020-01-22 11:54:33', 'admin', 1, 1),
(650, 'c9b1a48cdc81fe9a41fcb541a5ba368626ef7cb2', '2020-01-22 12:27:27', 'tenant', 1, 2),
(651, '693add561473084183d6414cec089a6b5ca489f0', '2020-01-22 12:56:47', 'tenant', 1, 2),
(652, '633f2290464995d9154a39683bce4e3d569f4198', '2020-01-22 12:57:26', 'tenant', 1, 2),
(653, '212a5d8ad7a05736a5c85fc3e0485d2c33d80bbe', '2020-01-22 12:59:30', 'tenant', 1, 2),
(654, 'bb748483247c15175f8f0ff4aab2c3183665a163', '2020-01-22 13:00:32', 'tenant', 1, 2),
(655, '969430ac375a656c40acea88c5f8b85dc1b9a911', '2020-01-22 13:05:15', 'tenant', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `oauth_scopes`
--

CREATE TABLE `oauth_scopes` (
  `id` int(11) NOT NULL,
  `scope` varchar(80) DEFAULT NULL,
  `is_default` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `oauth_scopes`
--

INSERT INTO `oauth_scopes` (`id`, `scope`, `is_default`) VALUES
(1, 'admin', 0),
(2, 'tenant', 0),
(3, 'profile', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tenants`
--

CREATE TABLE `tenants` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `address` varchar(200) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `created_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) NOT NULL,
  `modified_datetime` datetime DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `is_deleted` tinyint(4) NOT NULL DEFAULT '0',
  `deleted_by` int(11) DEFAULT NULL,
  `expired_on` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tenants`
--

INSERT INTO `tenants` (`id`, `name`, `address`, `email`, `phone`, `status`, `created_datetime`, `created_by`, `modified_datetime`, `modified_by`, `is_deleted`, `deleted_by`, `expired_on`) VALUES
(1, 'System', '', '', '', 1, '2019-12-09 12:35:53', 1, NULL, NULL, 0, NULL, NULL),
(2, 'Tenant1', '', '', '', 1, '2019-12-10 13:13:18', 1, NULL, NULL, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `tenant_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `address` varchar(200) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(250) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `scope` varchar(20) NOT NULL DEFAULT 'profile',
  `created_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) NOT NULL,
  `modified_datetime` datetime DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `is_deleted` tinyint(4) NOT NULL DEFAULT '0',
  `deleted_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `tenant_id`, `name`, `address`, `email`, `password`, `phone`, `status`, `scope`, `created_datetime`, `created_by`, `modified_datetime`, `modified_by`, `is_deleted`, `deleted_by`) VALUES
(1, 1, 'Super Administrator', '', 'admin@system', 'sha1$da8eefab$1$694e41d342ffe43b59b6d478590dac03e409a30a', '', 1, 'admin', '2019-12-09 12:36:52', 1, NULL, NULL, 0, NULL),
(2, 2, 'Tenant1 Admin', '', 'tenant1@tenant1', 'sha1$4adf4fef$1$c3415c1a280ee941181d057d63a009d49dc295bf', '', 1, 'tenant', '2019-12-10 13:14:22', 1, '2019-12-16 01:15:02', NULL, 0, NULL),
(3, 2, 'Tenant User', 'Noida', 'user@tenant', 'sha1$28e48fc6$1$9ea603705ed8e77f190f314121899b6d76e2c086', '123456576778', 1, 'profile', '2019-12-10 13:15:25', 2, '2019-12-16 02:09:04', 2, 1, 2),
(28, 2, 'Tenant1 Admin', '', 'tenant2@tenant1', 'sha1$8ecd852f$1$86e66aaf0e2459ed624f1e6a3e2c971d6121a01a', '', 1, 'tenant', '2019-12-16 13:21:23', 1, NULL, NULL, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_applications`
--

CREATE TABLE `user_applications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `application_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `application_categories`
--
ALTER TABLE `application_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `application_connectors`
--
ALTER TABLE `application_connectors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `application_types`
--
ALTER TABLE `application_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `group_applications`
--
ALTER TABLE `group_applications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `group_users`
--
ALTER TABLE `group_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `oauth_access_tokens_id_unique` (`id`),
  ADD KEY `oauth_client_id` (`client_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `oauth_authorization_codes`
--
ALTER TABLE `oauth_authorization_codes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `oauth_authorization_codes_id_unique` (`id`),
  ADD KEY `oauth_client_id` (`client_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `oauth_clients_id_unique` (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `oauth_refresh_tokens`
--
ALTER TABLE `oauth_refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `oauth_refresh_tokens_id_unique` (`id`),
  ADD KEY `client_id` (`client_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `oauth_scopes`
--
ALTER TABLE `oauth_scopes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `oauth_scopes_id_unique` (`id`);

--
-- Indexes for table `tenants`
--
ALTER TABLE `tenants`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tenant_id` (`tenant_id`);

--
-- Indexes for table `user_applications`
--
ALTER TABLE `user_applications`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applications`
--
ALTER TABLE `applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `application_categories`
--
ALTER TABLE `application_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `application_connectors`
--
ALTER TABLE `application_connectors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `application_types`
--
ALTER TABLE `application_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `group_applications`
--
ALTER TABLE `group_applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `group_users`
--
ALTER TABLE `group_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
  MODIFY `id` int(14) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=656;
--
-- AUTO_INCREMENT for table `oauth_authorization_codes`
--
ALTER TABLE `oauth_authorization_codes`
  MODIFY `id` int(14) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  MODIFY `id` int(14) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `oauth_refresh_tokens`
--
ALTER TABLE `oauth_refresh_tokens`
  MODIFY `id` int(14) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=656;
--
-- AUTO_INCREMENT for table `oauth_scopes`
--
ALTER TABLE `oauth_scopes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `tenants`
--
ALTER TABLE `tenants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT for table `user_applications`
--
ALTER TABLE `user_applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
  ADD CONSTRAINT `oauth_access_tokens_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `oauth_clients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `oauth_access_tokens_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `oauth_authorization_codes`
--
ALTER TABLE `oauth_authorization_codes`
  ADD CONSTRAINT `oauth_authorization_codes_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `oauth_clients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `oauth_authorization_codes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  ADD CONSTRAINT `oauth_clients_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `oauth_refresh_tokens`
--
ALTER TABLE `oauth_refresh_tokens`
  ADD CONSTRAINT `oauth_refresh_tokens_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `oauth_clients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `oauth_refresh_tokens_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
