import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import FetchTypeMoyenPaiement from './FetchTypeMoyenPaiement'
import FetchSupportPaiement from '@/Store/PaymentMethod/FetchSupportPaiement'

const sliceInitialState = {
  item: [],
  supportPaiements: [],
}

export default buildSlice(
  'paymentMethod',
  [FetchTypeMoyenPaiement, FetchSupportPaiement],
  sliceInitialState,
).reducer
