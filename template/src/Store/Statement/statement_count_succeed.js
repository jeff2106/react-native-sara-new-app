import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import { GetDeclarationPending , GetDeclarationRejected , GetDeclarationSucceed} from '@/Services/Statement/index'

export default {
  initialState: buildAsyncState('getCountStatementSucceed'),
  action: buildAsyncActions(
    'Statement/getCountStatementSucceed',
    GetDeclarationSucceed,
  ),
  reducers: buildAsyncReducers({
    errorKey: 'getCountStatementSucceed.error',
    loadingKey: 'getCountStatementSucceed.loading',
    itemKey: 'CountStatementSucceed',
  }),
}
