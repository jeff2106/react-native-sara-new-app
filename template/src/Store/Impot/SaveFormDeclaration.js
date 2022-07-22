import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import SaveFormDeclaration from '@/Services/Impot/SaveFormDeclaration'

export default {
  initialState: buildAsyncState('saveFormDeclaration'),
  action: buildAsyncActions('impot/saveFormDeclaration', SaveFormDeclaration),
  reducers: buildAsyncReducers({
    errorKey: 'saveFormDeclaration.error',
    loadingKey: 'saveFormDeclaration.loading',
    itemKey: null,
  }),
}
