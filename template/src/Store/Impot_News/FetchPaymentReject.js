import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import { FetchPaymentReject } from '@/Services/Impot'

export default {
  initialState: buildAsyncState('fetchPaymentReject'),
  action: buildAsyncActions('impot/fetchPaymentReject', FetchPaymentReject),
  reducers: buildAsyncReducers({
    errorKey: 'fetchPaymentReject.error',
    loadingKey: 'fetchPaymentReject.loading',
    itemKey: 'paymentReject',
  }),
}
