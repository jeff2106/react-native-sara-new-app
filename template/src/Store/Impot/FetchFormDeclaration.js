import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import { FetchFormDeclaration } from '@/Services/Impot'

export default {
  initialState: buildAsyncState('fetchFormDeclaration'),
  action: buildAsyncActions('impot/fetchFormDeclaration', FetchFormDeclaration),
  reducers: buildAsyncReducers({
    errorKey: 'fetchFormDeclaration.error',
    loadingKey: 'fetchFormDeclaration.loading',
    itemKey: 'form',
  }),
}
