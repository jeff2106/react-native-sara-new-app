import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import { UpdatePassword } from '@/Services/Auth'

export default {
  initialState: buildAsyncState('updatePassword'),
  action: buildAsyncActions('auth/updatePassword', UpdatePassword),
  reducers: buildAsyncReducers({
    errorKey: 'updatePassword.error',
    loadingKey: 'updatePassword.loading',
    itemKey: null,
  }),
}
