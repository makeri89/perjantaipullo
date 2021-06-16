import styled from 'styled-components'

export const Title = styled.h1`
  margin: 0 0 -10px 0;
`

export const SubTitle = styled.h2`
  margin: 0 0 -5px 0;
`

export const H3 = styled.h3`
  font-size: 1.5em;
  margin: -8px;
`

export const H4 = styled.h4`
  font-size: 1.3em;
  margin: -8px;
`

export const Button = styled.button`
  color: #e81438;
  margin: 0 1em;
  padding: 0.25em 1em;
  border: 2px solid #e81438;
  border-radius: 5px;
  background-color: white;
`

export const Root = styled.div`
  text-align: center;
  color: #e81438;
  font-family: 'Baloo Tammudu 2', cursive;
  background: papayawhip;
`

export const Input = styled.input`
  margin: 5px;
`

export const WeekInput = styled(Input)`
  width: 20px;
`
export const Modal = styled.div`
  z-index: 1;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: papayawhip;
`

export const ModalContent = styled.div`
  margin: 5% auto;
  padding: 10px;
  border: 2px solid #e81438;
  width: 40%;
  border-radius: 5px;
`