import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import { GetDetailsDashBoad } from '@/Services/dashboard'

export default {
  initialState: buildAsyncState('getDashboard'),
  action: buildAsyncActions('dashboard/getDashboard', GetDetailsDashBoad),
  reducers: buildAsyncReducers({
    errorKey: 'getDashboard.error',
    loadingKey: 'getDashboard.loading',
  }),
}
