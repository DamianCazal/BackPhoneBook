const express = require('express')
const app = express()
var morgan = require('morgan') 

morgan('tiny')

app.use(express.json())

//Datos
const data = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

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
  res.send('Servidor funcionando')
})

app.get('/api/persons', (req, res) => {
  res.json(data)
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

const generatedId = () => {
  return Math.round(Math.random() * 100)
}

app.post('/api/persons', (req, res) => {
  const id = Number(req.params.id)

  if(!req.body.name) return res.status(404).json({error: 'El nombre no existe'})

  if(data.some(person => person.name === req.body.name)) return res.status(404).json({error: 'El nombre debe ser unico'})

  if(!req.body.number) return res.status(404).json({error: 'El numero no existe'})

  const dataPost = {
    id: generatedId(),
    name: req.body.name,
    number: req.body.number
  }

  data.push(dataPost)

  res.json(data)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Servidor levantado en el puerto ${PORT}`)
})