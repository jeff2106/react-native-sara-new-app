import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import fetchUser from '@/store/Example/Users/fetchUser'

const sliceInitialState = {
  item: [],
}

export default buildSlice('example', [fetchUser], sliceInitialState).reducer
