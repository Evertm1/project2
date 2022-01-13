const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');


//router.post('/coffees/description/:id', reviewsCtrl.create); < original route

router.post('/coffees/description/:id', isLoggedIn, reviewsCtrl.create);

router.delete('/coffees/description/:id/:reviewId', reviewsCtrl.delete);
router.put('/coffees/description/:id/:reviewId', reviewsCtrl.update);

function isLoggedIn(req, res, next) {
	// req.isAuthenticated() this is given to us by passport
	// it returns true or false
	if ( req.isAuthenticated() ) return next(); // next() go to the next function in middleware, above situation studentsCtrl.addFact
	res.redirect('/auth/google'); // redirect them to login
}



module.exports = router;