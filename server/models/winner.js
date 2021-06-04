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
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Winner', winnerSchema)