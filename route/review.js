"use strict"

const express = require("express")
const reviewRouter = express.Router();
const userController = require("../controller/user")
const reviewController = require("../controller/review")

reviewRouter.get("/reviews/", [
    userController.checkAuthenticate,
    userController.checkPermissions({ action: 'read', resource: 'review' }),
    reviewController.getListReviews])
reviewRouter.get("/reviews/:reviewId", [
    // userController.checkAuthenticate, 
    // userController.checkPermissions({ action: 'read', resource: 'review' }), 
    reviewController.getReview])
reviewRouter.post("/reviews/", [
    // userController.checkAuthenticate,
    //  userController.checkPermissions({ action: 'create', resource: 'review' }),
    reviewController.createNewReview])
// reviewRouter.put("/reviews/:reviewId", [userController.checkAuthenticate, userController.checkPermissions({ action: 'update', resource: 'review' }), reviewController.updateReview])
reviewRouter.delete("/reviews/:reviewId", [userController.checkAuthenticate, userController.checkPermissions({ action: 'delete', resource: 'review' }), reviewController.deleteReview])

module.exports = reviewRouter