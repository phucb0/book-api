"use strict"

let User = require('../model/user')
let Book = require('../model/book')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
let salt = bcrypt.genSaltSync(10)
let secret = 'MTT';
const RBAC = require("../role");

async function getListUsers(req, res) {
    console.log('get-list-users')
    try {
        const users = await User.find({})
        console.log(users);
        res.json(users)
    } catch (err) {
        res.json(err)
    }
}

function checkPermissions(options) {

    return async function (req, res, next) {

        try {
            console.log('checkPermissions')
            const rbac = await RBAC();
            const can = await rbac.can(req.user.role, options.action, options.resource);

            if (can) {
                return next();
            }
            return res.json({ notify: "not have access" });
        } catch (error) {
            res.json({ notify: 'error: not have access' });
        }
    }
}

async function validateRegister(req, res) {
    try {
        const user = await User.findOne({
            username: req.body.username
        })
        // const users = await User.aggregate({
        //     $project: {
        //         username: 1,
        //         role: 1
        //     }
        // })
        console.log(user)
        if (!user) {
            const newUser = new User({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, salt),
                role: 'user'
            })
            await newUser.save()
            res.status(201).json({ message: 'Dang ky thanh cong' })
        } else {
            res.status(403).json({ errorMessage: 'Tai khoan da ton tai' })
        }
    } catch (err) {

    }
}

async function checkAuthenticate(req, res, next) {
    console.log('--------------------------------------')
    console.log('check-auth')
    console.log(req.params)
    try {
        console.log(req.headers)
        const temp = req.headers.authorization.split(" ")
        const token = temp[1];
        console.log('token' + token)
        const payload = await jwt.verify(token, secret)
        console.log(payload)
        req.user = {
            username: payload.username,
            role: payload.role
        }
        console.log(req.user)
        next()
    } catch (err) {
        // console.log('loiiiii')
        res.status(404).json({ errorMessage: err.message })
    }
}

async function validateLogin(req, res) {

    const user = await User.findOne({
        username: req.body.username
    })
    if (user) {
        console.log('called')
        const temp = bcrypt.compareSync(req.body.password, user.password)
        if (temp) {
            // jsonwebtoken
            const token = await jwt.sign({
                username: user.username,
                role: user.role
            }, secret);

            res.json({
                token: token,
                role: user.role,
                username: user.username,
                message: 'Dang nhap thanh cong'
            })
        }

        else {
            res.status(403).json({ errorMessage: 'Mat khau khong dung' })
        }
    } else {
        res.status(403).json({ errorMessage: 'Tai khoan khong ton tai' })
    }
}


async function getUser(req, res) {
    try {
        let fields;
        if (req.query.fields) {
            fields = req.query.fields.split(",")
        }
        let queryString = ""
        if (fields) {
            queryString = fields.join(" ")
        }

        const user = await User.findOne({ username: req.user.username })
        // .select(queryString)
        // .exec()

        res.json({
            username: user.username,
            role: user.role
        })
    } catch (err) {
        res.json(err)
    }
}

async function deleteUser(req, res) {
    try {
        await User.findOneAndRemove({ _id: req.params.id })
        res.status(204).json()
    } catch (err) {
        res.json(err)
    }
}

async function updateUser(req, res) {
    try {
        const data = await User.findOne({ _id: req.params.id })
        data.username = req.body.username || data.username
        data.password = req.body.password || data.password
        data.role = req.body.role || data.role
        await data.save()
        res.status(202).json(data)
    } catch (err) {
        res.json(err)
    }
}

module.exports = {
    getListUsers: getListUsers,
    validateRegister: validateRegister,
    checkAuthenticate: checkAuthenticate,
    validateLogin: validateLogin,
    getUser: getUser,
    deleteUser: deleteUser,
    updateUser: updateUser,
    checkPermissions: checkPermissions
}