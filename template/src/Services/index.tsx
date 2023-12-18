import axios from 'axios'
import handleError from '@/services/utils/handleError'
import { Config } from '@/config'

const instance = axios.create({
  baseURL: __DEV__ ? Config.URL_API_DEBUGMODE : Config.URL_API_PROBMODE,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 12000,
})

instance.interceptors.response.use(
  response => {
    //Logic here
    return response
  },
  ({ message, response: { data, status } }) => {
    return handleError({ message, data, status })
  },
)

export default instance
