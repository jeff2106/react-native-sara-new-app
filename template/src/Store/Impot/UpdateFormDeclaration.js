import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import UpdateFormDeclaration from '@/Services/Impot/UpdateFormDeclaration'

export default {
  initialState: buildAsyncState('updateFormDeclaration'),
  action: buildAsyncActions(
    'impot/updateFormDeclaration',
    UpdateFormDeclaration,
  ),
  reducers: buildAsyncReducers({
    errorKey: 'updateFormDeclaration.error',
    loadingKey: 'updateFormDeclaration.loading',
    itemKey: null,
  }),
}
