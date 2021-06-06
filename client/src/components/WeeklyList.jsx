/* eslint-disable indent */
import React, { useState, useEffect } from 'react'

import { Button, SubTitle, WeekInput, H3, H4 } from '../components/styled'
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
      setTimeout(pickWinner, 3000)
    }
  }

  const pickWinner = () => {
    getWinner(week).then(result => {
      setWinner(result.name)
      setPrize(result.prize)
    })
  }

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
      <Button as='button' onClick={handleLottery}>Suorita arvonta</Button><br/><br/>
      {winner !== ''
        ? <div>
            <H3>Voittaja on:</H3>
            <H4>{winner}</H4>
            Palkinnon arvo: {prize} euroa
          </div>
        : ''}
    </div>
  )
}

export default WeeklyList