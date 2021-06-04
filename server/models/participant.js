const mongoose = require('mongoose')

const participantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  weeks: [Number]
})

module.exports = mongoose.model('Participant', participantSchema)