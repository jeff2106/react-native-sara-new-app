import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import { FetchFournisseurByCategoryId } from '@/Services/Fournisseur'

export default {
  initialState: buildAsyncState('fetchFournisseurByCategoryId'),
  action: buildAsyncActions(
    'fournisseur/fetchFournisseurByCategoryId',
    FetchFournisseurByCategoryId,
  ),
  reducers: buildAsyncReducers({
    errorKey: 'fetchFournisseurByCategoryId.error',
    loadingKey: 'fetchFournisseurByCategoryId.loading',
  }),
}
