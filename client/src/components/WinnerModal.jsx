import React from 'react'

import { useHistory } from 'react-router-dom'
import { Modal, ModalContent, SubTitle, H4, Button } from './styled'

const WinnerModal = ({ winner }) => {
  const history = useHistory()
  if (winner === null) {
    return <div></div>
  }

  const handleClick = (e) => {
    e.preventDefault()
    history.push('/voittajat')
  }

  return (
    <Modal>
      <ModalContent>
        <SubTitle>Voittaja on:</SubTitle>
        <H4>{winner.name}</H4>
        <Button as='button' onClick={handleClick}>Ok</Button>
      </ModalContent>
    </Modal>
  )
}

export default WinnerModal