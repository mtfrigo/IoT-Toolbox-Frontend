import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3332'
})

export default api;