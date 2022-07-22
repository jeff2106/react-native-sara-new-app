import {
  buildAsyncActions,
  buildAsyncReducers,
  buildAsyncState,
} from '@thecodingmachine/redux-toolkit-wrapper'
import DeleteProfilPicture from '@/Services/Auth/DeleteProfilPicture'

export default {
  initialState: buildAsyncState('deleteProfilPicture'),
  action: buildAsyncActions('auth/deleteProfilPicture', DeleteProfilPicture),
  reducers: {
    ...buildAsyncReducers({
      errorKey: 'deleteProfilPicture.error',
      loadingKey: 'deleteProfilPicture.loading',
      itemKey: null,
    }),
    fulfilled: (state, { payload, type }) => {
      console.debug('payload: ', payload)
      state.deleteProfilPicture.loading = false
      state.deleteProfilPicture.error = null
      state.item = {
        ...state.item,
        _description: {
          ...state.item._description,
          r_image_url: payload._description.r_image_url,
        },
      }
    },
    rejected: state => {
      state.deleteProfilPicture.loading = false
      state.deleteProfilPicture.error = {
        message: 'Erreur lors de la mise à jour des informations',
      }
    },
  },
}
