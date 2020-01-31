const { Router } = require('express');
const authController = require('./auth.controller');

const router = new Router();

router.use('/auth', authController);

module.exports = router;
