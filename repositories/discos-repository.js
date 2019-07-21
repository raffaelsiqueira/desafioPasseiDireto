var express = require('express');
var router = express.Router()
var db = require('../db');

//Select de todos os discos
exports.get = async(res) => {
    let sql = 'SELECT * FROM discos';
    db(sql, [], res);
};

//Select de um único disco por id
/*exports.getById = async(id, res) => {
    console.log('get por id');
    let sql = `SELECT * FROM discos WHERE id_disco = ?`;
    db(sql, [id], res);
};*/

//Select de um único disco por nome
exports.getByNome = async(nome, res) => {
    let sql = `SELECT * FROM discos WHERE nome_disco = ?`;
    db(sql, [nome.substring(0, 45)], res);
};

//Cria um novo disco
exports.create = async(data, res) => {
    const id_artista = parseInt(data.id_artista);
    const nome_disco = data.nome_disco.substring(0, 45);
    const data_lancamento = data.data_lancamento.substring(0, 10);
    const id_gravadora = parseInt(data.id_gravadora);
    let sql = `INSERT INTO discos(id_artista, nome_disco, data_lancamento, id_gravadora) VALUES(?, ?, ?, ?)`;
    db(sql, [id_artista, nome_disco, data_lancamento, id_gravadora], res);
}

//Atualiza um disco
exports.update = async(id, data, res) => {
    const id_disco = parseInt(id);
    const id_artista = parseInt(data.id_artista);
    const nome_disco = data.nome_disco.substring(0, 45);
    const data_lancamento = data.data_lancamento.substring(0, 10);
    const id_gravadora = parseInt(data.id_gravadora);
    let sql = `UPDATE discos SET id_artista = ?, nome_disco = ?, data_lancamento = ?, id_gravadora = ? WHERE id_disco = ?`;
    db(sql, [id_artista, nome_disco, data_lancamento, id_gravadora, id_disco] ,res);
};

//Delete de um disco
exports.delete = async(id, res) => {
    const id_disco = parseInt(id);
    let sql = `DELETE FROM discos WHERE id_disco = ?`;
    db(sql, [id_disco], res);
};