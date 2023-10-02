import { useState, useEffect } from 'react'
import Persons from './components/person'
import personService from './service/person'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [search, setNewSearch] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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

  const addPerson = (event) => {
    event.preventDefault()
    
    console.log("kaikki",persons)
    console.log("nimi",newName)

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
      
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        
      })
    }

  }

  return (
    <div>  
      <h2>Phonebook</h2>
      <form>
        filter by name: <input value={search} onChange={handleSearhChange} />
      </form>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
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