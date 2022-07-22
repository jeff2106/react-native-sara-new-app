import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import { GetPaymentPending } from '@/Services/Payment'

export default {
  initialState: buildAsyncState('getItemsPaymentPending'),
  action: buildAsyncActions(
    'TransacPayment/getItemsPaymentPending',
    GetPaymentPending,
  ),
  reducers: buildAsyncReducers({
    errorKey: 'getItemsPaymentPending.error',
    loadingKey: 'getItemsPaymentPending.loading',
    itemKey: 'ItemsPaymentPending',
  }),
}
