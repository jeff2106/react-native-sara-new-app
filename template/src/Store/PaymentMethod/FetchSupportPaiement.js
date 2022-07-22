import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import { FetchSupportPaiementService } from '@/ServicesGraphQL/PaymentMethod'

export default {
  initialState: buildAsyncState('fetchSupportPaiement'),
  action: buildAsyncActions(
    'paymentMethod/fetchSupportPaiement',
    FetchSupportPaiementService,
  ),
  reducers: buildAsyncReducers({
    errorKey: 'fetchSupportPaiement.error',
    loadingKey: 'fetchSupportPaiement.loading',
    itemKey: 'supportPaiements',
  }),
}
