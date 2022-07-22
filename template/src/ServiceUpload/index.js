import axios from 'axios'
import handleError from '@/Services/utils/handleError'
import { Config } from '@/Config'

const instance = axios.create({
  baseURL: Config.UPLOADFILE,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
})

instance.interceptors.response.use(
  response => response,
  ({ message, response: { data, status } }) => {
    return handleError({ message, data, status })
  },
)

export default instance
