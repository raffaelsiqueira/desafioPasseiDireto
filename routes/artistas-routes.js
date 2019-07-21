const express = require('express');
const router = express.Router();
const controller = require('../controllers/artistas-controller');

router.get('/', controller.get);
router.get('/:nome', controller.getByNome)
router.patch('/:id', controller.patch);
router.post('/', controller.post);
router.delete('/:id', controller.delete);

module.exports = router;