const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url)

const PersonSchema = new mongoose.Schema({
  name: {
    type:  String,
    required: [true, 'Debe ingresar un nombre'],
    minlength: 3,
    trim: true
  },
  number: {
    type: String,
    maxlength: 8,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d+$/.test(v);
      }
    },
    message: props => `${props.value} no es un número de teléfono válido. Debe tener el formato XX-XXXXXXX o XXX-XXXXXXX`
  },
})

module.exports = mongoose.model('Person', PersonSchema);