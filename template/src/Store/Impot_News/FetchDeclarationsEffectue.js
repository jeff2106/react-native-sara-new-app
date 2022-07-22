import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import { FetchDeclarationsEffectue } from '@/Services/Impot'

export default {
  initialState: buildAsyncState('fetchDeclarationsEffectue'),
  action: buildAsyncActions(
    'impot/fetchDeclarationsEffectue',
    FetchDeclarationsEffectue,
  ),
  reducers: buildAsyncReducers({
    errorKey: 'fetchDeclarationsEffectue.error',
    loadingKey: 'fetchDeclarationsEffectue.loading',
    itemKey: 'declarationsEffectue',
  }),
}
