const express = require('express');
const router = express.Router();
const controller = require('../controllers/artistas-controller');

router.get('/', controller.consulta, controller.get);
router.get('/:nome', controller.consultaPorNome, controller.get)
router.patch('/:id', controller.patch);
router.post('/', controller.cadastrar, controller.consulta, controller.get);
router.delete('/:id', controller.delete);

module.exports = router;