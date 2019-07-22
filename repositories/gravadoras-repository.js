var express = require('express');
var router = express.Router()
var db = require('../db');

//Select de todos os gravadoras
exports.get = async() => {
    let sql = 'SELECT * FROM gravadoras';
    const results = await db(sql, []);
    return results;
};

//Select de um único gravadora por nome
exports.getByNome = async(nome, res) => {
    let sql = `SELECT * FROM gravadoras WHERE nome_gravadora = ?`;
    const results = await db(sql, [nome.substring(0, 45)]);
    return results;
};

//Cria um novo gravadora
exports.create = async(data) => {
    const nome_gravadora = data.nome_gravadora.substring(0, 45);
    let sql = `INSERT INTO gravadoras(nome_gravadora) VALUES(?)`;
    const results = await db(sql, [nome_gravadora]);
    return results;
}

//Atualiza um gravadora
exports.update = async(id, data) => {
    const id_gravadora = parseInt(id);
    const nome_gravadora = data.nome_gravadora.substring(0, 45);
    let sql = `UPDATE gravadoras SET nome_gravadora = ? WHERE id_gravadora = ?`;
    db(sql, [nome_gravadora, id_gravadora]);
};

//Delete de um gravadora
exports.delete = async(id) => {
    const id_gravadora = parseInt(id);
    let sql = `DELETE FROM gravadoras WHERE id_gravadora = ?`;
    db(sql, [id_gravadora]);
};