import React, { useState, useEffect } from 'react'

import { getByWeek, getWinner } from '../services/participants'

const WeeklyList = ({ initialWeek }) => {
  const [participants, setParticipants] = useState([])
  const [winner, setWinner] = useState('')
  const [week, setWeek] = useState(initialWeek)

  useEffect(() => {
    getByWeek(week).then(result => setParticipants(result))
  }, [week])

  const handleLottery = () => {
    getWinner(week).then(result => setWinner(result.name))
  }

  const handleWeekChange = (e) => {
    setWeek(e.target.value)
  }

  return (
    <div>
      Viikko: <input type='text' value={week} onChange={handleWeekChange} id='week' /><br/>
      <h2>Arvontaan osallistuvat viikolla {week}:</h2>
      {participants.map(p => (
        <div key={p._id}>
          <p>{p.name}</p>
        </div>
      ))}
      <button onClick={handleLottery}>Suorita arvonta</button><br/><br/>

      <h3>Voittaja on:</h3>
      {winner}
    </div>
  )
}

export default WeeklyList