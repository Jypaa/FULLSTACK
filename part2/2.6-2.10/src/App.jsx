import { useState, useEffect } from 'react'
import Persons from './components/Person'
import personService from './service/person'
import Notification from './components/Notification'
import NotificationDelete  from './components/NotificationDelete'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [search, setNewSearch] = useState('')
  const [Message, setMessage] = useState(null)
  const [MessageDelete, setDeleteMessage] = useState(null)

  useEffect(()  => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const poista =(event, name) =>{ 
    if(window.confirm("Delete "+ name)){
      setDeleteMessage(`Deleted person ${name}`)
    personService
      .poista(event)    
      .then(()=>{ setPersons(persons.filter(item =>item.id !== event))
      })
    setTimeout(() => {
        setDeleteMessage(null)
      }, 5000)
    }   
  }

  const personToShow = showAll
  ? persons
  : persons.filter(person =>  person.name.toLowerCase().includes(search.toLocaleLowerCase()))


  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleSearhChange = (event) => {
    setShowAll(false)
    setNewSearch(event.target.value)
    
  }
  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^(?:\d{2,3}-\d+)$/;
    
    return regex.test(phoneNumber) && phoneNumber.length >= 8;
  };
  const addPerson = async (event) => {
    event.preventDefault()
    if(newName.length < 3){
      setDeleteMessage(
        `Person validation failed:name: ('${newName}')is shortes than the minimum allowed length (3).`
      )
      setTimeout(() => {
        setDeleteMessage(null)
      }, 5000)
      return
    }
    if(validatePhoneNumber(newNumber)===false){
      setDeleteMessage(
        `Person validation failed:number: ('${newNumber}')is no allowed(atleat 8 digits and 2 or 3 number before -).`
      )
      setTimeout(() => {
        setDeleteMessage(null)
      }, 5000)
      return
    }

    let tosi = persons.some(person => person.name === newName)
    if(tosi===true){
      if(newNumber != ''){
        const person = persons.find(person => person.name === newName)
        const personObject = {
          id: person.id,
          number: newNumber}  
        setPersons([persons.pop(person)])

        await personService
        .update(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson)) 
          setNewName('')
          setNewNumber('')
        } )
        .catch(error => {
          console.log(error)
          setDeleteMessage(
            `Person '${person.name}' was already removed from server`
          )
          
          })
          personService
          .getAll()
          .then(initialPersons => {
            setPersons(initialPersons)
          
        })
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        
     
      
      }
      else{
      return(
        alert(`${newName} is already added to phonebook`)
      )}
    }

    else{    
      const personObject = {
      name: newName,
      number: newNumber}
      setPersons(persons.concat(personObject))
      setMessage(`Added person ${newName}`)
      setNewName('')
      setNewNumber('')   
      
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

  }

  return (
    <div>  
      <h2>Phonebook</h2>
      <Notification message={Message} />
      <NotificationDelete message={MessageDelete} />
      <form>
        filter by name: <input value={search} onChange={handleSearhChange} />
      </form>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
      <div> name: <input value={newName} onChange={handlePersonChange}/></div>
        <div> number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div> <button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <ul style ={{listStyle:'none'}}>
     
      {personToShow.map(persons=>    
        <Persons
          key={persons.id}
          value={persons}  
          poistettava={()=>poista(persons.id, persons.name)}
          text = 'Delete'    
          />
      )}
      </ul>
    </div>
  )
}

export default App