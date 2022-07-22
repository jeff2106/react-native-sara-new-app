import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import { FetchRoleService } from '@/ServicesGraphQL/Role'

export default {
  initialState: buildAsyncState('fetchRole'),
  action: buildAsyncActions('role/fetchRole', FetchRoleService),
  reducers: buildAsyncReducers({
    errorKey: 'fetchRole.error',
    loadingKey: 'fetchRole.loading',
  }),
}
