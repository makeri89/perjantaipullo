import axios from 'axios'
const baseUrl = '/api/winner'

const getWinners = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getWinner = async (week) => {
  const response = await axios.get(`$baseUrl/${week}`)
  return response.data
}

const addWinner = async (week, prize) => {
  const response = await axios.post(baseUrl, { week, prize })
  return response.data
}

export {
  getWinners,
  getWinner,
  addWinner
}