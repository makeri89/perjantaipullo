/* eslint-disable indent */
import React, { useState, useEffect } from 'react'

import { getByWeek, getWinner } from '../services/participants'

const WeeklyList = ({ initialWeek }) => {
  const [participants, setParticipants] = useState([])
  const [winner, setWinner] = useState('')
  const [prize, setPrize] = useState(0)
  const [week, setWeek] = useState(initialWeek)

  useEffect(() => {
    getByWeek(week).then(result => setParticipants(result))
  }, [week])

  const handleLottery = () => {
    if (confirm('Haluatko varmasti arpoa voittajan?\nArvonnan voi suorittaa vain kerran.')) {
      getWinner(week).then(result => {
        setWinner(result.name)
        setPrize(result.prize)
      })
    }
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
      {winner !== ''
        ? <div>
            <h3>Voittaja on:</h3>
            <h4>{winner}</h4>
            Palkinnon arvo: {prize} euroa
          </div>
        : ''}
    </div>
  )
}

export default WeeklyList