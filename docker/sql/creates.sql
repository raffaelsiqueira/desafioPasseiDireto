CREATE DATABASE db_discos;

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

insert into gravadoras(nome_gravadora)
values('Raffael Gravadora Ltda');

insert into gravadoras(nome_gravadora)
values('FFC 1902 Gravadora');

insert into generos(nome_genero)
values('Rock');

insert into generos(nome_genero)
values('Pop');

insert into artistas(nome_artista, origem, id_genero)
values('Metallica', 'EUA', 1);

insert into discos(id_artista, nome_disco, data_lancamento, id_gravadora)
values(1, 'Metallica', '1991-08-12', 1);