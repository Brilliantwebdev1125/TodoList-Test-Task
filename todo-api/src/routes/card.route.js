const Router = require('express').Router;
const router = new Router();
const cards = require('../controllers/card.controller');

router.post('/create', cards.create);
router.get('/readByID/:id', cards.readByID);
router.get('/readAll', cards.readAll);
router.put('/update', cards.update);
router.delete('/delete/:id', cards.delete);

module.exports = router;
