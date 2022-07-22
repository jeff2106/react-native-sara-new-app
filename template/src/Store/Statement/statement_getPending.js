import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import { GetDeclarationPending } from '@/Services/Statement/index'

export default {
  initialState: buildAsyncState('getStatementPending'),
  action: buildAsyncActions(
    'Statement/getStatementPending',
    GetDeclarationPending,
  ),
  reducers: buildAsyncReducers({
    errorKey: 'getStatementPending.error',
    loadingKey: 'getStatementPending.loading',
    itemKey: 'ItemsStatementPending',
  }),
}
