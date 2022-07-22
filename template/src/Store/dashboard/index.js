import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import getDetailsDashBoard from './getDetailsDashBoard'
const sliceInitialState = {
  item: [],
}

export default buildSlice('dashboard', [getDetailsDashBoard], sliceInitialState)
  .reducer
