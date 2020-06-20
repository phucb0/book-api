let mongoose = require('mongoose')
let Schema = mongoose.Schema;
let reviewSchema = require('./review')
var currencyFormatter = require('currency-formatter');

let bookSchema = new Schema({
    title: {
        type: String,
        unique: true
    },
    author: String,
    quantity: Number,
    owner: String,
    description: String,
    price: Number,
    reviews: [reviewSchema]
})

//unique

module.exports = mongoose.model("bookList", bookSchema, "bookList")