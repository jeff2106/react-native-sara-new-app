import api from '@/Services'
import handleError from '@/Services/utils/handleError'

export default async data => {
  let response
  try {
    response = await api.get(
      `_get_formulaire_paiement/?p_session=${data?.p_session}&p_id_service=${data?.p_id_service}&p_id_fournisseur=${data?.p_id_fournisseur}&p_id_acteur=${data?.p_id_acteur}&p_id_declaration=${data?.p_id_declaration}`,
    )
    if (response.data._status !== 1) {
      return handleError({
        message: response.data.lib_error,
        data: '',
        status: response.data._status,
      })
    }

    return response.data
  } catch (e) {
    console.debug(e)
    return handleError({
      message: "Erreur lors de l'exécution de la requête, veuillez réessayer.",
    })
  }
}
