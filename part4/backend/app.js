const express = require('express')
const cors = require("cors");
const app = express()

const blogsRouter = require('./controllers/blog')
const usersRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')

require('express-async-errors')

const config = require('./utils/config')
const logger = require('./utils/logger')
const {URL, PORT} = require('./utils/config')
const middleware = require('./utils/middleware')
app.use(express.json())

const mongoose = require('mongoose')
require('dotenv').config()

//const url = process.env.MONGODB_URI
mongoose.set('strictQuery', false)


app.use(cors());
mongoose.connect(URL)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use('/api/users', usersRouter)
app.use(middleware.errorHandler)
app.use('/api/login', loginRouter)
app.use(middleware.userExtractor)
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogsRouter)



app.use(middleware.unknownEndpoint)


module.exports = app;