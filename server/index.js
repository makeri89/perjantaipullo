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

const getCurrentWeek = () => {
  const date = new Date()
  date.setHours(0,0,0,0) // sets new date to midnight
  const yearFirst = new Date(date.getFullYear(), 0, 1)
  const days = Math.floor((date - yearFirst) / (1000 * 60 * 60 * 24))
  const currentWeek = Math.round((days + 4) / 7) // adding 4 starts a new week on saturday
  return currentWeek
}

app.get('/', (_req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/participants', async (_req, res) => {
  const participants = await Participant.find({})
  res.json(participants)
})

app.get('/api/participants/:week', async (req, res) => {
  let week = Number(req.params.week)
  week = week || 0
  const weekly_participants = await Participant.find({ weeks: week })
  res.json(weekly_participants)
})

app.get('/api/winner', async (_req, res) => {
  const winners = await Winner.find({})
  res.json(winners)
})

app.get('/api/winner/:week', async (req, res) => {
  const week = Number(req.params.week)
  const winner = await Winner.findOne({ week: week })
  res.json(winner)
})

app.get('/api/currentweek', (_req, res) => {
  res.json(getCurrentWeek())
})

app.post('/api/participants', async (req, res) => {
  let participant_to_update = await Participant.findOne({ name: req.body.name })
  if (participant_to_update) {
    participant_to_update.weeks = participant_to_update.weeks.concat(req.body.week)
    await participant_to_update.save()
  } else {
    participant_to_update = new Participant({
      name: req.body.name,
      weeks: [req.body.week]
    })
    await participant_to_update.save()
  }
  res.json(req.body)
})

app.post('/api/winner', async (req, res) => {
  const week = Number(req.body.week)
  const weekly_participants = await Participant.find({ weeks: week })
  const participants = weekly_participants.length
  const value = participants * 3
  const index = Math.floor(Math.random() * participants)
  const winner_name = weekly_participants[index].name
  const last_winner = await Winner.findOne({ week: week - 1 })
  let leftover = value - req.body.prize.price
  if (last_winner) {
    leftover += last_winner.leftover
  }
  const savedWinner = new Winner({
    name: winner_name,
    week: week,
    prize: req.body.prize,
    value: value,
    leftover: leftover
  })
  await savedWinner.save()
  res.json(savedWinner)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})