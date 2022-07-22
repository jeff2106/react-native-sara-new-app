import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import { GetDeclarationPending } from '@/Services/Statement/index'

export default {
  initialState: buildAsyncState('getCountStatementPending'),
  action: buildAsyncActions(
    'Statement/getCountStatementPending',
    GetDeclarationPending,
  ),
  reducers: buildAsyncReducers({
    errorKey: 'getCountStatementPending.error',
    loadingKey: 'getCountStatementPending.loading',
    itemKey: 'CountStatementPending',
  }),
}
