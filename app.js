const express = require('express')
const cors = require('cors')
const app = express()
// const taskController = require('./controllers/taskController')
// const usersController = require('./controllers/usersController')

//Middleware
app.use(cors())
app.use(express.json())
// app.use('/tasks', taskController)
// app.use('/users', usersController)

app.get('/', (req, res)  =>{
    res.send("This is the index page" )
})

module.exports = app