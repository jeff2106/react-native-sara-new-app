import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import ResetPasswordVerifOTP from '@/Services/Auth/ResetPasswordVerifOTP'

export default {
  initialState: buildAsyncState('resetPasswordVerifOTP'),
  action: buildAsyncActions(
    'auth/resetPasswordVerifOTP',
    ResetPasswordVerifOTP,
  ),
  reducers: buildAsyncReducers({
    errorKey: 'resetPasswordVerifOTP.error',
    loadingKey: 'resetPasswordVerifOTP.loading',
    itemKey: null,
  }),
}
