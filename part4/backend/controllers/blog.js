const blogsRouter = require('express').Router()
const Blog = require('../models/models.js')


blogsRouter.get("/" , async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogsRouter.post("/", async (request, response, next) => {
  const blog = request.body;
  console.log('blog', blog);

  if (!blog.title || !blog.url) {
    return response.status(400).json({
      error: 'bad request'
    });
  }
  const newBlog = new Blog({
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes || 0
  });

  const savedBlog = await newBlog.save();
  response.status(201).json(savedBlog);

})

blogsRouter.delete("/:id", async (request, response, next) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.patch("/:id", async (request, response, next) => {
  await Blog.findByIdAndUpdate(request.params.id, request.body)
  response.status(204).end()
})

module.exports = blogsRouter

