const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  if (!username || !password || username.length < 3 || password.length < 3) {
    return response.status(400).json({
      error: 'invalid username or password'
    })
  }

  const users = await User.find({username: username})
  //console.log("found or not",users)
  if(users.length > 0){
    return response.status(400).json({
      error: 'username already exists'
    })
  }

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).find({}).populate('blogs')  
    response.json(users)
})

module.exports = usersRouter