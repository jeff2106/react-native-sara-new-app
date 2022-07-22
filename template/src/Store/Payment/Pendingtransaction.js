import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import GetPaymentSuccess from '@/Services/Payment/GetPayment'

export default {
  initialState: buildAsyncState('getPendingtransaction'),
  action: buildAsyncActions(
    'TransacPayment/getPendingtransaction',
    GetPaymentSuccess,
  ),
  reducers: buildAsyncReducers({
    errorKey: 'getPendingtransaction.error',
    loadingKey: 'getPendingtransaction.loading',
    itemKey: 'ItemsTransacPending',
  }),
}
