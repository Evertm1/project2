var router = require('express').Router();
const passport = require('passport');
const coffeesCtrl = require('../controllers/coffees')

router.get('/', coffeesCtrl.index);
router.get('/:roastType', coffeesCtrl.show);
router.get('/description/:id', coffeesCtrl.description);
//router.post('/description/:id'), coffeeCtrl.create);
module.exports = router;
