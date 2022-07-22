import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import { FetchTypeMoyenPaiementService } from '@/ServicesGraphQL/PaymentMethod'

export default {
  initialState: buildAsyncState('fetchTypeMoyenPaiement'),
  action: buildAsyncActions(
    'paymentMethod/fetchTypeMoyenPaiement',
    FetchTypeMoyenPaiementService,
  ),
  reducers: buildAsyncReducers({
    errorKey: 'fetchTypeMoyenPaiement.error',
    loadingKey: 'fetchTypeMoyenPaiement.loading',
  }),
}
