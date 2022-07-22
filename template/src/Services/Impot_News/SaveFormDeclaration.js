import api from '@/Services'
import handleError from '@/Services/utils/handleError'

export default async ({
  session,
  id_formulaire,
  id_client,
  id_acteur,
  id_impot_adeclarer,
  fields,
}) => {
  if (!session) {
    console.debug('La session est requise')
    return handleError({ message: 'La session est requise' })
  }
  let response
  try {
    response = await api.post('_ajout_sauvegarde_declaration', {
      p_session: session,
      p_formulaire: id_formulaire,
      p_client: id_client,
      p_fournisseur: id_acteur,
      p_param_formulaire_valeur: fields,
      p_id_impot_adeclarer: id_impot_adeclarer,
    })
    if (response?.data?._status !== 1) {
      return handleError({
        message: response?.data?.lib_error,
        data: '',
        status: response?.data?._status,
      })
    }
    return response?.data?._description
  } catch (e) {
    console.debug(e)
    return handleError({
      message: "Erreur lors de l'exécution de la requête, veuillez réessayer.",
    })
  }
}
