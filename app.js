const express = require("express");
const jsonwebtoken = require('jsonwebtoken')
const app = express();
require('dotenv').config()

// const userRoutes = require("./routes/user");
const rootRouter = require('./routes')
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


// app.use(userRoutes);
app.use(rootRouter)

app.listen(3000, () => console.log("SEVER started listening on port: 3000"));
