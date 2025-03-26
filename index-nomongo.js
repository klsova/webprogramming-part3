const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const path = require('path')

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

const generoiId = () => {
  const maxId = 99999999
  return Math.floor(Math.random() * maxId) 
}

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)
  
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'Nimi tai numero puuttuu' 
    })
  }

  const nameExists = persons.some(person => person.name === body.name)
  if (nameExists) {
    return response.status(400).json({ 
      error: 'Nimen täytyy olla uniikki' 
    })
  }

  const person = {
    id: generoiId().toString(),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)
  response.json(person)
})

app.get('/info', (request, response) => {
  const Aika = new Date()
  const Luettelo = persons.length
  
  response.send(`
    <div>
      <p>Phonebook has info for ${Luettelo} people</p>
      <p>${Aika}</p>
    </div>
  `)
})

app.get('*', (request, response) => {
  res.sendFile(path.join(__dirname, '/front/dist', 'index.html'))
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})