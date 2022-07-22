import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import GetPaymentSuccess from '@/Services/Impot_News/FetchPaymentSuccess'

export default {
  initialState: buildAsyncState('getPendingCountTransacPayment'),
  action: buildAsyncActions(
    'TransacPayment/getPendingCountTransacPayment',
    GetPaymentSuccess,
  ),
  reducers: buildAsyncReducers({
    errorKey: 'getPendingCountTransacPayment.error',
    loadingKey: 'getPendingCountTransacPayment.loading',
    itemKey: 'CountPendingTransac',
  }),
}
