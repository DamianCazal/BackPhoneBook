const express = require('express')
const app = express()
var morgan = require('morgan') 
const cors = require('cors')
require('dotenv').config()

const Person = require('../back-end/models/person.js')

morgan('tiny')

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
//Middlewares
app.use(requestLogger)



app.get('/', (req, res) => {
  res.send('Servidor funcionando con Render')
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then( person => res.json(person))
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = data.find( person => person.id === id)

  if (!person) {
    return res.status(404).send(`Persona no encontrada con el id ${id}`)
  }
  res.json(person)
})

app.get('/info', (req, res) => {
  const numberOfPeople = data.length
  const currentDate = new Date()
  
  res.send(`
    <p>Phonebook has info for ${numberOfPeople} people</p>
    <p>${currentDate}</p>
  `)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)

  const persons = data.filter( person => person.id !== id)
  res.json(persons)
})

app.post('/api/persons', (req, res) => {
  // if(!req.body.name) return res.status(404).json({error: 'El nombre no existe'})
  // if(data.some(person => person.name === req.body.name)) return res.status(404).json({error: 'El nombre debe ser unico'})
  // if(!req.body.number) return res.status(404).json({error: 'El numero no existe'})

  const newPerson = new Person({
    name: req.body.name,
    number: req.body.number
  })

  newPerson.save().then( savedPerson => res.json(savedPerson))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Servidor levantado en el puerto ${PORT}`)
})