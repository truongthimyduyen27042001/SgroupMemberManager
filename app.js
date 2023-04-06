const express = require('express')

const mongoose = require('mongoose')

const routes = require('./routes')
const todoRoutes = require('./routes/todo')

const app = express()

// connection to mongodb]
mongoose.connect("mongodb://localhost/todo_express", {
  useNewURLParser: true,
  useUnifiedTopology: true
})

//middlewares 
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.engine('ejs', require('ejs').__express);

//routes 
app.use(routes)
app.use(todoRoutes)

//server configurations....
app.listen(3000, () => console.log('server started listening on port: 3000'))