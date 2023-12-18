import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import fetchUser from '@/services/example/fetchUser'

export default {
  initialState: buildAsyncState('_fetchUser'),
  action: buildAsyncActions('example/_fetchUser', fetchUser),
  reducers: buildAsyncReducers({
    errorKey: '_fetchUser.error',
    loadingKey: '_fetchUser.loading',
  }),
}
