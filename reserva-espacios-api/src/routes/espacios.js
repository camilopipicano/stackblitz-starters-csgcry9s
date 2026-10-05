
const router = require('express').Router();
const c = require('../controllers/espaciosController');

router.get('/', c.listar);
router.get('/:id/disponibilidad', c.disponibilidad);
router.get('/:id', c.obtener);

module.exports = router;
