-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: charity
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `charity`
--

DROP TABLE IF EXISTS `charity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `charity` (
  `charity_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(1000) DEFAULT NULL,
  `country` varchar(1000) DEFAULT NULL,
  `reg_number` varchar(1000) DEFAULT NULL,
  `total_raised` float DEFAULT '0',
  `merchant_id` varchar(1000) DEFAULT NULL,
  `about` varchar(1000) DEFAULT NULL,
  `social_link` varchar(1000) DEFAULT NULL,
  `target` float DEFAULT '0',
  `points` int DEFAULT '0',
  `email` varchar(1000) DEFAULT NULL,
  `password` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`charity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `charity`
--

LOCK TABLES `charity` WRITE;
/*!40000 ALTER TABLE `charity` DISABLE KEYS */;
INSERT INTO `charity` VALUES (1,'Save the Children','United Kingdom','213890',8692,'AXcsvVUaTUwjSSkgQhldpBeZohK9GzsSGamwdgTSKCi7_G6GpAILHsmDRvBK0zo0kFAhkvM5QnGZLGwh','The Save the Children Fund, commonly known as Save the Children, was established in the United Kingdom in 1919 to improve the lives of children through better education, health care, and economic opportunities, as well as providing emergency aid in natural disasters, war, and other conflicts.','https://www.savethechildren.org.uk/',25000,0,'savethechildren@gmail.com','$2b$10$5hd204wUq.//5p6SdG1HnuFLf1yHOFg1nblKNpF6E66CTA4eIV/bS'),(2,'WWF','United Kingdom','1081247',1800,'ATWL39l68w6Ij7gI5UHZiIlQSzdI2HnbhMdCsFO_ArB3dKKRhf7cPJzr_SfpZpm1FYwMBDRbzi9cSRNW','The World Wide Fund for Nature Inc. is an international non-governmental organization founded in 1961 that works in the field of wilderness preservation and the reduction of human impact on the environment.','https://www.wwf.org.uk/',2501,7,'wwf@gmail.com','$2b$10$eQb9a.7dQzzcfTg.Slw6BehdTYOC00CNsNblJzBKEUeCdY5xIykqe'),(3,'Penny Appeal','Turkey','1128341',0,'AXQzjQnavt7P5_bYKDf-NnBbpppXUfcA379arIllS0c4s5t0z7B9dAaqa9x0gmXKehHaU0LCOl8NpOnA','Penny Appeal was set up in 2009 to provide poverty relief across Asia, the Middle East, and Africa by offering water solutions, organising mass feedings, supporting orphan care and providing emergency food and medical aid.','https://pennyappeal.org/',9000,0,'pennyappeal@gmail.com','$2b$10$QzvOUVhZytDuHtVDa2RgWOtl9FRnFU5B1s9Z6QID4pKmSPlYCnZxS'),(14,'MATW','Australia','',0,'','Please donate to us!','Post some links towards personal websites',2000,1,'matw@gmail.com','$2b$10$ClmPfkC2QkhnHfp3dRvZc.1GCznFjHglnlTjAzuQbE6ViwwcOpsAa');
/*!40000 ALTER TABLE `charity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fundraiser`
--

DROP TABLE IF EXISTS `fundraiser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fundraiser` (
  `fundraiser_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(1000) DEFAULT NULL,
  `total_raised` float DEFAULT '0',
  `about` varchar(1000) DEFAULT NULL,
  `social_link` varchar(1000) DEFAULT NULL,
  `target` float DEFAULT '0',
  `merchant_id` varchar(1000) DEFAULT NULL,
  `individual_owner_id` int DEFAULT '0',
  `enabled` int DEFAULT '0',
  PRIMARY KEY (`fundraiser_id`),
  KEY `individual_owner_id_idx` (`individual_owner_id`),
  CONSTRAINT `individual_owner_id` FOREIGN KEY (`individual_owner_id`) REFERENCES `individual` (`individual_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fundraiser`
--

LOCK TABLES `fundraiser` WRITE;
/*!40000 ALTER TABLE `fundraiser` DISABLE KEYS */;
INSERT INTO `fundraiser` VALUES (1,'Covid-19  Fund',0,'I am a 25 year old man trying to raise money for people suffering from covid-19 around the world. My aim is to try and deliver oxygen tanks to the deprived and those who cannot afford it.','https://covidaidcharity.org/',1001,'AXcsvVUaTUwjSSkgQhldpBeZohK9GzsSGamwdgTSKCi7_G6GpAILHsmDRvBK0zo0kFAhkvM5QnGZLGwh',16,1),(2,'Palestine Fund',42,'Free Palestine','https://www.palestinecampaign.org/',1500,'ATWL39l68w6Ij7gI5UHZiIlQSzdI2HnbhMdCsFO_ArB3dKKRhf7cPJzr_SfpZpm1FYwMBDRbzi9cSRNW',17,1),(3,'Ooga Booga Fund',62,'I like to dance fund','https://www.google.com',150,'ATWL39l68w6Ij7gI5UHZiIlQSzdI2HnbhMdCsFO_ArB3dKKRhf7cPJzr_SfpZpm1FYwMBDRbzi9cSRNW',19,1);
/*!40000 ALTER TABLE `fundraiser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `fundraiserowner`
--

DROP TABLE IF EXISTS `fundraiserowner`;
/*!50001 DROP VIEW IF EXISTS `fundraiserowner`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `fundraiserowner` AS SELECT 
 1 AS `fundraiser_id`,
 1 AS `name`,
 1 AS `about`,
 1 AS `total_raised`,
 1 AS `social_link`,
 1 AS `target`,
 1 AS `merchant_id`,
 1 AS `enabled`,
 1 AS `individual_owner_id`,
 1 AS `first_name`,
 1 AS `last_name`,
 1 AS `email`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `indicharityteam`
--

DROP TABLE IF EXISTS `indicharityteam`;
/*!50001 DROP VIEW IF EXISTS `indicharityteam`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `indicharityteam` AS SELECT 
 1 AS `charity_id`,
 1 AS `name`,
 1 AS `points`,
 1 AS `individual_id`,
 1 AS `first_name`,
 1 AS `last_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `indiprofiledashboardtofund`
--

DROP TABLE IF EXISTS `indiprofiledashboardtofund`;
/*!50001 DROP VIEW IF EXISTS `indiprofiledashboardtofund`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `indiprofiledashboardtofund` AS SELECT 
 1 AS `individual_id`,
 1 AS `first_name`,
 1 AS `last_name`,
 1 AS `email`,
 1 AS `total_donated`,
 1 AS `fundraiser_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `individual`
--

DROP TABLE IF EXISTS `individual`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `individual` (
  `individual_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(1000) DEFAULT NULL,
  `last_name` varchar(1000) DEFAULT NULL,
  `email` varchar(1000) DEFAULT NULL,
  `password` varchar(1000) DEFAULT NULL,
  `total_donated` float DEFAULT '0',
  `charity_represent_id` int DEFAULT NULL,
  PRIMARY KEY (`individual_id`),
  KEY `charity_represent_id_idx` (`charity_represent_id`),
  CONSTRAINT `charity_represent_id` FOREIGN KEY (`charity_represent_id`) REFERENCES `charity` (`charity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `individual`
--

LOCK TABLES `individual` WRITE;
/*!40000 ALTER TABLE `individual` DISABLE KEYS */;
INSERT INTO `individual` VALUES (16,'Sahir','Ahmed','sahir-ahmed@gmail.com','$2b$10$OxlyWaCaIxfL/FB129e7s.jbXL.Y4Z7Ehl6n/tVjWJhkI9aKy7QpK',260,3),(17,'John','Doe','john-doe@gmail.com','$2b$10$O5cR8dBXWjYfKu48YqtkPueP1qgCVFWf00HlGXS8f77ak2Oihw2eK',0,2),(19,'James','Donald','james-donald@gmail.com','$2b$10$TJlnTbeAmiO2HE2u0WTXlOhsEJhF4qxJCdzbym98EeV84gZj6lSCm',0,2);
/*!40000 ALTER TABLE `individual` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz`
--

DROP TABLE IF EXISTS `quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz` (
  `quiz_id` int NOT NULL AUTO_INCREMENT,
  `question` varchar(1000) DEFAULT NULL,
  `correct_option` varchar(1000) DEFAULT NULL,
  `option1` varchar(1000) DEFAULT NULL,
  `option2` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`quiz_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz`
--

LOCK TABLES `quiz` WRITE;
/*!40000 ALTER TABLE `quiz` DISABLE KEYS */;
INSERT INTO `quiz` VALUES (1,'Oxfam is famous worldwide for its humanitarian acts. It was established in order to combat famine in which country in particular?','Greece','Ethiopia','Greece'),(2,'Ten Welsh businessmen established a charity in 1943 that is now world-renowned for its work in cancer research. What is it called?','Tenovus','Tenovus','Wales Against Cancer'),(3,'The name of the body that regulates charities in the UK is the Charity Commission. True or False?','False','False','True'),(4,'The UK Voluntary Sector has an estimated turnover of how much per annum (answers in pounds sterling)?','10,000,000,000','10,000,000','10,000,000,000'),(5,'Eton School, where the children of many of the richest people in the world are educated, enjoys UK tax relief as a result of its charitable status. True or False?','True','True','False'),(6,'According to 1999 figures, which commercial organisation was the largest contributor to charity, voluntary, and community activities?','Lloyds TSB','British Telecom','Lloyds TSB'),(7,'One of the largest UK charities is Scope. What did it used to be called?','The Spastics Society','The Spastics Society','Outward Bound Challenge'),(8,'UK Charities are exempt from all of the following taxes except one. Which one?','VAT','VAT','Corporation Tax'),(9,'The basic principles of charity law in England and Wales date back to the reign of which monarch?','Elizabeth I','George III','Elizabeth I'),(10,'Created in 1946, this branch of the United Nations has provided food, healthcare and education to children in developing nations. Children may carry orange boxes on Halloween to collect donations for this charity, known chiefly by an acronym.','UNICEF','UNICEF','UNESCO'),(11,'In order to receive a house built by Habitat for Humanity, healthy recipients must help with building a house.','True','False','True'),(12,'The name \"Greenpeace\" refers to the two main goals of the organization - protecting the earth and promoting peace. Their many \"green\" efforts towards ecological preservation are widely known - they try to save endangered species, reduce consumption, save rainforests and prevent global warming. What is the main focus of their \"peace\" efforts?','Nuclear disarmament','Releasing Hostages','Nuclear disarmament'),(13,'Which of the following general rules of trust validity applies to a trust even if it is charitable?','The need for certainty of subject matter.','The need for certainty of subject matter.','The need for an identifiable beneficiary.'),(14,'Which of the following is not a function of the Charity Commission within The Charities Act 2006 (as consolidated by the Charities Act 2011)?','Defining new categories of charitable purpose.','Determining whether institutions are or are not charities.','Defining new categories of charitable purpose.'),(15,'Which of the following purposes is not a charitable purpose expressly listed in the Charities Act 2006 (as consolidated by the Charities Act 2011)?','The promotion of marriage and family life.','The promotion of equality and diversity.','The promotion of marriage and family life.');
/*!40000 ALTER TABLE `quiz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_fname` varchar(100) DEFAULT NULL,
  `user_lname` varchar(100) DEFAULT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_password` varchar(200) NOT NULL,
  `c_name` varchar(200) DEFAULT NULL,
  `c_country` varchar(200) DEFAULT NULL,
  `c_reg_number` varchar(200) DEFAULT NULL,
  `is_charity` tinyint DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_email_UNIQUE` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,NULL,NULL,'','$2b$10$n1p71XscdqwGpbA3aB3d8Oen4BHW5iWFTUbGKNqjTfrkjs5EOuhqK','','','',1),(4,'test12','test12','test12@gmail.com','$2b$10$A9Ev0ou.AWmAdf1Kc1eVc.49icMndfbWJ5zasDqohtfCqAFC86tmi',NULL,NULL,NULL,0),(5,'undefined','undefined','undefined','$2b$10$uuof9rmm9doq5uOM40mFnu5.BuqlLtkCmTBkrUvvzNEy2rdC4ZmOy',NULL,NULL,NULL,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `fundraiserowner`
--

/*!50001 DROP VIEW IF EXISTS `fundraiserowner`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `fundraiserowner` AS select `f`.`fundraiser_id` AS `fundraiser_id`,`f`.`name` AS `name`,`f`.`about` AS `about`,`f`.`total_raised` AS `total_raised`,`f`.`social_link` AS `social_link`,`f`.`target` AS `target`,`f`.`merchant_id` AS `merchant_id`,`f`.`enabled` AS `enabled`,`f`.`individual_owner_id` AS `individual_owner_id`,`i`.`first_name` AS `first_name`,`i`.`last_name` AS `last_name`,`i`.`email` AS `email` from (`fundraiser` `f` join `individual` `i`) where (`f`.`individual_owner_id` = `i`.`individual_id`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `indicharityteam`
--

/*!50001 DROP VIEW IF EXISTS `indicharityteam`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `indicharityteam` AS select `c`.`charity_id` AS `charity_id`,`c`.`name` AS `name`,`c`.`points` AS `points`,`i`.`individual_id` AS `individual_id`,`i`.`first_name` AS `first_name`,`i`.`last_name` AS `last_name` from (`individual` `i` join `charity` `c`) where (`i`.`charity_represent_id` = `c`.`charity_id`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `indiprofiledashboardtofund`
--

/*!50001 DROP VIEW IF EXISTS `indiprofiledashboardtofund`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `indiprofiledashboardtofund` AS select `i`.`individual_id` AS `individual_id`,`i`.`first_name` AS `first_name`,`i`.`last_name` AS `last_name`,`i`.`email` AS `email`,`i`.`total_donated` AS `total_donated`,`f`.`fundraiser_id` AS `fundraiser_id` from (`individual` `i` join `fundraiser` `f`) where (`i`.`individual_id` = `f`.`individual_owner_id`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-28 17:19:42
