const Router = require('express').Router;
const router = new Router();
const cardRouter = require('./card.route');

router.use('/card', cardRouter);

module.exports = router;
