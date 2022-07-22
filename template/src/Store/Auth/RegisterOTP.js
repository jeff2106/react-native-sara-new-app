import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import RegisterOTP from '@/Services/Auth/RegisterOTP'

export default {
  initialState: buildAsyncState('registerOTP'),
  action: buildAsyncActions('auth/registerOTP', RegisterOTP),
  reducers: buildAsyncReducers({
    errorKey: 'registerOTP.error',
    loadingKey: 'registerOTP.loading',
    itemKey: null,
  }),
}
