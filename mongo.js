require('dotenv').config()
const mongoose = require('mongoose')

if (process.argv.length<2) {
  console.log('insert <password> <name> <number>')
  process.exit(1)
}


const name = process.argv[2]

const number = process.argv[3]

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 2) {
    console.log("phonebook: ")
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}

else if (process.argv.length === 4) {
    const person = new Person({
        name: name,
        number: number,
    })


    person.save().then(result => {
        console.log('added to phonebook')
    mongoose.connection.close()
    })
}