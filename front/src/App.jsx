import { useState, useEffect } from 'react'
import service from '../service.js'



const PersonForm = ({
  newName,
  newNumber,
  addName,
  addNumber,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={addName}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={addNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({ persons, handleDelete }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Person key={person.id} person={person} handleDelete={handleDelete}/>
      ))}
    </ul>
  )
}

const Person = ({ person, handleDelete }) => {
  return (
    <li>
    {person.name} {person.number}
    <button onClick={() => handleDelete(person.id)}>delete</button>
  </li>
  )
}



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  useEffect(() => {
    service.getAll().then((response) => {
      setPersons(response.data)
    })
  })

  const addName = (event) => {
    setNewName(event.target.value)
  }

  const addNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = { name: newName, number: newNumber }

    service.create(newPerson).then((response) => {
        setPersons([...persons, response.data])
        setNewName("")
        setNewNumber("")
      })
    }

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this contact?')

    if (confirmDelete) {
      service.delete(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id))
      })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        addName={addName}
        addNumber={addNumber}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App;