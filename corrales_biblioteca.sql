-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 06-08-2024 a las 03:29:36
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `corrales_biblioteca`
--
CREATE DATABASE IF NOT EXISTS `corrales_biblioteca` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `corrales_biblioteca`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros`
--
-- Creación: 05-08-2024 a las 22:45:07
--

CREATE TABLE `libros` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `autor` varchar(30) NOT NULL,
  `categoria` varchar(30) NOT NULL,
  `fecha` date NOT NULL,
  `isbn` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `libros`
--

INSERT INTO `libros` (`id`, `nombre`, `autor`, `categoria`, `fecha`, `isbn`) VALUES
(1, 'El Alquimista', 'Paulo Coelho', 'Realismo Magico', '2012-12-01', '6073114419'),
(2, 'El Principito', 'Antoine De Saint-Exupéry', 'Infantil', '1943-12-31', '9783444930055'),
(3, 'El Retrato de Dorian Gray', 'Oscar Wilde', 'Gotico', '1890-07-01', '9788491000173'),
(4, 'Quién se ha llevado mi queso', 'Spencer Johnson', 'Autoayuda', '1998-09-01', '9788499103548'),
(14, 'Don Quijote de la Mancha', 'Miguel de Cervantes', 'Novela', '1605-07-01', '9788491050551');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `libros`
--
ALTER TABLE `libros`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `libros`
--
ALTER TABLE `libros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
