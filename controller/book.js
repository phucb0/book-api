"use strict"

let Book = require('../model/book')
let User = require('../model/user')
const errors = require('../errors.js')
const jwt = require('jsonwebtoken')
let secret = 'MTT';

async function getListBooks(req, res) {
    console.log('get-list-books')
    try {
        let books = []
        let users = []
        if (req.user.role === 'admin') {
            books = await Book.find({})
            users = await User.find({})
        } else if (req.user.role === 'user') {
            books = await Book.find({ owner: req.user.username })
        }
        // console.log(users)
        // console.log(books)
        res.json({
            users: users,
            books: books,
            username: req.user.username,
            role: req.user.role
        })
    } catch (err) {
        res.json(err)
    }
}

async function createNewBook(req, res) {
    console.log('createNewBook')
    try {
        const book = await Book.findOne({
            title: req.body.title
        })

        if (!book) {
            const newBook = new Book({
                title: req.body.title,
                author: req.body.author,
                quantity: req.body.quantity,
                price: req.body.price,
                description: req.body.description,
                owner: req.user.username
            })
            await newBook.save()
            res.status(201).json({
                newBook,
                message: 'Them sach thanh cong'
            })
        }
    } catch (err) {
        console.log('err ' + err)
        res.json({ errorMessage: 'Sach da duoc tao' })
    }
}

async function getBook(req, res) {
    console.log('tim-sach')
    let fields;
    if (req.query.fields) {
        fields = req.query.fields.split(",")
    }
    let queryString = ""
    if (fields) {
        queryString = fields.join(" ")
    }
    console.log('queryString' + queryString)
    try {
        const book = await Book.findOne({ _id: req.params.id })
            .select(queryString)
            .exec()
        console.log(book)
        res.json(book)
    } catch (err) {
        res.json(err)
    }
}

async function deleteBook(req, res) {
    console.log('xoa-sach')
    try {
        await Book.findOneAndRemove({ _id: req.params.id })
        res.status(200).json({
            message: 'Xoa thanh cong'
        })
    } catch (err) {
        res.status(404).json({ errorMessage: 'Khong tim thay user' })
    }
}

async function updateBook(req, res) {
    console.log('update-book')
    try {
        console.log(req.params)
        const data = await Book.findOne({ _id: req.params.id })
        Object.assign(data, req.body)
        await data.save()
        res.json({ message: 'Cap nhat thanh cong' })
    } catch (err) {
        res.json(err)
    }
}

module.exports = {
    getListBooks: getListBooks,
    createNewBook: createNewBook,
    deleteBook: deleteBook,
    updateBook: updateBook,
    getBook: getBook,

}
