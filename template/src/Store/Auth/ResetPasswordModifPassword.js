import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import ResetPasswordModifPassword from '@/Services/Auth/ResetPasswordModifPassword'

export default {
  initialState: buildAsyncState('resetPasswordModifPassword'),
  action: buildAsyncActions(
    'auth/resetPasswordModifPassword',
    ResetPasswordModifPassword,
  ),
  reducers: buildAsyncReducers({
    errorKey: 'resetPasswordModifPassword.error',
    loadingKey: 'resetPasswordModifPassword.loading',
    itemKey: null,
  }),
}
