-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           5.7.39 - MySQL Community Server (GPL)
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para mtcouch
CREATE DATABASE IF NOT EXISTS `mtcouch` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `mtcouch`;

-- Copiando estrutura para tabela mtcouch.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL DEFAULT '0',
  `senha` varchar(100) NOT NULL DEFAULT '0',
  `tipo` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Tabela de Planilhas
CREATE TABLE IF NOT EXISTS `planilhas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,          -- Ex: "Ficha A"
  `descricao` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `planilhas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

-- Dias de treino (até 7 por ficha)
CREATE TABLE IF NOT EXISTS `dias_ficha` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ficha_id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,          -- Ex: "Treino A", "Treino B" e "Treino C"
  `descricao` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ficha_id` (`ficha_id`),
  CONSTRAINT `dias_ficha_ibfk_1` FOREIGN KEY (`planilhas_id`) REFERENCES `planilhas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

--  Catálogo de exercícios
CREATE TABLE IF NOT EXISTS `exercicios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `agrupamento_muscular` varchar(100) DEFAULT NULL,
  `dificuldade` varchar(50) DEFAULT NULL,
  `classificacao` text DEFAULT NULL,   -- JSON: ["hipertrofia"]
  `localidade` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

--  Relação: exercícios em cada dia de treino
CREATE TABLE IF NOT EXISTS `dia_exercicios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dia_id` int(11) NOT NULL,
  `exercicio_id` int(11) NOT NULL,
  `series` int(11) DEFAULT NULL,
  `repeticoes` int(11) DEFAULT NULL,
  `carga` int(11) DEFAULT NULL,
  `ordem` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `dia_id` (`dia_id`),
  KEY `exercicio_id` (`exercicio_id`),
  CONSTRAINT `dia_exercicios_ibfk_1` FOREIGN KEY (`dia_id`) REFERENCES `dias_ficha` (`id`) ON DELETE CASCADE,
  CONSTRAINT `dia_exercicios_ibfk_2` FOREIGN KEY (`exercicio_id`) REFERENCES `exercicios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

-- Exportação de dados foi desmarcado.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
