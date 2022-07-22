import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import ResetPasswordInit from '@/Services/Auth/ResetPasswordInit'

export default {
  initialState: buildAsyncState('resetPasswordInit'),
  action: buildAsyncActions('auth/resetPasswordInit', ResetPasswordInit),
  reducers: buildAsyncReducers({
    errorKey: 'resetPasswordInit.error',
    loadingKey: 'resetPasswordInit.loading',
    itemKey: null,
  }),
}
