import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import { SaveConfigForm } from '@/Services/Form'

export default {
  initialState: buildAsyncState('saveConfigForm'),
  action: buildAsyncActions('form/saveConfigForm', SaveConfigForm),
  reducers: buildAsyncReducers({
    errorKey: 'saveConfigForm.error',
    loadingKey: 'saveConfigForm.loading',
    itemKey: null,
  }),
}
