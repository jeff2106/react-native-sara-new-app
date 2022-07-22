import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import { FetchPayment } from '@/Services/Impot'

export default {
  initialState: buildAsyncState('fetchPayment'),
  action: buildAsyncActions('impot/fetchPayment', FetchPayment),
  reducers: buildAsyncReducers({
    errorKey: 'fetchPayment.error',
    loadingKey: 'fetchPayment.loading',
    itemKey: 'paymentEnattente',
  }),
}

