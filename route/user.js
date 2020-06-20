"use strict"

// const router = require('express').Router({ mergeParams: true });

const express = require("express")
const userRoute = express.Router();
const userController = require("../controller/user")
const bookController = require("../controller/book")


// refresh page
userRoute.get("/", [userController.checkAuthenticate, userController.checkPermissions(({ action: 'read', resource: 'book' })), bookController.getListBooks, userController.getUser])

userRoute.get("/users", [userController.checkAuthenticate, userController.checkPermissions(({ action: 'read', resource: 'user' })), userController.getListUsers])

// userRoute.get("/register", userController.checkAuthenticate)
userRoute.post("/register", userController.validateRegister)

// userRoute.get("/login", [userController.checkAuthenticate, userController.getListUsers])
userRoute.post("/login", userController.validateLogin)

// userRoute.get("/login/:id", [userController.checkAuthenticate, userController.getUser])
// userRoute.delete("/login/:id", [userController.checkAuthenticate, userController.deleteUser])
// userRoute.put("/login/:id", [userController.checkAuthenticate, userController.updateUser])

module.exports = userRoute