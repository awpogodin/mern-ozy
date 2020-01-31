const { Router } = require('express');
const apiControllers = require('./api');

const router = new Router();

router.use('/api', apiControllers);

module.exports = router;
