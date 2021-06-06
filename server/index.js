require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Participant = require('./models/participant')
const Winner = require('./models/winner')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.get('/', (_req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/participants', async (_req, res) => {
  const participants = await Participant.find({})
  res.json(participants)
})

app.get('/api/participants/:week', async (req, res) => {
  const week = Number(req.params.week)
  const weekly_participants = await Participant.find({ weeks: week })
  res.json(weekly_participants)
})

app.get('/api/participants/winner/:week', async (req, res) => {
  const week = Number(req.params.week)
  let winner = await Winner.findOne({ week: week})
  if (winner) {
    res.json(winner)
  } else {
    const weekly_participants = await Participant.find({ weeks: week })
    const participants = weekly_participants.length
    const prize = participants * 3
    const index = Math.floor(Math.random() * participants)
    const winner = weekly_participants[index].name
    const savedWinner = new Winner({ name: winner, week, prize })
    savedWinner.save()
    res.json(savedWinner)
  }
  
})

app.post('/api/participants', async (req, res) => {
  let participant_to_update = await Participant.findOne({ name: req.body.name })
  if (participant_to_update) {
    participant_to_update.weeks = participant_to_update.weeks.concat(req.body.week)
    participant_to_update.save()
  } else {
    participant_to_update = new Participant({
      name: req.body.name,
      weeks: [req.body.week]
    })
    participant_to_update.save()
  }
  res.json(req.body)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})