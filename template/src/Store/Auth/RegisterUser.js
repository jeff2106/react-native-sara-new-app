import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import Register from '@/Services/Auth/Register'

export default {
  initialState: buildAsyncState('register'),
  action: buildAsyncActions('auth/register', Register),
  reducers: buildAsyncReducers({
    errorKey: 'register.error',
    loadingKey: 'register.loading',
    itemKey: null,
  }),
}
