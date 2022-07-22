import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper'
import { FetchCategoryService , FetchCategoryList} from '@/Services/Category'

export default {
  initialState: buildAsyncState('fetchCategory'),
  action: buildAsyncActions('category/fetchCategory', FetchCategoryService),
  reducers: buildAsyncReducers({
    errorKey: 'fetchCategory.error',
    loadingKey: 'fetchCategory.loading',
  }),
}
