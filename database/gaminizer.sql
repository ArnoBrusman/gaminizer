-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 03, 2017 at 09:42 PM
-- Server version: 10.1.22-MariaDB
-- PHP Version: 7.0.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gaminizer`
--

-- --------------------------------------------------------

--
-- Table structure for table `ability_scores`
--

CREATE TABLE `ability_scores` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` mediumtext
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `actions`
--

CREATE TABLE `actions` (
  `id` int(11) UNSIGNED NOT NULL,
  `actionable_id` int(11) NOT NULL,
  `actionable_type` int(11) NOT NULL,
  `uses` int(11) NOT NULL,
  `recharge` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` mediumtext NOT NULL,
  `description_short` varchar(255) NOT NULL,
  `hit_die` varchar(45) DEFAULT NULL,
  `caster_type` set('full','half','quarter','') DEFAULT NULL,
  `spell_ability` varchar(45) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `type` varchar(45) NOT NULL DEFAULT 'CORE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`id`, `name`, `description`, `description_short`, `hit_die`, `caster_type`, `spell_ability`, `parent_id`, `type`) VALUES
(1, 'Paladin', '', 'A holy warrior bound to a sacred oath ', '1d10', 'half', 'AS_CHA', 0, 'CORE'),
(2, 'Mesmer', '', 'An inspiring magician with mastery of illusion and control.', '1d8', 'full', 'AS_CHA', 0, 'CORE'),
(3, 'Cleric', '', 'A priestly champion who wields divine magic in service of a higher power\n', '1d8', 'full', 'AS_WIS', 0, 'CORE'),
(4, 'Druid', '<p>A priest of the Old Faith, wielding the powers of nature— moonlight and plant growth, fire and lightning— and adopting animal forms.<br><br></p>', 'A priest of the Old Faith, wielding the powers of nature— moonlight and plant growth, fire and lightning— and adopting animal forms.\n', '8', 'full', 'AS_WIS', 0, 'CORE'),
(5, 'Fighter', '', ' A master of martial combat, skilled with a variety of weapons and armor.', '1d10', '', '', 0, 'CORE'),
(6, 'Monk', '', 'A master of martial arts, harnessing the power of the body in pursuit of physical and spiritual perfection.\n', '10', '', '', 0, 'CORE'),
(7, 'Barbarian', '', 'A fierce warrior of primitive background who can enter a battle rage.', '12', '', '', 0, 'CORE'),
(8, 'Ranger', '', 'A warrior who uses martial prowess and nature magic to combat threats on the edges of civilization.\n', '10', 'half', 'AS_WIS', 0, 'CORE'),
(9, 'Rogue', '', 'A scoundrel who uses stealth and trickery to overcome obstacles and enemies.\n', '8', '', '', 0, 'CORE'),
(10, 'Sorcerer', '', 'A spellcaster who draws on inherent magic from a gift or bloodline\n', '6', 'full', 'AS_CHA', 0, 'CORE'),
(11, 'Warlock', '', 'A wielder of magic that is derived from a bargain with an extraplanar entity', '8', '', 'AS_CHA', 0, 'CORE'),
(12, 'Wizard', '', 'A scholarly magic-user capable of manipulating the structures of reality.', '6', 'full', 'AS_INT', 0, 'CORE');

-- --------------------------------------------------------

--
-- Table structure for table `class_features`
--

CREATE TABLE `class_features` (
  `id` int(11) UNSIGNED NOT NULL,
  `class_id` int(11) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `feature_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `feats`
--

CREATE TABLE `feats` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `prerequisites` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `featureables`
--

CREATE TABLE `featureables` (
  `id` int(11) NOT NULL,
  `feature_id` int(11) NOT NULL,
  `featureable_id` int(11) NOT NULL,
  `featureable_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `featureables`
--

INSERT INTO `featureables` (`id`, `feature_id`, `featureable_id`, `featureable_type`) VALUES
(1, 3, 1, 'Gaminizer\\Spellcasting'),
(2, 4, 2, 'Gaminizer\\Spellcasting');

-- --------------------------------------------------------

--
-- Table structure for table `features`
--

CREATE TABLE `features` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `description` mediumtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `features`
--

INSERT INTO `features` (`id`, `name`, `type`, `description`) VALUES
(1, 'Common', 'LNG', ''),
(2, 'Dwarven', 'LNG', ''),
(3, 'paladin lvl1 spells', 'SPL', 'paladin got mad splzz'),
(4, 'paladin lvl2 spells', 'SPL', 'paladin got mad splzz'),
(5, 'Lay on Hands', 'ACT', 'Your blessed touch can heal wounds. You have a pool of healing pow er that replenishes when you take a long rest. With that pool, you can restore a total number of hit points equal to your paladin level x  5.\r\nAs an action, you can touch a creature and draw power from the pool to restore a number of hit points to that creature, up to the maximum amount remaining in your pool.\r\nAlternatively, you can expend 5 hit points from your pool of healing to cure the target of one disease or neutralize one poison affecting it. You can cure multiple diseases and neutralize multiple poisons with a single use of Lay on Hands, expending hit points separately for each one.\r\nThis feature has no effect on undead and constructs.'),
(7, 'Skill Bonuses', NULL, 'Your travels and business associations have provided you with a certain breadth\nof knowledge. You gain a bonus language selected from the following: High Atlantean, Dhari, Kalayan, Lomari, Nimothan, Urgan. You are also trained in Inspire.'),
(8, 'Opportunist', NULL, 'When you make an opportunity attack, you gain tactical advantage. Instead of making an opportunity attack, you can use a combat reaction to move up to your speed.'),
(9, 'Sellsword', NULL, 'Whenever you are paid gold for your services, you get 50% more gold. In addition, you gain tactical advantage on skill checks made to interact with mercenaries or other soldiers for hire.'),
(10, 'Company of Blades', NULL, 'You have worked for, with, and against many other sellswords and earned their respect. You now have a company of elite warriors at your call. The warriors of your company are equivalent to berserkers or <i>legionaries </i>you can choose which you prefer. When you reach 15th level, they improve to veterans.');

-- --------------------------------------------------------

--
-- Table structure for table `feat_features`
--

CREATE TABLE `feat_features` (
  `id` int(11) UNSIGNED NOT NULL,
  `feat_id` int(11) DEFAULT NULL,
  `feature_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `value` int(11) DEFAULT NULL,
  `description` mediumtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `name`, `type`, `weight`, `value`, `description`) VALUES
(1, 'longsword', 'WPN', 3, 15, 'A sword that is long');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`migration`, `batch`) VALUES
('2014_10_12_000000_create_users_table', 1),
('2014_10_12_100000_create_password_resets_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `narratives`
--

CREATE TABLE `narratives` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(45) NOT NULL,
  `oddity` int(11) NOT NULL,
  `description` mediumtext,
  `description_short` varchar(255) NOT NULL,
  `parent_id` int(11) NOT NULL,
  `type` varchar(45) NOT NULL DEFAULT 'CORE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `narratives`
--

INSERT INTO `narratives` (`id`, `name`, `oddity`, `description`, `description_short`, `parent_id`, `type`) VALUES
(1, 'Free Blade', 0, '<p>Mercenary, wanderer, outlaw, fortune-hunter, freebooter—\nthe cities of Thule are full of hard-nosed\nadventurers ready to earn a living with a strong\nsword-hand. Monarchs and nobles are always looking\nfor skilled soldiers, merchants need bodyguards, and\nforgotten treasures lie waiting for the audacious explorer\nbold enough to dare deadly jungles and cursed\nruins and claim them. The free blade is a true soldier\nof fortune, a sell-sword who may try out a dozen different\ncareers as he or she searches for that one bold\nstroke that might make a mercenary into a lord . . . or\neven a king.</p>\n<p>Whether you’re a professional mercenary with a\ncareful eye for the odds or a bored barbarian looking\nfor adventure, you keep your sword loose in the\nscabbard and your coinpurse where you can see it.</p>\n<p>You’re ambitious, resourceful, and pragmatic—all\nthe gold in the world is worthless to a dead man.\nAbove all, you are a great believer in the power\nof opportunity. No matter where you are or what\nyou’re doing, you never stop looking for your next\nbig chance. If it involves making enemies or breaking\nlaws, so be it.</p>\n<p>Fighting skill is the stock in trade of the free\nblade—anyone following this path must be handy\nwith weapons and willing to fight for pay. Free\nblades come from almost any culture or background.\nSome are wandering barbarians, some are\ndesperate street thugs trying to get ahead, and a few\nare highborn swordsmen or swordswomen forced by\nfamily circumstances to carve out their own place in\nthe world. Even nonhumans such as dwarven mercenaries\nor elven duelists are found in this opportunistic\ntrade.</p>', 'Freebooter or mercenary', 0, 'CORE'),
(2, 'Jungle Trader', 0, '<p>Someone’s got to get Imystrahli pearls to Katagia,\nor find a new source of rare iron alloys now that\nKal-Zinan has closed its gates. That someone is\nyou. You’re willing to crisscross the continent, brave\nsavage monsters, and overcome countless obstacles,\nas long as the balance sheet is black at journey’s end.</p>\n<p>Lots of people call themselves “traders” or “merchants” in Thule, but you don’t have much in\ncommon with the farmer bringing his vegetables\ndownriver or the wagoneer selling ceramic pots from\nvillage to village. You favor high-margin cargoes and\ndangerous routes. You’re also comfortable with speculation—you’ll observe a shortage and buy (or otherwise “acquire”) the available supply. Everything from\nspices to silks to alchemical reagents to magic-imbued materials is in your hands just long enough for\nyou to get it to the buyer and collect your profit.</p>\n<p>The narrative is named Jungle Trader, but you’ll\ngo anywhere in search of a profitable gap between\nsupply and demand. That means classes with a predilection for travel (such as rangers, rogues, and bards)\nare suited for the trader’s life. Really, though, if you\nlike money, life as a jungle trader should hold at least\nsome appeal.</p>', 'Resourceful explorer and caravan leader', 0, 'CORE'),
(17, 'New Narrative', 0, 'test', 'test', 0, 'CORE');

-- --------------------------------------------------------

--
-- Table structure for table `narrative_classes`
--

CREATE TABLE `narrative_classes` (
  `id` int(11) UNSIGNED NOT NULL,
  `narrative_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `oddity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `narrative_classes`
--

INSERT INTO `narrative_classes` (`id`, `narrative_id`, `class_id`, `oddity`) VALUES
(1, 1, 7, 0),
(2, 1, 5, 0),
(3, 1, 9, 0),
(4, 2, 9, 0),
(5, 2, 5, 0),
(6, 2, 2, 1),
(7, 2, 8, 1),
(8, 1, 8, 1),
(13, 17, 7, 0),
(14, 17, 4, 0);

-- --------------------------------------------------------

--
-- Table structure for table `narrative_features`
--

CREATE TABLE `narrative_features` (
  `id` int(11) UNSIGNED NOT NULL,
  `narrative_id` int(11) NOT NULL,
  `feature_id` int(11) NOT NULL,
  `level` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `narrative_features`
--

INSERT INTO `narrative_features` (`id`, `narrative_id`, `feature_id`, `level`) VALUES
(1, 17, 6, 2),
(2, 1, 7, 1),
(3, 1, 8, 1),
(4, 1, 9, 6),
(5, 1, 10, 10);

-- --------------------------------------------------------

--
-- Table structure for table `narrative_races`
--

CREATE TABLE `narrative_races` (
  `id` int(11) UNSIGNED NOT NULL,
  `narrative_id` int(11) NOT NULL,
  `race_id` int(11) NOT NULL,
  `oddity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `narrative_races`
--

INSERT INTO `narrative_races` (`id`, `narrative_id`, `race_id`, `oddity`) VALUES
(2, 17, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pcs`
--

CREATE TABLE `pcs` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(45) NOT NULL,
  `experience` int(45) DEFAULT NULL,
  `race_id` int(11) NOT NULL,
  `description` mediumtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pcs`
--

INSERT INTO `pcs` (`id`, `name`, `experience`, `race_id`, `description`) VALUES
(1, 'Grindar', 33265, 1, NULL),
(2, 'Player 2.1', NULL, 0, NULL),
(3, 'Player 3', NULL, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pc_actions`
--

CREATE TABLE `pc_actions` (
  `id` int(11) UNSIGNED NOT NULL,
  `actionfeature_id` int(11) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `granter_id` int(11) DEFAULT NULL,
  `granter_type` varchar(255) DEFAULT NULL,
  `uses` int(255) DEFAULT NULL,
  `used` int(255) DEFAULT NULL,
  `recharge` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `pc_classes`
--

CREATE TABLE `pc_classes` (
  `id` int(11) UNSIGNED NOT NULL,
  `pc_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `level` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pc_classes`
--

INSERT INTO `pc_classes` (`id`, `pc_id`, `class_id`, `level`) VALUES
(1, 1, 1, '7');

-- --------------------------------------------------------

--
-- Table structure for table `pc_features`
--

CREATE TABLE `pc_features` (
  `id` int(11) UNSIGNED NOT NULL,
  `pc_id` int(11) NOT NULL,
  `feature_id` int(11) NOT NULL,
  `feature_type` varchar(45) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pc_features`
--

INSERT INTO `pc_features` (`id`, `pc_id`, `feature_id`, `feature_type`, `name`, `description`) VALUES
(1, 1, 1, NULL, 'Humans speak common', NULL),
(2, 1, 2, NULL, 'You learned dwarven though your travels', NULL),
(3, 1, 3, NULL, NULL, NULL),
(4, 1, 4, NULL, NULL, NULL),
(5, 1, 5, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pc_narrative`
--

CREATE TABLE `pc_narrative` (
  `id` int(11) UNSIGNED NOT NULL,
  `narrative_id` int(11) NOT NULL,
  `pc_id` int(11) NOT NULL,
  `p_description` mediumint(9) NOT NULL,
  `p_name` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `pc_possessions`
--

CREATE TABLE `pc_possessions` (
  `id` int(11) UNSIGNED NOT NULL,
  `pc_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `status` varchar(45) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `description` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pc_possessions`
--

INSERT INTO `pc_possessions` (`id`, `pc_id`, `item_id`, `status`, `number`, `description`) VALUES
(1, 1, 1, 'equiped', 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `pc_proficiencies`
--

CREATE TABLE `pc_proficiencies` (
  `id` int(11) UNSIGNED NOT NULL,
  `pc_id` int(11) NOT NULL,
  `proficiency_id` int(11) NOT NULL,
  `expertise` binary(1) DEFAULT NULL,
  `granter_id` int(11) DEFAULT NULL,
  `granter_name` varchar(255) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `pc_spellslots`
--

CREATE TABLE `pc_spellslots` (
  `id` int(11) UNSIGNED NOT NULL,
  `pc_id` int(11) NOT NULL,
  `ammount` varchar(255) DEFAULT NULL,
  `spell_level` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `pc_statmodifiers`
--

CREATE TABLE `pc_statmodifiers` (
  `id` int(11) UNSIGNED NOT NULL,
  `pc_id` int(11) NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  `override` varchar(45) DEFAULT NULL,
  `value` int(11) NOT NULL,
  `granter_id` int(11) DEFAULT NULL,
  `granter_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pc_statmodifiers`
--

INSERT INTO `pc_statmodifiers` (`id`, `pc_id`, `type`, `override`, `value`, `granter_id`, `granter_name`) VALUES
(1, 1, 'AS_STR', NULL, 16, NULL, NULL),
(2, 1, 'AS_DEX', NULL, 10, NULL, NULL),
(3, 1, 'AS_CON', NULL, 16, NULL, NULL),
(4, 1, 'AS_INT', NULL, 10, NULL, NULL),
(5, 1, 'AS_WIS', NULL, 12, NULL, NULL),
(6, 1, 'AS_CHA', NULL, 14, NULL, NULL),
(7, 1, 'SPD_GRND', NULL, 30, NULL, NULL),
(8, 1, 'HP_MAX', NULL, 63, NULL, NULL),
(9, 1, 'HP_DMG', NULL, 6, NULL, NULL),
(10, 1, 'HP_DMG', NULL, 8, NULL, NULL),
(11, 1, 'HTD_10', NULL, 7, NULL, NULL),
(13, 1, 'HTD_10_USD', NULL, 2, NULL, NULL),
(14, 1, 'DTH_SCS', NULL, 2, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `proficiencies`
--

CREATE TABLE `proficiencies` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` mediumtext,
  `type` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `proficiencies`
--

INSERT INTO `proficiencies` (`id`, `name`, `description`, `type`) VALUES
(1, 'Athletics', 'Your Strength (Athletics) check covers difficult situations you encounter while climbing, jumping, or swimming. ', 'CORE'),
(2, 'Riding', 'Your Strength (Riding) check covers difficult situations you encounter while on on a mount.', 'CORE'),
(3, 'Acrobatics', 'Your Dexterity (Acrobatics) check covers your attempt to stay on your feet in a tricky situation, such as when you’re trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship’s deck. ', 'CORE'),
(4, 'Paraphernalia', 'Your Dexterity (Acrobatics) check covers your attempts to use complex devices, like thieves tools, poisoners kits and alchemist kits.', 'CORE'),
(5, 'Stealth', 'Make a Dexterity (Stealth) check when you attempt to conceal yourself from enemies, slink past guards, slip away without being noticed, or sneak up on someone without being seen or heard.', 'CORE'),
(6, 'Investigation', 'Make a Intelligence (Investigation) check when you look around for clues and make deductions based on those clues.', 'CORE'),
(7, 'Travel', 'Make a Intelligence (Travel) check when you navigate paths through the world. A check can determine how fast you get where you want to go and how many resources were needed.', 'CORE'),
(8, 'Commune', 'Make a Wisdom (Commune) check when you commune with nature or the divine. It can be used to communicate with animals, spirits or deities through emotions. Creatures with high communing skills get feelings of foreboding quicker than others.', 'CORE'),
(9, 'Insight', 'Your Wisdom (Insight) check decides whether you can determine the true intentions of a creature, such as when searching out a lie or predicting someone’s next move.', 'CORE'),
(10, 'Perception', 'Your Wisdom (Perception) check lets you spot, hear, or otherwise detect the presence of something. It measures your general awareness of your surroundings and the keenness of your senses. ', 'CORE'),
(11, 'Survival', 'A Wisdom (Survival) check can be used to hunt wild game, gather natural resources or avoid quicksand and other natural hazards.', 'CORE'),
(12, 'Inspire', 'Inspire others into action.', 'CORE'),
(13, 'Manipulate', 'Change the feelings, actions or the intentions of others.', 'CORE'),
(14, 'Obscure', 'Hide your feelings, intention or actions from others.', 'CORE');

-- --------------------------------------------------------

--
-- Table structure for table `races`
--

CREATE TABLE `races` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description_short` varchar(255) NOT NULL,
  `parent_id` int(11) NOT NULL,
  `type` varchar(45) NOT NULL DEFAULT 'CORE',
  `description` mediumtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `races`
--

INSERT INTO `races` (`id`, `name`, `description_short`, `parent_id`, `type`, `description`) VALUES
(1, 'Human', '', 0, 'CORE', 'The typical human');

-- --------------------------------------------------------

--
-- Table structure for table `race_features`
--

CREATE TABLE `race_features` (
  `id` int(11) DEFAULT NULL,
  `feature_id` int(11) DEFAULT NULL,
  `race_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `spellcastings`
--

CREATE TABLE `spellcastings` (
  `id` int(11) UNSIGNED NOT NULL,
  `casting_ability` varchar(255) NOT NULL,
  `level` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `uses` int(255) DEFAULT NULL,
  `recharge` varchar(255) DEFAULT NULL,
  `known_calc` varchar(255) DEFAULT NULL,
  `prepared_calc` varchar(255) DEFAULT NULL,
  `parent_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `spellcastings`
--

INSERT INTO `spellcastings` (`id`, `casting_ability`, `level`, `type`, `uses`, `recharge`, `known_calc`, `prepared_calc`, `parent_id`) VALUES
(1, 'CHA', 1, 'SPSL', NULL, NULL, NULL, NULL, 0),
(2, 'CHA', 2, 'SPSL', NULL, NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `spellcasting_spells`
--

CREATE TABLE `spellcasting_spells` (
  `id` int(11) UNSIGNED NOT NULL,
  `spellcastingfeature_id` int(11) NOT NULL,
  `spell_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `spellcasting_spells`
--

INSERT INTO `spellcasting_spells` (`id`, `spellcastingfeature_id`, `spell_id`) VALUES
(1, 1, 1),
(2, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `spells`
--

CREATE TABLE `spells` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `school` varchar(45) DEFAULT NULL,
  `casting_time` int(11) DEFAULT NULL,
  `casting_time_unit` varchar(45) DEFAULT NULL,
  `range` int(11) DEFAULT NULL,
  `range_unit` varchar(45) DEFAULT NULL,
  `components` varchar(45) DEFAULT NULL,
  `concentration` binary(1) DEFAULT NULL,
  `irreplaceable_components` varchar(45) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `duration_unit` varchar(45) NOT NULL,
  `description` mediumtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `spells`
--

INSERT INTO `spells` (`id`, `name`, `level`, `school`, `casting_time`, `casting_time_unit`, `range`, `range_unit`, `components`, `concentration`, `irreplaceable_components`, `duration`, `duration_unit`, `description`) VALUES
(1, 'bless', 1, 'enchantment', 1, 'action', 30, 'feet', 'VSM', 0x01, NULL, 1, 'minute', 'You bless ppl, yay'),
(2, 'aid', 2, 'abjuration', 1, 'feet', 30, 'feet', 'vsm', NULL, NULL, 8, 'hours', 'bless 3 allies');

-- --------------------------------------------------------

--
-- Table structure for table `stat_modifiers`
--

CREATE TABLE `stat_modifiers` (
  `id` int(11) UNSIGNED NOT NULL,
  `value` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `override` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `rights_group` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `remember_token`, `rights_group`) VALUES
(1, 'Grindar', '', NULL, 0),
(2, 'Grindarian', '$2y$10$lJSpv0eo4ZZXvBbnY7UH0.ROKrdEXNAm6W8fD0bWyM5kVHi99VIjC', 'LCT3lK1NAtg5v7av0VoXyrqWjwBFFOlfYlKGFBooWHQIeaTiDom37VgZnXyP', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `weapon`
--

CREATE TABLE `weapon` (
  `id` int(11) UNSIGNED NOT NULL,
  `melee_range` int(11) NOT NULL,
  `short_range` int(11) NOT NULL,
  `long_range` int(11) NOT NULL,
  `type` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `weapon`
--

INSERT INTO `weapon` (`id`, `melee_range`, `short_range`, `long_range`, `type`) VALUES
(1, 5, 0, 0, 'MRTL');

-- --------------------------------------------------------

--
-- Table structure for table `weapon_tags`
--

CREATE TABLE `weapon_tags` (
  `id` int(11) UNSIGNED NOT NULL,
  `tag` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ability_scores`
--
ALTER TABLE `ability_scores`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `actions`
--
ALTER TABLE `actions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `class_features`
--
ALTER TABLE `class_features`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feats`
--
ALTER TABLE `feats`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `featureables`
--
ALTER TABLE `featureables`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `features`
--
ALTER TABLE `features`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feat_features`
--
ALTER TABLE `feat_features`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `narratives`
--
ALTER TABLE `narratives`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `narrative_classes`
--
ALTER TABLE `narrative_classes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `narrative_features`
--
ALTER TABLE `narrative_features`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `narrative_races`
--
ALTER TABLE `narrative_races`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`),
  ADD KEY `password_resets_token_index` (`token`);

--
-- Indexes for table `pcs`
--
ALTER TABLE `pcs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pc_actions`
--
ALTER TABLE `pc_actions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pc_classes`
--
ALTER TABLE `pc_classes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pc_features`
--
ALTER TABLE `pc_features`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pc_narrative`
--
ALTER TABLE `pc_narrative`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pc_possessions`
--
ALTER TABLE `pc_possessions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pc_proficiencies`
--
ALTER TABLE `pc_proficiencies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pc_spellslots`
--
ALTER TABLE `pc_spellslots`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pc_statmodifiers`
--
ALTER TABLE `pc_statmodifiers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `proficiencies`
--
ALTER TABLE `proficiencies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `races`
--
ALTER TABLE `races`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `spellcastings`
--
ALTER TABLE `spellcastings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `spellcasting_spells`
--
ALTER TABLE `spellcasting_spells`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `spells`
--
ALTER TABLE `spells`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stat_modifiers`
--
ALTER TABLE `stat_modifiers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `weapon`
--
ALTER TABLE `weapon`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `weapon_tags`
--
ALTER TABLE `weapon_tags`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ability_scores`
--
ALTER TABLE `ability_scores`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `actions`
--
ALTER TABLE `actions`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `class_features`
--
ALTER TABLE `class_features`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `feats`
--
ALTER TABLE `feats`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `featureables`
--
ALTER TABLE `featureables`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `features`
--
ALTER TABLE `features`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `feat_features`
--
ALTER TABLE `feat_features`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `narratives`
--
ALTER TABLE `narratives`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `narrative_classes`
--
ALTER TABLE `narrative_classes`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `narrative_features`
--
ALTER TABLE `narrative_features`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `narrative_races`
--
ALTER TABLE `narrative_races`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `pcs`
--
ALTER TABLE `pcs`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `pc_actions`
--
ALTER TABLE `pc_actions`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `pc_classes`
--
ALTER TABLE `pc_classes`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `pc_features`
--
ALTER TABLE `pc_features`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `pc_narrative`
--
ALTER TABLE `pc_narrative`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `pc_possessions`
--
ALTER TABLE `pc_possessions`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `pc_proficiencies`
--
ALTER TABLE `pc_proficiencies`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `pc_spellslots`
--
ALTER TABLE `pc_spellslots`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `pc_statmodifiers`
--
ALTER TABLE `pc_statmodifiers`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `proficiencies`
--
ALTER TABLE `proficiencies`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `races`
--
ALTER TABLE `races`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `spellcastings`
--
ALTER TABLE `spellcastings`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `spellcasting_spells`
--
ALTER TABLE `spellcasting_spells`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `spells`
--
ALTER TABLE `spells`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `stat_modifiers`
--
ALTER TABLE `stat_modifiers`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `weapon`
--
ALTER TABLE `weapon`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `weapon_tags`
--
ALTER TABLE `weapon_tags`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
