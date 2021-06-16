import React, { useState } from 'react'

import { Button, Input } from '../components/styled'
import { addPrize } from '../services/participants'

const PrizeForm = () => {
  const [name, setName] = useState('')
  const [week, setWeek] = useState('')
  const [price, setPrice] = useState('')

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleWeekChange = (e) => {
    setWeek(e.target.value)
  }

  const handlePriceChange = (e) => {
    setPrice(e.target.value)
  }

  const addNewPrize = (e) => {
    e.preventDefault()
    addPrize({ name, week, price })
    setName('')
    setWeek('')
    setPrice('')
  }

  return (
    <div>
      <h2>Lisää palkinto</h2>
      <form onSubmit={addNewPrize}>
        Nimi: <Input as='input' type='text' value={name} onChange={handleNameChange} id='name' required /><br/>
        Viikko: <Input as='input' type='text' value={week} onChange={handleWeekChange} id='week' required /><br/>
        Hinta: <Input as='input' type='text' value={price} onChange={handlePriceChange} id='price' required /><br/>
        <Button as='button' type='submit'>Lisää</Button>
      </form>
    </div>
  )
}

export default PrizeForm