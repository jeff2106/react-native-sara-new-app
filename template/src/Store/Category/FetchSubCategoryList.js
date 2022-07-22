import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import {
  FetchCategoryService,
  FetchCategoryList,
  FetchSubCategoryList,
} from '@/Services/Category'

export default {
  initialState: buildAsyncState('fetchSubCategoryList'),
  action: buildAsyncActions(
    'category/fetchSubCategoryList',
    FetchSubCategoryList,
  ),
  reducers: buildAsyncReducers({
    errorKey: 'fetchSubCategoryList.error',
    loadingKey: 'fetchSubCategoryList.loading',
    itemKey: 'ItemSubCategoryList',
  }),
}
