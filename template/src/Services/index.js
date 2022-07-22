import axios from 'axios'
import handleError from '@/Services/utils/handleError'
import { Config } from '@/Config'
import { navigateAndSimpleReset } from '@/Navigators/Root'

const instance = axios.create({
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 12000,
})

instance.interceptors.response.use(
  response => {
    if (response?.data?._erreur === -101) {
      console.debug('Votre session a expiré, veuillez vous réconnecter')
      navigateAndSimpleReset('SessionExpire')
      return handleError({
        message: 'Votre session a expiré, veuillez vous réconnecter',
        data: {},
        status: -101,
      })
    } else {
      return response
    }
  },
  ({ message, response: { data, status } }) => {
    return handleError({ message, data, status })
  },
)

export default instance
