import api from '@/Services'
import handleError from '@/Services/utils/handleError'

export default async ({ session, id_client }) => {
  let response
  try {
    response = await api.post('_get_categorie_config', {
      p_session: session,
    })
    if (response.data._status !== 1) {
      return handleError({
        message: response.data.lib_error,
        data: '',
        status: response.data._status,
      })
    }
    return response.data._description
  } catch (e) {
    console.debug(e)
    return handleError({
      message: "Erreur lors de l'exécution de la requête, veuillez réessayer.",
    })
  }
}
