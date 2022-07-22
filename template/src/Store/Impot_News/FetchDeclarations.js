import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import { FetchDeclarations } from '@/Services/Impot'

export default {
  initialState: buildAsyncState('fetchDeclarations'),
  action: buildAsyncActions('impot/fetchDeclarations', FetchDeclarations),
  reducers: buildAsyncReducers({
    errorKey: 'fetchDeclarations.error',
    loadingKey: 'fetchDeclarations.loading',
    itemKey: 'declarations',
  }),
}
