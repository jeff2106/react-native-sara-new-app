import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import { FetchPaymentSuccess } from '@/Services/Impot'

export default {
  initialState: buildAsyncState('fetchPaymentSuccess'),
  action: buildAsyncActions('impot/fetchPaymentSuccess', FetchPaymentSuccess),
  reducers: buildAsyncReducers({
    errorKey: 'fetchPaymentSuccess.error',
    loadingKey: 'fetchPaymentSuccess.loading',
    itemKey: 'paymentSuccess',
  }),
}
