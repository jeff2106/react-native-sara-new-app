import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import { GetDeclarationPending , GetDeclarationRejected} from '@/Services/Statement/index'

export default {
  initialState: buildAsyncState('getStatementRejected'),
  action: buildAsyncActions(
    'Statement/getStatementRejected',
    GetDeclarationRejected,
  ),
  reducers: buildAsyncReducers({
    errorKey: 'getStatementRejected.error',
    loadingKey: 'getStatementRejected.loading',
    itemKey: 'ItemsStatementRejected',
  }),
}
