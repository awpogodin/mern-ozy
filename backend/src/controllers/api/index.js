const { Router } = require('express');
const authController = require('./auth.controller');
const itemsController = require('./items.controller');
const cartsController = require('./carts.controller');

const router = new Router();

router.use('/auth', authController);
router.use('/items', itemsController);
router.use('/carts', cartsController);

module.exports = router;
