const Coffee = require('../models/coffee')

module.exports = {
    index,
    show,
    description, //another show page
   // create,
}

function index(req, res){
    console.log('index function')
    res.render('coffees/index')
    // Coffee.find({},function (err, coffeeDocument){
    //     res.send(coffeeDocument)
    // })
}

function show(req, res){
    console.log(req.params.roastType, "<- req.params in show route")
    Coffee.find({"roastType": `${req.params.roastType}`}, function(err, coffeeDocument){
        console.log(coffeeDocument);
        // res.send(coffeeDocument) // will change to res.render
        res.render('coffees/show', {
            coffee: coffeeDocument
        })
    })
}
//^ looks through Coffee database and finds roastType: req.params(which is defined by hrefs in index page), then sends over all coffees

// function create(req, res){
//     console.log(req.body, "this is the create function in controllers/coffees")
    
//     Coffee.create(req.body, function(err, coffeeDocument){
//         console.log(coffeeDocument, "<coffeeDocument");
//     })
// }

function description(req, res){
    console.log(req.params, "req.params in description route")
    Coffee.findById(req.params.id, function(err, coffeeDocument){
        //res.send(coffeeDocument)
        console.log(coffeeDocument);
        console.log(req.user);
         res.render('coffees/description', {
             coffee: coffeeDocument,
            
         })

    })
}