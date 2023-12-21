const blogsRouter = require('express').Router()
const Blog = require('../models/models.js')


blogsRouter.get("/" , (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
}
)

blogsRouter.post("/" ,async (request, response) => {
  const blog = request.body
  console.log('blog', blog)

  const newBlog = new Blog({
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
    })
    return newBlog.save()
    .then(result => {
      response.status(201).json(result)
    })/*
  Blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })*/
}
)
module.exports = blogsRouter

