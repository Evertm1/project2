const Coffee = require('../models/coffee');

module.exports = {
	create,
    delete: deleteReview, 
}


function create(req, res){
    console.log(req.user)
    let formObj ={ 
        rating: req.body.rating,
        userId: req.user.id, 
        userName: req.user.name,
        text: req.body.text,  // push object into line 18 instead of req.body
    }
    console.log(req.params.id, "req.params.id in create function")
    console.log(req.body, "req.body - contents of the form")
    Coffee.findById(req.params.id, function (err, coffeeDocument){
        coffeeDocument.reviews.push(formObj); // replace req.body with obj
        coffeeDocument.save(function(err){
            console.log(coffeeDocument)
            console.log(formObj, "< formObj")
            res.redirect(`/coffees/description/${coffeeDocument._id}`)
        })
    })

}

 function deleteReview(req, res){
     // query the particlular review on a given coffee object
    
        Coffee.findById(req.params.id, async function (err, coffeeDocument){
        try {
            console.log("delete function");
        coffeeDocument.reviews.pull( {_id: req.params.reviewId})
        await coffeeDocument.save()
        res.redirect(`/coffees/description/${coffeeDocument._id}`)
        } catch (error) {
            console.log(error)
        }
        
    })}

