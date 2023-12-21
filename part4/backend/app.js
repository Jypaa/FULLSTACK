const express = require('express')
const cors = require("cors");
const app = express()
const blogsRouter = require('./controllers/blog')

const mongoose = require('mongoose')
require('dotenv').config()
const url = process.env.MONGODB_URI
app.use(express.json())

app.use(cors());
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


app.use('/api/blogs', blogsRouter)

module.exports = app;