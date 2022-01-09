var router = require('express').Router();
const passport = require('passport');
const coffeesCtrl = require('../controllers/coffees')

router.get('/', coffeesCtrl.index);

module.exports = router;
