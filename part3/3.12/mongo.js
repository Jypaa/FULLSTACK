const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const phoneNumber = process.argv[4]

const url =
  `mongodb+srv://Jypa:${password}@cluster0.wkgbu5d.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
})

const Note = mongoose.model('Note', noteSchema)
/*
const note = new Note({
  name: 'HTML is Easy',
  phoneNumber: "112",
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})

Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
*/
if(process.argv.length<4){
Note.find({}).then(result => {
    console.log("Phonebook:")
    result.forEach(note => {
      console.log(note.name, note.phoneNumber)
    })
    mongoose.connection.close()
  })
}
else{
    const note = new Note({
        name: name,
        phoneNumber: phoneNumber,
      })
      
      note.save().then(result => {
        console.log('added', name, 'number', phoneNumber, 'to phonebook')
        mongoose.connection.close()
      })
}