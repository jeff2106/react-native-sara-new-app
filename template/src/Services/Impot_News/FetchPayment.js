import api from '@/Services'
import handleError from '@/Services/utils/handleError'

export default async data => {
  let response
  try {
    response = await api.get(
      `_get_liste_operations/?p_session=${data.user_session}&p_id_acteur=${data.r_acteur}&p_statut=${data.p_statut}`,
    )
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
