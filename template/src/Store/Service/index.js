import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import FetchServiceByFournisseurIdGroupByFamille from '@/Store/Service/FetchServiceByFournisseurIdGroupByFamille'
import FetchParametreByFournisseurId from '@/Store/Service/FetchParametreByFournisseurId'
import SaveParametre from '@/Store/Service/SaveParametre'

const sliceInitialState = {
  item: [],
  serviceByFournisseurIdGroupByFamille: [],
  parametreByFournisseurId: [],
  saveParametre: {},
}

export default buildSlice(
  'service',
  [
    FetchServiceByFournisseurIdGroupByFamille,
    FetchParametreByFournisseurId,
    SaveParametre,
  ],
  sliceInitialState,
).reducer
