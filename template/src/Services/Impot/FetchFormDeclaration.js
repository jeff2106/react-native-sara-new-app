import api from '@/Services'
import handleError from '@/Services/utils/handleError'

export default async ({ service, session, acteur }) => {
  if (!session) {
    return handleError({ message: 'La session est requise' })
  }
  if (!service) {
    return handleError({ message: 'Le service est requis' })
  }
  let response
  try {
    response = await api.get(
      `_get_formulaire_declaration/?p_session=${session}&p_id_service=${service}&p_id_client=${acteur}`,
    )
    if (response.data._status !== 1) {
      console.debug(response.data)
      return handleError({
        message: response.data?.lib_error,
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
