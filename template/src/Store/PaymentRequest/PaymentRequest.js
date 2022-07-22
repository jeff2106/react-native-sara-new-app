import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import { PaymentRequest } from '@/Services/PaymentRequest'

export default {
  initialState: buildAsyncState('getPaymentRequest'),
  action: buildAsyncActions('payment/getPaymentRequest', PaymentRequest),
  reducers: buildAsyncReducers({
    errorKey: 'getPaymentRequest.error',
    loadingKey: 'getPaymentRequest.loading',
  }),
}
