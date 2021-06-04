import React, { useState, useEffect } from 'react'

import { getByWeek, getWinner } from '../services/participants'

const WeeklyList = ({ week }) => {
  const [participants, setParticipants] = useState([])
  const [winner, setWinner] = useState('')

  useEffect(() => {
    getByWeek(week).then(result => setParticipants(result))
  }, [week])

  const handleLottery = (e) => {
    getWinner(week).then(result => setWinner(result.name))
  }
  
  return (
    <div>
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