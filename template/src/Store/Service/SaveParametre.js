import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import { SaveParametre } from '@/ServicesSpring/Service'

export default {
  initialState: buildAsyncState('saveParametre'),
  action: buildAsyncActions('service/saveParametre', SaveParametre),
  reducers: buildAsyncReducers({
    errorKey: 'saveParametre.error',
    loadingKey: 'saveParametre.loading',
    itemKey: 'saveParametre',
  }),
}
