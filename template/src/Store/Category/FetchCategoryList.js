import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import { FetchCategoryService, FetchCategoryList } from '@/Services/Category'

export default {
  initialState: buildAsyncState('fetchCategoryList'),
  action: buildAsyncActions('category/fetchCategoryList', FetchCategoryList),
  reducers: buildAsyncReducers({
    errorKey: 'fetchCategoryList.error',
    loadingKey: 'fetchCategoryList.loading',
    itemKey: 'ItemCategoryList',
  }),
}
