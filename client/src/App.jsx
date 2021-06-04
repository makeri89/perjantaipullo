import React, { useState, useEffect } from 'react'
import WeeklyList from './components/WeeklyList'
import ParticipantForm from './components/ParticipantForm'

const App = () => {
  const [week, setWeek] = useState(0)

  useEffect(() => {
    const date = new Date()
    date.setHours(0,0,0,0) // sets new date to midnight
    const yearFirst = new Date(date.getFullYear(), 0, 1)
    const days = Math.floor((date - yearFirst) / (1000 * 60 * 60 * 24))
    const currentWeek = Math.round((days + 4) / 7) // adding 4 starts a new week on saturday
    setWeek(currentWeek)
  }, [])

  const handleWeekChange = (e) => {
    setWeek(e.target.value)
  }

  return (
    <div>
      <h1>Perjantaipulloarvonta</h1>
      <form>
      Viikko: <input type='text' value={week} onChange={handleWeekChange} id='week' /><br/>
      </form>
      <WeeklyList week={week} />
      <ParticipantForm />
    </div>
  )
}

export default App
