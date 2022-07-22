import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import FetchThirdUser from '@/Store/ThirdUser/FetchThirdUser'

const sliceInitialState = {
  item: [],
}

export default buildSlice('thirdUser', [FetchThirdUser], sliceInitialState)
  .reducer
