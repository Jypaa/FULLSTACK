import { useState } from 'react'
import Persons from './components/person'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567'},
    { name: 'Ada Lovelace', number: '39-44-5323523'},
    { name: 'Dan Abramov', number: '12-43-234345'},
    { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [search, setNewSearch] = useState('')

  const personToShow = showAll
  ? persons
  : persons.filter(person =>  person.name.toLowerCase().includes(search.toLocaleLowerCase()))

  console.log(search)
  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  
  const handleSearhChange = (event) => {
    setShowAll(false)
    setNewSearch(event.target.value)
    
  }

  const addName = (event) => {
    event.preventDefault()
  
    let tosi = persons.some(person => person.name === newName)
    console.log("oliko", tosi)
    if(tosi===true){
      return(
        alert(`${newName} is already added to phonebook`)
      )
    }
    else{
      const personObject = {
        name: newName,
        number: newNumber}
    
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
      }
    }

  return (
    <div>  
      <h2>Phonebook</h2>
      <form>
        filter by name: <input value={search} onChange={handleSearhChange} />
      </form>
      <h2>Add a new</h2>
      <form onSubmit={addName}>
      <div> name: <input value={App.newName} onChange={handlePersonChange}/></div>
        <div> number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div> <button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personToShow.map(persons=> <Persons key={persons.id} value={persons} />)}
      </ul>
    </div>
  )

}

export default App