import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import { FetchThirdUserService } from '@/ServicesGraphQL/ThirdUser'

export default {
  initialState: buildAsyncState('fetchThirdUser'),
  action: buildAsyncActions('thirdUser/fetchThirdUser', FetchThirdUserService),
  reducers: buildAsyncReducers({
    errorKey: 'fetchThirdUser.error',
    loadingKey: 'fetchThirdUser.loading',
  }),
}
