import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import FetchFournisseurConfigForm from '@/Store/Form/FetchFournisseurConfigForm'
import SaveConfigForm from '@/Store/Form/SaveConfigForm'

const sliceInitialState = {
  item: {},
}

export default buildSlice(
  'form',
  [FetchFournisseurConfigForm, SaveConfigForm],
  sliceInitialState,
).reducer
