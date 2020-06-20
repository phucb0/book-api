let mongoose = require('mongoose');

let reviewSchema = new mongoose.Schema({
    author: String,
    // rating: { type: Number, required: true, min: 0, max: 5 },
    rating: { 
        type: Number, min:0, max:5, 
        required: true
    }, 
    content: String,
    created_at: {
        type: Date,
        "default": Date.now
    }
})

// mongoosejs.com --> schematypes
module.exports = reviewSchema;