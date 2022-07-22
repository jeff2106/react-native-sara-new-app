import api from '@/Services'
import handleError from '@/Services/utils/handleError'

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
  /*
  if (!response?.data) {
    return handleError({
      message: 'Erreur réseau, vérifiez votre connexion internet et réessayez.',
      data: '',
      status: response?.data?._status,
    })
  }

  if (response.data && response?.data?._status !== 1) {
    console.debug(response.data)
    return handleError({
      message: response?.data?.lib_error,
      data: '',
      status: response?.data?._status,
    })
  }
*/
  return response.data
}
