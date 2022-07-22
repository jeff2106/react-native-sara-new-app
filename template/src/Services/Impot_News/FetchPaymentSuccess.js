import api from '@/Services'
import handleError from '@/Services/utils/handleError'

export default async data => {
  let response
  try {
    response = await api.get(
      `_get_operation_by_fournisseur/?p_session=${data.p_session}&p_id_fournisseur=${data.p_id_fournisseur}&p_statut=${data.p_statut}&p_id_acteur=${data.p_id_acteur}`,
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
