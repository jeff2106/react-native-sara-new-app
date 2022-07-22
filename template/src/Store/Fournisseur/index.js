import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import FetchFournisseurByCategoryId from '@/Store/Fournisseur/FetchFournisseurByCategoryId'

const sliceInitialState = {
  item: [],
}

export default buildSlice(
  'fournisseur',
  [FetchFournisseurByCategoryId],
  sliceInitialState,
).reducer
