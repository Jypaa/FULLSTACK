const express = require('express')
const app = express()
app.use(express.json())
app.use(express.static('dist'))
const mongoose = require('mongoose')
require('dotenv').config()
const Person = require( './models/models.js')
//var morgan = require('morgan')
//const cors = require('cors')
//app.use(morgan(':method :url - :status - :response-time ms - :body - :res[content-length]'));
//app.use(cors())
//app.use(morgan(':method :url - :status - :response-time ms - :res[content-length]'));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",    
  },
  {
    id: 2,
    name: "Ada Lovalace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Marry Poppendick",
    number: "39-23-6423122",
  }
]

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/api/persons', (req, res) => {
  Person.find({}).then(result => {
    //console.log("Phonebook:")
    /*
    result.forEach(person => {
      res.json(person)
      //console.log(person.name, person.phoneNumber)
    })*/
    res.json(result)
    console.log('result', result)
    //mongoose.connection.close()
  })
})

app.get('/info', (req, res) => {
    res.send(`Phonebook has info for ${persons.length} people<br><br> ${Date()}`)
})  

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error));
})

app.patch('/api/persons/:id', (request, response, next) => {
  const personId = request.params.id;
  const { number } = request.body;

  if (!number) {
      return response.status(400).json({ 
          error: 'Number missing' 
      });
  }

  Person.findByIdAndUpdate(personId, { number }, { new: true })
      .then(updatedPerson => {
          if (!updatedPerson) {
              return response.status(404).json({ 
                  error: 'Person not found' 
              });
          }

          console.log('Updated number for', updatedPerson.name, 'to', updatedPerson.number);
          response.json(updatedPerson);
      })
      .catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  const personId = request.params.id;

  Person.findByIdAndDelete(personId)
    .then(deletedPerson => {
      if (deletedPerson) {
        response.json({ success: true, message: 'Person deleted successfully' });
      } else {
        response.status(404).json({ success: false, message: 'Person not found' });
      }
    })
    .catch(error => next(error));
})

app.post('/api/persons',async (request, response, next)  => {
  const body = request.body;
  console.log('body', body)

  if (!body.name || !body.number) {
      return response.status(400).json({ 
          error: 'Name and/or number missing' 
      });
  }

  await Person.findOne({ name: body.name })
      .then(existingPerson => {
          if (existingPerson) {
              return response.status(400).json({ 
                  error: 'Name must be unique' 
              });
          }
          
          const newPerson = new Person({
              name: body.name,
              number: body.number,
          });
          
          
          return newPerson.save();
                
      })

      .then(savedPerson => {
          console.log('Added', savedPerson.name, 'number', savedPerson.number, 'to phonebook');
          response.json(savedPerson);
      })
      .catch(error => next(error));
});

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)