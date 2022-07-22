import {
  buildAsyncActions,
  buildAsyncReducers,
  buildAsyncState,
} from '@thecodingmachine/redux-toolkit-wrapper'
import { UpdateParticulier } from '@/Services/Auth'

export default {
  initialState: buildAsyncState('updateParticulier'),
  action: buildAsyncActions('auth/updateParticulier', UpdateParticulier),
  reducers: {
    ...buildAsyncReducers({
      errorKey: 'updateParticulier.error',
      loadingKey: 'updateParticulier.loading',
      itemKey: null,
    }),
    fulfilled: (state, { payload, type }) => {
      console.debug('payload: ', payload)
      state.updateParticulier.loading = false
      state.updateParticulier.error = null
      state.item = {
        ...state.item,
        _description: {
          ...state.item._description,
          ...payload._description,
        },
      }
    },
    rejected: state => {
      state.updateParticulier.loading = false
      state.updateParticulier.error = {
        message: 'Erreur lors de la mise à jour des informations',
      }
    },
  },
}
