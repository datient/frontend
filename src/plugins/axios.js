import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://159.65.222.187:8000'
})

export default instance
