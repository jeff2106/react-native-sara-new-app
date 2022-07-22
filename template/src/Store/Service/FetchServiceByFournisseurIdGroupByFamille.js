import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import { FetchServiceByFournisseurIdGroupByFamille } from '@/ServicesSpring/Service'

export default {
  initialState: buildAsyncState('fetchServiceByFournisseurIdGroupByFamille'),
  action: buildAsyncActions(
    'service/fetchServiceByFournisseurIdGroupByFamille',
    FetchServiceByFournisseurIdGroupByFamille,
  ),
  reducers: buildAsyncReducers({
    errorKey: 'fetchServiceByFournisseurIdGroupByFamille.error',
    loadingKey: 'fetchServiceByFournisseurIdGroupByFamille.loading',
    itemKey: 'serviceByFournisseurIdGroupByFamille',
  }),
}
