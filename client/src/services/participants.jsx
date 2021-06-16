import axios from 'axios'
const baseUrl = '/api/participants'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getByWeek = async (week) => {
  const response = await axios.get(`${baseUrl}/${week}`)
  return response.data
}

const getWeek = async () => {
  const response = await axios.get('api/currentweek')
  return response.data
}

const addNew = async (participant) => {
  const response = await axios.post(baseUrl, participant)
  return response.data
}

export {
  getAll,
  getByWeek,
  getWeek,
  addNew
}
