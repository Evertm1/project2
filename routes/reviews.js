const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');


router.post('/coffees/description/:id', reviewsCtrl.create);
router.delete('/coffees/description/:id/:reviewId', reviewsCtrl.delete);

module.exports = router;