import React from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import WeeklyList from './components/WeeklyList'
import ParticipantForm from './components/ParticipantForm'
import WinnerList from './components/WinnerList'
import LotteryForm from './components/LotteryForm'
import { Title, Root } from './components/styled'

const App = () => {
  const linkStyle = {
    padding: 5,
    color: '#e81438',
    textDecoration: 'none',
    margin: '1em',
    fontWeight: 600
  }

  const getCurrentWeek = () => {
    const date = new Date()
    date.setHours(0,0,0,0) // sets new date to midnight
    const yearFirst = new Date(date.getFullYear(), 0, 1)
    const days = Math.floor((date - yearFirst) / (1000 * 60 * 60 * 24))
    const currentWeek = Math.round((days + 4) / 7) // adding 4 starts a new week on saturday
    return currentWeek
  }

  const week = getCurrentWeek()

  return (
    <Root>
      <Router>
        <Link style={linkStyle} to='/'>Etusivu</Link>
        <Link style={linkStyle} to='/arvonta'>Arvonta</Link>
        <Link style={linkStyle} to='/voittajat'>Voittajat</Link>
        <Link style={linkStyle} to='/osallistuja'>Lisää osallistuja</Link>
        <Title>Perjantaipulloarvonta</Title>
        <Switch>
          <Route path='/arvonta'>
            <LotteryForm initialWeek={week} />
          </Route>
          <Route path='/voittajat'>
            <WinnerList />
          </Route>
          <Route path='/osallistuja'>
            <ParticipantForm />
          </Route>
          <Route path='/'>
            <WeeklyList initialWeek={week} />
          </Route>
        </Switch>
      </Router>
    </Root>
  )
}

export default App
