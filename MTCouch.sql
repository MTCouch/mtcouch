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

-- Copiando estrutura para tabela mtcouch.calculos
CREATE TABLE IF NOT EXISTS `calculos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `tdee` decimal(10,2) NOT NULL,
  `proteinas` decimal(10,2) NOT NULL,
  `carboidratos` decimal(10,2) NOT NULL,
  `gorduras` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `calculos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela mtcouch.calculos: ~5 rows (aproximadamente)
REPLACE INTO `calculos` (`id`, `usuario_id`, `tdee`, `proteinas`, `carboidratos`, `gorduras`) VALUES
	(1, 1, 2215.50, 160.00, 249.88, 64.00),
	(2, 1, 2215.50, 160.00, 249.88, 64.00),
	(3, 1, 2215.50, 160.00, 249.88, 64.00),
	(4, 1, 2215.50, 160.00, 249.88, 64.00),
	(5, 1, 2215.50, 160.00, 249.88, 64.00);

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
) ENGINE=InnoDB AUTO_INCREMENT=164 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela mtcouch.dias_ficha: ~83 rows (aproximadamente)
REPLACE INTO `dias_ficha` (`id`, `ficha_id`, `nome`, `descricao`, `dias`) VALUES
	(38, 8, 'Treino A', NULL, NULL),
	(39, 8, 'Treino B', NULL, NULL),
	(40, 8, 'Treino C', NULL, NULL),
	(41, 8, 'Treino D', NULL, NULL),
	(42, 8, 'Treino A', NULL, NULL),
	(43, 8, 'Treino B', NULL, NULL),
	(44, 8, 'Treino C', NULL, NULL),
	(45, 8, 'Treino D', NULL, NULL),
	(46, 8, 'Treino E', NULL, NULL),
	(47, 8, 'Treino A', NULL, NULL),
	(48, 8, 'Treino B', NULL, NULL),
	(49, 8, 'Treino A', NULL, NULL),
	(50, 8, 'Treino B', NULL, NULL),
	(51, 8, 'Treino C', NULL, NULL),
	(52, 8, 'Treino A', NULL, NULL),
	(53, 8, 'Treino A', NULL, NULL),
	(54, 8, 'Treino B', NULL, NULL),
	(55, 8, 'Treino C', NULL, NULL),
	(56, 8, 'Treino D', NULL, NULL),
	(57, 8, 'Treino E', NULL, NULL),
	(58, 8, 'Treino F', NULL, NULL),
	(59, 8, 'Treino G', NULL, NULL),
	(60, 8, 'Treino A', NULL, NULL),
	(61, 8, 'Treino B', NULL, NULL),
	(62, 8, 'Treino C', NULL, NULL),
	(63, 8, 'Treino D', NULL, NULL),
	(64, 8, 'Treino E', NULL, NULL),
	(65, 8, 'Treino A', NULL, NULL),
	(66, 8, 'Treino B', NULL, NULL),
	(67, 8, 'Treino A', NULL, NULL),
	(68, 8, 'Treino B', NULL, NULL),
	(69, 8, 'Treino C', NULL, NULL),
	(70, 8, 'Treino D', NULL, NULL),
	(71, 8, 'Treino A', NULL, NULL),
	(72, 8, 'Treino B', NULL, NULL),
	(73, 8, 'Treino C', NULL, NULL),
	(74, 8, 'Treino D', NULL, NULL),
	(75, 8, 'Treino A', NULL, NULL),
	(76, 8, 'Treino B', NULL, NULL),
	(77, 8, 'Treino C', NULL, NULL),
	(78, 8, 'Treino D', NULL, NULL),
	(79, 8, 'Treino A', NULL, NULL),
	(80, 8, 'Treino B', NULL, NULL),
	(81, 8, 'Treino C', NULL, NULL),
	(82, 8, 'Treino D', NULL, NULL),
	(83, 8, 'Treino A', NULL, NULL),
	(84, 8, 'Treino B', NULL, NULL),
	(85, 8, 'Treino C', NULL, NULL),
	(86, 8, 'Treino A', NULL, NULL),
	(87, 8, 'Treino B', NULL, NULL),
	(88, 8, 'Treino C', NULL, NULL),
	(89, 9, 'Treino A', NULL, NULL),
	(90, 9, 'Treino A', NULL, NULL),
	(100, 41, 'Treino A', NULL, NULL),
	(101, 41, 'Treino B', NULL, NULL),
	(102, 41, 'Treino C', NULL, NULL),
	(103, 41, 'Treino D', NULL, NULL),
	(113, 63, 'Treino A', NULL, NULL),
	(114, 63, 'Treino B', NULL, NULL),
	(115, 63, 'Treino C', NULL, NULL),
	(129, 69, 'Treino A', NULL, NULL),
	(130, 69, 'Treino B', NULL, NULL),
	(131, 70, 'Treino A', NULL, NULL),
	(132, 71, 'Treino A', NULL, NULL),
	(133, 72, 'Treino A', NULL, NULL),
	(134, 73, 'Treino A', NULL, NULL),
	(135, 74, 'Treino A', NULL, NULL),
	(136, 75, 'Treino A', NULL, NULL),
	(137, 76, 'Treino A', NULL, NULL),
	(138, 77, 'Treino A', NULL, NULL),
	(139, 77, 'Treino B', NULL, NULL),
	(140, 77, 'Treino C', NULL, NULL),
	(141, 77, 'Treino D', NULL, NULL),
	(142, 77, 'Treino E', NULL, NULL),
	(143, 78, 'Treino A', NULL, NULL),
	(157, 89, 'Treino A - Peito e Tríceps', NULL, NULL),
	(158, 89, 'Treino B - Costas e Bíceps', NULL, NULL),
	(159, 89, 'Treino C - Pernas e Ombros', NULL, NULL),
	(160, 90, 'Treino A - Peito e Tríceps', NULL, NULL),
	(161, 90, 'Treino B - Costas e Bíceps', NULL, NULL),
	(162, 90, 'Treino C - Pernas e Ombros', NULL, NULL),
	(163, 91, 'Treino Único - Corpo Inteiro', NULL, NULL);

-- Copiando estrutura para tabela mtcouch.exercicios
CREATE TABLE IF NOT EXISTS `exercicios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `agrupamento_muscular` varchar(100) DEFAULT NULL,
  `dificuldade` varchar(50) DEFAULT NULL,
  `classificacao` text,
  `localidade` varchar(100) DEFAULT NULL,
  `dia_ficha_id` int(11) DEFAULT NULL,
  `video` varchar(255) DEFAULT NULL,
  `series` int(11) DEFAULT NULL,
  `repeticoes` varchar(30) DEFAULT NULL,
  `descanso` varchar(50) DEFAULT NULL,
  `observacoes` text,
  PRIMARY KEY (`id`),
  KEY `fk_exercicios_dia_ficha` (`dia_ficha_id`),
  CONSTRAINT `fk_exercicios_dia_ficha` FOREIGN KEY (`dia_ficha_id`) REFERENCES `dias_ficha` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela mtcouch.exercicios: ~17 rows (aproximadamente)
REPLACE INTO `exercicios` (`id`, `nome`, `agrupamento_muscular`, `dificuldade`, `classificacao`, `localidade`, `dia_ficha_id`, `video`, `series`, `repeticoes`, `descanso`, `observacoes`) VALUES
	(2, '122', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(3, '122', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(4, '122', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	(6, 'Supino Reto com Barra', 'Peito', 'Médio', 'hipertrofia', 'academia', 113, 'https://player.vimeo.com/video/1037179521?loop=1&muted=1&title=1', 4, 12, '67', ''),
	(8, 'Desenvolvimento de Ombros com Halteres', 'Ombros', 'Avançado', 'hipertrofia', 'academia', 114, 'https://player.vimeo.com/video/1104255835?loop=1&muted=1', NULL, NULL, NULL, NULL),
	(9, 'Rosca Bíceps Direta', 'Braços', 'Fácil', 'hipertrofia', 'ambos', 115, 'https://player.vimeo.com/video/1038623181?loop=1&muted=1', NULL, NULL, NULL, NULL),
	(21, 'Supino Reto com Barra', 'Peito', 'Médio', 'hipertrofia', 'academia', 129, 'https://player.vimeo.com/video/1037179521?loop=1&muted=1&title=1', NULL, NULL, NULL, NULL),
	(22, 'Agachamento Livre', 'Pernas', 'Médio', 'hipertrofia,definição,emagrecimento', 'ambos', 138, 'https://player.vimeo.com/video/591558168?loop=1&muted=1', 4, 12, '60', ''),
	(23, 'Desenvolvimento de Ombros com Halteres', 'Ombros', 'Avançado', 'hipertrofia', 'academia', 138, 'https://player.vimeo.com/video/1104255835?loop=1&muted=1', NULL, NULL, NULL, NULL),
	(24, 'Supino Reto com Barra', 'Peito', 'Médio', 'hipertrofia', 'academia', 143, 'https://player.vimeo.com/video/1037179521?loop=1&muted=1&title=1', NULL, NULL, NULL, NULL),
	(59, 'Supino Reto com Barra', NULL, NULL, NULL, NULL, 157, 'https://player.vimeo.com/video/1037179521?loop=1&muted=1', 4, 10, '60', 'Mantenha os pés firmes no chão.'),
	(60, 'Desenvolvimento de Ombros com Halteres', NULL, NULL, NULL, NULL, 157, 'https://player.vimeo.com/video/1104255835?loop=1&muted=1', 4, 10, '60', 'Evite arquear as costas.'),
	(61, 'Tríceps Pulley', NULL, NULL, NULL, NULL, 157, NULL, 4, 12, '45', 'Mantenha o cotovelo fixo.'),
	(62, 'Mergulho em Paralelas', NULL, NULL, NULL, NULL, 157, 'https://player.vimeo.com/video/748280177?loop=1&muted=1', 3, 10, '90', 'Desça até o ângulo de 90 graus.'),
	(63, 'Puxada na Barra Fixa', NULL, NULL, NULL, NULL, 158, 'https://player.vimeo.com/video/1037659523?loop=1&muted=1', 4, 8, '90', 'Use pegada supinada para mais ativação do bíceps.'),
	(64, 'Remada Curvada com Barra', NULL, NULL, NULL, NULL, 158, 'https://player.vimeo.com/video/1037659857?loop=1&muted=1', 4, 10, '90', 'Mantenha a coluna reta.'),
	(65, 'Rosca Spider com Barra', NULL, NULL, NULL, NULL, 158, 'https://player.vimeo.com/video/1009870574?loop=1&muted=1', 3, 10, '60', 'Evite balançar o corpo.'),
	(66, 'Remada Unilateral com Haltere', NULL, NULL, NULL, NULL, 158, 'https://player.vimeo.com/video/494015613?loop=1&muted=1', 3, 12, '60', 'Concentre-se na contração do músculo.'),
	(67, 'Jump Squat', NULL, NULL, NULL, NULL, 159, 'https://player.vimeo.com/video/1038625094?loop=1&muted=1', 4, 10, '90', 'Mantenha a postura correta ao aterrissar.'),
	(68, 'Sissy-Squat', NULL, NULL, NULL, NULL, 159, 'https://player.vimeo.com/video/1127513546?loop=1&muted=1', 4, 10, '90', 'Mantenha os joelhos alinhados com os pés.'),
	(69, 'Upright Row com Barra', NULL, NULL, NULL, NULL, 159, 'https://player.vimeo.com/video/1028442027?loop=1&muted=1', 3, 10, '60', 'Evite elevar os ombros.'),
	(70, 'Desenvolvimento de Ombros com Barra', NULL, NULL, NULL, NULL, 159, 'https://player.vimeo.com/video/1057889976?loop=1&muted=1', 3, 10, '60', 'Mantenha os pés firmes no chão.'),
	(71, 'Supino Reto com Barra', NULL, NULL, NULL, NULL, 160, 'https://player.vimeo.com/video/1037179521?loop=1&muted=1', 4, 10, '60', 'Mantenha os pés firmes no chão.'),
	(72, 'Desenvolvimento de Ombros com Halteres', NULL, NULL, NULL, NULL, 160, 'https://player.vimeo.com/video/1104255835?loop=1&muted=1', 4, 10, '60', 'Evite arquear as costas.'),
	(73, 'Tríceps Pulley', NULL, NULL, NULL, NULL, 160, NULL, 4, 12, '45', 'Mantenha os cotovelos fixos.'),
	(74, 'Mergulho em Paralelas', NULL, NULL, NULL, NULL, 160, 'https://player.vimeo.com/video/748280177?loop=1&muted=1', 3, 10, '60', 'Desça até os cotovelos formarem um ângulo de 90 graus.'),
	(75, 'Puxada na Barra Fixa', NULL, NULL, NULL, NULL, 161, 'https://player.vimeo.com/video/1037659523?loop=1&muted=1', 4, 8, '90', 'Use pegada pronada.'),
	(76, 'Remada Curvada com Barra', NULL, NULL, NULL, NULL, 161, 'https://player.vimeo.com/video/1037659857?loop=1&muted=1', 4, 10, '90', 'Mantenha a lombar reta.'),
	(77, 'Rosca Spider com Barra', NULL, NULL, NULL, NULL, 161, 'https://player.vimeo.com/video/1009870574?loop=1&muted=1', 3, 10, '60', 'Evite balançar o corpo.'),
	(78, 'Agachamento Livre', NULL, NULL, NULL, NULL, 162, 'https://player.vimeo.com/video/591558168?loop=1&muted=1', 4, 10, '90', 'Mantenha o abdômen contraído.'),
	(79, 'Press Militar com Barra', NULL, NULL, NULL, NULL, 162, 'https://player.vimeo.com/video/498732376?loop=1&muted=1', 4, 10, '60', 'Evite bloquear os cotovelos no topo.'),
	(80, 'Hack Squat', NULL, NULL, NULL, NULL, 162, 'https://player.vimeo.com/video/958112020?loop=1&muted=1', 3, 10, '90', 'Mantenha os pés na largura dos ombros.'),
	(81, 'Agachamento Livre', NULL, NULL, NULL, NULL, 163, 'https://player.vimeo.com/video/591558168?loop=1&muted=1', 3, 12, '60', 'Mantenha o abdômen contraído.'),
	(82, 'Supino Reto com Barra', NULL, NULL, NULL, NULL, 163, 'https://player.vimeo.com/video/1037179521?loop=1&muted=1', 3, 12, '60', 'Controle o movimento na descida.'),
	(83, 'Rosca Bíceps Direta', NULL, NULL, NULL, NULL, 163, 'https://player.vimeo.com/video/1038623181?loop=1&muted=1', 3, 12, '60', 'Evite balançar o corpo.'),
	(84, 'Prancha Isométrica', NULL, NULL, NULL, NULL, 163, 'https://player.vimeo.com/video/591786362?loop=1&muted=1', 3, 30, '30', 'Mantenha o corpo alinhado.'),
	(85, 'Tríceps Pulley', NULL, NULL, NULL, NULL, 163, 'https://player.vimeo.com/video/1121012975?loop=1&muted=1', 3, 12, '60', 'Evite usar o tronco no movimento.'),
	(86, 'Abdominal Crunch na Máquina', NULL, NULL, NULL, NULL, 163, 'https://player.vimeo.com/video/913635744?loop=1&muted=1', 3, 15, '30', 'Concentre-se na contração do abdômen.');

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
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela mtcouch.fichas: ~26 rows (aproximadamente)
REPLACE INTO `fichas` (`id`, `usuario_id`, `nome`, `descricao`, `dias`) VALUES
	(8, 3, 'UserTeste', 'UserTeste', 7),
	(9, 6, 'Treinos', 'Foco', 5),
	(10, 6, 'Treinos', 'Foco', 5),
	(12, 7, 'Teste', 'Testeficha', 2),
	(32, 9, 'Teste', 'Teste', 1),
	(33, 9, 'Teste', 'teste', 1),
	(41, 10, 'ida', 'ida', 4),
	(63, 1, 'Planilha', 'teste de quantos caracteres', 3),
	(69, 11, 'Teste', 'Teste', 2),
	(70, 11, 'Teste2', 'Teste2', 1),
	(71, 11, 'Teste3', 'Teste3', 1),
	(72, 11, 'Teste4', 'Teste4', 1),
	(73, 11, 'Teste5', 'Teste5', 1),
	(74, 11, 'Teste6', 'Teste6', 1),
	(75, 11, 'Teste7', 'Teste7', 1),
	(76, 11, 'Teste8', 'Teste8', 1),
	(77, 14, ' GG', 'Teste', 5),
	(78, 8, 'Teste', 'Teste', 1),
	(89, 1, 'Treino de Hipertrofia - Avançado', NULL, NULL),
	(90, 1, 'Treino de Hipertrofia - Avançado', NULL, NULL),
	(91, 1, 'Treino de Hipertrofia - Iniciante', NULL, NULL);

-- Copiando estrutura para tabela mtcouch.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL DEFAULT '0',
  `senha` varchar(100) NOT NULL DEFAULT '0',
  `tipo` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela mtcouch.usuarios: ~11 rows (aproximadamente)
REPLACE INTO `usuarios` (`id`, `email`, `senha`, `tipo`) VALUES
	(1, 'admin@admin.com', '$2b$12$o61QncA9VASR7vf21wyv7.ACER48Y5j60WZDRw4L4iwSILZEssD32', 1),
	(2, 'carlos@carlos.com', '$2b$12$hv71bUa6eQ1fC7wYIYelbefMMIdWJFnBHItV1/6UO9KiyEfmobKtK', 0),
	(3, 'usuario@teste.com', '$2b$12$hTj4YwhaPs84dfD91V8NY.oUpX6D3QrchnJwefRcIdop8YLno.ifm', 0),
	(5, 'teste@teste.com', '$2b$12$ss/pFx8aZBe87iz3zruoH.JXAsskh0pI/sxD57eM1hybBvj8qMxZ6', 0),
	(6, 'polianna.cs@icloud.com', '$2b$12$rTPzeTX8aRg2ji5O5JiN2u/dSPZYgjuAoDWmIJ7xfl6ceCD10MeXq', 0),
	(7, 'carlos@teste.com', '$2b$12$rtk6Dnkc12qPKFfxjwfMour1GCGdRgbMhSPwFsH6MIryGYFt0ubQ.', 0),
	(8, 'sla@sla.com', '$2b$12$6L0NJ6wPT5CJ8sMCgGsiMey4cuknK0VdbvTV5KvpzyXO1JE/zLS9K', 0),
	(9, '123@gmail.com', '$2b$12$XRi5NhGHDuTZ6IUhp5EURu7yfHpMIO97ZC5bWF7zt2wI62l5UhK3y', 0),
	(10, 'ida@gmail.com', '$2b$12$s6fBZs3XyLvWNgEpYfHx7uCUETJU6JiaQ3z9BQJdz5g5/vMYHUcLm', 0),
	(11, 'gustavo@textoterona.com', '$2b$12$Zx7V8a0pWU2hkcB0fUTuOOAAyuNwXIBzlw2hu/Qt9osIX0DHxobwG', 0),
	(14, 'poli.anna.cs@icloud.com', '$2b$12$Xh9iX/NvpT9aHuui6RyNL../iVoGi3piN9uxVmW4rULWJ2ks88Age', 0);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
