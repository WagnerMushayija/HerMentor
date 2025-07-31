-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: hermentor_db
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `hermentor_db`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `hermentor_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `hermentor_db`;

--
-- Table structure for table `blogs`
--

DROP TABLE IF EXISTS `blogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blogs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mentor_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `excerpt` varchar(500) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `published` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `idx_blogs_mentor_id` (`mentor_id`),
  KEY `idx_blogs_published` (`published`),
  KEY `idx_blogs_created_at` (`created_at` DESC),
  KEY `idx_blogs_slug` (`slug`),
  CONSTRAINT `blogs_ibfk_1` FOREIGN KEY (`mentor_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogs`
--

LOCK TABLES `blogs` WRITE;
/*!40000 ALTER TABLE `blogs` DISABLE KEYS */;
INSERT INTO `blogs` VALUES (1,8,'I’m Losing All Trust in the AI Industry','I think the AI industry is facing a handful of urgent problems it’s not addressing adequately. I believe everything I write here is at least directionally true, but I could be wrong. My aim isn’t to be definitive, just to spark a conversation. What follows is a set of expanded thoughts on those problems, in no particular order.\n\nDisclaimer: Not everyone in AI is as bad as I’m making them sound. I’m flattening a wildly diverse field into a single tone, which is obviously reductive. People are different. Nobody reading this will see themselves in everything I say, and I don’t expect them to. My focus is mostly on the voices steering the public discourse. They have an overdimensioned impact on what the world feels and thinks about AI.\n\nSecond disclaimer: I want to express my frustrations with the industry as someone who would love to see it doing well. One thing is to alienate those who hate you—a hate that’s become louder and widespread over time—and a different thing to annoy those who don’t. I hold no grudge against AI as a technology nor as an industry, and that’s precisely why I’m writing this.',NULL,'I think the AI industry is facing a handful of urgent problems it’s not addressing adequately. I believe everything I write here is at least directionally true, but I could be wrong. My aim isn’t to b...','im-losing-all-trust-in-the-ai-industry',1,'2025-07-29 11:43:15','2025-07-29 11:43:15'),(2,3,'What is Sapient Intelligence & Hierarchical Reasoning Model (HRM) ?','In January, 2025 a little known AI startup called Sapient Intelligence, a Singapore-based AI startup providing a self-evolving AI model for problem-solving, raised $22M in Seed funding, raising its valuation to over $200m. They were sort of on my radar being the AI startup sleuth that I am.\n\nToday being a Singaporean AI Startup pretty much means that you are actually made up of AI talent from China.\n\nThey call themselves an “AGI research company” with headquarters in Singapore, with research centers in San Francisco and Beijing, building next-generation AI model for complex reasoning.\n\nSapient Intelligence is a provider of a self-evolving AI model designed for complex problem-solving.\n\nSapient Intelligence’s Hierarchical Reasoning Model (HRM) offers a powerful alternative to current CoT model training.',NULL,'In January, 2025 a little known AI startup called Sapient Intelligence, a Singapore-based AI startup providing a self-evolving AI model for problem-solving, raised $22M in Seed funding, raising its va...','what-is-sapient-intelligence-hierarchical-reasoning-model-hrm-',1,'2025-07-29 18:09:06','2025-07-29 18:09:06'),(3,3,'Healthy Stress The Creative\'s Guide to Thriving Under Pressure','Stress gets a bad rap, doesn’t it? But what if I told you that not all stress is the enemy? In fact, some stress—what I like to call healthy stress—is the unsung hero of our growth, creativity, and survival.\n\nHealthy stress is the kind that pushes you just enough to evolve without breaking you. It’s the gentle tension of knowing you have a deadline but still having the room to craft something meaningful. It’s waking up early to prioritize your errands, projects, or self-care, even when that snooze button is whispering your name. It\'s the fire that propels you forward, rather than burning you out.\n\nAs creatives, we thrive in this sweet spot. Think of a guitar string—too loose, and there’s no sound. Too tight, and it snaps. But when it’s perfectly tuned? That’s where the magic happens.',NULL,'Stress gets a bad rap, doesn’t it? But what if I told you that not all stress is the enemy? In fact, some stress—what I like to call healthy stress—is the unsung hero of our growth, creativity, and su...','healthy-stress-the-creatives-guide-to-thriving-under-pressure',1,'2025-07-29 19:17:57','2025-07-29 19:17:57'),(4,3,'Let Them Wonder About You','The most captivating moments for me are when I encounter someone or something extraordinary in real life and find myself wondering about them. Maybe it’s my instinct to romanticize everything, but I genuinely enjoy not having all the details. What has the age of hyper-access done to our creativity, individuality, and thoughtfulness? With the internet, we’re just a few clicks away from replicating someone’s entire persona, right down to their outfit or morning routine. In some ways, I feel like it\'s making us… dumber? Why exercise individuality or strengthen personal style when you can simply download someone else’s blueprint? What unnerves me is how comforting many people find this idea- a quick google search, a little DIY help from ChatGPT. Being “creative” now demands almost nothing from us.\n\nRemember when celebrities were illusive and mysterious? All we had were ‘90s, grainy paparazzi shots in People magazine. Now, celebrity culture is so omnipresent and meticulously curated by stylists, publicists, and managers that it feels sterile. It’s an illusion- one we’re constantly fed, leaving no room for genuine intrigue.',NULL,'The most captivating moments for me are when I encounter someone or something extraordinary in real life and find myself wondering about them. Maybe it’s my instinct to romanticize everything, but I g...','let-them-wonder-about-you',1,'2025-07-29 19:31:27','2025-07-29 19:31:27'),(5,3,'30 days is all you need to change your life','Half of 2025 is already gone.\n\nCan you believe that? Six months just flew by.\n\nBe honest — have you really done what you said you would?\n\nMost people haven’t.\n\nThey kicked off the year with big goals and fresh motivation. But life happened. Procrastination crept in. And now they’re back to the same old routine.\n\nIf that’s you, don’t beat yourself up. Seriously.\n\nIt’s not too late to make 2025 the year you actually change.\n\nForget the next six months for now. Just focus on the next 30 days.\n\nThis simple action plan will help you take real action, stay consistent, and build momentum that actually lasts.',NULL,'Half of 2025 is already gone.  Can you believe that? Six months just flew by.  Be honest — have you really done what you said you would?  Most people haven’t.  They kicked off the year with big goals...','30-days-is-all-you-need-to-change-your-life',1,'2025-07-30 09:55:12','2025-07-30 09:55:12'),(6,3,'Lucky? Or Just Well-Prepared? The Secret to Success No One Talks About','Maybe it’s that effortlessly cool girl who lands every opportunity, the busy parent who somehow balances it all, or the creative who makes success look easy. It’s tempting to call it luck, but let’s be real—luck has a lot more to do with preparation than people give it credit for.\n\nThat’s where The Richest Man in Babylon comes in. This classic book breaks down how wealth and success aren’t just for the chosen few—they’re for those who prepare for them. And honestly? That applies to everything in life, not just money. Let’s talk about why preparation is the real magic behind “lucky girl syndrome” and how you can use it to set yourself up for success in work, life, and everything in between.',NULL,'Maybe it’s that effortlessly cool girl who lands every opportunity, the busy parent who somehow balances it all, or the creative who makes success look easy. It’s tempting to call it luck, but let’s b...','lucky-or-just-well-prepared-the-secret-to-success-no-one-talks-about',1,'2025-07-30 10:25:55','2025-07-30 10:25:55');
/*!40000 ALTER TABLE `blogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_messages`
--

DROP TABLE IF EXISTS `contact_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_messages`
--

LOCK TABLES `contact_messages` WRITE;
/*!40000 ALTER TABLE `contact_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `contact_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meetings`
--

DROP TABLE IF EXISTS `meetings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meetings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mentorship_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `scheduled_date` datetime NOT NULL,
  `duration_minutes` int DEFAULT '60',
  `status` enum('scheduled','completed','cancelled') DEFAULT 'scheduled',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_meetings_mentorship_id` (`mentorship_id`),
  CONSTRAINT `meetings_ibfk_1` FOREIGN KEY (`mentorship_id`) REFERENCES `mentorships` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meetings`
--

LOCK TABLES `meetings` WRITE;
/*!40000 ALTER TABLE `meetings` DISABLE KEYS */;
/*!40000 ALTER TABLE `meetings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mentee_profiles`
--

DROP TABLE IF EXISTS `mentee_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mentee_profiles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `interests` json DEFAULT NULL,
  `learning_goals` text,
  `current_role` varchar(255) DEFAULT NULL,
  `experience_level` enum('beginner','intermediate','advanced') DEFAULT 'beginner',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_mentee_profiles_user_id` (`user_id`),
  CONSTRAINT `mentee_profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mentee_profiles`
--

LOCK TABLES `mentee_profiles` WRITE;
/*!40000 ALTER TABLE `mentee_profiles` DISABLE KEYS */;
INSERT INTO `mentee_profiles` VALUES (1,2,'[\"web development\", \"career growth\"]','i want to learn how to better my interviews','Intern','beginner','2025-07-12 11:16:06','2025-07-13 14:30:57'),(2,4,'[\"Acting\", \"Career growth\"]','','Intern at Hollwood','intermediate','2025-07-12 15:18:09','2025-07-23 14:50:05'),(3,5,'[]','','Singer','intermediate','2025-07-13 23:33:34','2025-07-13 23:37:34'),(4,6,'[]','','','beginner','2025-07-21 13:44:45','2025-07-21 13:44:45');
/*!40000 ALTER TABLE `mentee_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mentor_profiles`
--

DROP TABLE IF EXISTS `mentor_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mentor_profiles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `bio` text,
  `expertise` json DEFAULT NULL,
  `experience` text,
  `availability` varchar(255) DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT '0.0',
  `total_reviews` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_mentor_profiles_user_id` (`user_id`),
  CONSTRAINT `mentor_profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mentor_profiles`
--

LOCK TABLES `mentor_profiles` WRITE;
/*!40000 ALTER TABLE `mentor_profiles` DISABLE KEYS */;
INSERT INTO `mentor_profiles` VALUES (1,1,'Senior Music Engineer in Adobe','a highly experienced audio engineer with 10+ years of experience in recording, mixing, and mastering music. Based in [City, State], John has worked with a diverse range of artists across various genres, from indie rock to hip-hop. His technical expertise includes [mention specific skills,','[]','analog and digital mixing, vocal tuning, spatial audio. Klein is passionate about helping artists achieve their creative vision and is known for his meticulous attention to detail and collaborative approach.\" ','weekends only',0.0,0,'2025-07-12 11:14:09','2025-07-13 23:36:14'),(2,3,NULL,'','[]','',NULL,0.0,0,'2025-07-12 13:29:52','2025-07-12 13:29:52'),(3,7,NULL,'','[]','',NULL,0.0,0,'2025-07-22 15:11:55','2025-07-22 15:11:55'),(4,8,'Movie Director','a highly experienced audio engineer with 10+ years of experience in recording, mixing, and mastering music. Based in [City, State], John has worked with a diverse range of artists across various genres, from indie rock to hip-hop. His technical expertise includes [mention specific skills,','[\"Adobe creation\"]','analog and digital mixing, vocal tuning, spatial audio. Klein is passionate about helping artists achieve their creative vision and is known for his meticulous attention to detail and collaborative approach.\"','',0.0,0,'2025-07-22 15:12:45','2025-07-23 14:44:34');
/*!40000 ALTER TABLE `mentor_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mentorships`
--

DROP TABLE IF EXISTS `mentorships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mentorships` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mentor_id` int NOT NULL,
  `mentee_id` int NOT NULL,
  `status` enum('pending','active','completed','cancelled') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_mentorship` (`mentor_id`,`mentee_id`),
  KEY `idx_mentorships_mentor_id` (`mentor_id`),
  KEY `idx_mentorships_mentee_id` (`mentee_id`),
  CONSTRAINT `mentorships_ibfk_1` FOREIGN KEY (`mentor_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `mentorships_ibfk_2` FOREIGN KEY (`mentee_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mentorships`
--

LOCK TABLES `mentorships` WRITE;
/*!40000 ALTER TABLE `mentorships` DISABLE KEYS */;
INSERT INTO `mentorships` VALUES (1,1,2,'pending','2025-07-12 13:28:16','2025-07-12 13:28:16'),(2,3,2,'pending','2025-07-12 13:35:58','2025-07-12 13:35:58'),(3,1,4,'pending','2025-07-12 15:18:18','2025-07-12 15:18:18'),(4,1,5,'pending','2025-07-13 23:34:08','2025-07-13 23:34:08'),(5,1,6,'pending','2025-07-21 13:45:08','2025-07-21 13:45:08'),(6,8,4,'pending','2025-07-22 15:13:34','2025-07-22 15:13:34');
/*!40000 ALTER TABLE `mentorships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('mentor','mentee') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_users_email` (`email`),
  KEY `idx_users_role` (`role`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'klein mushayija','klein@gmail.com','$2a$12$aMVoxCh/RTsTa.oYIxg.Zu5T/SHnMPQL3PsTO9k9YgpQz9947Zw8G','mentor','2025-07-12 11:14:09','2025-07-12 11:14:09'),(2,'Wagner Mushayija','wagner@gmail.com','$2a$12$t7gzzbM/bxW5LQ9alZIpiezcVyJgabQ05vpaGylS1/u88RqUP9jzK','mentee','2025-07-12 11:16:06','2025-07-12 11:16:06'),(3,'Mutijima Julius','julius@gmail.com','$2a$12$EewVII/I1Wg/aQfdF4zf9uwe84MofIjmVHCJMwccjOpCGoLJethm6','mentor','2025-07-12 13:29:52','2025-07-12 13:29:52'),(4,'Gigi','gigi@gmail.com','$2a$12$pZ4LL8U5eRMV1QYj8kqXEeKVKILYA0efhnm/DCTf0KN3iedsTuqL2','mentee','2025-07-12 15:18:09','2025-07-12 15:18:09'),(5,'Joy Mugisha','joy@gmail.com','$2a$12$gxE3v6EHwBwDiZ5DktTNSumCes4AIUl7k2LpalDrnx9AbXaY1xZy6','mentee','2025-07-13 23:33:34','2025-07-13 23:33:34'),(6,'Joan Bwiza','joan@gmail.com','$2a$12$n5tnlrh3u0E1RQmITgrek.yoKvVWE3F3OgcYeDJ4/eM5KO3PO/Vai','mentee','2025-07-21 13:44:45','2025-07-21 13:44:45'),(7,'Angelique Ines','ines@gmail.com','$2a$12$1xzg01K5dL6POjnCsgXFwOJzyoBIPQfWVxFLiHnPX7kVoH97mzaw.','mentor','2025-07-22 15:11:55','2025-07-22 15:11:55'),(8,'Hudda Wulda','huda@gmail.com','$2a$12$Eq6vhDcAU6wvZ60igq4KU.4DXOAMuZKVCXWVehB2lisA8FOpuAkDy','mentor','2025-07-22 15:12:45','2025-07-22 15:12:45');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-30 17:25:00
