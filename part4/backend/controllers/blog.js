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

  return newBlog
    .save()
    .then(result => {
      response.status(201).json(result);
    })
    .catch(error => next(error));  // Move this line to align with the 'then' block
});

    /*
  Blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })*/

module.exports = blogsRouter

