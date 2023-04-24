const express = require("express");
const jsonwebtoken = require('jsonwebtoken')
const app = express();
require('dotenv').config()

// const userRoutes = require("./routes/user");
const authRoutes = require('./routes/auth')
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


// app.use(userRoutes);
app.use(authRoutes)


app.listen(3000, () => console.log("server started listening on port: 3000"));



// console.log('process: ', process.env.DB_HOST)
// console.log('process: ', process.env.DB_USER)
// console.log('process: ', process.env.DB_PORT)
// console.log('process: ', process.env.DB_NAME)
