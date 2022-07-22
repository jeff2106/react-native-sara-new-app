import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import FetchRole from './FetchRole'

const sliceInitialState = {
  item: [],
}

export default buildSlice('role', [FetchRole], sliceInitialState).reducer
