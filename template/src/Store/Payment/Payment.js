import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import GetPaymentSuccess from '@/Services/Impot_News/FetchPaymentSuccess'

export default {
  initialState: buildAsyncState('getTransacPaymentSuccess'),
  action: buildAsyncActions(
    'TransacPayment/getTransacPaymentSuccess',
    GetPaymentSuccess,
  ),
  reducers: buildAsyncReducers({
    errorKey: 'getTransacPaymentSuccess.error',
    loadingKey: 'getTransacPaymentSuccess.loading',
    itemKey: 'ItemsTransacSucceed',
  }),
}
