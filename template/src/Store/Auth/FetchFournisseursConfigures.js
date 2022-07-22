import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import { FetchFournisseursConfigures } from '@/Services/Auth'

export default {
  initialState: buildAsyncState('fetchFournisseursConfigures'),
  action: buildAsyncActions(
    'auth/fetchFournisseursConfigures',
    FetchFournisseursConfigures,
  ),
  reducers: buildAsyncReducers({
    errorKey: 'fetchFournisseursConfigures.error',
    loadingKey: 'fetchFournisseursConfigures.loading',
    itemKey: 'fournisseursConfigures',
  }),
}
