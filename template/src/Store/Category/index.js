import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import FetchCategory from './FetchCategory'
import FetchCategoryList from './FetchCategoryList'
import FetchSubCategoryList from './FetchSubCategoryList'

const sliceInitialState = {
  item: [],
  ItemCategoryList: [],
  ItemSubCategoryList: [],
}

export default buildSlice(
  'category',
  [FetchCategory, FetchCategoryList, FetchSubCategoryList],
  sliceInitialState,
).reducer
