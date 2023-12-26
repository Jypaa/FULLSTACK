const blogsRouter = require('express').Router()
const e = require('express')
const Blog = require('../models/models.js')
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')


blogsRouter.get("/" , async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

blogsRouter.post("/", async (request, response, next) => {
  const blog = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET,)
  console.log('decodedToken',decodedToken.id)
  console.log('decodedToken',decodedToken)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if(!user){
    return response.status(401).json({ error: 'user not found' })
  }
  if (!blog.title || !blog.url) {
    return response.status(400).json({
      error: 'bad request'
    });
  }
  
  const newBlog = new Blog({
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes || 0,
    user: user.id
  });

  const savedBlog = await newBlog.save();
  user.blogs = user.blogs.concat(savedBlog);
  await user.save();
  response.status(201).json(savedBlog);

})

blogsRouter.delete("/:id", async (request, response, next) => {
  const bloguser = request.user
  console.log('bloguser',bloguser)
  const decodedToken = jwt.verify(request.token, process.env.SECRET,)
  if(bloguser === decodedToken.id){
    await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
  }
  else{
    response.status(401).json({ error: 'token invalid' })
  }
  
})

blogsRouter.patch("/:id", async (request, response, next) => {
  await Blog.findByIdAndUpdate(request.params.id, request.body)
  response.status(204).end()
})

module.exports = blogsRouter

