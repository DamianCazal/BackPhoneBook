import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'

function App() {

  const [persons, setPersons] = useState([])

  useEffect(() => {
    personsService
      .getAll()
      .then(response => setPersons(response))
  }, [])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [Search, setSearch] = useState(false)
  const [array, setArray] = useState([])
  const [changedPerson, setChangedPerson] = useState(null)

  const showMessage = (name, change, isSuccess) => {
    if (isSuccess) {
      setChangedPerson(`${change} ${name}`)
    } else {
      setChangedPerson(`${change} ${name} has already been removed from server`)
    }
    setTimeout(() => {
      setChangedPerson(null)
    }, 2000)

  }

  const handlePersons = (e) => {
    e.preventDefault()
    const isRepeated = persons.some(person => person.name === newName);
    const isRepeatedId = persons.find(person => person.name === newName);

    const newPerson = {
      name: newName,
      number: newPhone
    }

    if (isRepeated) {
      if (window.confirm(`${newName} is al ready added to phonebook, replace the old number witch a new one?`)) {
        personsService
          .update(isRepeatedId.id, newPerson)
          .then(response => {
            setPersons(persons.map(person => person.id === isRepeatedId.id ? response : person));
            showMessage(response.name, 'Change', true)
          })
          .catch(error => {
            showMessage(newPerson.name, 'Information of', false)
          })
      }
    } else {
      personsService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response));
          showMessage(response.name, 'Added', true)
        })
    }
  }

  const changeInputName = (e) => {
    setNewName(e.target.value)
  }

  const changeInputPhone = (e) => {
    setNewPhone(e.target.value)
  }

  const changeInputSearch = (e) => {
    const inputValue = e.target.value.toLowerCase();
    if (e.target.value === '') {
      setSearch(false)
      setArray(persons)
    } else {
      setSearch(true)
      let filterPersons = persons.filter(person => person.name.toLowerCase().includes(inputValue))
      setArray(filterPersons)
    }
  }

  const deletePerson = (obj) => {
    if (window.confirm(`delete ${obj.name}?`)) {
      personsService
        .deletePerson(obj.id)
        .then(response => setPersons(persons.filter(person => person.id !== response.id)))
    }
  }

  const listaMostrada = Search ? array : persons;

  return (
    <div>
      <h2>Phonebook con Render</h2>
      <Notification message={changedPerson} />
      <Filter event={changeInputSearch} />
      <h2>Add a new </h2>
      <PersonForm stateInputName={newName} eventName={changeInputName} stateInputPhone={newPhone} eventPhone={changeInputPhone} eventPersons={handlePersons} />
      <h2>Numbers</h2>
      <Persons array={listaMostrada} deletePerson={deletePerson} />
    </div>
  )
}

export default App
