var express = require('express');
var router = express.Router();
const indexController = require('../controllers/index');

router.get('/', indexController.index);
router.post('/login', indexController.signin);
router.post('/signup', indexController.register);

module.exports = router;
