"use strict"
let Book = require('../model/book')
let Review = require('../model/review')
const errors = require('../errors.js')

async function getListReviews(req, res) {
    try {
        const book = await Book.findOne({ _id: req.params.bookId })
        res.json(book.reviews)
    } catch (err) {
        res.status(404).json(errors.bookNotExists)
    }
}

async function createNewReview(req, res) {
    console.log('create-new-review')
    try {
        const book = await Book.findOne({ _id: req.params.bookId })
        const newReview = {
            author: req.body.author,
            rating: req.body.rating,
            content: req.body.content
        }
        book.reviews.push(newReview);
        await book.save();
        res.status(201).json(book.reviews);
    } catch (err) {
        res.status(404).json(errors.bookNotExists)
    }
}

async function getReview(req, res) {
    try {
        const book = await Book.findOne({ _id: req.params.bookId })
        try {
            const review = await book.reviews.findOne({ _id: req.params.reviewId })
            res.json(review)
        } catch (err) {
            res.status(404).json(errors.reviewNotExists)
        }
    } catch (err) {
        res.status(404).json(errors.bookNotExists)
    }
}

async function updateReview(req, res) {
    try {
        const book = await Book.findOne({ _id: req.params.bookId })
        try {
            const review = await book.reviews.findOne({ _id: req.params.reviewId })
            review.author = req.body.author || review.author
            review.rating = req.body.rating || review.rating
            review.content = req.body.content || review.content
            await book.save()
        } catch (err) {
            res.status(404).json(errors.reviewNotExists)
        }
    }
    catch (err) {
        res.status(404).json(errors.reviewNotExists)
    }
}

async function deleteReview(req, res) {
    try {
        const book = await Book.findOne({ _id: req.params.bookId })
        try {
            let review = await book.reviews.find(review => review._id == req.params.reviewId)
            await review.remove()
            await book.save()
            res.json({ message: 'Xoa review thanh cong' })
        } catch (err) {
            res.status(404).json(errors.reviewNotExists)
        }
    } catch (err) {
        res.status(404).json(errors.bookNotExists)
    }

}

module.exports = {
    getListReviews: getListReviews,
    createNewReview: createNewReview,
    getReview: getReview,
    updateReview: updateReview,
    deleteReview: deleteReview,
}