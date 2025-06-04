
// if (process.argv.length<4) {
//   return Person.find({}).then( persons => {
//     console.log('Phonebook:')
//     persons.forEach( person => {
//       console.log(`${person.name} ${person.number}`)
//     })
//     mongoose.connection.close()
//   })
// }


// const person = new Person({
//   name: process.argv[3],
//   number: process.argv[4],
// })

// person.save().then(result => {
//   console.log(`added ${result.name} number ${result.number} to phonebook`)
//   mongoose.connection.close()
// })