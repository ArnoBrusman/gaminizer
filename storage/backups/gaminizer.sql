/*
Navicat MySQL Data Transfer

Source Server         : Local
Source Server Version : 100113
Source Host           : localhost:3306
Source Database       : gaminizer

Target Server Type    : MYSQL
Target Server Version : 100113
File Encoding         : 65001

Date: 2016-08-23 18:33:10
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for gaminizer_ability_scores
-- ----------------------------
DROP TABLE IF EXISTS `gaminizer_ability_scores`;
CREATE TABLE `gaminizer_ability_scores` (
  `id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` mediumtext
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of gaminizer_ability_scores
-- ----------------------------

-- ----------------------------
-- Table structure for gaminizer_action
-- ----------------------------
DROP TABLE IF EXISTS `gaminizer_action`;
CREATE TABLE `gaminizer_action` (
  `id` int(11) NOT NULL,
  `actionable_id` int(11) NOT NULL,
  `actionable_type` int(11) NOT NULL,
  `uses` int(11) NOT NULL,
  `recharge` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of gaminizer_action
-- ----------------------------

-- ----------------------------
-- Table structure for gaminizer_classes
-- ----------------------------
DROP TABLE IF EXISTS `gaminizer_classes`;
CREATE TABLE `gaminizer_classes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `hit_die` varchar(45) DEFAULT NULL,
  `caster_type` set('full','half','quarter','') DEFAULT NULL,
  `spell_ability` varchar(45) DEFAULT NULL,
  `core` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ID_UNIQUE` (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of gaminizer_classes
-- ----------------------------
INSERT INTO `gaminizer_classes` VALUES ('1', 'Paladin', '1d10', 'half', 'CHA', '0');
INSERT INTO `gaminizer_classes` VALUES ('2', 'Bard', '8', 'full', 'CHA', '0');
INSERT INTO `gaminizer_classes` VALUES ('3', 'Cleric', '8', 'full', 'WIS', '0');
INSERT INTO `gaminizer_classes` VALUES ('4', 'Druid', '8', 'full', 'WIS', '0');
INSERT INTO `gaminizer_classes` VALUES ('5', 'Fighter', '10', '', '', '0');
INSERT INTO `gaminizer_classes` VALUES ('6', 'Monk', '10', null, null, '0');
INSERT INTO `gaminizer_classes` VALUES ('7', 'Barbarian', '12', '', '', '0');
INSERT INTO `gaminizer_classes` VALUES ('8', 'Ranger', '10', 'half', 'WIS', '0');
INSERT INTO `gaminizer_classes` VALUES ('9', 'Rogue', '8', '', '', '0');
INSERT INTO `gaminizer_classes` VALUES ('10', 'Sorcerer', '6', 'full', 'CHA', '0');
INSERT INTO `gaminizer_classes` VALUES ('11', 'Warlock', '8', null, 'CHA', '0');
INSERT INTO `gaminizer_classes` VALUES ('12', 'Wizard', '6', 'full', 'INT', '0');

-- ----------------------------
-- Table structure for gaminizer_class_features
-- ----------------------------
DROP TABLE IF EXISTS `gaminizer_class_features`;
CREATE TABLE `gaminizer_class_features` (
  `id` int(11) DEFAULT NULL,
  `class_id` int(11) DEFAULT NULL,
  `feature_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of gaminizer_class_features
-- ----------------------------

-- ----------------------------
-- Table structure for gaminizer_feats
-- ----------------------------
DROP TABLE IF EXISTS `gaminizer_feats`;
CREATE TABLE `gaminizer_feats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `prerequisites` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of gaminizer_feats
-- ----------------------------

-- ----------------------------
-- Table structure for gaminizer_features
-- ----------------------------
DROP TABLE IF EXISTS `gaminizer_features`;
CREATE TABLE `gaminizer_features` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `featureable_id` int(11) NOT NULL,
  `featureable_type` varchar(255) NOT NULL,
  `description` mediumtext,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of gaminizer_features
-- ----------------------------
INSERT INTO `gaminizer_features` VALUES ('1', 'Common', 'LNG', '0', '0', '');
INSERT INTO `gaminizer_features` VALUES ('2', 'Dwarven', 'LNG', '0', '0', '');
INSERT INTO `gaminizer_features` VALUES ('3', 'paladin lvl1 spells', 'SPL', '1', 'Gaminizer\\SpellsFeature', 'paladin got mad splzz');
INSERT INTO `gaminizer_features` VALUES ('4', 'paladin lvl2 spells', 'SPL', '2', 'Gaminizer\\SpellsFeature', 'paladin got mad splzz');
INSERT INTO `gaminizer_features` VALUES ('5', 'Lay on Hands', 'ACT', '0', '0', 'Your blessed touch can heal wounds. You have a pool of healing pow er that replenishes when you take a long rest. With that pool, you can restore a total number of hit points equal to your paladin level x  5.\r\nAs an action, you can touch a creature and draw power from the pool to restore a number of hit points to that creature, up to the maximum amount remaining in your pool.\r\nAlternatively, you can expend 5 hit points from your pool of healing to cure the target of one disease or neutralize one poison affecting it. You can cure multiple diseases and neutralize multiple poisons with a single use of Lay on Hands, expending hit points separately for each one.\r\nThis feature has no effect on undead and constructs.');

-- ----------------------------
-- Table structure for gaminizer_feat_features
-- ----------------------------
DROP TABLE IF EXISTS `gaminizer_feat_features`;
CREATE TABLE `gaminizer_feat_features` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `feat_id` int(11) DEFAULT NULL,
  `feature_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of gaminizer_feat_features
-- ----------------------------

-- ----------------------------
-- Table structure for gaminizer_items
-- ----------------------------
DROP TABLE IF EXISTS `gaminizer_items`;
CREATE TABLE `gaminizer_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `core` int(11) NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  `weight` int(11) DEFAULT NULL,
  `value` int(11) DEFAULT NULL,
  `description` mediumtext,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of gaminizer_items
-- ----------------------------
INSERT INTO `gaminizer_items` VALUES ('1', 'longsword', '0', 'WPN', '3', '15', 'A sword that is long');

-- ----------------------------
-- Table structure for gaminizer_narratives
-- ----------------------------
DROP TABLE IF EXISTS `gaminizer_narratives`;
CREATE TABLE `gaminizer_narratives` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `oddity` int(11) NOT NULL,
  `description` mediumtext,
  `description_short` varchar(255) NOT NULL,
  `parent_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of gaminizer_narratives
-- ----------------------------
INSERT INTO `gaminizer_narratives` VALUES ('1', 'Free Blade', '0', '<p>Mercenary, wanderer, outlaw, fortune-hunter, freebooter—\nthe cities of Thule are full of hard-nosed\nadventurers ready to earn a living with a strong\nsword-hand. Monarchs and nobles are always looking\nfor skilled soldiers, merchants need bodyguards, and\nforgotten treasures lie waiting for the audacious explorer\nbold enough to dare deadly jungles and cursed\nruins and claim them. The free blade is a true soldier\nof fortune, a sell-sword who may try out a dozen different\ncareers as he or she searches for that one bold\nstroke that might make a mercenary into a lord . . . or\neven a king.</p>\n<p>Whether you’re a professional mercenary with a\ncareful eye for the odds or a bored barbarian looking\nfor adventure, you keep your sword loose in the\nscabbard and your coinpurse where you can see it.</p>\n<p>You’re ambitious, resourceful, and pragmatic—all\nthe gold in the world is worthless to a dead man.\nAbove all, you are a great believer in the power\nof opportunity. No matter where you are or what\nyou’re doing, you never stop looking for your next\nbig chance. If it involves making enemies or breaking\nlaws, so be it.</p>\n<p>Fighting skill is the stock in trade of the free\nblade—anyone following this path must be handy\nwith weapons and willing to fight for pay. Free\nblades come from almost any culture or background.\nSome are wandering barbarians, some are\ndesperate street thugs trying to get ahead, and a few\nare highborn swordsmen or swordswomen forced by\nfamily circumstances to carve out their own place in\nthe world. Even nonhumans such as dwarven mercenaries\nor elven duelists are found in this opportunistic\ntrade.</p>', 'Freebooter or mercenary', '0');
INSERT INTO `gaminizer_narratives` VALUES ('2', 'Jungle Trader ', '0', '<p>Someone’s got to get Imystrahli pearls to Katagia,\r\nor find a new source of rare iron alloys now that\r\nKal-Zinan has closed its gates. That someone is\r\nyou. You’re willing to crisscross the continent, brave\r\nsavage monsters, and overcome countless obstacles,\r\nas long as the balance sheet is black at journey’s end.</p>\r\n<p>Lots of people call themselves “traders” or “merchants” in Thule, but you don’t have much in\r\ncommon with the farmer bringing his vegetables\r\ndownriver or the wagoneer selling ceramic pots from\r\nvillage to village. You favor high-margin cargoes and\r\ndangerous routes. You’re also comfortable with speculation—you’ll observe a shortage and buy (or otherwise “acquire”) the available supply. Everything from\r\nspices to silks to alchemical reagents to magic-imbued materials is in your hands just long enough for\r\nyou to get it to the buyer and collect your profit.</p>\r\n<p>The narrative is named Jungle Trader, but you’ll\r\ngo anywhere in search of a profitable gap between\r\nsupply and demand. That means classes with a predilection for travel (such as rangers, rogues, and bards)\r\nare suited for the trader’s life. Really, though, if you\r\nlike money, life as a jungle trader should hold at least\r\nsome appeal.</p>', 'Resourceful explorer and caravan leader', '0');

-- ----------------------------
-- Table structure for gaminizer_narrative_classes
-- ----------------------------
DROP TABLE IF EXISTS `gaminizer_narrative_classes`;
CREATE TABLE `gaminizer_narrative_classes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `narrative_id` int(11) NOT NULL,
  `classes_id` int(11) NOT NULL,
  `oddity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `narrative_id` (`narrative_id`),
  KEY `classes_id` (`classes_id`),
  CONSTRAINT `gaminizer_narrative_classes_ibfk_1` FOREIGN KEY (`narrative_id`) REFERENCES `gaminizer_narratives` (`ID`),
  CONSTRAINT `gaminizer_narrative_classes_ibfk_2` FOREIGN KEY (`classes_id`) REFERENCES `gaminizer_classes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of gaminizer_narrative_classes
-- ----------------------------
INSERT INTO `gaminizer_narrative_classes` VALUES ('1', '1', '7', '0');
INSERT INTO `gaminizer_narrative_classes` VALUES ('2', '1', '5', '0');
INSERT INTO `gaminizer_narrative_classes` VALUES ('3', '1', '9', '0');
INSERT INTO `gaminizer_narrative_classes` VALUES ('4', '2', '9', '0');
INSERT INTO `gaminizer_narrative_classes` VALUES ('5', '2', '5', '0');
INSERT INTO `gaminizer_narrative_classes` VALUES ('6', '2', '2', '1');
INSERT INTO `gaminizer_narrative_classes` VALUES ('7', '2', '8', '1');
INSERT INTO `gaminizer_narrative_classes` VALUES ('8', '1', '8', '1');

-- ----------------------------
-- Table structure for gaminizer_narrative_features
-- ----------------------------
DROP TABLE IF EXISTS `gaminizer_narrative_features`;
CREATE TABLE `gaminizer_narrative_features` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `narrative_id` int(11) NOT NULL,
  `feature_id` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `narrative_id` (`narrative_id`),
  KEY `feature_id` (`feature_id`),
  CONSTRAINT `gaminizer_narrative_features_ibfk_1` FOREIGN KEY (`narrative_id`) REFERENCES `gaminizer_narratives` (`ID`),
  CONSTRAINT `gaminizer_narrative_features_ibfk_2` FOREIGN KEY (`feature_id`) REFERENCES `gaminizer_features` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of gaminizer_narrative_features
-- ----------------------------

-- ----------------------------
-- Table structure for gaminizer_narrative_races
-- ----------------------------
DROP TABLE IF EXISTS `gaminizer_narrative_races`;
CREATE TABLE `gaminizer_narrative_races` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `narrative_id` int(11) NOT NULL,
  `race_id` int(11) NOT NULL,
  `oddity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `narrative_id` (`narrative_id`),
  KEY `race_id` (`race_id`),
  CONSTRAINT `gaminizer_narrative_races_ibfk_1` FOREIGN KEY (`narrative_id`) REFERENCES `gaminizer_narratives` (`ID`),
  CONSTRAINT `gaminizer_narrative_races_ibfk_2` FOREIGN KEY (`race_id`) REFERENCES `gaminizer_races` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of gaminizer_narrative_races
-- ----------------------------

-- ----------------------------
-- Table structure for gaminizer_pc
-- ----------------------------
DROP TABLE IF EXISTS `gaminizer_pc`;
CREATE TABLE `gaminizer_pc` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `experience` int(45) DEFAULT NULL,
  `race_id` int(11) NOT NULL,
  `description` mediumtext,
  PRIMARY KEY (`id`),
  KEY `fk_player_character_race1_idx` (`race_id`),
  CONSTRAINT `fk_player_character_race1` FOREIGN KEY (`race_id`) REFERENCES `gaminizer_races` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of gaminizer_pc
-- ----------------------------
INSERT INTO `gaminizer_pc` VALUES ('1', 'Grindar', '33265', '1', null);

-- ----------------------------
-- Table structure for gaminizer_pc_actions
-- ----------------------------
DROP TABLE IF EXISTS `gaminizer_pc_actions`;
CREATE TABLE `gaminizer_pc_actions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `actionfeature_id` int(11) DEFAULT NULL,
  `granter_id` int(11) DEFAULT NULL,
  `granter_type` varchar(255) DEFAULT NULL,
  `uses` int(255) DEFAULT NULL,
  `used` int(255) DEFAULT NULL,
  `recharge` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of gaminizer_pc_actions
-- ----------------------------

-- ----------------------------
-- Table structure for gaminizer_pc_classes
-- ----------------------------
DROP TABLE IF EXISTS `gaminizer_pc_classes`;
CREATE TABLE `gaminizer_pc_classes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pc_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `level` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_ids` (`pc_id`,`class_id`),
  KEY `fk_pc_classes_player_character1_idx` (`pc_id`),
  KEY `fk_pc_classes_class1_idx` (`class_id`),
  CONSTRAINT `fk_pc_classes_class1` FOREIGN KEY (`class_id`) REFERENCES `gaminizer_classes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_pc_classes_player_character1` FOREIGN KEY (`pc_id`) REFERENCES `gaminizer_pc` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of gaminizer_pc_classes
-- ----------------------------
INSERT INTO `gaminizer_pc_classes` VALUES ('1', '1', '1', '7');

-- ----------------------------
-- Table structure for gaminizer_pc_features
-- ----------------------------
DROP TABLE IF EXISTS `gaminizer_pc_features`;
CREATE TABLE `gaminizer_pc_features` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pc_id` int(11) NOT NULL,
  `feature_id` int(11) NOT NULL,
  `name` mediumtext,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_natural` (`pc_id`,`feature_id`),
  KEY `fk_pc_features_player_character1_idx` (`pc_id`),
  KEY `fk_pc_features_feature1_idx` (`feature_id`),
  CONSTRAINT `fk_pc_features_feature1` FOREIGN KEY (`feature_id`) REFERENCES `gaminizer_features` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_pc_features_player_character1` FOREIGN KEY (`pc_id`) REFERENCES `gaminizer_pc` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of gaminizer_pc_features
-- ----------------------------
INSERT INTO `gaminizer_pc_features` VALUES ('1', '1', '1', 'Humans speak common', null);
INSERT INTO `gaminizer_pc_features` VALUES ('2', '1', '2', 'You learned dwarven though your travels', null);
INSERT INTO `gaminizer_pc_features` VALUES ('3', '1', '3', null, null);
INSERT INTO `gaminizer_pc_features` VALUES ('4', '1', '4', null, null);
INSERT INTO `gaminizer_pc_features` VALUES ('5', '1', '5', null, null);

-- ----------------------------
-- Table structure for gaminizer_pc_narrative
-- ----------------------------
DROP TABLE IF EXISTS `gaminizer_pc_narrative`;
CREATE TABLE `gaminizer_pc_narrative` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `narrative_id` int(11) NOT NULL,
  `pc_id` int(11) NOT NULL,
  `p_description` mediumint(9) NOT NULL,
  `p_name` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_natural` (`narrative_id`,`pc_id`),
  KEY `fk_pc_narrative_player_character1_idx` (`pc_id`),
  CONSTRAINT `fk_pc_narrative_narrative1` FOREIGN KEY (`narrative_id`) REFERENCES `gaminizer_narratives` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_pc_narrative_player_character1` FOREIGN KEY (`pc_id`) REFERENCES `gaminizer_pc` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of gaminizer_pc_narrative
-- ----------------------------

-- ----------------------------
-- Table structure for gaminizer_pc_possessions
-- ----------------------------
DROP TABLE IF EXISTS `gaminizer_pc_possessions`;
CREATE TABLE `gaminizer_pc_possessions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pc_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `equiped` varchar(45) DEFAULT NULL,
  `carried` varchar(45) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `charges` int(11) DEFAULT NULL,
  `origin` mediumtext NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_natural` (`item_id`,`pc_id`),
  KEY `fk_pc_possesions_player_character1_idx` (`pc_id`),
  KEY `fk_pc_possesions_item1_idx` (`item_id`),
  CONSTRAINT `fk_pc_possesions_item1` FOREIGN KEY (`item_id`) REFERENCES `gaminizer_items` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_pc_possesions_player_character1` FOREIGN KEY (`pc_id`) REFERENCES `gaminizer_pc` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of gaminizer_pc_possessions
-- ----------------------------
INSERT INTO `gaminizer_pc_possessions` VALUES ('1', '1', '1', '1', '1', '1', '0', '');

-- ----------------------------
-- Table structure for gaminizer_pc_proficiencies
-- ----------------------------
DROP TABLE IF EXISTS `gaminizer_pc_proficiencies`;
CREATE TABLE `gaminizer_pc_proficiencies` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `pc_id` int(11) NOT NULL,
  `proficiency_id` int(11) NOT NULL,
  `origin` varchar(45) DEFAULT NULL,
  `expertise` binary(1) DEFAULT NULL,
  `granter_id` int(11) DEFAULT NULL,
  `granter_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `unique_natural` (`proficiency_id`,`pc_id`),
  KEY `fk_pc_proficiency_player_character_idx` (`pc_id`),
  KEY `fk_pc_proficiency_proficiency1_idx` (`proficiency_id`),
  CONSTRAINT `fk_pc_proficiency_player_character` FOREIGN KEY (`pc_id`) REFERENCES `gaminizer_pc` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_pc_proficiency_proficiency1` FOREIGN KEY (`proficiency_id`) REFERENCES `gaminizer_proficiencies` (`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of gaminizer_pc_proficiencies
-- ----------------------------

-- ----------------------------
-- Table structure for gaminizer_pc_spellslots
-- ----------------------------
DROP TABLE IF EXISTS `gaminizer_pc_spellslots`;
CREATE TABLE `gaminizer_pc_spellslots` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ammount` varchar(255) DEFAULT NULL,
  `spell_level` int(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of gaminizer_pc_spellslots
-- ----------------------------

-- ----------------------------
-- Table structure for gaminizer_pc_statmodifiers
-- ----------------------------
DROP TABLE IF EXISTS `gaminizer_pc_statmodifiers`;
CREATE TABLE `gaminizer_pc_statmodifiers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pc_id` int(11) NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  `override` varchar(45) DEFAULT NULL,
  `origin` varchar(255) DEFAULT NULL,
  `acquired` varchar(255) DEFAULT NULL,
  `value` int(11) NOT NULL,
  `granter_id` int(11) DEFAULT NULL,
  `granter_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pc_stats_player_character1_idx` (`pc_id`),
  KEY `type` (`type`,`pc_id`),
  CONSTRAINT `fk_pc_stats_player_character1` FOREIGN KEY (`pc_id`) REFERENCES `gaminizer_pc` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of gaminizer_pc_statmodifiers
-- ----------------------------
INSERT INTO `gaminizer_pc_statmodifiers` VALUES ('1', '1', 'AS_STR', null, 'Character Creation', '{\"acquired\":\"CC\"}', '16', null, null);
INSERT INTO `gaminizer_pc_statmodifiers` VALUES ('2', '1', 'AS_DEX', null, 'Character Creation', '{\"acquired\":\"CC\"}', '10', null, null);
INSERT INTO `gaminizer_pc_statmodifiers` VALUES ('3', '1', 'AS_CON', null, 'Character Creation', '{\"acquired\":\"CC\"}', '16', null, null);
INSERT INTO `gaminizer_pc_statmodifiers` VALUES ('4', '1', 'AS_INT', null, 'Character Creation', '{\"acquired\":\"CC\"}', '10', null, null);
INSERT INTO `gaminizer_pc_statmodifiers` VALUES ('5', '1', 'AS_WIS', null, 'Character Creation', '{\"acquired\":\"CC\"}', '12', null, null);
INSERT INTO `gaminizer_pc_statmodifiers` VALUES ('6', '1', 'AS_CHA', null, 'Character Creation', '{\"acquired\":\"CC\"}', '14', null, null);
INSERT INTO `gaminizer_pc_statmodifiers` VALUES ('7', '1', 'SPD_GRND', null, 'Race', 'RC', '30', null, null);
INSERT INTO `gaminizer_pc_statmodifiers` VALUES ('8', '1', 'HP_MAX', null, null, null, '63', null, null);
INSERT INTO `gaminizer_pc_statmodifiers` VALUES ('9', '1', 'HP_DMG', null, null, null, '6', null, null);
INSERT INTO `gaminizer_pc_statmodifiers` VALUES ('10', '1', 'HP_DMG', null, null, null, '8', null, null);
INSERT INTO `gaminizer_pc_statmodifiers` VALUES ('11', '1', 'HTD_10', null, null, null, '7', null, null);
INSERT INTO `gaminizer_pc_statmodifiers` VALUES ('13', '1', 'HTD_10_USD', null, null, null, '2', null, null);
INSERT INTO `gaminizer_pc_statmodifiers` VALUES ('14', '1', 'DTH_SCS', null, null, null, '2', null, null);

-- ----------------------------
-- Table structure for gaminizer_proficiencies
-- ----------------------------
DROP TABLE IF EXISTS `gaminizer_proficiencies`;
CREATE TABLE `gaminizer_proficiencies` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `description` mediumtext,
  `type` varchar(10) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of gaminizer_proficiencies
-- ----------------------------
INSERT INTO `gaminizer_proficiencies` VALUES ('1', 'Athletics', 'Your Strength (Athletics) check covers difficult situations you encounter while climbing, jumping, or swimming. ', 'CORE');
INSERT INTO `gaminizer_proficiencies` VALUES ('2', 'Riding', 'Your Strength (Riding) check covers difficult situations you encounter while on on a mount.', 'CORE');
INSERT INTO `gaminizer_proficiencies` VALUES ('3', 'Acrobatics', 'Your Dexterity (Acrobatics) check covers your attempt to stay on your feet in a tricky situation, such as when you’re trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship’s deck. ', 'CORE');
INSERT INTO `gaminizer_proficiencies` VALUES ('4', 'Paraphernalia', 'Your Dexterity (Acrobatics) check covers your attempts to use complex devices, like thieves tools, poisoners kits and alchemist kits.', 'CORE');
INSERT INTO `gaminizer_proficiencies` VALUES ('5', 'Stealth', 'Make a Dexterity (Stealth) check when you attempt to conceal yourself from enemies, slink past guards, slip away without being noticed, or sneak up on someone without being seen or heard.', 'CORE');
INSERT INTO `gaminizer_proficiencies` VALUES ('6', 'Investigation', 'Make a Intelligence (Investigation) check when you look around for clues and make deductions based on those clues.', 'CORE');
INSERT INTO `gaminizer_proficiencies` VALUES ('7', 'Travel', 'Make a Intelligence (Travel) check when you navigate paths through the world. A check can determine how fast you get where you want to go and how many resources were needed.', 'CORE');
INSERT INTO `gaminizer_proficiencies` VALUES ('8', 'Commune', 'Make a Wisdom (Commune) check when you commune with nature or the divine. It can be used to communicate with animals, spirits or deities through emotions. Creatures with high communing skills get feelings of foreboding quicker than others.', 'CORE');
INSERT INTO `gaminizer_proficiencies` VALUES ('9', 'Insight', 'Your Wisdom (Insight) check decides whether you can determine the true intentions of a creature, such as when searching out a lie or predicting someone’s next move.', 'CORE');
INSERT INTO `gaminizer_proficiencies` VALUES ('10', 'Perception', 'Your Wisdom (Perception) check lets you spot, hear, or otherwise detect the presence of something. It measures your general awareness of your surroundings and the keenness of your senses. ', 'CORE');
INSERT INTO `gaminizer_proficiencies` VALUES ('11', 'Survival', 'A Wisdom (Survival) check can be used to hunt wild game, gather natural resources or avoid quicksand and other natural hazards.', 'CORE');
INSERT INTO `gaminizer_proficiencies` VALUES ('12', 'Inspire', 'Inspire others into action.', 'CORE');
INSERT INTO `gaminizer_proficiencies` VALUES ('13', 'Manipulate', 'Change the feelings, actions or the intentions of others.', 'CORE');
INSERT INTO `gaminizer_proficiencies` VALUES ('14', 'Obscure', 'Hide your feelings, intention or actions from others.', 'CORE');

-- ----------------------------
-- Table structure for gaminizer_races
-- ----------------------------
DROP TABLE IF EXISTS `gaminizer_races`;
CREATE TABLE `gaminizer_races` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `core` int(11) NOT NULL,
  `description` mediumtext,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of gaminizer_races
-- ----------------------------
INSERT INTO `gaminizer_races` VALUES ('1', 'Human', '0', 'The typical human');

-- ----------------------------
-- Table structure for gaminizer_race_features
-- ----------------------------
DROP TABLE IF EXISTS `gaminizer_race_features`;
CREATE TABLE `gaminizer_race_features` (
  `id` int(11) DEFAULT NULL,
  `feature_id` int(11) DEFAULT NULL,
  `race_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of gaminizer_race_features
-- ----------------------------

-- ----------------------------
-- Table structure for gaminizer_spellcastingfeature
-- ----------------------------
DROP TABLE IF EXISTS `gaminizer_spellcastingfeature`;
CREATE TABLE `gaminizer_spellcastingfeature` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `feature_id` int(11) NOT NULL,
  `casting_ability` varchar(255) NOT NULL,
  `level` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `uses` int(255) DEFAULT NULL,
  `recharge` varchar(255) DEFAULT NULL,
  `known_calc` varchar(255) DEFAULT NULL,
  `prepared_calc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `feature_id` (`feature_id`) USING BTREE,
  CONSTRAINT `gaminizer_spellcastingfeature_ibfk_1` FOREIGN KEY (`feature_id`) REFERENCES `gaminizer_features` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of gaminizer_spellcastingfeature
-- ----------------------------
INSERT INTO `gaminizer_spellcastingfeature` VALUES ('1', '3', 'CHA', '1', 'SPSL', null, null, null, null);
INSERT INTO `gaminizer_spellcastingfeature` VALUES ('2', '4', 'CHA', '2', 'SPSL', null, null, null, null);

-- ----------------------------
-- Table structure for gaminizer_spellcastingfeature_spells
-- ----------------------------
DROP TABLE IF EXISTS `gaminizer_spellcastingfeature_spells`;
CREATE TABLE `gaminizer_spellcastingfeature_spells` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `feature_spells_id` int(11) NOT NULL,
  `spell_id` int(11) NOT NULL,
  `core` varchar(255) NOT NULL,
  `origin` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `feature_spells_id` (`feature_spells_id`),
  KEY `spell_id` (`spell_id`),
  CONSTRAINT `gaminizer_spellcastingfeature_spells_ibfk_1` FOREIGN KEY (`feature_spells_id`) REFERENCES `gaminizer_spellcastingfeature` (`ID`),
  CONSTRAINT `gaminizer_spellcastingfeature_spells_ibfk_2` FOREIGN KEY (`spell_id`) REFERENCES `gaminizer_spells` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of gaminizer_spellcastingfeature_spells
-- ----------------------------
INSERT INTO `gaminizer_spellcastingfeature_spells` VALUES ('1', '1', '1', '\0', '');
INSERT INTO `gaminizer_spellcastingfeature_spells` VALUES ('2', '2', '2', '\0', '');

-- ----------------------------
-- Table structure for gaminizer_spells
-- ----------------------------
DROP TABLE IF EXISTS `gaminizer_spells`;
CREATE TABLE `gaminizer_spells` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `core` int(11) NOT NULL,
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
  `description` mediumtext,
  PRIMARY KEY (`ID`),
  KEY `name` (`name`),
  KEY `level` (`level`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of gaminizer_spells
-- ----------------------------
INSERT INTO `gaminizer_spells` VALUES ('1', 'bless', '1', '0', 'enchantment', '1', 'action', '30', 'feet', 'VSM', 0x01, null, '1', 'minute', 'You bless ppl, yay');
INSERT INTO `gaminizer_spells` VALUES ('2', 'aid', '2', '0', 'abjuration', '1', 'feet', '30', 'feet', 'vsm', null, null, '8', 'hours', 'bless 3 allies');

-- ----------------------------
-- Table structure for gaminizer_stat_modifiers
-- ----------------------------
DROP TABLE IF EXISTS `gaminizer_stat_modifiers`;
CREATE TABLE `gaminizer_stat_modifiers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `score` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `override` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of gaminizer_stat_modifiers
-- ----------------------------

-- ----------------------------
-- Table structure for gaminizer_weapon
-- ----------------------------
DROP TABLE IF EXISTS `gaminizer_weapon`;
CREATE TABLE `gaminizer_weapon` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `item_id` int(11) NOT NULL,
  `finesse` tinyint(1) NOT NULL,
  `damage_dice` varchar(32) NOT NULL,
  `melee_range` int(11) NOT NULL,
  `short_range` int(11) NOT NULL,
  `long_range` int(11) NOT NULL,
  `type` varchar(32) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `gaminizer_weapon_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `gaminizer_items` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of gaminizer_weapon
-- ----------------------------
INSERT INTO `gaminizer_weapon` VALUES ('1', '1', '0', '1d8', '5', '0', '0', 'MRTL');

-- ----------------------------
-- Table structure for gaminizer_weapon_tags
-- ----------------------------
DROP TABLE IF EXISTS `gaminizer_weapon_tags`;
CREATE TABLE `gaminizer_weapon_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of gaminizer_weapon_tags
-- ----------------------------
SET FOREIGN_KEY_CHECKS=1;
