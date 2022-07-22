import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import { PaymentRequest } from '@/Services/PaymentRequest'

export default {
  initialState: buildAsyncState('fetchPaymentRequest'),
  action: buildAsyncActions('impot/getPaymentRequest', PaymentRequest),
  reducers: buildAsyncReducers({
    errorKey: 'fetchPaymentRequest.error',
    loadingKey: 'fetchPaymentRequest.loading',
    itemKey: 'R_fetchPaymentRequest',
  }),
}
