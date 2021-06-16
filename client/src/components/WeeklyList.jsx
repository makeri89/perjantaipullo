/* eslint-disable indent */
import React, { useState, useEffect } from 'react'

import { SubTitle, WeekInput } from '../components/styled'
import { getByWeek } from '../services/participants'

const WeeklyList = ({ initialWeek }) => {
  const [participants, setParticipants] = useState([])
  const [week, setWeek] = useState(initialWeek)

  useEffect(() => {
    getByWeek(week).then(result => setParticipants(result))
  }, [week])

  const handleWeekChange = (e) => {
    setWeek(e.target.value)
  }

  return (
    <div>
      Viikko: <WeekInput as='input' type='text' value={week} onChange={handleWeekChange} id='week' /><br/>
      <SubTitle>Arvontaan osallistuvat viikolla {week}:</SubTitle>
      {participants.map(p => (
        <div key={p._id}>
          {p.name}
        </div>
      ))}
    </div>
  )
}

export default WeeklyList