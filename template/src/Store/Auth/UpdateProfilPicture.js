import {
  buildAsyncActions,
  buildAsyncReducers,
  buildAsyncState,
} from '@thecodingmachine/redux-toolkit-wrapper'
import UpdateProfilPicture from '@/Services/Auth/UpdateProfilPicture'

export default {
  initialState: buildAsyncState('updateProfilPicture'),
  action: buildAsyncActions('auth/updateProfilPicture', UpdateProfilPicture),
  reducers: {
    ...buildAsyncReducers({
      errorKey: 'updateProfilPicture.error',
      loadingKey: 'updateProfilPicture.loading',
      itemKey: null,
    }),
    fulfilled: (state, { payload, type }) => {
      console.debug('payload: ', payload)
      state.updateProfilPicture.loading = false
      state.updateProfilPicture.error = null
      state.item = {
        ...state.item,
        _description: {
          ...state.item._description,
          r_image_url: payload._description.r_image_url,
        },
      }
    },
    rejected: state => {
      state.updateProfilPicture.loading = false
      state.updateProfilPicture.error = {
        message: 'Erreur lors de la mise à jour des informations',
      }
    },
  },
}
