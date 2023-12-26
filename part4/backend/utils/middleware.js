const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Headers:', request.headers)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
  next()
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
const userExtractor = async (request, response, next) => {
  if(request.headers.authorization){
    console.log('request.headers.authorization',request.headers.authorization)
    const token = request.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET,)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = decodedToken.id
    request.user = user
    next()
  }
}

const tokenExtractor = (request, response, next) => {
  if(request.headers.authorization){
    const token = request.headers.authorization.split(" ")[1];
    request.token = token;
    next();
  }
  else{
    next()
  }
};

module.exports = {
  userExtractor,
  tokenExtractor,
  requestLogger,
  unknownEndpoint,
  errorHandler
}