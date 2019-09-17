var express = require('express');
var router = express.Router();
const profileController = require('../controllers/profile');
const companiesController = require('../controllers/company');
const usersController = require('../controllers/users');

router.get('/profile', profileController.view);
router.put('/profile', profileController.save);

router.get('/companies', companiesController.list);
router.post('/company', companiesController.save);
router.delete('/company/:id', companiesController.delete);
router.get('/company/:id', companiesController.view);
router.put('/company/:id', companiesController.edit);

router.get('/users', usersController.list);
//router.put('/user/:id',usersController.delete);
router.delete('/user/:id', usersController.delete);
router.get('/user/:id', usersController.view);
router.put('/user/:id', usersController.edit);


router.head('/ping', (req, res) => {
	res.end()
});

module.exports = router;