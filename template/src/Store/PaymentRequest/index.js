import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import PaymentRequest from '@/Store/PaymentRequest/PaymentRequest'

const sliceInitialState = {
  item: [],
}

export default buildSlice('paymentRequest', [PaymentRequest], sliceInitialState)
  .reducer
