import api from '@/Services'
import handleError from '@/Services/utils/handleError'

export default async ({
  p_session,
  p_login,
  p_mdp_old,
  p_mdp_new,
  p_id_acces,
}) => {
  let response
  try {
    console.debug({
      p_session,
      p_login,
      p_mdp_old,
      p_mdp_new,
      p_id_acces,
    })
    response = await api.post('_maj_mdp_profil', {
      p_session,
      p_login,
      p_mdp_old,
      p_mdp_new,
      p_id_acces,
    })
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
