import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import StatementPending from '@/Store/Statement/statement_getPending'
import StatementRejected from '@/Store/Statement/statement_getRejected'
import StatementSucced from '@/Store/Statement/statement_getSucceed'
import StatementCountPending from '@/Store/Statement/statement_count_pending'
import StatementCountRejected from '@/Store/Statement/statement_count_rejected'
import StatementCountSucced from '@/Store/Statement/statement_count_succeed'

const sliceInitialState = {
  item: [],
  ItemsStatementPending: [],
  ItemsStatementRejected: [],
  ItemsStatementSucceed: [],
  CountStatementPending: [],
  CountStatementSucceed: [],
  CountStatementRejected: [],
}

export default buildSlice(
  'Statement',
  [
    StatementPending,
    StatementRejected,
    StatementSucced,
    StatementCountPending,
    StatementCountRejected,
    StatementCountSucced
  ],
  sliceInitialState,
).reducer
