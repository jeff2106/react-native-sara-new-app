import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import { UpdateConfig } from '@/Services/Impot'

export default {
  initialState: buildAsyncState('updateConfig'),
  action: buildAsyncActions('impot/updateConfig', UpdateConfig),
  reducers: buildAsyncReducers({
    errorKey: 'updateConfig.error',
    loadingKey: 'updateConfig.loading',
    itemKey: null,
  }),
}
