const mongoose = require('mongoose')

const winnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  week: {
    type: Number,
    required: true
  },
  prize: {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  value: {
    type: Number,
    required: true
  },
  leftover: {
    type: Number,
    required: true
  }

})

module.exports = mongoose.model('Winner', winnerSchema)