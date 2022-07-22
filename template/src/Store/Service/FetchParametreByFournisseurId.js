import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import { FetchParametreByFournisseurId } from '@/ServicesSpring/Service'

export default {
  initialState: buildAsyncState('fetchParametreByFournisseurId'),
  action: buildAsyncActions(
    'service/fetchParametreByFournisseurId',
    FetchParametreByFournisseurId,
  ),
  reducers: buildAsyncReducers({
    errorKey: 'fetchParametreByFournisseurId.error',
    loadingKey: 'fetchParametreByFournisseurId.loading',
    itemKey: 'parametreByFournisseurId',
  }),
}
