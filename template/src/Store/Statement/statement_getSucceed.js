import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import { GetDeclarationPending , GetDeclarationRejected , GetDeclarationSucceed} from '@/Services/Statement/index'

export default {
  initialState: buildAsyncState('getStatementSucceed'),
  action: buildAsyncActions(
    'Statement/getStatementSucceed',
    GetDeclarationSucceed,
  ),
  reducers: buildAsyncReducers({
    errorKey: 'getStatementSucceed.error',
    loadingKey: 'getStatementSucceed.loading',
    itemKey: 'ItemsStatementSucceed',
  }),
}
