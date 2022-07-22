import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import Login from '@/Services/Auth/Login'

export default {
  initialState: buildAsyncState('login'),
  action: buildAsyncActions('auth/login', Login),
  reducers: buildAsyncReducers({
    errorKey: 'login.error',
    loadingKey: 'login.loading',
  }),
}
