import api from '@/Services'
import handleError from '@/Services/utils/handleError'

export default async ({
  p_session,
  p_client,
  p_fournisseur,
  p_param_formulaire_saisi_service,
}) => {
  let response
  try {
    const data = {
      p_session,
      p_client,
      p_fournisseur,
      p_param_formulaire_saisi_service,
    }
    response = await api.post('_maj_conf_param_service', data)
  } catch (e) {
    console.debug(e)
    return handleError({
      message: 'Erreur réseau, vérifiez votre connexion internet et réessayez.',
      data: '',
      status: response?.data._status,
    })
  }
  if (response.data._status !== 1) {
    console.debug(response.data)
    return handleError({
      message: response.data.lib_error,
      data: '',
      status: response.data._status,
    })
  }
  return response.data
}
