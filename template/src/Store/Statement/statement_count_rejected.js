import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import {
  GetDeclarationPending,
  GetDeclarationRejected,
} from '@/Services/Statement/index'

export default {
  initialState: buildAsyncState('getCountStatementRejected'),
  action: buildAsyncActions(
    'Statement/getCountStatementRejected',
    GetDeclarationRejected,
  ),
  reducers: buildAsyncReducers({
    errorKey: 'getCountStatementRejected.error',
    loadingKey: 'getCountStatementRejected.loading',
    itemKey: 'CountStatementRejected',
  }),
}
