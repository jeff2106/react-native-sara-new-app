import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import GetPaymentSuccess from '@/Services/Payment/GetPayment'

export default {
  initialState: buildAsyncState('getCountTransacPaymentSuccess'),
  action: buildAsyncActions(
    'TransacPayment/getCountTransacPaymentSuccess',
    GetPaymentSuccess,
  ),
  reducers: buildAsyncReducers({
    errorKey: 'getCountTransacPaymentSuccess.error',
    loadingKey: 'getCountTransacPaymentSuccess.loading',
    itemKey: 'CountTransacSucceed',
  }),
}
