import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import { GetPaymentPending } from '@/Services/Payment'

export default {
  initialState: buildAsyncState('getItemsCountPaymentPending'),
  action: buildAsyncActions(
    'TransacPayment/getItemsCountPaymentPending',
    GetPaymentPending,
  ),
  reducers: buildAsyncReducers({
    errorKey: 'getItemsCountPaymentPending.error',
    loadingKey: 'getItemsCountPaymentPending.loading',
    itemKey: 'ItemsCountPaymentPending',
  }),
}
