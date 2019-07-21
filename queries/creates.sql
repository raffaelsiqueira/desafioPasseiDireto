Use db_discos;

CREATE TABLE `gravadoras` (
    `id_gravadora` int(11) NOT NULL AUTO_INCREMENT,
    `nome_gravadora` varchar(45) NOT NULL,
    PRIMARY KEY(`id_gravadora`)
);

CREATE TABLE `generos` (
    `id_genero` int(11) NOT NULL AUTO_INCREMENT,
    `nome_genero` varchar(45) NOT NULL,
    PRIMARY KEY(`id_genero`)
);


CREATE TABLE `artistas` (
    `id_artista` int(11) NOT NULL AUTO_INCREMENT,
    `nome_artista` varchar(45) NOT NULL,
    `origem` varchar(45) NOT NULL,
    `id_genero` int(11) NOT NULL,
    PRIMARY KEY(`id_artista`)
);

CREATE TABLE `discos` (
	`id_disco` int(11) NOT NULL AUTO_INCREMENT,
    `id_artista` int(11) NOT NULL,
    `nome_disco` varchar(45) NOT NULL,
    `data_lancamento` date,
    `id_gravadora` int(11) NOT NULL,
    PRIMARY KEY(`id_disco`)
);

ALTER TABLE `artistas` ADD CONSTRAINT `fk_genero` FOREIGN KEY (`id_genero`) REFERENCES `generos` (`id_genero`);

ALTER TABLE `discos` ADD CONSTRAINT `fk_artista` FOREIGN KEY (`id_artista`) REFERENCES `artistas` (`id_artista`);