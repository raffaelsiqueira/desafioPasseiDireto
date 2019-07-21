var express = require('express');
var router = express.Router()
var db = require('../db');

//Select de todos os artistas
exports.get = async(res) => {
    let sql = 'SELECT * FROM artistas';
    db(sql, [], res);
};

//Select de um único disco por id
/*exports.getById = async(id, res) => {
    console.log('get por id');
    let sql = `SELECT * FROM discos WHERE id_disco = ?`;
    db(sql, [id], res);
};*/

//Select de um único artista por nome
exports.getByNome = async(nome, res) => {
    let sql = `SELECT * FROM artistas WHERE nome_artista = ?`;
    db(sql, [nome.substring(0, 45)], res);
};

//Cria um novo artista
exports.create = async(data, res) => {
    const nome_artista = data.nome_artista.substring(0, 45);
    const origem = data.origem.substring(0, 45);
    const id_genero = parseInt(data.id_genero);
    let sql = `INSERT INTO artistas(nome_artista, origem, id_genero) VALUES(?, ?, ?)`;
    db(sql, [nome_artista, origem, id_genero], res);
}

//Atualiza um artista
exports.update = async(id, data, res) => {
    const id_artista = parseInt(id);
    const nome_artista = data.nome_artista.substring(0, 45);
    const origem = data.origem.substring(0, 45);
    const id_genero = parseInt(data.id_genero);
    let sql = `UPDATE artistas SET nome_artista = ?, origem = ?, id_genero = ? WHERE id_artista = ?`;
    db(sql, [nome_artista, origem, id_genero, id_artista] ,res);
};

//Delete de um artista
exports.delete = async(id, res) => {
    const id_artista = parseInt(id);
    let sql = `DELETE FROM artistas WHERE id_artista = ?`;
    db(sql, [id_artista], res);
};