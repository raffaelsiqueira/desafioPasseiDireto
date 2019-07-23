const express = require('express');
const router = express.Router();
const controller = require('../controllers/discos-controller');

router.get('/', controller.consulta, controller.get);
router.get('/:nome', controller.consultaPorNome, controller.get);
router.patch('/:id', controller.patch, controller.consulta, controller.get);
router.post('/', controller.cadastrar, controller.consulta, controller.get);
router.delete('/:id', controller.delete, controller.consulta, controller.get);

module.exports = router;