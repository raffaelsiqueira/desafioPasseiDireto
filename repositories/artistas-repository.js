var express = require('express');
var router = express.Router()
var db = require('../db');

//Select de todos os artistas
exports.get = async() => {
    let sql = 'SELECT * FROM artistas';
    const results = await db(sql, []);
    return results;
};

//Select de um único artista por nome
exports.getByNome = async(nome) => {
    let sql = `SELECT * FROM artistas WHERE nome_artista = ?`;
    const results = await db(sql, [nome.substring(0, 45)]);
    return results;
};

//Cria um novo artista
exports.create = async(data) => {
    const nome_artista = data.nome_artista.substring(0, 45);
    const origem = data.origem.substring(0, 45);
    const id_genero = parseInt(data.id_genero);
    let sql = `INSERT INTO artistas(nome_artista, origem, id_genero) VALUES(?, ?, ?)`;
    const results = await db(sql, [nome_artista, origem, id_genero]);
    return results;
}

//Atualiza um artista
exports.update = async(id, data) => {
    const id_artista = parseInt(id);
    const nome_artista = data.nome_artista.substring(0, 45);
    const origem = data.origem.substring(0, 45);
    const id_genero = parseInt(data.id_genero);
    let sql = `UPDATE artistas SET nome_artista = ?, origem = ?, id_genero = ? WHERE id_artista = ?`;
    db(sql, [nome_artista, origem, id_genero, id_artista]);
};

//Delete de um artista
exports.delete = async(id) => {
    const id_artista = parseInt(id);
    let sql = `DELETE FROM artistas WHERE id_artista = ?`;
    db(sql, [id_artista]);
};