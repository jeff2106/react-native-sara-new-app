import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import PaymentSuccess from '@/Store/Payment/Payment'
import TransacPending from '@/Store/Payment/Pendingtransaction'
import TransacCountPending from '@/Store/Payment/PendingCountTransaction'
import TransacCount from '@/Store/Payment/PaymentCount'
import FormPayment from '@/Store/Payment/FormPayment'
import GETPendingTransac from '@/Store/Payment/get_count_payment_pending'
import GETCountPendingTransac from '@/Store/Payment/get_count_payment_pending2'
const sliceInitialState = {
  item: [],
  ItemsTransacSucceed: [],
  ItemsTransacPending: [],
  CountTransacSucceed: [],
  CountPendingTransac: [],
  ItemsTransacForm: [],
  ItemsPaymentPending: [],
  ItemsCountPaymentPending: [],
}

export default buildSlice(
  'TransacPayment',
  [
    PaymentSuccess,
    TransacPending,
    TransacCount,
    TransacCountPending,
    FormPayment,
    GETPendingTransac,
    GETCountPendingTransac,
  ],
  sliceInitialState,
).reducer
