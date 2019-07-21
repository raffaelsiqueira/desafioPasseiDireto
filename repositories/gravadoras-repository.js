var express = require('express');
var router = express.Router()
var db = require('../db');

//Select de todos os gravadoras
exports.get = async(res) => {
    let sql = 'SELECT * FROM gravadoras';
    db(sql, [], res);
};

//Select de um único disco por id
/*exports.getById = async(id, res) => {
    console.log('get por id');
    let sql = `SELECT * FROM discos WHERE id_disco = ?`;
    db(sql, [id], res);
};*/

//Select de um único gravadora por nome
exports.getByNome = async(nome, res) => {
    let sql = `SELECT * FROM gravadoras WHERE nome_gravadora = ?`;
    db(sql, [nome.substring(0, 45)], res);
};

//Cria um novo gravadora
exports.create = async(data, res) => {
    const nome_gravadora = data.nome_gravadora.substring(0, 45);
    let sql = `INSERT INTO gravadoras(nome_gravadora) VALUES(?)`;
    db(sql, [nome_gravadora], res);
}

//Atualiza um gravadora
exports.update = async(id, data, res) => {
    const id_gravadora = parseInt(id);
    const nome_gravadora = data.nome_gravadora.substring(0, 45);
    let sql = `UPDATE gravadoras SET nome_gravadora = ? WHERE id_gravadora = ?`;
    db(sql, [nome_gravadora, id_gravadora] ,res);
};

//Delete de um gravadora
exports.delete = async(id, res) => {
    const id_gravadora = parseInt(id);
    let sql = `DELETE FROM gravadoras WHERE id_gravadora = ?`;
    db(sql, [id_gravadora], res);
};