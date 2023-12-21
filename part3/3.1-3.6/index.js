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

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const personId = request.params.id;

  Person.findByIdAndDelete(personId)
    .then(deletedPerson => {
      if (deletedPerson) {
        response.json({ success: true, message: 'Person deleted successfully' });
      } else {
        response.status(404).json({ success: false, message: 'Person not found' });
      }
    })
    .catch(error => {
      console.error("Error deleting person:", error);
      response.status(500).json({ error: "Internal Server Error" });
    });
})

app.post('/api/persons', (request, response) => {
  const body = request.body;
  console.log('body', body)

  if (!body.name || !body.number) {
      return response.status(400).json({ 
          error: 'Name and/or number missing' 
      });
  }

 
  Person.findOne({ name: body.name })
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
      .catch(error => {
          console.error('Error adding person:', error);
          response.status(500).json({ error: 'Internal Server Error' });
      });
});

/*
const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
}*/

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)