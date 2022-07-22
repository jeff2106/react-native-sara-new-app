import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import { FetchFournisseurConfigForm } from '@/Services/Form'

export default {
  initialState: buildAsyncState('fetchFournisseurConfigForm'),
  action: buildAsyncActions(
    'form/fetchFournisseurConfigForm',
    FetchFournisseurConfigForm,
  ),
  reducers: buildAsyncReducers({
    errorKey: 'fetchFournisseurConfigForm.error',
    loadingKey: 'fetchFournisseurConfigForm.loading',
  }),
}
