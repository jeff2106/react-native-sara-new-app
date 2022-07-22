import { createClient } from '@urql/core'
import { fetchExchange } from '@urql/core'
import { Config } from '@/Config'

const instance = createClient({
  url: Config.GRAPHQL_URL,
  exchanges: [fetchExchange],
  /*fetchOptions: () => {
    const token = getToken()
    return {
      headers: { authorization: token ? `Bearer ${token}` : '' },
    }
  },*/
})

export default instance
