var express = require('express');
var router = express.Router()
var db = require('../db');

//Select de todos os generos
exports.get = async() => {
    let sql = 'SELECT * FROM generos';
    const results = await db(sql, []);
    return results;
};
//Select de um único genero por nome
exports.getByNome = async(nome) => {
    let sql = `SELECT * FROM generos WHERE nome_genero = ?`;
    const results = db(sql, [nome.substring(0, 45)]);
    return results;
};

//Cria um novo genero
exports.create = async(data) => {
    const nome_genero = data.nome_genero.substring(0, 45);
    let sql = `INSERT INTO generos(nome_genero) VALUES(?)`;
    const results = await db(sql, [nome_genero]);
    return results;
}

//Atualiza um genero
exports.update = async(id, data) => {
    const id_genero = parseInt(id);
    const nome_genero = data.nome_genero.substring(0, 45);
    let sql = `UPDATE generos SET nome_genero = ? WHERE id_genero = ?`;
    db(sql, [nome_genero, id_genero]);
};

//Delete de um genero
exports.delete = async(id) => {
    const id_genero = parseInt(id);
    let sql = `DELETE FROM generos WHERE id_genero = ?`;
    db(sql, [id_genero]);
};