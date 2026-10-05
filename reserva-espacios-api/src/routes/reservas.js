
const router = require('express').Router();
const c = require('../controllers/reservasController');

router.get('/', c.listar);
router.get('/:id', c.obtener);
router.post('/', c.crear);
router.put('/:id', c.actualizar);
router.delete('/:id', c.cancelar);

module.exports = router;
