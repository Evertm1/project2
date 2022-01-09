module.exports = {
    index,
}

function index(req, res){
    console.log('index function')
    res.render('coffees/index')
}