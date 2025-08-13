import axios from 'axios'
const base = import.meta.env.VITE_API_URL || '/api'
const api = axios.create({ baseURL: base, headers: { 'Content-Type': 'application/json' } })
export default api
