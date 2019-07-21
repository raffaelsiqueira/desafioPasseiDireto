var express = require('express');
var bodyParser = require('body-parser');
var port = 3000;
var db = require('./db');

var app = express();
var router = express.Router();

//Carrega as rotas
const discosRoute = require('./routes/discos-routes');
const gravadorasRoute = require('./routes/gravadoras-routes');
const generosRoute = require('./routes/generos-routes');
const artistasRoute = require('./routes/artistas-routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/discos', discosRoute);
app.use('/artistas', artistasRoute);
app.use('/generos', generosRoute);
app.use('/gravadoras', gravadorasRoute);


//require('./routes/gravadora-routes')(app);

app.listen(port, () => console.log('Servidor Express rodando na porta 3000'));

app.use('/', router);