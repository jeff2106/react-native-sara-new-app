import api from '@/Services'
import handleError from '@/Services/utils/handleError'

export default async ({ acteur, session, client }) => {
  if (!session) {
    console.debug('La session est requise')
    return handleError({ message: 'La session est requise' })
  }
  let response
  console.log(acteur)
  try {
    response = await api.get(
      `_get_formulaire/?p_session=${session}&p_id_client=${client}&p_libelle_type_formulaire=configuration&p_id_acteur=${acteur}`,
    )
    if (response.data._status !== 1) {
      return handleError({
        message: response.data.lib_error,
        data: '',
        status: response.data._status,
      })
    }
    return response.data._description.length > 0
      ? response.data._description[0]
      : []
  } catch (e) {
    console.debug(e)
    return handleError({
      message: "Erreur lors de l'exécution de la requête, veuillez réessayer.",
    })
  }
}
