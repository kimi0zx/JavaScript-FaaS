import axios from 'axios'

export const AXIOS_BASE_URL = process.env.NODE_ENV === 'production' ? 'http://localhost:12001/' : 'http://localhost:12001/'
export const FAAS_BASE_URL = process.env.NODE_ENV === 'production' ? 'http://localhost:12001/' : 'http://localhost:12001/'
axios.defaults.baseURL = AXIOS_BASE_URL

export const http = axios