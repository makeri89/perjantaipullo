import React, { useState } from 'react'
import WeeklyList from './components/WeeklyList'
import ParticipantForm from './components/ParticipantForm'
import { Title, Button, Root } from './components/styled'

const App = () => {
  const [view, setView] = useState(true)

  const getCurrentWeek = () => {
    const date = new Date()
    date.setHours(0,0,0,0) // sets new date to midnight
    const yearFirst = new Date(date.getFullYear(), 0, 1)
    const days = Math.floor((date - yearFirst) / (1000 * 60 * 60 * 24))
    const currentWeek = Math.round((days + 4) / 7) // adding 4 starts a new week on saturday
    return currentWeek
  }

  const week = getCurrentWeek()

  return (
    <Root>
      <Title>Perjantaipulloarvonta</Title>
      <Button as='button' onClick={() => setView(true)}>Arvonta</Button>
      <Button as='button' onClick={() => setView(false)}>Lisää osallistuja</Button>
      {view === true
        ? <WeeklyList initialWeek={week} />
        : <ParticipantForm />}
    </Root>
  )
}

export default App
