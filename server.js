const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')
const bookRoute = require('./route/book')
const userRoute = require('./route/user')
const cors = require('cors')
const errors = require('./errors.js')
const mongoose = require('mongoose')
// const connString = "mongodb://localhost:27017/demoApi"
// const connString = "mongodb://127.0.0.1/demoApi"
const connString = "mongodb+srv://admin:admin@cluster0-w7rly.mongodb.net/bookapp?retryWrites=true&w=majority"

mongoose.connect(connString);

mongoose.connection.on("connected", () => console.log("Connected mondodb"))
mongoose.connection.on("disconnected", () => console.log("Disconnected"))

app.use(morgan("dev"))
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use("/api", bookRoute)
app.use("/api", userRoute)

// app.use("*", (req, res) => {
//     res.status(404).json(errors.routeNotExists);
// })

app.listen(80, () => console.log('Server started on port 4000'))