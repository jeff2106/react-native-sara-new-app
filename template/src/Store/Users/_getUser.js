import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import _getAllUser from '@/Services/Users/_getUser'

export default {
  initialState: buildAsyncState('_getUser'),
  action: buildAsyncActions('Users/_getUser', _getAllUser),
  reducers: buildAsyncReducers({
    errorKey: '_getUser.error',
    loadingKey: '_getUser.loading',
  }),
}
