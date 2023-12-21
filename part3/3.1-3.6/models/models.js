const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

//console.log('connecting to', url)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    } , 
    number: {
      type: String,
      validate: {
        validator: (value) => {
          const regex = /^(?:\d{2,3}-\d+)$/;
          return regex.test(value) && value.length >= 8;
        },
        message: 'Invalid phone number format',
      },
      required: true,
    },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

module.exports = mongoose.model('Person', personSchema)