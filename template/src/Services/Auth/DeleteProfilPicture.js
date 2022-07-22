import api from '@/Services'
import handleError from '@/Services/utils/handleError'

export default async ({ particulier, session }) => {
  let response
  try {
    response = await api.post('_maj_acteur_url', {
      p_session: session,
      p_id_particulier: particulier,
      p_image_url: '',
    })
  } catch (e) {
    console.debug(e)
    return handleError({
      message: 'Erreur réseau, vérifiez votre connexion internet et réessayez.',
      data: '',
      status: response?.data._status,
    })
  }
  if (response?.data._status !== 1) {
    return handleError({
      message: response?.data._description,
      data: '',
      status: response?.data._status,
    })
  }
  return response.data
}
