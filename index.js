require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Person = require('./models/person.js')

let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.use(express.static(path.join(__dirname, '/front/dist')))

const url = process.env.MONGODB_URI
mongoose.connect(url)

const generoiId = () => {
  const maxId = 99999999
  return Math.floor(Math.random() * maxId) 
}

app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
  .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
.catch(error => next(error))

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
        response.status(204).end()
      })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  Person.findOneAndUpdate(request.params.id, request.params.body)
    .then(response => {
      response.status(200).end()
    })
  .catch(error => next(error))
})

app.get('/info', (request, response, next) => {
  const Aika = new Date()
  const Luettelo = persons.length
  
  response.send(`
    <div>
      <p>Phonebook has info for ${Luettelo} people</p>
      <p>${Aika}</p>
    </div>
  `)
  })
  .catch(error => next(error))
})

app.get('*', (request, response, next) => {
  res.sendFile(path.join(__dirname, '/front/dist', 'index.html'))
  })
  .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  }

  next(error)

}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})