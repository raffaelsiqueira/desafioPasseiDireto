var express = require('express');
var router = express.Router()
var db = require('../db');

//Select de todos os generos
exports.get = async(res) => {
    let sql = 'SELECT * FROM generos';
    db(sql, [], res);
};

//Select de um único disco por id
/*exports.getById = async(id, res) => {
    console.log('get por id');
    let sql = `SELECT * FROM discos WHERE id_disco = ?`;
    db(sql, [id], res);
};*/

//Select de um único genero por nome
exports.getByNome = async(nome, res) => {
    let sql = `SELECT * FROM generos WHERE nome_genero = ?`;
    db(sql, [nome.substring(0, 45)], res);
};

//Cria um novo genero
exports.create = async(data, res) => {
    const nome_genero = data.nome_genero.substring(0, 45);
    let sql = `INSERT INTO generos(nome_genero) VALUES(?)`;
    db(sql, [nome_genero], res);
}

//Atualiza um genero
exports.update = async(id, data, res) => {
    const id_genero = parseInt(id);
    const nome_genero = data.nome_genero.substring(0, 45);
    let sql = `UPDATE generos SET nome_genero = ? WHERE id_genero = ?`;
    db(sql, [nome_genero, id_genero] ,res);
};

//Delete de um genero
exports.delete = async(id, res) => {
    const id_genero = parseInt(id);
    let sql = `DELETE FROM generos WHERE id_genero = ?`;
    db(sql, [id_genero], res);
};