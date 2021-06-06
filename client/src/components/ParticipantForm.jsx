import React, { useState } from 'react'

import { Button, Input } from '../components/styled'
import { addNew } from '../services/participants'

const ParticipantForm = () => {
  const [name, setName] = useState('')
  const [week, setWeek] = useState('')

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  const handleWeekChange = (e) => {
    setWeek(e.target.value)
  }

  const addParticipant = (e) => {
    e.preventDefault()
    addNew({ name, week })
    setName('')
    setWeek('')
  }

  return (
    <div>
      <h2>Lisää osallistuja</h2>
      <form onSubmit={addParticipant}>
        Nimi: <Input as='input' type='text' value={name} onChange={handleNameChange} id='name' required /><br/>
        Viikko: <Input as='input' type='text' value={week} onChange={handleWeekChange} id='week' required /><br/>
        <Button as='button' type='submit'>Lisää</Button>
      </form>
    </div>
  )
}

export default ParticipantForm