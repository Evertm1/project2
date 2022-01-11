const mongoose = require('mongoose');

// Create your User Model
// Must include the googleId like in the passport example app

const reviewSchema = new mongoose.Schema({
    text: String,
    rating: { type: Number, min: 1, max: 5},
    //userId: {type: Schema.Types.ObjectId, ref: 'User'}
//  userName: String,  --- reference name in user model
//  date: Date,

},
{
    timestamps: true,
}
);
const coffeeSchema = new mongoose.Schema({
    coffeeName: String,
    roaster: String,
    description: String,
    roastType: String, // <-- This property needs to be on your user model for your project
    reviews: [reviewSchema] // embed reviews schema
  }, {
    timestamps: true
  });
  
  module.exports = mongoose.model('Coffee', coffeeSchema);