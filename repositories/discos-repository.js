var express = require('express');
var router = express.Router()
var db = require('../db');

//Select de todos os discos
exports.get = async() => {
    let sql = 'select discos.id_disco, artistas.nome_artista, discos.nome_disco, discos.data_lancamento, gravadoras.nome_gravadora from discos join artistas on artistas.id_artista = discos.id_artista join gravadoras on gravadoras.id_gravadora = discos.id_gravadora';
    const results = await db(sql, []);
    return results;
};

//Select de um único disco por nome
exports.getByNome = async(nome) => {
    let sql = `SELECT * FROM discos WHERE nome_disco = ?`;
    const results = await db(sql, [nome.substring(0, 45)]);
    return results;
};

//Cria um novo disco
exports.create = async(data) => {
    const id_artista = parseInt(data.id_artista);
    const nome_disco = data.nome_disco.substring(0, 45);
    const data_lancamento = data.data_lancamento.substring(0, 10);
    const id_gravadora = parseInt(data.id_gravadora);
    let sql = `INSERT INTO discos(id_artista, nome_disco, data_lancamento, id_gravadora) VALUES(?, ?, ?, ?)`;
    const results = await db(sql, [id_artista, nome_disco, data_lancamento, id_gravadora]);
    return results;
}

//Atualiza um disco
exports.update = async(id, data) => {
    const id_disco = parseInt(id);
    const id_artista = parseInt(data.id_artista);
    const nome_disco = data.nome_disco.substring(0, 45);
    const data_lancamento = data.data_lancamento.substring(0, 10);
    const id_gravadora = parseInt(data.id_gravadora);
    let sql = `UPDATE discos SET id_artista = ?, nome_disco = ?, data_lancamento = ?, id_gravadora = ? WHERE id_disco = ?`;
    db(sql, [id_artista, nome_disco, data_lancamento, id_gravadora, id_disco]);
};

//Delete de um disco
exports.delete = async(id) => {
    const id_disco = parseInt(id);
    let sql = `DELETE FROM discos WHERE id_disco = ?`;
    db(sql, [id_disco]);
};