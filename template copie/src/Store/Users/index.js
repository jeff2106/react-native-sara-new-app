import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import _getUser from '@/Store/Users/_getUser'

const sliceInitialState = {
  item: [],
}

export default buildSlice('Users', [_getUser], sliceInitialState).reducer
