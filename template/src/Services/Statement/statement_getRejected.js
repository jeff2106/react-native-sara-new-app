import api from '@/Services'
import handleError from '@/Services/utils/handleError'

export default async data => {
  let response
  try {
    response = await api.get(
      `_get_impot_adeclarer_horsdelais/?p_session=${data.p_session}&p_id_acteur=${data.p_id_acteur}&p_date_debut=${data.p_date_debut}&p_date_fin=${data.p_date_fin}&p_id_categorie_fournisseur=${data.p_id_categorie_fournisseur}&p_id_fournisseur=${data.p_id_fournisseur}&p_categorie_fournisseur=${data?.p_categorie_fournisseur}`,
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
