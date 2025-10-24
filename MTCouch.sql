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

-- Copiando estrutura para tabela mtcouch.dias_ficha
CREATE TABLE IF NOT EXISTS `dias_ficha` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ficha_id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `dias` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ficha_id` (`ficha_id`),
  CONSTRAINT `dias_ficha_ibfk_1` FOREIGN KEY (`ficha_id`) REFERENCES `fichas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela mtcouch.dias_ficha: ~20 rows (aproximadamente)
INSERT INTO `dias_ficha` (`id`, `ficha_id`, `nome`, `descricao`, `dias`) VALUES
	(1, 1, 'Treino A', NULL, NULL),
	(2, 1, 'Treino B', NULL, NULL),
	(3, 1, 'Treino C', NULL, NULL),
	(4, 1, 'Treino D', NULL, NULL),
	(5, 1, 'Treino A', NULL, NULL),
	(6, 1, 'Treino B', NULL, NULL),
	(7, 1, 'Treino C', NULL, NULL),
	(8, 1, 'Treino D', NULL, NULL),
	(9, 1, 'Treino A', NULL, NULL),
	(10, 1, 'Treino B', NULL, NULL),
	(11, 1, 'Treino C', NULL, NULL),
	(12, 1, 'Treino D', NULL, NULL),
	(13, 1, 'Treino E', NULL, NULL),
	(14, 3, 'Treino A', NULL, NULL),
	(15, 3, 'Treino B', NULL, NULL),
	(16, 3, 'Treino C', NULL, NULL),
	(17, 3, 'Treino D', NULL, NULL),
	(18, 3, 'Treino E', NULL, NULL),
	(19, 3, 'Treino F', NULL, NULL),
	(20, 3, 'Treino G', NULL, NULL);

-- Copiando estrutura para tabela mtcouch.exercicios
CREATE TABLE IF NOT EXISTS `exercicios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `agrupamento_muscular` varchar(100) DEFAULT NULL,
  `dificuldade` varchar(50) DEFAULT NULL,
  `classificacao` text,
  `localidade` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela mtcouch.exercicios: ~0 rows (aproximadamente)

-- Copiando estrutura para tabela mtcouch.fichas
CREATE TABLE IF NOT EXISTS `fichas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `descricao` varchar(255) DEFAULT NULL,
  `dias` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `fichas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela mtcouch.fichas: ~8 rows (aproximadamente)
INSERT INTO `fichas` (`id`, `usuario_id`, `nome`, `descricao`, `dias`) VALUES
	(1, 1, 'Teste', 'Teste', NULL),
	(2, 1, 'Teste', 'Teste', NULL),
	(3, 1, 'Teste', 'Teste', 4),
	(4, 1, 'Iron Man', 'Testeficha', 5),
	(5, 1, 'Testeficha', 'Vamo pohaaa!', 4),
	(6, 1, 'Testeficha', 'Vamo pohaaa!', 4),
	(7, 1, 'Iron Man', 'Vamo pohaaa!', 5),
	(8, 3, 'UserTeste', 'UserTeste', 7);

-- Copiando estrutura para tabela mtcouch.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL DEFAULT '0',
  `senha` varchar(100) NOT NULL DEFAULT '0',
  `tipo` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela mtcouch.usuarios: ~3 rows (aproximadamente)
INSERT INTO `usuarios` (`id`, `email`, `senha`, `tipo`) VALUES
	(1, 'admin@admin.com', '$2b$12$o61QncA9VASR7vf21wyv7.ACER48Y5j60WZDRw4L4iwSILZEssD32', 1),
	(2, 'carlos@carlos.com', '$2b$12$hv71bUa6eQ1fC7wYIYelbefMMIdWJFnBHItV1/6UO9KiyEfmobKtK', 0),
	(3, 'usuario@teste.com', '$2b$12$hTj4YwhaPs84dfD91V8NY.oUpX6D3QrchnJwefRcIdop8YLno.ifm', 0);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
