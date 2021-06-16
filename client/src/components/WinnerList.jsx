import React, { useState, useEffect } from 'react'

import { getWinners } from '../services/winners'
import { SubTitle, H4 } from './styled'

const WinnerList = () => {
  const [winners, setWinners] = useState([])

  useEffect(() => {
    getWinners().then(result => setWinners(result))
  }, [])

  return (
    <div>
      <SubTitle>Aiemmat voittajat</SubTitle>
      {winners.map(winner => (
        <div key={winner._id}>
          <H4>Viikko {winner.week}:</H4>
          <strong>{winner.name}</strong> <br />
          palkinto: {winner.prize.name}, {winner.prize.price} euroa
        </div>
      ))}
    </div>
  )
}

export default WinnerList
