import api from '@/Services'
import handleError from '@/Services/utils/handleError'

export default async data => {
  let response
  try {
    response = await api.post('_modification_mdp_etape_3', {
      ...data,
    })
  } catch (e) {
    return handleError({
      message: 'Erreur réseau, vérifiez votre connexion internet et réessayez.',
      data: '',
      status: response?.data._status,
    })
  }
  if (response.data._status !== 1) {
    return handleError({
      message: response.data.lib_error,
      data: '',
      status: response.data._status,
    })
  }
  return response.data
}
