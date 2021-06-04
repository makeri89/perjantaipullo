import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/participants'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getByWeek = async (week) => {
  const response = await axios.get(`${baseUrl}/${week}`)
  return response.data
}

const getWinner = async (week) => {
  const response = await axios.get(`${baseUrl}/winner/${week}`)
  return response.data
}

const addNew = async (participant) => {
  const response = await axios.post(baseUrl, participant)
  return response.data
}

export { getAll, getByWeek, getWinner, addNew }
