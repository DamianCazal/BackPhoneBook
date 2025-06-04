const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://Damian:${password}@cluster0.x3erz6f.mongodb.net/PhoneBook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const PersonSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', PersonSchema)

if (process.argv.length<4) {
  return Person.find({}).then( persons => {
    console.log('Phonebook:')
    persons.forEach( person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}


const person = new Person({
  name: process.argv[3],
  number: process.argv[4],
})

person.save().then(result => {
  console.log(`added ${result.name} number ${result.number} to phonebook`)
  mongoose.connection.close()
})