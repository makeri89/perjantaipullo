import React, { useState } from 'react'

import { addWinner } from '../services/winners'
import WinnerModal from './WinnerModal'
import { WeekInput, Input, Button, H3 } from './styled'

const LotteryForm = ({ initialWeek }) => {
  const [week, setWeek] = useState(initialWeek)
  const [prizeName, setPrizeName] = useState('')
  const [prizeValue, setPrizeValue] = useState(0)
  const [winner, setWinner] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleWeekChange = (e) => {
    setWeek(e.target.value)
  }

  const handleNameChange = (e) => {
    setPrizeName(e.target.value)
  }

  const handleValueChange = (e) => {
    setPrizeValue(e.target.value)
  }

  const confirmLottery = (e) => {
    e.preventDefault()
    if (confirm('Haluatko varmasti arpoa voittajan?\nArvonnan voi suorittaa vain kerran.')) {
      performLottery()
    }
  }

  const performLottery = () => {
    const prize = { name: prizeName, price: prizeValue }
    addWinner(week, prize).then(result => setWinner(result))
    setPrizeName('')
    setPrizeValue(0)
    setModalOpen(true)
  }

  return (
    <div>
      <H3>Arvonta</H3>
      <form onSubmit={confirmLottery}>
        Viikko: <WeekInput as='input' value={week} onChange={handleWeekChange} id='week' required /><br/>
        Palkinto: <Input as='input' value={prizeName} onChange={handleNameChange} id='name' required /><br/>
        Palkinnon arvo: <Input as='input' value={prizeValue} onChange={handleValueChange} id='value' required /><br/>
        <Button as='button' type='submit'>Suorita arvonta</Button>
      </form>
      {modalOpen === true
        ? <WinnerModal winner={winner} />
        : ''
      }
    </div>
  )
}

export default LotteryForm