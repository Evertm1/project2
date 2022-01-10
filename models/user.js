const mongoose = require('mongoose');

// Create your User Model
// Must include the googleId like in the passport example app


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    googleId: String // <-- This property needs to be on your user model for your project
//  reviews: [reviewSchema] // embed reviews schema
  }, {
    timestamps: true
  });
  
  module.exports = mongoose.model('User', userSchema);