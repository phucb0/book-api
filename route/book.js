"use strict"

const express = require("express")
const bookRouter = express.Router();
const bookController = require("../controller/book")
const userController = require("../controller/user")
const reviewController = require("../controller/review")
const reviewRouter = require("../route/review")

bookRouter.get("/books", [
    userController.checkAuthenticate,
    userController.checkPermissions({ action: 'read', resource: 'book' }),
    bookController.getListBooks])
bookRouter.post("/books", [userController.checkAuthenticate, userController.checkPermissions({ action: 'create', resource: 'book' }), bookController.createNewBook])

bookRouter.get("/books/:id", [userController.checkAuthenticate, userController.checkPermissions({ action: 'read', resource: 'book' }), bookController.getBook])
bookRouter.put("/books/:id", [userController.checkAuthenticate, userController.checkPermissions({ action: 'update', resource: 'book' }), bookController.updateBook])
bookRouter.delete("/books/:id", [userController.checkAuthenticate, userController.checkPermissions({ action: 'delete', resource: 'book' }), bookController.deleteBook])

bookRouter.get("/books/:bookId/reviews/", [userController.checkAuthenticate, userController.checkPermissions({ action: 'read', resource: 'review' }), reviewController.getListReviews])
bookRouter.post("/books/:bookId/reviews/", [userController.checkAuthenticate, userController.checkPermissions({ action: 'create', resource: 'review' }), reviewController.createNewReview])
// bookRouter.put("/books/:bookId/reviews/:reviewId", [userController.checkAuthenticate, userController.checkPermissions({ action: 'update', resource: 'review' }), reviewController.updateReview])
bookRouter.delete("/books/:bookId/reviews/:reviewId", [userController.checkAuthenticate, userController.checkPermissions({ action: 'delete', resource: 'review' }), reviewController.deleteReview])

// bookRouter.use("books/:bookId", reviewRouter)
module.exports = bookRouter