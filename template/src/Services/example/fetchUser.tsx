import api from '@/services'
import handleError from '@/services/utils/handleError'

export default async data => {
  let response
  try {
    response = await api.get('/users/' + data?.id)
  } catch (e) {
    console.debug(e)
    return handleError({
      message: 'Erreur réseau, vérifiez votre connexion internet et réessayez.',
      data: '',
      status: response?.data._status,
    })
  }

  return response.data
}
