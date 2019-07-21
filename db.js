var mysql = require('mysql');
var config = require('./config');

//Conexão com o banco
var db = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

db.connect((err) => {
    if (err){
        throw err;
    }
    console.log('Banco conectado com sucesso!')
});

function executarQuerySql(sqlQry, parametros, res){
    db.query(sqlQry, parametros, function(error, results, fields){
        if (error){
            res.json(error);
        }
        else{
            res.json(results);
        }
        console.log('Query efetuada com sucesso!');
    });
}

module.exports = executarQuerySql;