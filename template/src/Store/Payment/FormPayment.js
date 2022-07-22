import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import { PaymentForm } from '@/Services/Payment'

export default {
  initialState: buildAsyncState('getFormPayment'),
  action: buildAsyncActions('TransacPayment/getFormPayment', PaymentForm),
  reducers: buildAsyncReducers({
    errorKey: 'getFormPayment.error',
    loadingKey: 'getFormPayment.loading',
    itemKey: 'ItemsTransacForm',
  }),
}
